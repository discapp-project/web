import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { Calendar, Tag } from 'lucide-react';
import { createPageMetadata } from '../../page-metadata';
import { newsletterIndex } from '../../data/newsletters';

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return newsletterIndex.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = newsletterIndex.find((item) => item.slug === slug);
  if (!article) return {};

  return createPageMetadata({
    title: `${article.title} | Discapp News`,
    description: article.summary,
    path: `/news/${article.slug}`,
  });
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = newsletterIndex.find((item) => item.slug === slug);
  if (!article) notFound();

  let content: string;
  try {
    content = await readFile(join(process.cwd(), 'public', 'newsletters', `${article.slug}.md`), 'utf8');
  } catch {
    notFound();
  }

  return (
    <main className="tool-page news-page">
      <Link className="news-back-link" href="/news">Back to news</Link>
      <article className="news-article">
        <header className="news-article-heading">
          <div className="news-card-meta">
            <span><Tag size={13} aria-hidden="true" />{article.category}</span>
            <time dateTime={article.date}><Calendar size={13} aria-hidden="true" />{article.date}</time>
            <span>By {article.author}</span>
          </div>
          <h1>{article.title}</h1>
        </header>
        {article.image && (
          <div className="news-article-image">
            <Image src={article.image} alt="" fill sizes="(max-width: 860px) 100vw, 820px" priority unoptimized />
          </div>
        )}
        <div className="news-article-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}