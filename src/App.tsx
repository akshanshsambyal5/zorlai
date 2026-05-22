import { useState, useEffect, useMemo, useCallback, type MouseEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AITool } from './types';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { ToolDetailModal } from './components/ToolDetailModal';
import { AIScout } from './components/AIScout';
import { SubmitForm } from './components/SubmitForm';
import { AboutContact } from './components/AboutContact';
import { BlogTab } from './components/BlogTab';
import { AuthModal } from './components/AuthModal';
import { LucideIcon } from './components/LucideIcon';
import { useAuthContext } from './context/AuthContext';
import { useTools } from './hooks/useTools';
import { useCategories } from './hooks/useCategories';
import { useBookmarks } from './hooks/useBookmarks';
import { useSubmissions } from './hooks/useSubmissions';
import { subscribeNewsletter } from './lib/api';
import { ApiError } from './lib/api';
import { useRouter } from './hooks/useRouter';
import { usePageMeta } from './hooks/usePageMeta';
import { CategoriesIndexPage } from './pages/CategoriesIndexPage';
import { CategoryPage } from './pages/CategoryPage';
import { HomePage } from './pages/HomePage';
import { ToolsListingPage } from './pages/ToolsListingPage';
import { ToolPage } from './pages/ToolPage';
import { SavedToolsPage } from './pages/SavedToolsPage';
import { ProfilePage } from './pages/ProfilePage';
import { PricingPage } from './pages/PricingPage';
import { useLikedTools } from './hooks/useLikedTools';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { PageShell } from './components/layout/PageShell';
import { AuthCallbackHandler } from './components/auth/AuthCallbackHandler';
import { MobileNavTabs } from './components/MobileNavTabs';
import { paths, navTabFromRoute, toolPath } from './lib/router';
import { ensureArray } from './lib/safeArray';

const AUTH_ROUTES = new Set(['login', 'signup', 'forgot-password', 'reset-password']);

