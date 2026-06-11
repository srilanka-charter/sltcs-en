/**
 * ArticleDetail.tsx
 * Individual article page with SEO meta tags, structured content, and auto-generated Table of Contents
 * Route: /information/:category/:slug
 */

import { useParams, Link } from "wouter";
import { getArticleBySlug, CATEGORIES, getArticlesByCategory, type ArticleCategory } from "@/data/articles";
import { useEffect, useMemo, useState } from "react";
import Article3PriceTable from "@/components/Article3PriceTable";
import Article3PlanCards from "@/components/Article3PlanCards";

// Slug for Article 3 — interactive components are rendered as React components
const ARTICLE3_SLUG = "driver-hire-sri-lanka-costs-safety-checklist";
// Placeholder markers in the article HTML
const PRICE_TABLE_PLACEHOLDER = "<!-- PRICE_TABLE_PLACEHOLDER -->";
const PLAN_CARDS_PLACEHOLDER = "<!-- PLAN_CARDS_PLACEHOLDER -->";
// FAQ placeholder marker for articles using a3-faq class
const FAQ_PLACEHOLDER = "<!-- FAQ_ACCORDION_PLACEHOLDER -->";

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

interface FaqItem {
  q: string;
  a: string;
}

/**
 * Find the start and end index of the outer .a3-faq div using depth counting.
 * Returns [start, end] or null if not found.
 */
function findFaqBlock(html: string): [number, number] | null {
  const startIdx = html.indexOf('<div class="a3-faq">');
  if (startIdx === -1) return null;
  let depth = 0;
  let i = startIdx;
  while (i < html.length) {
    if (html.slice(i, i + 4) === '<div') depth++;
    else if (html.slice(i, i + 6) === '</div>') {
      depth--;
      if (depth === 0) {
        return [startIdx, i + 6];
      }
    }
    i++;
  }
  return null;
}

/**
 * Parse FAQ items from HTML containing .a3-faq structure.
 * Returns array of {q, a} pairs.
 */
function parseFaqItems(html: string): FaqItem[] {
  const items: FaqItem[] = [];
  const range = findFaqBlock(html);
  if (!range) return items;

  const faqBlock = html.slice(range[0], range[1]);
  const itemMatches = Array.from(faqBlock.matchAll(/<div[^>]*class="a3-faq-item"[^>]*>([\s\S]*?)<\/div>\s*(?=\s*<div[^>]*class="a3-faq-item"|\s*<\/div>)/gi));
  for (const m of itemMatches) {
    const itemHtml = m[1];
    const qMatch = itemHtml.match(/<div[^>]*class="a3-faq-q"[^>]*>([\s\S]*?)<\/div>/);
    const aMatch = itemHtml.match(/<div[^>]*class="a3-faq-a"[^>]*>([\s\S]*?)<\/div>/);
    if (qMatch && aMatch) {
      items.push({
        q: qMatch[1].trim(),
        a: aMatch[1].trim(),
      });
    }
  }
  return items;
}

/**
 * Replace .a3-faq block in HTML with a placeholder marker.
 */
function replaceFaqWithPlaceholder(html: string): string {
  const range = findFaqBlock(html);
  if (!range) return html;
  return html.slice(0, range[0]) + FAQ_PLACEHOLDER + html.slice(range[1]);
}

function ArticleFaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className="article-faq-accordion">
      {items.map((item, i) => (
        <div key={i} className="faq-accordion-item">
          <button
            className="faq-accordion-btn"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="faq-q-badge">Q</span>
            <span className="faq-q-text">{item.q}</span>
            <span className={`faq-chevron${openIndex === i ? " open" : ""}`}>›</span>
          </button>
          {openIndex === i && (
            <div className="faq-accordion-body">
              <span className="faq-a-badge">A</span>
              <div
                className="faq-a-content"
                dangerouslySetInnerHTML={{ __html: item.a }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── TOC Utilities ────────────────────────────────────────────────────────────

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Convert a heading text to a URL-safe id slug
 */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Parse H2 and H3 headings from HTML string.
 * Returns array of TocItem and the HTML with id attributes injected.
 * If a heading already has an id attribute, that id is reused (not duplicated).
 */
function extractToc(html: string): { toc: TocItem[]; htmlWithIds: string } {
  const toc: TocItem[] = [];
  const idCount: Record<string, number> = {};

  const htmlWithIds = html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (match, tag, attrs, inner) => {
    const level = parseInt(tag[1], 10) as 2 | 3;
    // Strip any inner HTML tags to get plain text
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) return match;

    // Check if the heading already has an id attribute
    const existingIdMatch = attrs.match(/id="([^"]+)"/);
    if (existingIdMatch) {
      // Reuse the existing id — do not inject a new one
      toc.push({ id: existingIdMatch[1], text, level });
      return match; // Return unchanged
    }

    const baseId = slugifyHeading(text);
    if (!baseId) return match;

    // Deduplicate ids
    const count = idCount[baseId] ?? 0;
    idCount[baseId] = count + 1;
    const id = count === 0 ? baseId : `${baseId}-${count}`;

    toc.push({ id, text, level });

    // Inject id into the heading tag (preserve existing attrs)
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });

  return { toc, htmlWithIds };
}

// ─── TableOfContents Component ────────────────────────────────────────────────

function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (toc.length < 2) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="article-toc" aria-label="Table of Contents">
      <p className="article-toc-title">Table of Contents</p>
      <ol className="article-toc-list">
        {toc.map((item) => (
          <li
            key={item.id}
            style={item.level === 3 ? { paddingLeft: "1.2rem", listStyleType: "none" } : undefined}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
            >
              {item.level === 3 ? "↳ " : ""}{item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Related Article Card (small) ────────────────────────────────────────────

function RelatedCard({
  slug,
  category,
  title,
  coverImage,
  publishedAt,
}: {
  slug: string;
  category: string;
  title: string;
  coverImage: string;
  publishedAt: string;
}) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <Link href={`/information/${category}/${slug}`} className="related-card-link">
      <div className="related-card">
        <div className="related-card-image-wrap">
          <img
            src={coverImage}
            alt={title}
            className="related-card-image"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%231a1a1a'/%3E%3Ctext x='100' y='60' text-anchor='middle' fill='%23c9a84c' font-family='serif' font-size='12'%3ESLTCS%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <div className="related-card-body">
          <p className="related-card-title">{title}</p>
          <span className="related-card-date">{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Article Detail Page ──────────────────────────────────────────────────────

export default function ArticleDetail() {
  const params = useParams<{ category: string; slug: string }>();
  const article = getArticleBySlug(params.slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.slug]);

  // Update document title and meta for SEO (aligned with FR version)
  useEffect(() => {
    if (!article) return;

    const canonicalUrl = `https://en.srilanka-charter.com/information/${article.category}/${article.slug}`;

    // Page title
    document.title = article.seo.metaTitle;

    // Helper: upsert a <meta> tag by selector
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = attr.split("=");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.content = value;
    };

    // Helper: upsert a <link> tag by selector
    const setLink = (selector: string, attrs: Record<string, string>) => {
      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    };

    // Meta description
    setMeta('meta[name="description"]', 'name=description', article.seo.metaDescription);

    // Meta keywords
    setMeta('meta[name="keywords"]', 'name=keywords', article.seo.keywords.join(", "));

    // Canonical
    setLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    // hreflang: en (self)
    setLink('link[hreflang="en"]', { rel: "alternate", hreflang: "en", href: canonicalUrl });

    // hreflang: fr / de / es (cross-links to other language versions if available)
    const hreflangMap = article.hreflang ?? {};
    const langs: Array<"fr" | "de" | "es"> = ["fr", "de", "es"];
    langs.forEach((lang) => {
      const url = hreflangMap[lang];
      if (url) {
        setLink(`link[hreflang="${lang}"]`, { rel: "alternate", hreflang: lang, href: url });
      }
    });

    // Resolve absolute image URL
    const ogImageUrl = article.coverImage
      ? (article.coverImage.startsWith("http")
          ? article.coverImage
          : `https://en.srilanka-charter.com${article.coverImage}`)
      : "https://en.srilanka-charter.com/favicon-192.png";

    // Open Graph tags
    setMeta('meta[property="og:type"]', 'property=og:type', 'article');
    setMeta('meta[property="og:title"]', 'property=og:title', article.seo.metaTitle);
    setMeta('meta[property="og:description"]', 'property=og:description', article.seo.metaDescription);
    setMeta('meta[property="og:url"]', 'property=og:url', canonicalUrl);
    setMeta('meta[property="og:locale"]', 'property=og:locale', 'en_GB');
    setMeta('meta[property="og:site_name"]', 'property=og:site_name', 'SLTCS | Sri Lanka Car Hire with Private Driver');
    setMeta('meta[property="og:image"]', 'property=og:image', ogImageUrl);
    setMeta('meta[property="og:image:width"]', 'property=og:image:width', '1200');
    setMeta('meta[property="og:image:height"]', 'property=og:image:height', '630');

    // Twitter Card tags
    setMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', article.seo.metaTitle);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', article.seo.metaDescription);
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImageUrl);

    // JSON-LD structured data (Article schema)
    const existingJsonLd = document.getElementById('article-json-ld');
    if (existingJsonLd) existingJsonLd.remove();
    const jsonLd = document.createElement('script');
    jsonLd.id = 'article-json-ld';
    jsonLd.type = 'application/ld+json';
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.seo.metaDescription,
      "image": ogImageUrl,
      "datePublished": article.publishedAt,
      "dateModified": article.publishedAt,
      "author": {
        "@type": "Organization",
        "name": "SLTCS — Sri Lanka Car Hire with Private Driver",
        "url": "https://en.srilanka-charter.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SLTCS — Sri Lanka Car Hire with Private Driver",
        "url": "https://en.srilanka-charter.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://en.srilanka-charter.com/favicon-192.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "keywords": article.seo.keywords.join(", "),
      "inLanguage": "en"
    });
    document.head.appendChild(jsonLd);

    return () => {
      document.title = "SLTCS｜Sri Lanka Car Hire with Private Driver";
      // Clean up JSON-LD on unmount
      const ldScript = document.getElementById('article-json-ld');
      if (ldScript) ldScript.remove();
    };
  }, [article]);

  // ── TOC extraction + FAQ rendering (memoised per article) ──────────────────────────────────────────────────────
  const { toc, htmlWithIds, faqItems, hasFaq } = useMemo(() => {
    if (!article) return { toc: [], htmlWithIds: "", faqItems: [], hasFaq: false };
    // Use structured faqItems field if available (preferred approach)
    const hasFaqItems = Array.isArray(article.faqItems) && article.faqItems.length > 0;
    // Replace <!-- FAQ_ACCORDION --> marker with placeholder for split rendering
    const processedContent = hasFaqItems
      ? article.content.replace('<!-- FAQ_ACCORDION -->', FAQ_PLACEHOLDER)
      : article.content;
    const { toc, htmlWithIds } = extractToc(processedContent);
    return { toc, htmlWithIds, faqItems: article.faqItems ?? [], hasFaq: hasFaqItems };
  }, [article]);

  if (!article) {
    return (
      <div className="article-detail-page">
        <div className="article-detail-container">
          <h1>Article not found</h1>
          <Link href="/information/private-driver-guide">Back to Private Driver Guide</Link>
        </div>
      </div>
    );
  }

  const categoryMeta = CATEGORIES[article.category];
  const relatedArticles = getArticlesByCategory(article.category as ArticleCategory).filter(
    (a) => a.slug !== article.slug
  );

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://en.srilanka-charter.com/" },
      { "@type": "ListItem", position: 2, name: "Information", item: `https://en.srilanka-charter.com${categoryMeta.path}` },
      { "@type": "ListItem", position: 3, name: categoryMeta.label, item: `https://en.srilanka-charter.com${categoryMeta.path}` },
      { "@type": "ListItem", position: 4, name: article.title, item: `https://en.srilanka-charter.com/information/${article.category}/${article.slug}` },
    ],
  };

  // For Article 3: apply TOC id injection to each HTML segment
  const getArticle3Parts = () => {
    const priceParts = htmlWithIds.split(PRICE_TABLE_PLACEHOLDER);
    const beforePrice = priceParts[0] ?? "";
    const afterPrice = priceParts[1] ?? "";
    const planParts = afterPrice.split(PLAN_CARDS_PLACEHOLDER);
    const betweenComponents = planParts[0] ?? "";
    const afterPlans = planParts[1] ?? "";
    return { beforePrice, betweenComponents, afterPlans };
  };

  return (
    <div className="article-detail-page">
      {/* ── JSON-LD BreadcrumbList ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero Image ── */}
      <div className="article-detail-hero">
        <img
          src={article.coverImage}
          alt={article.title}
          className="article-detail-hero-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='480' viewBox='0 0 1200 480'%3E%3Crect width='1200' height='480' fill='%230d0d0d'/%3E%3Ctext x='600' y='240' text-anchor='middle' fill='%23c9a84c' font-family='serif' font-size='24'%3ESLTCS%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="article-detail-hero-overlay" />
        <div className="article-detail-hero-content">
          <span className="article-detail-category-badge">{categoryMeta.label}</span>
          <h1 className="article-detail-title">{article.title}</h1>
          <div className="article-detail-meta">
            <span>{formattedDate}</span>
            <span className="article-detail-meta-sep">·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="article-detail-layout">
        {/* Breadcrumb */}
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-sep" aria-hidden="true">›</li>
            <li className="breadcrumb-item">
              <Link href={categoryMeta.path}>Information</Link>
            </li>
            <li className="breadcrumb-sep" aria-hidden="true">›</li>
            <li className="breadcrumb-item">
              <Link href={categoryMeta.path}>{categoryMeta.label}</Link>
            </li>
            <li className="breadcrumb-sep" aria-hidden="true">›</li>
            <li className="breadcrumb-item breadcrumb-current" aria-current="page">
              <span>{article.title}</span>
            </li>
          </ol>
        </nav>

        <div className="article-detail-content-wrap">
          {/* Article Body */}
          <main className="article-detail-main">
            {/* Tags */}
            <div className="article-tags">
              {article.tags.map((tag) => (
                <span key={tag} className="article-tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* ── Table of Contents (auto-generated) ── */}
            <TableOfContents toc={toc} />

            {/* Content */}
            {article.slug === ARTICLE3_SLUG ? (
              // Article 3: split at both placeholders and inject React components
              (() => {
                const { beforePrice, betweenComponents, afterPlans } = getArticle3Parts();
                return (
                  <>
                    <div
                      className="article-detail-body"
                      dangerouslySetInnerHTML={{ __html: beforePrice }}
                    />
                    <Article3PriceTable />
                    {betweenComponents && (
                      <div
                        className="article-detail-body"
                        dangerouslySetInnerHTML={{ __html: betweenComponents }}
                      />
                    )}
                    <Article3PlanCards />
                    {afterPlans && (
                      <div
                        className="article-detail-body"
                        dangerouslySetInnerHTML={{ __html: afterPlans }}
                      />
                    )}
                  </>
                );
              })()
            ) : hasFaq ? (
              // Article with FAQ accordion: split at FAQ placeholder and inject React component
              (() => {
                const parts = htmlWithIds.split(FAQ_PLACEHOLDER);
                const beforeFaq = parts[0] ?? "";
                const afterFaq = parts[1] ?? "";
                return (
                  <>
                    {beforeFaq && (
                      <div
                        className="article-detail-body"
                        dangerouslySetInnerHTML={{ __html: beforeFaq }}
                      />
                    )}
                    <ArticleFaqAccordion items={faqItems} />
                    {afterFaq && (
                      <div
                        className="article-detail-body"
                        dangerouslySetInnerHTML={{ __html: afterFaq }}
                      />
                    )}
                  </>
                );
              })()
            ) : (
              <div
                className="article-detail-body"
                dangerouslySetInnerHTML={{ __html: htmlWithIds }}
              />
            )}
          </main>

          {/* Sidebar */}
          <aside className="article-detail-sidebar">
            {/* Back to category */}
            <div className="sidebar-section">
              <Link href={categoryMeta.path} className="sidebar-back-link">
                ← {categoryMeta.label}
              </Link>
            </div>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div className="sidebar-section">
                <h3 className="sidebar-section-title">Related Articles</h3>
                <div className="related-articles-list">
                  {relatedArticles.slice(0, 4).map((rel) => (
                    <RelatedCard
                      key={rel.id}
                      slug={rel.slug}
                      category={rel.category}
                      title={rel.title}
                      coverImage={rel.coverImage}
                      publishedAt={rel.publishedAt}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="sidebar-cta">
              <p className="sidebar-cta-text">
                Ready to plan your Sri Lanka trip? Get a free, no-obligation quote.
              </p>
              <a href="/#contact" className="sidebar-cta-btn">
                Free Enquiry
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
