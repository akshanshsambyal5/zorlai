export type AppRoute =
  | { name: 'home' }
  | { name: 'trending' }
  | { name: 'new' }
  | { name: 'popular' }
  | { name: 'explore' }
  | { name: 'search'; query: string }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'submit' }
  | { name: 'blog' }
  | { name: 'saved' }
  | { name: 'profile' }
  | { name: 'pricing' }
  | { name: 'categories-index' }
  | { name: 'category'; slug: string }
  | { name: 'tool'; slug: string }
  | { name: 'login' }
  | { name: 'signup' }
  | { name: 'forgot-password' }
  | { name: 'reset-password' }
  | { name: 'dashboard' };

export function isValidCategorySlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function isValidToolSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9-]+)*$/.test(slug);
}

export function parseRoute(pathname: string, search = ''): AppRoute {
  const path = pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);

  if (path === '/categories') return { name: 'categories-index' };
  if (path === '/trending') return { name: 'trending' };
  if (path === '/new') return { name: 'new' };
  if (path === '/popular') return { name: 'popular' };
  if (path === '/explore') return { name: 'explore' };
  if (path === '/about') return { name: 'about' };
  if (path === '/contact') return { name: 'contact' };
  if (path === '/submit') return { name: 'submit' };
  if (path === '/blog') return { name: 'blog' };
  if (path === '/saved') return { name: 'saved' };
  if (path === '/profile') return { name: 'profile' };
  if (path === '/pricing') return { name: 'pricing' };
  if (path === '/login') return { name: 'login' };
  if (path === '/signup') return { name: 'signup' };
  if (path === '/forgot-password') return { name: 'forgot-password' };
  if (path === '/reset-password') return { name: 'reset-password' };
  if (path === '/dashboard') return { name: 'dashboard' };

  if (path === '/search') {
    return { name: 'search', query: params.get('q') || '' };
  }

  const categoryMatch = path.match(/^\/categories\/([a-z0-9-]+)$/);
  if (categoryMatch && isValidCategorySlug(categoryMatch[1])) {
    return { name: 'category', slug: categoryMatch[1] };
  }

  const toolMatch = path.match(/^\/tool\/([a-z0-9-]+)$/);
  if (toolMatch && isValidToolSlug(toolMatch[1])) {
    return { name: 'tool', slug: toolMatch[1] };
  }

  if (path === '/') return { name: 'home' };

  return { name: 'home' };
}

export function navTabFromRoute(route: AppRoute): string {
  switch (route.name) {
    case 'categories-index':
    case 'category':
      return 'categories';
    case 'trending':
      return 'trending';
    case 'new':
      return 'new';
    case 'popular':
      return 'popular';
    case 'explore':
    case 'search':
      return 'explore';
    case 'about':
      return 'about';
    case 'contact':
      return 'contact';
    case 'submit':
      return 'submit';
    case 'blog':
      return 'blog';
    case 'saved':
      return 'saved';
    case 'profile':
      return 'profile';
    case 'pricing':
      return 'pricing';
    case 'home':
    default:
      return 'home';
  }
}

export const paths = {
  home: () => '/',
  trending: () => '/trending',
  newTools: () => '/new',
  popular: () => '/popular',
  explore: () => '/explore',
  search: (q: string) => `/search?q=${encodeURIComponent(q)}`,
  about: () => '/about',
  contact: () => '/contact',
  submit: () => '/submit',
  blog: () => '/blog',
  saved: () => '/saved',
  profile: () => '/profile',
  pricing: () => '/pricing',
  categories: () => '/categories',
  category: (slug: string) => `/categories/${slug}`,
  tool: (slug: string) => `/tool/${slug}`,
  login: () => '/login',
  signup: () => '/signup',
  forgotPassword: () => '/forgot-password',
  resetPassword: () => '/reset-password',
  dashboard: () => '/dashboard',
};

export function categoryPath(slug: string): string {
  return paths.category(slug);
}

export function categoriesIndexPath(): string {
  return paths.categories();
}

export function loginPath(): string {
  return paths.login();
}

export function signupPath(): string {
  return paths.signup();
}

export function forgotPasswordPath(): string {
  return paths.forgotPassword();
}

export function resetPasswordPath(): string {
  return paths.resetPassword();
}

export function dashboardPath(): string {
  return paths.dashboard();
}

export function toolPath(slug: string): string {
  return paths.tool(slug);
}

export function navigate(path: string, replace = false): void {
  if (replace) {
    history.replaceState(null, '', path);
  } else {
    history.pushState(null, '', path);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function getToolFromSearch(): string | null {
  return new URLSearchParams(window.location.search).get('tool');
}

export function setToolInSearch(slug: string | null): void {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set('tool', slug);
  else url.searchParams.delete('tool');
  history.replaceState(null, '', url.toString());
}