export default function App() {
  const { isAuthenticated, isAdmin, loading: authLoading, error: authError, clearError } = useAuthContext();
  const { route, navigate } = useRouter();

  const [selectedToolForDetail, setSelectedToolForDetail] = useState<AITool | null>(null);
  const [isAIScoutOpen, setIsAIScoutOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const { tools: catalogTools, loading: catalogLoading, error: catalogError, vote, addTool } = useTools({});
  const { categories, loading: categoriesLoading } = useCategories();
  const { bookmarkedIds, savedTools, toggle: toggleBookmark, isBookmarked } = useBookmarks(isAuthenticated);
  const { submissions, submit, approve, reject } = useSubmissions(isAuthenticated, isAdmin);
  const { likedTools, reload: reloadLiked } = useLikedTools(isAuthenticated);

  const navActiveTab = navTabFromRoute(route);
  const isAuthRoute = AUTH_ROUTES.has(route.name);
  const isCatalogRoute = !isAuthRoute && route.name !== 'dashboard';

  const isBootLoading = isCatalogRoute && (catalogLoading || categoriesLoading) && catalogTools.length === 0;

  usePageMeta(
    route.name === 'home'
      ? {
          title: 'ZorlAI — Discover Free AI Tools',
          description: 'Curated directory of free AI tools with official links, categories, and search.',
          canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}/`,
        }
      : null
  );

  const handleOpenDashboard = useCallback(() => {
    if (!isAuthenticated) {
      navigate(`${paths.login()}?redirect=${encodeURIComponent(paths.dashboard())}`);
      return;
    }
    navigate(paths.dashboard());
  }, [isAuthenticated, navigate]);

  const handleOpenToolPage = useCallback(
    (tool: AITool) => {
      navigate(toolPath(tool.id));
    },
    [navigate]
  );

  const handleToolDetailOpen = useCallback((tool: AITool) => {
    setSelectedToolForDetail(tool);
    setIsDetailOpen(true);
  }, []);

  const allToolsForLookup = useMemo(() => {
    const map = new Map<string, AITool>();
    for (const t of ensureArray<AITool>(catalogTools)) map.set(t.id, t);
    return map;
  }, [catalogTools]);

  useEffect(() => {
    if (route.name === 'tool') {
      const match = allToolsForLookup.get(route.slug);
      if (match) {
        setSelectedToolForDetail(match);
        setIsDetailOpen(false);
      }
    }
  }, [route, allToolsForLookup]);

  const handleVote = async (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }
    try {
      setActionError(null);
      const updated = await vote(id);
      if (selectedToolForDetail?.id === id) setSelectedToolForDetail(updated);
      reloadLiked();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Vote failed');
    }
  };

  const handleBookmarkToggle = async (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }
    try {
      setActionError(null);
      await toggleBookmark(id);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Bookmark failed');
    }
  };

  const handleUserSubmission = async (
    newSubmission: Omit<import('./types').ToolSubmission, 'id' | 'status' | 'submittedAt'>
  ): Promise<void> => {
    await submit(newSubmission);
  };

  const handleApproveSubmission = async (id: string) => {
    try {
      setActionError(null);
      const { tool } = await approve(id);
      if (tool) addTool(tool);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Approval failed');
    }
  };

  const handleRejectSubmission = async (id: string) => {
    try {
      setActionError(null);
      await reject(id);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Rejection failed');
    }
  };

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterError(null);
    try {
      await subscribeNewsletter(newsletterEmail.trim());
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    } catch (err) {
      setNewsletterError(err instanceof ApiError ? err.message : 'Subscription failed');
    }
  };

  const toolHandlers = {
    bookmarkedIds,
    onBookmarkToggle: handleBookmarkToggle,
    onVote: handleVote,
    onOpenDetails: handleToolDetailOpen,
    onOpenToolPage: handleOpenToolPage,
  };

  const displayError = actionError || catalogError;
  const showMobileDiscoverTabs =
    !isAuthRoute &&
    ['home', 'trending', 'new', 'popular', 'explore', 'search'].includes(route.name);

  const renderRoute = () => {
    if (isBootLoading && !isAuthRoute) {
      return (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-[70vh] flex flex-col items-center justify-center gap-6 pt-40"
        >
          <div className="relative w-16 h-16 rounded-2xl glass-panel-strong flex items-center justify-center glow-blue">
            <LucideIcon name="Sparkles" className="w-7 h-7 text-sky-500 animate-spin-slow" />
          </div>
          <p className="text-sm text-slate-600 font-medium">Loading directory...</p>
        </motion.div>
      );
    }

    switch (route.name) {
      case 'home':
        return (
          <HomePage
            tools={catalogTools}
            categories={categories}
            loading={catalogLoading}
            error={catalogError}
            {...toolHandlers}
            newsletterEmail={newsletterEmail}
            setNewsletterEmail={setNewsletterEmail}
            newsletterSubscribed={newsletterSubscribed}
            newsletterError={newsletterError}
            onNewsletterSubmit={handleNewsletterSubmit}
          />
        );

      case 'trending':
        return (
          <ToolsListingPage
            mode="trending"
            title="Trending AI Tools"
            subtitle="Ranked by engagement — votes, saves, and momentum"
            badge="Hot now"
            tools={catalogTools}
            categories={categories}
            loading={catalogLoading}
            error={catalogError}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
            onVote={handleVote}
            onOpenDetails={handleToolDetailOpen}
            onOpenToolPage={handleOpenToolPage}
            canonicalPath={paths.trending()}
          />
        );

      case 'new':
        return (
          <ToolsListingPage
            mode="new"
            title="New AI Tools"
            subtitle="Recently added tools in the ZorlAI directory"
            badge="Fresh drops"
            tools={catalogTools}
            categories={categories}
            loading={catalogLoading}
            error={catalogError}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
            onVote={handleVote}
            onOpenDetails={handleToolDetailOpen}
            onOpenToolPage={handleOpenToolPage}
            canonicalPath={paths.newTools()}
          />
        );

      case 'popular':
        return (
          <ToolsListingPage
            mode="popular"
            title="Popular AI Tools"
            subtitle="Most saved and highest-rated by the community"
            badge="Community picks"
            tools={catalogTools}
            categories={categories}
            loading={catalogLoading}
            error={catalogError}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
            onVote={handleVote}
            onOpenDetails={handleToolDetailOpen}
            onOpenToolPage={handleOpenToolPage}
            canonicalPath={paths.popular()}
          />
        );

      case 'explore':
        return (
          <ToolsListingPage
            mode="all"
            title="Explore AI Tools"
            subtitle="Browse the complete curated directory"
            badge="Full catalog"
            tools={catalogTools}
            categories={categories}
            loading={catalogLoading}
            error={catalogError}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
            onVote={handleVote}
            onOpenDetails={handleToolDetailOpen}
            onOpenToolPage={handleOpenToolPage}
            canonicalPath={paths.explore()}
          />
        );

      case 'search':
        return (
          <ToolsListingPage
            mode="search"
            title="Search Results"
            subtitle={route.query ? `Results for “${route.query}”` : 'Enter a search term from the home page'}
            badge="Search"
            searchQuery={route.query}
            tools={catalogTools}
            categories={categories}
            loading={catalogLoading}
            error={catalogError}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
            onVote={handleVote}
            onOpenDetails={handleToolDetailOpen}
            onOpenToolPage={handleOpenToolPage}
            canonicalPath={paths.search(route.query)}
          />
        );

      case 'categories-index':
        return (
          <CategoriesIndexPage
            categories={categories}
            tools={catalogTools}
            loading={catalogLoading || categoriesLoading}
            onNavigate={navigate}
          />
        );

      case 'category':
        return (
          <CategoryPage
            slug={route.slug}
            categories={categories}
            categoriesLoading={categoriesLoading}
            bookmarkedIds={bookmarkedIds}
            onNavigate={navigate}
            onBookmarkToggle={handleBookmarkToggle}
            onVote={handleVote}
            onOpenDetails={handleToolDetailOpen}
          />
        );

      case 'tool':
        return (
          <ToolPage
            slug={route.slug}
            categories={categories}
            catalogTools={catalogTools}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
            onVote={handleVote}
          />
        );

      case 'submit':
        return (
          <PageShell title="Submit a tool" subtitle="Propose an AI tool for the ZorlAI directory">
            <div className="max-w-3xl mx-auto px-4">
              <SubmitForm categories={categories} onSubmit={handleUserSubmission} />
            </div>
          </PageShell>
        );

      case 'blog':
        return (
          <PageShell title="Blog" subtitle="Insights on the AI tools ecosystem">
            <div className="max-w-4xl mx-auto px-4">
              <BlogTab />
            </div>
          </PageShell>
        );

      case 'about':
        return (
          <PageShell title="About ZorlAI" subtitle="The premium directory for discovering AI tools">
            <div className="max-w-4xl mx-auto px-4">
              <AboutContact initialView="about" />
            </div>
          </PageShell>
        );

      case 'contact':
        return (
          <PageShell title="Contact" subtitle="Get in touch with the ZorlAI team">
            <div className="max-w-4xl mx-auto px-4">
              <AboutContact initialView="contact" />
            </div>
          </PageShell>
        );

      case 'saved':
        return (
          <SavedToolsPage
            tools={savedTools}
            categories={categories}
            loading={authLoading}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
            onVote={handleVote}
            onOpenDetails={handleToolDetailOpen}
            onOpenToolPage={handleOpenToolPage}
          />
        );

      case 'profile':
        return <ProfilePage />;

      case 'pricing':
        return <PricingPage />;

      case 'login':
        return <LoginPage />;

      case 'signup':
        return <SignupPage />;

      case 'forgot-password':
        return <ForgotPasswordPage />;

      case 'reset-password':
        return <ResetPasswordPage />;

      case 'dashboard':
        return (
          <DashboardPage
            bookmarks={savedTools}
            likedTools={likedTools}
            submissions={submissions}
            isAdmin={isAdmin}
            onRemoveBookmark={handleBookmarkToggle}
            onApproveSubmission={handleApproveSubmission}
            onRejectSubmission={handleRejectSubmission}
            onSelectTool={(tool) => {
              navigate(toolPath(tool.id));
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-slate-900 flex flex-col relative overflow-x-hidden max-w-[100vw]">
      <AmbientBackground />
      <AuthCallbackHandler />

      <Navbar
        activeTab={navActiveTab}
        onOpenAIScout={() => setIsAIScoutOpen(true)}
        onOpenDashboard={handleOpenDashboard}
        onOpenAuth={() => setIsAuthOpen(true)}
        onNavigate={navigate}
      />

      {showMobileDiscoverTabs && (
        <MobileNavTabs activeTab={navActiveTab} onNavigate={navigate} />
      )}

      <AnimatePresence>
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[56] max-w-md w-[calc(100%-2rem)] px-4 py-3 rounded-2xl glass-panel border-rose-300 text-sm text-rose-700 text-center"
          >
            {authError}
            <button type="button" onClick={clearError} className="ml-2 text-rose-500 underline text-xs">
              dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {displayError && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[55] max-w-md w-full mx-4 px-4 py-3 rounded-2xl glass-panel border-rose-300 text-sm text-rose-700 text-center"
          >
            {displayError}
            <button type="button" onClick={() => setActionError(null)} className="ml-2 text-rose-500 underline text-xs">
              dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className={`flex-1 w-full relative z-10 pb-20 min-w-0 ${showMobileDiscoverTabs ? 'pt-10 sm:pt-12 xl:pt-0' : ''}`}
      >
        <AnimatePresence mode="wait">{renderRoute()}</AnimatePresence>
      </main>

      <footer className="relative z-10 mt-auto border-t border-sky-100 py-8 px-4 sm:px-6 bg-white/40 backdrop-blur-md safe-bottom">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <span>© 2026 ZorlAI · AI tools directory</span>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button type="button" onClick={() => navigate(paths.explore())} className="hover:text-sky-700 transition-colors">
              Explore
            </button>
            <button type="button" onClick={() => navigate(paths.pricing())} className="hover:text-sky-700 transition-colors">
              Pricing
            </button>
            <button type="button" onClick={() => navigate(paths.about())} className="hover:text-sky-700 transition-colors">
              About
            </button>
            <button type="button" onClick={() => navigate(paths.contact())} className="hover:text-sky-700 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </footer>

      <AIScout
        isOpen={isAIScoutOpen}
        onClose={() => setIsAIScoutOpen(false)}
        tools={catalogTools}
        onSelectTool={(id) => {
          const matchingTool = allToolsForLookup.get(id);
          if (matchingTool) handleOpenToolPage(matchingTool);
        }}
      />

      <ToolDetailModal
        tool={selectedToolForDetail}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedToolForDetail(null);
        }}
        isBookmarked={selectedToolForDetail ? isBookmarked(selectedToolForDetail.id) : false}
        onBookmarkToggle={(id, e) => handleBookmarkToggle(id, e)}
        onVote={(id, e) => handleVote(id, e)}
      />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
