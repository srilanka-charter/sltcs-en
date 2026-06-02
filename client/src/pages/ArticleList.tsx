/**
 * ArticleList.tsx
 * Category article listing page — matches the grid layout in the reference screenshot
 * Route: /information/:category
 */

import { useParams, Link } from "wouter";
import { CATEGORIES, getArticlesByCategory, type ArticleCategory } from "@/data/articles";
import { useEffect } from "react";

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({ categoryLabel }: { categoryLabel: string }) {
  return (
    <nav className="article-breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span className="breadcrumb-sep">›</span>
      <Link href="/">Information</Link>
      <span className="breadcrumb-sep">›</span>
      <span className="breadcrumb-current">{categoryLabel}</span>
    </nav>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({
  slug,
  category,
  title,
  excerpt,
  coverImage,
  publishedAt,
  readingTime,
  categoryLabel,
}: {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  categoryLabel: string;
}) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/information/${category}/${slug}`} className="article-card-link">
      <article className="article-card">
        <div className="article-card-image-wrap">
          <img
            src={coverImage}
            alt={title}
            className="article-card-image"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%231a1a1a'/%3E%3Ctext x='200' y='120' text-anchor='middle' fill='%23c9a84c' font-family='serif' font-size='14'%3ESLTCS%3C/text%3E%3C/svg%3E";
            }}
          />
          <span className="article-card-category-badge">{categoryLabel}</span>
        </div>
        <div className="article-card-body">
          <h2 className="article-card-title">{title}</h2>
          <p className="article-card-excerpt">{excerpt}</p>
          <div className="article-card-meta">
            <span className="article-card-date">{formattedDate}</span>
            <span className="article-card-reading-time">{readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Article List Page ────────────────────────────────────────────────────────

export default function ArticleList() {
  const params = useParams<{ category: string }>();
  const categorySlug = params.category as ArticleCategory;
  const categoryMeta = CATEGORIES[categorySlug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categorySlug]);

  if (!categoryMeta) {
    return (
      <div className="article-list-page">
        <div className="article-list-container">
          <h1>Category not found</h1>
          <Link href="/">Return to Home</Link>
        </div>
      </div>
    );
  }

  const articles = getArticlesByCategory(categorySlug);

  return (
    <div className="article-list-page">
      {/* ── Page Header ── */}
      <header className="article-list-header">
        <div className="article-list-header-inner">
          <div className="article-list-header-text">
            <h1 className="article-list-title">
              {categoryMeta.label}
              <span className="article-list-title-sub"> — category —</span>
            </h1>
            <div className="article-list-title-bar" />
          </div>
          <Breadcrumb categoryLabel={categoryMeta.label} />
          <p className="article-list-description">{categoryMeta.description}</p>
        </div>
      </header>

      {/* ── Article Grid ── */}
      <main className="article-list-container">
        {articles.length === 0 ? (
          <div className="article-list-empty">
            <p>No articles in this category yet. Check back soon.</p>
            <Link href="/" className="article-back-link">
              Return to Home
            </Link>
          </div>
        ) : (
          <div className="article-grid">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                slug={article.slug}
                category={article.category}
                title={article.title}
                excerpt={article.excerpt}
                coverImage={article.coverImage}
                publishedAt={article.publishedAt}
                readingTime={article.readingTime}
                categoryLabel={categoryMeta.label}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Back to Home ── */}
      <div className="article-list-footer">
        <Link href="/" className="article-back-home">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
