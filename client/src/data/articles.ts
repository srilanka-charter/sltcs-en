// ─── Article Data Types ───────────────────────────────────────────────────────

export type ArticleCategory =
  | "private-driver-guide"
  | "cost-booking-guide"
  | "family-group-travel"
  | "travel-tips-safety";

export interface Article {
  id: string;
  slug: string;
  category: ArticleCategory;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string; // ISO date string
  readingTime: number; // minutes
  tags: string[];
  content: string; // HTML string
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// ─── Category Metadata ────────────────────────────────────────────────────────

export const CATEGORIES: Record<
  ArticleCategory,
  { label: string; slug: string; description: string; path: string }
> = {
  "private-driver-guide": {
    label: "Private Driver Guide",
    slug: "private-driver-guide",
    description:
      "Everything you need to know about hiring a private driver in Sri Lanka — from choosing the right service to understanding what's included in your charter.",
    path: "/information/private-driver-guide",
  },
  "cost-booking-guide": {
    label: "Cost & Booking Guide",
    slug: "cost-booking-guide",
    description:
      "Transparent pricing breakdowns, booking checklists, and cost comparisons to help you plan your Sri Lanka trip with confidence.",
    path: "/information/cost-booking-guide",
  },
  "family-group-travel": {
    label: "Family & Group Travel",
    slug: "family-group-travel",
    description:
      "Practical advice for families, groups, and senior travellers — covering vehicle options, child-friendly itineraries, and comfort on long journeys.",
    path: "/information/family-group-travel",
  },
  "travel-tips-safety": {
    label: "Travel Tips & Safety",
    slug: "travel-tips-safety",
    description:
      "Honest, practical tips on road safety, transport options, and how to travel Sri Lanka with peace of mind.",
    path: "/information/travel-tips-safety",
  },
};

// ─── Article Data ─────────────────────────────────────────────────────────────

export const ARTICLES: Article[] = [
  {
    id: "001",
    slug: "sri-lanka-private-driver-how-to-hire",
    category: "private-driver-guide",
    title: "Sri Lanka Private Driver: How to Hire a Safe, Reliable Driver for Your Trip",
    excerpt:
      "Thinking about hiring a private driver in Sri Lanka? This guide covers everything — from what a private driver service actually includes, to how to verify credentials, compare costs, and book with confidence.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article_private_driver_guide_01-ATu8CSrxTvdzMGn2iuZ68R.webp",
    publishedAt: "2026-06-02",
    readingTime: 9,
    tags: ["Private Driver", "Sri Lanka", "Car Hire", "Travel Planning"],
    seo: {
      metaTitle: "Sri Lanka Private Driver: How to Hire a Safe, Reliable Driver | SLTCS",
      metaDescription:
        "Complete guide to hiring a private driver in Sri Lanka. Learn what's included, how to verify credentials, compare costs, and book a government-certified English-speaking driver for your trip.",
      keywords: [
        "sri lanka private driver",
        "hire driver sri lanka",
        "sri lanka car hire with driver",
        "private driver sri lanka cost",
        "reliable driver sri lanka",
      ],
    },
    content: `
<article class="article-body">

  <p class="article-lead">
    Sri Lanka is one of the most rewarding destinations in Asia — ancient temples, misty tea highlands, leopard-filled national parks, and pristine beaches, all within a single island. But getting between these places is where most travellers hit their first obstacle. Buses are slow and crowded, trains only cover a handful of routes, and self-driving on narrow mountain roads is genuinely challenging. Hiring a private driver is, for most visitors, the single best decision they make before landing.
  </p>

  <p>
    This guide explains exactly what a private driver service in Sri Lanka involves, how to verify that your driver is legitimate, what questions to ask before booking, and how to avoid the common pitfalls that catch first-time visitors off guard.
  </p>

  <h2>What Does "Private Driver" Actually Mean in Sri Lanka?</h2>

  <p>
    The term is used loosely, so it is worth being precise. A <strong>private driver</strong> — sometimes called a chauffeur or charter driver — means one dedicated driver and one vehicle assigned exclusively to your group for the duration of your trip. You are not sharing the vehicle with other passengers. You set the itinerary, the pace, and the stops.
  </p>

  <p>
    This is fundamentally different from a taxi, which operates on a per-trip metered basis, or a group tour, where you follow a fixed schedule with strangers. With a private driver, if you want to spend an extra hour at Sigiriya Rock Fortress or make an unplanned stop at a roadside spice garden, you simply ask.
  </p>

  <h2>What Is Typically Included in the Daily Rate?</h2>

  <p>
    A reputable private driver service in Sri Lanka will include the following in the quoted daily rate:
  </p>

  <ul>
    <li>The driver's fee and working hours (typically 08:00–20:00, with flexibility)</li>
    <li>Fuel costs for the agreed itinerary</li>
    <li>Vehicle maintenance and insurance</li>
    <li>Parking fees at tourist sites</li>
    <li>Highway tolls</li>
  </ul>

  <p>
    Items that are <strong>not</strong> included — and which you should clarify upfront — typically include entrance fees to national parks and heritage sites, the driver's accommodation on multi-day trips (usually a modest guesthouse near yours), and meals for the driver. These are standard practice across the industry and should not come as a surprise if disclosed clearly at booking.
  </p>

  <h2>How to Verify That a Driver Is Legitimate</h2>

  <p>
    Sri Lanka's tourism sector is regulated by the <strong>Sri Lanka Tourism Development Authority (SLTDA)</strong>. Licensed tourist drivers hold a government-issued tourist driver's licence, which is separate from an ordinary driving licence and requires a background check, English proficiency test, and knowledge of tourist destinations.
  </p>

  <figure class="article-figure">
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article_img_driver_license-jnzLcGk4NURinaWPpzL9s3.webp"
      alt="SLTDA-certified Sri Lanka tourist driver showing his government-issued licence to travellers"
      class="article-figure-img"
      loading="lazy"
    />
    <figcaption class="article-figure-caption">
      A government-certified SLTDA tourist driver licence is the key credential to verify before booking your private driver in Sri Lanka.
    </figcaption>
  </figure>

  <p>
    When evaluating a driver or operator, look for the following:
  </p>

  <table class="article-table">
    <thead>
      <tr>
        <th>What to Check</th>
        <th>Why It Matters</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SLTDA tourist driver licence</td>
        <td>Confirms the driver has passed government vetting and is legally permitted to carry tourists</td>
      </tr>
      <tr>
        <td>English communication ability</td>
        <td>Essential for navigating changes, emergencies, and local recommendations</td>
      </tr>
      <tr>
        <td>Vehicle registration and insurance</td>
        <td>Ensures the vehicle is roadworthy and covered for passenger liability</td>
      </tr>
      <tr>
        <td>Verified guest reviews</td>
        <td>Look for reviews that mention specific destinations and driver names, not generic praise</td>
      </tr>
      <tr>
        <td>Clear written quote</td>
        <td>A professional operator will provide a written breakdown of what is and is not included</td>
      </tr>
    </tbody>
  </table>

  <h2>Which Vehicle Type Should You Choose?</h2>

  <p>
    The right vehicle depends on your group size and comfort priorities. The three most common options in Sri Lanka are:
  </p>

  <figure class="article-figure">
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article_img_vehicle_comparison-WsH762YjRq7i9U9Q9L6Cj6.webp"
      alt="Three Sri Lanka tourist vehicles: Toyota Prius, Toyota KDH Hi-Ace van, and Toyota Alphard luxury van"
      class="article-figure-img"
      loading="lazy"
    />
    <figcaption class="article-figure-caption">
      From left: Toyota Prius (solo/couple), Toyota KDH Hi-Ace (groups of 3–8), Toyota Alphard (premium comfort). All vehicles are air-conditioned and insured.
    </figcaption>
  </figure>

  <ul>
    <li>
      <strong>Toyota Prius (sedan)</strong> — Ideal for solo travellers or couples. Fuel-efficient and comfortable for distances up to 200 km per day. Air-conditioned.
    </li>
    <li>
      <strong>Toyota KDH Hi-Ace van</strong> — The standard choice for groups of 3–8 passengers. Spacious luggage area, high seating position for views, and well-suited to mountain roads. Air-conditioned.
    </li>
    <li>
      <strong>Toyota Alphard (luxury van)</strong> — Premium option for those who want captain's seats, extra legroom, and a quieter ride. Suited to families with young children or senior travellers who prioritise comfort.
    </li>
  </ul>

  <p>
    For more details on vehicle options and what each includes, see our <a href="/#vehicles" class="article-internal-link">Vehicles page</a>.
  </p>

  <h2>How to Compare Costs Without Being Misled</h2>

  <p>
    Daily rates for a private driver in Sri Lanka typically range from <strong>USD 60 to USD 120</strong> depending on vehicle type, distance, and season. If you receive a quote significantly below this range, it is worth asking what has been excluded. Common omissions in low quotes include fuel surcharges for long-distance days, driver accommodation on multi-night trips, and highway tolls.
  </p>

  <p>
    The most transparent operators provide a fixed daily rate with a clear written list of inclusions and exclusions. This protects both parties and avoids the uncomfortable conversations that arise when unexpected charges appear at the end of a trip. For a full pricing breakdown, visit our <a href="/#price" class="article-internal-link">Cost &amp; Pricing section</a>.
  </p>

  <h2>Questions to Ask Before You Book</h2>

  <p>
    Before confirming any booking, consider asking the following:
  </p>

  <ol>
    <li>Is the driver SLTDA-licensed?</li>
    <li>Is the vehicle air-conditioned and insured for tourist passengers?</li>
    <li>What is the daily rate, and what does it include?</li>
    <li>Are driver accommodation and meals included or additional?</li>
    <li>What is the cancellation policy?</li>
    <li>Can the itinerary be adjusted after departure?</li>
    <li>Is there a WhatsApp or direct contact number for the driver?</li>
  </ol>

  <p>
    A professional operator will answer all of these without hesitation. Vague or evasive answers to any of these questions are a warning sign.
  </p>

  <h2>Airport Transfers vs Multi-Day Charters</h2>

  <p>
    Private driver services in Sri Lanka are available for both single-day transfers and extended multi-day charters. For airport transfers — for example, from Bandaranaike International Airport (CMB) to Colombo, Negombo, Kandy, or Sigiriya — a private driver provides a fixed-price, stress-free alternative to metered taxis or shared shuttles, particularly for late-night arrivals or families with luggage.
  </p>

  <p>
    For multi-day itineraries, a private driver becomes your guide, navigator, and local contact rolled into one. The driver will typically know which roads to avoid during monsoon season, which viewpoints are worth the detour, and which local restaurants are genuinely good rather than tourist-priced. Browse our <a href="/#courses" class="article-internal-link">model itineraries</a> to see example routes.
  </p>

  <h2>Summary: What Makes a Good Private Driver Service</h2>

  <table class="article-table">
    <thead>
      <tr>
        <th>Characteristic</th>
        <th>What to Look For</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Licensing</td>
        <td>SLTDA government-certified tourist driver licence</td>
      </tr>
      <tr>
        <td>Language</td>
        <td>Fluent English communication</td>
      </tr>
      <tr>
        <td>Transparency</td>
        <td>Written quote with clear inclusions and exclusions</td>
      </tr>
      <tr>
        <td>Flexibility</td>
        <td>Itinerary adjustable during the trip</td>
      </tr>
      <tr>
        <td>Vehicle condition</td>
        <td>Air-conditioned, insured, well-maintained</td>
      </tr>
      <tr>
        <td>Reviews</td>
        <td>Verified guest feedback mentioning specific drivers and destinations</td>
      </tr>
    </tbody>
  </table>

  <p>
    Want to read what past guests say about their experience? Visit our <a href="/voice" class="article-internal-link">Guest Voices page</a> for verified reviews with Driver, Vehicle, and Operator ratings.
  </p>

  <div class="article-cta">
    <p>
      Ready to plan your Sri Lanka trip? Send us your travel dates, group size, and the destinations you want to visit — we will provide a free, no-obligation quote with a suggested itinerary.
    </p>
    <a href="/#contact" class="article-cta-btn">Get a Free Quote</a>
  </div>

</article>
    `,
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticles(): Article[] {
  return ARTICLES;
}
