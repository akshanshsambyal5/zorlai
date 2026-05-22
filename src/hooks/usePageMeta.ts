import { useEffect } from 'react';

export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta(meta: PageMeta | null) {
  useEffect(() => {
    if (!meta) return;

    document.title = meta.title;
    upsertMeta('description', meta.description);
    upsertMeta('og:title', meta.title, 'property');
    upsertMeta('og:description', meta.description, 'property');
    upsertMeta('twitter:title', meta.title);
    upsertMeta('twitter:description', meta.description);

    if (meta.ogImage) {
      upsertMeta('og:image', meta.ogImage, 'property');
      upsertMeta('twitter:image', meta.ogImage);
    }

    if (meta.canonical) {
      upsertCanonical(meta.canonical);
      upsertMeta('og:url', meta.canonical, 'property');
    }
  }, [meta?.title, meta?.description, meta?.canonical, meta?.ogImage]);
}
