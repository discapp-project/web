import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronRight, Newspaper, Tag } from 'lucide-react';
import { newsletterIndex } from '../data/newsletters';

export default function DiscappNews() {
  return (
    <main className="tool-page news-page">
      <header className="tool-page-heading">
        <p className="page-kicker">Discapp News</p>
        <h1>News and updates</h1>
        <p>Latest announcements from the Discapp team.</p>
      </header>

      <section className="news-list" aria-label="News articles">
        {newsletterIndex.map((article) => (
          <Link className="news-card" href={`/news/${article.slug}`} key={article.slug}>
            <div className="news-card-meta">
              <span><Tag size={13} aria-hidden="true" />{article.category}</span>
              <span><Calendar size={13} aria-hidden="true" />{article.date}</span>
            </div>
            <h2>{article.title}<ChevronRight size={18} aria-hidden="true" /></h2>
            <p>{article.summary}</p>
            {article.image && (
              <div className="news-card-image">
                <Image src={article.image} alt="" fill sizes="(max-width: 860px) 100vw, 820px" unoptimized />
              </div>
            )}
          </Link>
        ))}
        {newsletterIndex.length === 0 && (
          <p className="empty-state" role="status">No news articles are available.</p>
        )}
      </section>
      <p className="news-mark"><Newspaper size={15} aria-hidden="true" /> Discapp announcements</p>
    </main>
  );
}