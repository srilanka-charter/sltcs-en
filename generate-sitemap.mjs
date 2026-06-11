import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://en.srilanka-charter.com";
const TODAY = "2026-06-11";

// Static routes
const staticRoutes = [
  { path: "/",               changefreq: "weekly",  priority: "1.0", lastmod: TODAY },
  { path: "/plans",          changefreq: "monthly", priority: "0.9", lastmod: TODAY },
  { path: "/price",          changefreq: "monthly", priority: "0.9", lastmod: TODAY },
  { path: "/vehicles",       changefreq: "monthly", priority: "0.8", lastmod: TODAY },
  { path: "/faq",            changefreq: "monthly", priority: "0.8", lastmod: TODAY },
  { path: "/voice",          changefreq: "monthly", priority: "0.7", lastmod: TODAY },
  { path: "/low-price-risk", changefreq: "monthly", priority: "0.7", lastmod: TODAY },
];

// Category list pages
const categoryRoutes = [
  { path: "/information/private-driver-guide",  changefreq: "weekly", priority: "0.8", lastmod: TODAY },
  { path: "/information/cost-booking-guide",    changefreq: "weekly", priority: "0.8", lastmod: TODAY },
  { path: "/information/family-group-travel",   changefreq: "weekly", priority: "0.8", lastmod: TODAY },
  { path: "/information/travel-tips-safety",    changefreq: "weekly", priority: "0.7", lastmod: TODAY },
  { path: "/information/model-itinerary",       changefreq: "weekly", priority: "0.8", lastmod: TODAY },
];

// Article detail pages
const articleRoutes = [
  // private-driver-guide
  { path: "/information/private-driver-guide/sri-lanka-private-driver-how-to-hire",              lastmod: "2026-06-02", priority: "0.8" },
  { path: "/information/private-driver-guide/sri-lanka-car-hire-with-driver-complete-guide",     lastmod: "2026-06-04", priority: "0.8" },
  { path: "/information/private-driver-guide/chauffeur-guide-sri-lanka-driver-vs-tourist-guide", lastmod: "2026-06-03", priority: "0.8" },
  { path: "/information/private-driver-guide/sri-lanka-private-driver-vs-package-tour",          lastmod: "2026-06-06", priority: "0.8" },
  // cost-booking-guide
  { path: "/information/cost-booking-guide/driver-hire-sri-lanka-costs-safety-checklist",        lastmod: "2026-06-02", priority: "0.8" },
  { path: "/information/cost-booking-guide/sri-lanka-private-driver-cost-breakdown",             lastmod: "2026-06-04", priority: "0.8" },
  // family-group-travel
  { path: "/information/family-group-travel/van-hire-driver-sri-lanka-families-small-groups",    lastmod: "2026-06-03", priority: "0.7" },
  { path: "/information/family-group-travel/sri-lanka-honeymoon-private-driver",                 lastmod: "2026-06-06", priority: "0.7" },
  // model-itinerary
  { path: "/information/model-itinerary/sri-lanka-4-nights-5-days-itinerary",                   lastmod: "2026-06-02", priority: "0.8" },
  { path: "/information/model-itinerary/sri-lanka-5-nights-6-days-itinerary",                   lastmod: "2026-06-04", priority: "0.8" },
  { path: "/information/model-itinerary/sri-lanka-6-nights-7-days-itinerary",                   lastmod: "2026-06-02", priority: "0.8" },
  { path: "/information/model-itinerary/sri-lanka-5-7-days-cultural-triangle-itinerary",        lastmod: "2026-06-04", priority: "0.8" },
  { path: "/information/model-itinerary/sri-lanka-10-days-2-weeks-itinerary",                   lastmod: "2026-06-03", priority: "0.8" },
].map(r => ({ ...r, changefreq: "monthly" }));

const allRoutes = [...staticRoutes, ...categoryRoutes, ...articleRoutes];

const urls = allRoutes.map(r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = resolve(__dirname, "client/public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`sitemap.xml generated at ${outPath}`);
console.log(`Total URLs: ${allRoutes.length}`);
