'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { ArrowUpRight, Webhook, Library, BadgePlus, UserSearch, Link2, Newspaper, Search, Package, Snowflake, Palette, PencilLine, ArrowDownWideNarrow, FileMusic, Scaling, Calculator, CalendarDays, TypeOutline, Space, KeyRound, BrickWallShield, Regex, Puzzle, Braces, Baseline, BookText } from 'lucide-react';
import { ServerSearch } from './components/icons/ServerSearch';

const officialPages = [
  {
    title: 'Discapp News',
    description: 'Latest updates, feature releases, and announcements.',
    href: '/news',
    icon: Newspaper,
    iconClass: 'news-icon'
  },
  {
    title: 'Discapp Docs',
    description: 'Documentation for Discapp tools and features.',
    href: 'https://docs.discapp.org',
    icon: BookText,
    iconClass: 'docs-icon'
  }
];

const tools = [
  {
    title: 'Webhook Builder',
    description: 'Create Discord messages with embeds, delivery options, and live preview.',
    category: 'Webhooks & Integrations',
    href: '/webhook-builder',
    icon: Webhook,
    iconClass: 'webhook-icon'
  },
  {
    title: 'Automod Library',
    description: 'View and copy automod rules and regexes.',
    category: 'Moderation & Permissions',
    href: '/automod-library',
    icon: Library,
    iconClass: 'library-icon'
  },
  {
    title: 'Role Icon Maker',
    description: 'Create custom role icons for your Discord server.',
    category: 'Assets & Media',
    href: '/role-icon-maker',
    icon: BadgePlus,
    iconClass: 'badge-plus'
  },
  {
    title: 'User Lookup',
    description: 'Get information about a discord user by ID.',
    category: 'Lookups & Utilities',
    href: '/user-lookup',
    icon: UserSearch,
    iconClass: 'user-search'
  },
  {
    title: 'Server Lookup',
    description: 'Get information about a discord server by invite.',
    category: 'Lookups & Utilities',
    href: '/server-lookup',
    icon: ServerSearch,
    iconClass: 'server-search'
  },
  {
    title: 'Vanity URL Checker',
    description: 'Check if a custom invite code or vanity URL is currently available.',
    category: 'Lookups & Utilities',
    href: '/vanity-checker',
    icon: Link2,
    iconClass: 'vanity-icon'
  },
  {
    title: 'Asset stealer',
    description: 'Steal assets from a Discord server.',
    category: 'Assets & Media',
    href: '/asset-stealer',
    icon: Package,
    iconClass: 'package'
  },
  {
    title: 'Snowflake Decoder',
    description: 'Decode a Discord snowflake to get the internal information.',
    category: 'Lookups & Utilities',
    href: '/snowflake-decoder',
    icon: Snowflake,
    iconClass: 'snowflake'
  },
  {
    title: 'Gradient Finder',
    description: 'Find and customize beautiful color gradients for your roles.',
    category: 'Assets & Media',
    href: '/gradient-finder',
    icon: Palette,
    iconClass: 'palette'
  },
  {
    title: 'Markdown Cheatsheet',
    description: 'Quick reference for Discord markdown formatting.',
    category: 'Text & Formatting',
    href: '/markdown-cheatsheet',
    icon: PencilLine,
    iconClass: 'pencil-line'
  },
  {
    title: 'Asset Compressor',
    description: 'Compress stickers and emojis.',
    category: 'Assets & Media',
    href: '/asset-compressor',
    icon: ArrowDownWideNarrow,
    iconClass: 'arrow-down-wide-narrow'
  },
  {
    title: 'Soundboard Studio',
    description: 'Create and edit soundboard clips for your server.',
    category: 'Assets & Media',
    href: '/soundboard-studio',
    icon: FileMusic,
    iconClass: 'file-music'
  },
  {
    title: 'Asset Resizer',
    description: 'Resize assets for a server or profile.',
    category: 'Assets & Media',
    href: '/asset-resizer',
    icon: Scaling,
    iconClass: 'scaling'
  },
  {
    title: 'Permission Calculator',
    description: 'Easily setup permissions for your applications.',
    category: 'Moderation & Permissions',
    href: '/permission-calculator',
    icon: Calculator,
    iconClass: 'calculator'
  },
  {
    title: 'Timestamp Generator',
    description: 'Generate Discord-compatible timestamps for messages and events.',
    category: 'Lookups & Utilities',
    href: '/timestamp-generator',
    icon: CalendarDays,
    iconClass: 'CalendarDays'
  },
  {
    title: 'Font Generator',
    description: 'Get custom fonts for your Discord display names.',
    category: 'Text & Formatting',
    href: '/font-generator',
    icon: TypeOutline,
    iconClass: 'type-outline'
  },
  {
    title: 'Space Generator',
    description: 'Inject zero-width spaces into your text for Discord.',
    category: 'Text & Formatting',
    href: '/space-generator',
    icon: Space,
    iconClass: 'space'
  },
  {
    title: 'Automod Permission Decoder',
    description: 'Decode and understand automod permissions for your server.',
    category: 'Moderation & Permissions',
    href: '/automod-permission-decoder',
    icon: KeyRound,
    iconClass: 'key-round'
  },
  {
    title: 'Automod Tester',
    description: 'Test automod regexes and keywords before implementation.',
    category: 'Moderation & Permissions',
    href: '/automod-tester',
    icon: BrickWallShield,
    iconClass: 'brick-wall-shield'
  },
  {
    title: 'Regex Creator',
    description: 'Create regexes for your Discord automod.',
    category: 'Moderation & Permissions',
    href: '/regex-creator',
    icon: Regex,
    iconClass: 'regex'
  },
  {
    title: 'RPC Builder',
    description: 'Build custom rich presence states for your Discord account.',
    category: 'Webhooks & Integrations',
    href: '/rpc-builder',
    icon: Puzzle,
    iconClass: 'puzzle'
  },
  {
    title: 'JSON Formatter',
    description: 'Fix and format webhook JSON payloads.',
    category: 'Text & Formatting',
    href: '/webhook-json-formatter',
    icon: Braces,
    iconClass: 'braces'
  },
  {
    title: 'ANSI Builder',
    description: 'Design custom Discord ANSI-colored code blocks for Discord.',
    category: 'Text & Formatting',
    href: '/ansi-builder',
    icon: Baseline,
    iconClass: 'baseline'
  }
];

