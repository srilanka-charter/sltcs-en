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

// ─── Category-to-hreflang mapping ────────────────────────────────────────────
const CATEGORY_HREFLANG: Record<string, Record<string, string>> = {
  "private-driver-guide": {
    en: "https://en.srilanka-charter.com/information/private-driver-guide",
    fr: "https://fr.srilanka-charter.com/information/guide-chauffeur-prive",
    de: "https://de.srilanka-charter.com/information/privater-fahrer-ratgeber",
    es: "https://es.srilanka-charter.com/information/guia-conductor-privado",
  },
  "cost-booking-guide": {
    en: "https://en.srilanka-charter.com/information/cost-booking-guide",
    fr: "https://fr.srilanka-charter.com/information/guide-cout-reservation",
    de: "https://de.srilanka-charter.com/information/kosten-buchungsratgeber",
    es: "https://es.srilanka-charter.com/information/guia-costes-reserva",
  },
  "family-group-travel": {
    en: "https://en.srilanka-charter.com/information/family-group-travel",
    fr: "https://fr.srilanka-charter.com/information/voyage-famille-groupe",
    de: "https://de.srilanka-charter.com/information/familien-gruppenreisen",
    es: "https://es.srilanka-charter.com/information/viajes-familia-grupos",
  },
  "travel-tips-safety": {
    en: "https://en.srilanka-charter.com/information/travel-tips-safety",
    fr: "https://fr.srilanka-charter.com/information/conseils-securite",
    de: "https://de.srilanka-charter.com/information/reise-tipps-sicherheit",
  },
  "model-itinerary": {
    en: "https://en.srilanka-charter.com/information/model-itinerary",
    fr: "https://fr.srilanka-charter.com/information/itineraires",
    de: "https://de.srilanka-charter.com/information/beispielreiserouten",
    es: "https://es.srilanka-charter.com/information/itinerarios",
  },
};

export default function ArticleList() {
  const params = useParams<{ category: string }>();
  const categorySlug = params.category as ArticleCategory;
  const categoryMeta = CATEGORIES[categorySlug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categorySlug]);

  // SEO head injection for category listing pages
  useEffect(() => {
    if (!categoryMeta) return;

    const categoryTitles: Record<string, string> = {
      "private-driver-guide": "Sri Lanka Private Driver Guide: Expert Tips & Advice (2026) | SLTCS",
      "cost-booking-guide": "Sri Lanka Driver Hire Costs & Booking Guide (2026) | SLTCS",
      "family-group-travel": "Sri Lanka Family & Group Travel Guide: Private Driver Tips (2026) | SLTCS",
      "travel-tips-safety": "Sri Lanka Travel Tips & Safety Guide for Visitors (2026) | SLTCS",
      "model-itinerary": "Sri Lanka Private Driver Itineraries: 4 Nights to 2 Weeks (2026) | SLTCS",
    };
    const categoryDescriptions: Record<string, string> = {
      "private-driver-guide": "Expert guides to hiring a private driver in Sri Lanka — credentials, costs, chauffeur types, and how to book with confidence. Trusted by UK, Australian & European travellers.",
      "cost-booking-guide": "Transparent pricing breakdowns and booking checklists for private driver hire in Sri Lanka. Bronze from $270, Silver from $310, Gold from $350 per 2 days.",
      "family-group-travel": "Practical advice for families, groups & couples travelling Sri Lanka by private driver. Van hire, child-safe vehicles, honeymoon itineraries & more.",
      "travel-tips-safety": "Honest, practical tips on road safety, transport options, and how to travel Sri Lanka with peace of mind.",
      "model-itinerary": "Day-by-day private driver itineraries for Sri Lanka — from 4-night cultural highlights to 2-week classic tours. Fully private, flexible charters from $270.",
    };

    const title = categoryTitles[categorySlug] || `${categoryMeta.label} | SLTCS`;
    const description = categoryDescriptions[categorySlug] || categoryMeta.description;
    const canonicalUrl = `https://en.srilanka-charter.com${categoryMeta.path}`;

    const prevTitle = document.title;
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
      el.content = content;
    };

    const prevDesc = (document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content || "";
    setMeta("description", description);
    setOg("og:title", title);
    setOg("og:description", description);
    setOg("og:type", "website");
    setOg("og:url", canonicalUrl);
    setOg("og:site_name", "SLTCS | Sri Lanka Car Hire with Private Driver");
    setOg("og:locale", "en_GB");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = canonical?.href || "https://en.srilanka-charter.com/";
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;

    // ─ hreflang ──────────────────────────────────────────────────────────────────
    const hreflangMap = CATEGORY_HREFLANG[categorySlug] || {};
    const hreflangData = Object.entries(hreflangMap).map(([lang, href]) => ({ hreflang: lang, href }));
    if (hreflangData.length > 0) {
      hreflangData.push({ hreflang: "x-default", href: hreflangMap["en"] || canonicalUrl });
    }
    const existingHreflangs = document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach((el) => el.remove());
    const addedHreflangs: HTMLLinkElement[] = [];
    hreflangData.forEach(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.setAttribute("hreflang", hreflang);
      link.href = href;
      document.head.appendChild(link);
      addedHreflangs.push(link);
    });

    // BreadcrumbList JSON-LD
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://en.srilanka-charter.com/" },
        { "@type": "ListItem", position: 2, name: categoryMeta.label, item: canonicalUrl },
      ],
    };
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.id = "category-breadcrumb-jsonld";
    breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.title = prevTitle;
      (document.querySelector('meta[name="description"]') as HTMLMetaElement | null)?.setAttribute("content", prevDesc);
      canonical!.href = prevCanonical;
      document.getElementById("category-breadcrumb-jsonld")?.remove();
      addedHreflangs.forEach((el) => el.remove());
    };
  }, [categorySlug, categoryMeta]);

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
