import { PageShell } from '../components/layout/PageShell';
import { usePageMeta } from '../hooks/usePageMeta';
import { paths } from '../lib/router';
import { MagneticButton } from '../components/ui/MagneticButton';
import { navigate } from '../lib/router';

const tiers = [
  {
    name: 'Explorer',
    price: 'Free',
    desc: 'Browse the full directory, search tools, and visit official links.',
    features: ['Full tool catalog', 'Category browsing', 'AI Scout suggestions'],
  },
  {
    name: 'Member',
    price: 'Free',
    desc: 'Sign in to unlock bookmarks, votes, and your personal dashboard.',
    features: ['Save & bookmark tools', 'Upvote favorites', 'Submit new tools', 'Profile & dashboard'],
    highlight: true,
  },
  {
    name: 'Teams',
    price: 'Soon',
    desc: 'Collaborative workspaces for agencies and startups (coming soon).',
    features: ['Shared collections', 'Team submissions', 'Priority support'],
  },
];

export function PricingPage() {
  usePageMeta({
    title: 'Pricing — ZorlAI',
    description: 'ZorlAI is free for explorers. Member features included at no cost.',
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}${paths.pricing()}`,
  });

  return (
    <PageShell title="Pricing" subtitle="ZorlAI is built for builders — core features are free" badge="Plans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl p-6 flex flex-col ${
              tier.highlight ? 'glass-panel-strong ring-2 ring-sky-300/50' : 'glass-panel'
            }`}
          >
            <h3 className="font-display font-bold text-lg text-slate-900">{tier.name}</h3>
            <p className="text-3xl font-bold text-sky-600 my-2">{tier.price}</p>
            <p className="text-sm text-slate-600 mb-4 flex-1">{tier.desc}</p>
            <ul className="space-y-2 mb-6">
              {tier.features.map((f) => (
                <li key={f} className="text-xs text-slate-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  {f}
                </li>
              ))}
            </ul>
            {tier.highlight && (
              <MagneticButton variant="primary" onClick={() => navigate(paths.signup())} className="w-full">
                Create free account
              </MagneticButton>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