const categories = [...new Set(tools.map((tool) => tool.category))].sort((a, b) =>
  a.localeCompare(b)
);

function subscribeToLocation(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

function getLocationSearch() {
  return window.location.search;
}

function getServerLocationSearch() {
  return '';
}

export default function Home() {
  const search = useSyncExternalStore(subscribeToLocation, getLocationSearch, getServerLocationSearch);
  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get('q') ?? '';
  const selectedCategory = searchParams.get('category') ?? '';
  const query = searchQuery.trim().toLowerCase();
  const activeCategory = categories.includes(selectedCategory) ? selectedCategory : '';

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      !query ||
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query);
    const matchesCategory = !activeCategory || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <main className="page-wrap directory-page">
      <header className="directory-header">
        <p className="page-kicker">Discapp Toolkit</p>
        <h1>Find easy to use tools for your Discord server!</h1>
        
        <form className="directory-filters" action="/" method="get" role="search">
          <label className="directory-search">
            <Search className="directory-search-icon" size={16} aria-hidden="true" />
            <span className="sr-only">Search tools by name, description, or category</span>
            <input
              type="search"
              name="q"
              key={search}
              defaultValue={searchQuery}
              placeholder="Search tools by name or description..."
            />
          </label>
          <label className="directory-category-control">
            <span className="sr-only">Filter by category</span>
            <select name="category" key={search} defaultValue={activeCategory}>
              <option value="">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <button className="directory-submit" type="submit">Filter</button>
        </form>
      </header>

      {!query && (
        <section style={{ marginBottom: '32px' }}>
          <p className="page-kicker" style={{ marginBottom: '12px', fontSize: '11px', fontWeight: '700', color: '#80848e' }}>Official Pages</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {officialPages.map((page) => {
              const IconComponent = page.icon;
              return (
                <Link key={page.href} className="tool-link" href={page.href}>
                  <span className={`tool-icon ${page.iconClass}`} aria-hidden="true">
                    <IconComponent size={24} />
                  </span>
                  <span className="tool-copy">
                    <span className="tool-title">{page.title}</span>
                    <span className="tool-description">{page.description}</span>
                  </span>
                  <ArrowUpRight className="tool-arrow" size={16} aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <p className="page-kicker directory-results-count" aria-live="polite">
          {query || activeCategory ? `${filteredTools.length} matching tools` : 'Active Tools'}
        </p>
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link key={tool.href} className="tool-link" href={tool.href}>
                <span className={`tool-icon ${tool.iconClass}`} aria-hidden="true">
                  <IconComponent size={24} />
                </span>
                <span className="tool-copy">
                  <span className="tool-title">{tool.title}</span>
                  <span className="tool-description">{tool.description}</span>
                </span>
                <ArrowUpRight className="tool-arrow" size={16} aria-hidden="true" />
              </Link>
            );
          })
        ) : (
          <div className="empty-state" role="status">
            No tools found matching &quot;{searchQuery}&quot;.
          </div>
        )}
      </section>

    </main>
  );
}