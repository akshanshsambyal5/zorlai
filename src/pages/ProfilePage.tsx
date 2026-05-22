import { useAuthContext } from '../context/AuthContext';
import { PageShell } from '../components/layout/PageShell';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { usePageMeta } from '../hooks/usePageMeta';
import { paths, navigate, dashboardPath } from '../lib/router';
import { LucideIcon } from '../components/LucideIcon';

export function ProfilePage() {
  const { profile, user, signOut } = useAuthContext();

  usePageMeta({
    title: 'Profile — ZorlAI',
    description: 'Your ZorlAI account profile.',
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}${paths.profile()}`,
  });

  const displayName =
    profile?.displayName ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Member';

  return (
    <ProtectedRoute>
      <PageShell title="Your profile" subtitle="Manage your ZorlAI account" badge="Account">
        <div className="max-w-lg mx-auto px-4">
          <div className="glass-panel-strong rounded-3xl p-8 text-center">
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt=""
                className="w-20 h-20 rounded-2xl mx-auto mb-4 ring-2 ring-sky-200 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl mx-auto mb-4 bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                {displayName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <h2 className="font-display text-xl font-bold text-slate-900">{displayName}</h2>
            <p className="text-sm text-slate-500 mt-1">{profile?.email || user?.email}</p>
            {profile?.isAdmin && (
              <span className="inline-block mt-3 text-[10px] font-mono uppercase px-2 py-1 rounded-md bg-sky-100 text-sky-700">
                Admin
              </span>
            )}

            <div className="flex flex-col gap-2 mt-8">
              <button
                type="button"
                onClick={() => navigate(dashboardPath())}
                className="w-full btn-primary text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              >
                <LucideIcon name="LayoutDashboard" className="w-4 h-4" />
                Open dashboard
              </button>
              <button
                type="button"
                onClick={() => navigate(paths.saved())}
                className="w-full btn-ghost-glass py-3 rounded-xl text-sm"
              >
                View saved tools
              </button>
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
                className="w-full py-3 rounded-xl text-sm text-rose-600 hover:bg-rose-50 border border-rose-200"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </PageShell>
    </ProtectedRoute>
  );
}
