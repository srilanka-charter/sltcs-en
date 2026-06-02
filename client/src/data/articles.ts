// ─── Article Data Types ───────────────────────────────────────────────────────

export type ArticleCategory =
  | "private-driver-guide"
  | "cost-booking-guide"
  | "family-group-travel"
  | "travel-tips-safety"
  | "model-itinerary";

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
  "model-itinerary": {
    label: "Model Itinerary",
    slug: "model-itinerary",
    description:
      "Carefully crafted sample itineraries for Sri Lanka private driver tours — from 4-night highlights to 2-week classic plans.",
    path: "/information/model-itinerary",
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

  <div class="article-table-wrap">
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
  </div>

  <h2>Which Vehicle Type Should You Choose?</h2>

  <p>
    The right vehicle depends on your group size and comfort priorities. The three most common options in Sri Lanka are:
  </p>

  <figure class="article-figure">
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article_img_vehicle_comparison_v2-DUm9xxArsoh98aMKpukKti.webp"
      alt="Three Japanese vehicles commonly used in Sri Lanka: a compact sedan, a KDH Hi-Ace van, and a luxury MPV"
      class="article-figure-img"
      loading="lazy"
    />
    <figcaption class="article-figure-caption">
      From left: Japanese compact sedan (solo/couple), KDH Hi-Ace van (groups of 3–8), luxury MPV (premium comfort). All vehicles are air-conditioned and insured.
    </figcaption>
  </figure>

  <ul>
    <li>
      <strong>Japanese compact sedan</strong> — Ideal for solo travellers or couples. Fuel-efficient and comfortable for distances up to 200 km per day. Air-conditioned.
    </li>
    <li>
      <strong>KDH Hi-Ace van</strong> — The standard choice for groups of 3–8 passengers. Spacious luggage area, high seating position for views, and well-suited to mountain roads. Air-conditioned.
    </li>
    <li>
      <strong>Luxury Japanese MPV</strong> — Premium option for those who want captain's seats, extra legroom, and a quieter ride. Suited to families with young children or senior travellers who prioritise comfort.
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

  <div class="article-table-wrap">
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
  </div>

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
  {
    id: "002",
    slug: "sri-lanka-car-hire-with-driver-complete-guide",
    category: "private-driver-guide",
    title: "Sri Lanka Car Hire with Driver: Complete Guide for First-Time Visitors",
    excerpt:
      "Renting a car alone, taking a taxi, or hiring a private driver — which is right for you? This complete guide compares every transport option in Sri Lanka and explains why a dedicated driver-charter is the preferred choice for UK, Australian, and US travellers.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article_car_hire_guide_cover-hUrEcJK8QyU2wtNBRXKH2t.webp",
    publishedAt: "2026-06-02",
    readingTime: 10,
    tags: ["Car Hire", "Private Driver", "Sri Lanka", "First-Time Visitors", "Travel Planning"],
    seo: {
      metaTitle: "Sri Lanka Car Hire with Driver: Complete Guide for First-Time Visitors | SLTCS",
      metaDescription:
        "Compare self-drive car rental, taxis, and private driver charters in Sri Lanka. Discover why car hire with a dedicated driver is the safest, most flexible option for first-time visitors from the UK, Australia, and USA.",
      keywords: [
        "sri lanka car hire with driver",
        "sri lanka car hire",
        "sri lanka private driver",
        "sri lanka self drive",
        "sri lanka transport options",
      ],
    },
    content: `
<article class="article-body">

  <p class="article-lead">
    For first-time visitors to Sri Lanka, one question comes up early in the planning process: how do I actually get around? The island is compact on a map but surprisingly spread out in practice — Colombo to Kandy takes roughly three hours, Kandy to Sigiriya another two, and Ella to Yala National Park a further two and a half. Understanding your transport options before you arrive will save you both money and frustration.
  </p>

  <p>
    This guide compares every realistic transport option for independent travellers — self-drive car rental, taxis, trains, buses, and private driver charters — and explains which situations each is suited to.
  </p>

  <h2>Option 1: Self-Drive Car Rental in Sri Lanka</h2>

  <p>
    Self-drive car rental is available in Sri Lanka, but it comes with significant caveats that most first-time visitors underestimate. Sri Lanka drives on the left, but road markings, signage, and lane discipline vary considerably outside Colombo. Mountain roads in the hill country are narrow, winding, and often shared with tuk-tuks, buses, and pedestrians. Night driving is particularly challenging due to unlit roads and animals crossing.
  </p>

  <p>
    Additionally, foreign driving licences must be endorsed by the Automobile Association of Ceylon before they are valid for driving in Sri Lanka — a process that requires a visit to their Colombo office and a fee. International Driving Permits are not sufficient on their own.
  </p>

  <p>
    For travellers who are experienced with left-hand traffic and plan to stay primarily in flat, urban areas, self-drive is feasible. For most first-time visitors covering multiple regions, it adds stress rather than freedom.
  </p>

  <h2>Option 2: Taxis and Ride-Hailing Apps</h2>

  <p>
    PickMe and Uber operate in Colombo and a handful of larger cities. For short urban trips, they are convenient and fairly priced. However, they are not designed for multi-day itineraries or inter-city travel, and availability outside Colombo, Kandy, and Galle is unreliable. Negotiating a metered taxi for a full-day excursion is possible but requires local knowledge of fair rates and can lead to disagreements at the end of the journey.
  </p>

  <h2>Option 3: Trains and Buses</h2>

  <p>
    Sri Lanka's train network is scenic and inexpensive, and the Kandy–Ella route in particular is widely regarded as one of the most beautiful train journeys in Asia. However, the network is limited: it does not connect Sigiriya, Yala, Mirissa, or Trincomalee directly. Buses cover more ground but are slow, crowded, and not air-conditioned on most routes. For travellers with luggage, young children, or tight schedules, public transport is rarely the most practical primary option.
  </p>

  <figure class="article-figure">
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article_car_hire_guide_cover-hUrEcJK8QyU2wtNBRXKH2t.webp"
      alt="Western tourists in the back seat of a Japanese van with a Sri Lankan private driver, driving through tropical scenery"
      class="article-figure-img"
      loading="lazy"
    />
    <figcaption class="article-figure-caption">
      A private driver charter means one vehicle, one driver, and a fully flexible itinerary — exclusively for your group.
    </figcaption>
  </figure>

  <h2>Option 4: Car Hire with a Private Driver (Charter)</h2>

  <p>
    Hiring a car with a dedicated private driver — often called a charter or chauffeur service — is the option that most experienced Sri Lanka travellers recommend to first-timers. You get the flexibility of a private vehicle without the stress of driving yourself, and you gain a local guide who can navigate, recommend, and adapt to your preferences in real time.
  </p>

  <p>
    A typical private driver charter in Sri Lanka includes:
  </p>

  <ul>
    <li>One dedicated driver for the full duration of your booking</li>
    <li>An air-conditioned, insured vehicle suited to your group size</li>
    <li>Fuel, parking, and highway tolls</li>
    <li>Flexibility to adjust your itinerary each day</li>
    <li>English-speaking communication throughout</li>
  </ul>

  <h2>Comparing Your Options: A Quick Reference</h2>

  <div class="article-table-wrap">
  <table class="article-table">
    <thead>
      <tr>
        <th>Transport Option</th>
        <th>Best For</th>
        <th>Limitations</th>
        <th>Typical Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Self-drive rental</td>
        <td>Experienced left-hand drivers, urban areas</td>
        <td>Licence endorsement required, challenging mountain roads</td>
        <td>USD 30–60/day (car only)</td>
      </tr>
      <tr>
        <td>Taxi / ride-hailing</td>
        <td>Short urban trips in Colombo</td>
        <td>Limited outside cities, not suited to multi-day use</td>
        <td>Metered / negotiated</td>
      </tr>
      <tr>
        <td>Train</td>
        <td>Scenic routes (Kandy–Ella)</td>
        <td>Limited network, no luggage comfort, fixed schedule</td>
        <td>USD 2–10/trip</td>
      </tr>
      <tr>
        <td>Bus</td>
        <td>Budget travellers, short hops</td>
        <td>Slow, crowded, no air-conditioning on most routes</td>
        <td>USD 1–5/trip</td>
      </tr>
      <tr>
        <td><strong>Private driver charter</strong></td>
        <td><strong>Most first-time visitors, families, groups</strong></td>
        <td><strong>Higher daily cost than public transport</strong></td>
        <td><strong>USD 60–120/day all-in</strong></td>
      </tr>
    </tbody>
  </table>
  </div>

  <h2>Which Vehicle Should You Choose?</h2>

  <figure class="article-figure">
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article_car_hire_comparison_v2-FtUE4sb4cNLh7TUfJsaYTz.webp"
      alt="Three Japanese vehicles side by side in Sri Lanka: compact sedan, KDH Hi-Ace van, and luxury MPV"
      class="article-figure-img"
      loading="lazy"
    />
    <figcaption class="article-figure-caption">
      Japanese compact sedan (couples), KDH Hi-Ace van (groups of 3–8), and luxury MPV (premium comfort). All vehicles are air-conditioned and fully insured.
    </figcaption>
  </figure>

  <p>
    The right vehicle depends on your group size and comfort requirements. The three most common options are:
  </p>

  <ul>
    <li><strong>Japanese compact sedan</strong> — Suited to solo travellers or couples. Fuel-efficient and comfortable for daily distances up to 200 km.</li>
    <li><strong>KDH Hi-Ace van</strong> — The standard choice for groups of 3–8. High seating position, generous luggage space, and well-suited to all road types.</li>
    <li><strong>Luxury Japanese MPV</strong> — Premium option with captain's seats and extra legroom. Ideal for families with young children or senior travellers.</li>
  </ul>

  <p>
    For a full breakdown of vehicle options, visit our <a href="/#vehicles" class="article-internal-link">Vehicles page</a>.
  </p>

  <h2>Planning a Multi-Day Itinerary with a Private Driver</h2>

  <p>
    One of the greatest advantages of a private driver charter is the ability to design your own route. Sri Lanka's most popular destinations — Sigiriya, Kandy, Ella, Yala, Galle, and Mirissa — are spread across the island, and the most efficient way to cover them is by road with a dedicated vehicle.
  </p>

  <figure class="article-figure">
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article_car_hire_route_map-PF8ZGwKegr8BKWpqVDkhZb.webp"
      alt="Tourist holding a Sri Lanka route map showing Colombo, Kandy, Sigiriya, Ella and Galle, standing next to a white van"
      class="article-figure-img"
      loading="lazy"
    />
    <figcaption class="article-figure-caption">
      A private driver lets you connect Colombo, Kandy, Sigiriya, Ella, and Galle at your own pace — no fixed departure times, no shared coaches.
    </figcaption>
  </figure>

  <p>
    A typical 7-day itinerary with a private driver might look like this:
  </p>

  <ul>
    <li><strong>Day 1:</strong> Airport arrival → Negombo or Colombo (airport transfer)</li>
    <li><strong>Day 2:</strong> Colombo → Sigiriya (via Dambulla Cave Temple)</li>
    <li><strong>Day 3:</strong> Sigiriya Rock Fortress → Polonnaruwa ancient city</li>
    <li><strong>Day 4:</strong> Sigiriya → Kandy (Temple of the Tooth, Peradeniya Botanical Garden)</li>
    <li><strong>Day 5:</strong> Kandy → Ella (via Nuwara Eliya tea country)</li>
    <li><strong>Day 6:</strong> Ella → Yala National Park (morning safari)</li>
    <li><strong>Day 7:</strong> Yala → Galle Fort → Colombo or airport</li>
  </ul>

  <p>
    Browse our <a href="/#courses" class="article-internal-link">Model Itineraries</a> for more suggested routes, including 5-day, 10-day, and Cultural Triangle options.
  </p>

  <h2>What to Look for When Booking a Car Hire with Driver</h2>

  <p>
    Not all private driver services are equal. When comparing operators, prioritise the following:
  </p>

  <ul>
    <li><strong>SLTDA-certified driver</strong> — The Sri Lanka Tourism Development Authority issues tourist driver licences to drivers who have passed background checks and English proficiency tests. Always confirm this credential.</li>
    <li><strong>Written quote with inclusions listed</strong> — A professional operator will provide a clear breakdown of what the daily rate covers.</li>
    <li><strong>Verified guest reviews</strong> — Look for reviews that mention specific driver names, destinations, and trip details — not generic five-star ratings.</li>
    <li><strong>Direct driver contact</strong> — Being able to communicate directly with your driver via WhatsApp before and during the trip is a sign of a well-run service.</li>
  </ul>

  <p>
    Read verified reviews from past guests on our <a href="/voice" class="article-internal-link">Guest Voices page</a>, where each review includes separate ratings for Driver, Vehicle, and Operator.
  </p>

  <h2>How Much Does Car Hire with a Driver Cost in Sri Lanka?</h2>

  <p>
    Daily rates for a private driver charter in Sri Lanka typically range from <strong>USD 60 to USD 120</strong>, depending on vehicle type, daily distance, and season. This all-in rate covers the driver, fuel, parking, and tolls. It does not include entrance fees to national parks or heritage sites, or the driver's accommodation on multi-night trips.
  </p>

  <p>
    For a transparent breakdown of our rates by vehicle and trip length, visit our <a href="/#price" class="article-internal-link">Pricing section</a>.
  </p>

  <div class="article-cta">
    <p>
      Ready to plan your Sri Lanka itinerary? Send us your travel dates, group size, and the destinations you want to visit — we will provide a free, no-obligation quote with a suggested route.
    </p>
    <a href="/#contact" class="article-cta-btn">Get a Free Quote</a>
  </div>

</article>
    `,
  },
  // ─── Article 3 ─────────────────────────────────────────────────────────────
  {
    id: "003",
    slug: "driver-hire-sri-lanka-costs-safety-checklist",
    category: "cost-booking-guide",
    title: "Driver Hire in Sri Lanka: Costs, Safety, and What to Check Before Booking",
    excerpt:
      "Before you hire a private driver in Sri Lanka, there are seven key things to verify — from government licences and insurance to English ability and cancellation terms. This checklist helps you compare services with confidence and avoid the most common booking mistakes.",
    coverImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article3_cover_driver_checklist-L5mZhGwmPs4uzuBS3dnse3.webp",
    publishedAt: "2026-06-02",
    readingTime: 9,
    tags: [
      "sri lanka driver hire",
      "private driver cost",
      "booking checklist",
      "driver safety",
      "sri lanka car hire",
    ],
    seo: {
      metaTitle:
        "Driver Hire in Sri Lanka: Costs, Safety & Booking Checklist (2026)",
      metaDescription:
        "Planning to hire a private driver in Sri Lanka? Check licences, insurance, English ability, pricing, and cancellation terms before you book. Full 2026 cost guide included.",
      keywords: [
        "sri lanka driver hire",
        "hire driver sri lanka",
        "sri lanka private driver cost",
        "sri lanka driver hire checklist",
        "sri lanka chauffeur booking",
        "sri lanka car hire with driver price",
      ],
    },
    content: `
<article class="article-body">

  <p class="article-lead">
    Hiring a private driver is one of the smartest decisions you can make for a Sri Lanka trip — but not all driver services are created equal. Before you confirm a booking, there are seven things every traveller should check. This guide walks you through each one, along with a transparent breakdown of what driver hire in Sri Lanka actually costs in 2026.
  </p>

  <figure class="article-figure">
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article3_cover_driver_checklist-L5mZhGwmPs4uzuBS3dnse3.webp"
      alt="Traveller reviewing a Sri Lanka trip checklist on a tablet with a white Japanese minivan visible outside"
      class="article-figure-img"
      loading="lazy"
    />
    <figcaption class="article-figure-caption">
      A little preparation before booking can save you from costly surprises on the road.
    </figcaption>
  </figure>

  <h2>Why the Booking Stage Matters So Much</h2>

  <p>
    Sri Lanka has a large and varied market for driver hire services — from solo freelance drivers to established charter operators. The quality gap between the best and worst options is significant. Travellers who book without checking the right details often encounter problems that are difficult to resolve once they are already in the country: drivers who speak little English, vehicles that do not match what was advertised, or final bills that bear no resemblance to the original quote.
  </p>

  <p>
    The good news is that most of these issues are entirely avoidable. The checklist below covers the seven most important things to verify before you pay a deposit.
  </p>

  <h2>The 7-Point Booking Checklist</h2>

  <h3>1. Government-Issued Tourist Driver Licence</h3>

  <p>
    In Sri Lanka, drivers who carry tourists are legally required to hold a <strong>Tourist Driver Licence</strong> issued by the Sri Lanka Tourism Development Authority (SLTDA). This is separate from a standard driving licence and requires the driver to pass background checks and a formal assessment. Always ask to see this document — or confirm that the operator can provide it on request.
  </p>

  <figure class="article-figure">
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article3_inline_driver_documents-BAPwfrwKMWXB99P7opnpye.webp"
      alt="Sri Lankan driver holding an official SLTDA Tourist Driver Licence document"
      class="article-figure-img"
      loading="lazy"
    />
    <figcaption class="article-figure-caption">
      A valid SLTDA Tourist Driver Licence is the baseline requirement for any driver carrying international tourists.
    </figcaption>
  </figure>

  <h3>2. Third-Party Insurance Coverage</h3>

  <p>
    Confirm that the vehicle carries valid third-party insurance. While basic third-party cover is legally required in Sri Lanka, the level of coverage varies. Reputable operators carry comprehensive insurance that covers passengers in the event of an accident. Ask specifically whether passenger liability is included.
  </p>

  <h3>3. English Communication Ability</h3>

  <p>
    This is one of the most frequently overlooked factors — and one of the most impactful on your day-to-day experience. A driver who cannot communicate in English makes it difficult to adjust your itinerary, ask questions about local sites, or handle unexpected situations. When enquiring, send a message in English and assess the response directly. A professional operator will reply promptly in clear English.
  </p>

  <h3>4. Vehicle Condition and Type</h3>

  <p>
    Ask for the specific vehicle that will be assigned to your trip, not just a category. Confirm the approximate age of the vehicle and whether it has working air conditioning — essential in Sri Lanka's heat. For groups of four or more, a <strong>Japanese KDH Hi-Ace van</strong> is the standard choice, offering generous luggage space and a high seating position. For couples or solo travellers, a <strong>Japanese compact sedan</strong> is comfortable and more economical. For larger groups or families with young children, a <strong>luxury Japanese MPV</strong> with captain's seats provides the most comfort.
  </p>

  <p>
    For a full overview of available vehicle types, see our <a href="/#vehicles" class="article-internal-link">Vehicles page</a>.
  </p>

  <h3>5. What Is (and Is Not) Included in the Price</h3>

  <p>
    Always ask for a written breakdown of what the quoted price covers. Key questions to ask:
  </p>

  <ul>
    <li>Is fuel included, or charged separately?</li>
    <li>Are highway tolls and parking fees included?</li>
    <li>Is the driver's accommodation included on multi-day trips?</li>
    <li>Are there mileage limits that could trigger overage charges?</li>
    <li>Are entrance fees to national parks or cultural sites included?</li>
  </ul>

  <p>
    At SLTCS, all prices are <strong>flat-rate and tax-inclusive</strong>. Fuel, tolls, and driver accommodation are covered within the quoted price for standard itineraries. There are no hidden mileage charges. The only potential additions are entrance fees to specific attractions, which are paid directly at the gate.
  </p>

  <h3>6. Cancellation and Modification Terms</h3>

  <p>
    Travel plans change. Before booking, confirm the operator's policy on cancellations, date changes, and itinerary modifications. A reputable service will have clear, written terms. Be cautious of operators who require full payment upfront with no cancellation flexibility — this is a common red flag in the lower-cost segment of the market.
  </p>

  <h3>7. Reviews from Verified Travellers</h3>

  <p>
    Look for reviews on independent platforms — Google, TripAdvisor, or travel forums — rather than relying solely on testimonials displayed on the operator's own website. Pay attention to comments about punctuality, communication, and whether the final price matched the quote. Our <a href="/voice" class="article-internal-link">Guest Voices page</a> features verified reviews from travellers who have completed their trips with SLTCS.
  </p>

  <h2>What Does Driver Hire in Sri Lanka Actually Cost?</h2>

  <p>
    Pricing for private driver hire in Sri Lanka varies considerably depending on the operator, the driver's qualification level, the vehicle type, and the duration of the trip. The table below shows SLTCS's current flat-rate prices (USD, tax-inclusive) for the most common trip durations.
  </p>

  <figure class="article-figure">
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/article3_inline_price_comparison-NK55A8E3tNmu4CLUCpkSPM.webp"
      alt="Driver and two travellers reviewing a Sri Lanka itinerary and pricing on a tablet beside a white Japanese minivan, with mountains in the background"
      class="article-figure-img"
      loading="lazy"
    />
    <figcaption class="article-figure-caption">
      Transparent, flat-rate pricing discussed in English from the first enquiry — no surprises at the end of the trip.
    </figcaption>
  </figure>

  <h3>SLTCS Price Guide (2026)</h3>

  <!-- PRICE_TABLE_PLACEHOLDER -->

  <h3>Understanding the Three Plans</h3>

  <p>
    SLTCS offers three service tiers, each suited to a different travel style. Click any plan below to learn more.
  </p>

  <!-- PLAN_CARDS_PLACEHOLDER -->

  <h2>Red Flags to Watch For</h2>

  <p>
    Not every low price is a good deal. The following patterns are common warning signs when comparing driver hire services in Sri Lanka:
  </p>

  <div class="a3-redflag-grid">
    <div class="a3-redflag-card">
      <div class="a3-redflag-icon">⚠</div>
      <div class="a3-redflag-body">
        <div class="a3-redflag-title">Mileage-Based Pricing</div>
        <div class="a3-redflag-desc">Some operators advertise a low daily rate but apply per-kilometre charges above a set limit. Drivers have been known to report inflated distances, resulting in final bills far above the original quote.</div>
      </div>
    </div>
    <div class="a3-redflag-card">
      <div class="a3-redflag-icon">⚠</div>
      <div class="a3-redflag-body">
        <div class="a3-redflag-title">No English Support at Enquiry Stage</div>
        <div class="a3-redflag-desc">If the operator cannot communicate clearly in English before you book, this will not improve once you are in the country.</div>
      </div>
    </div>
    <div class="a3-redflag-card">
      <div class="a3-redflag-icon">⚠</div>
      <div class="a3-redflag-body">
        <div class="a3-redflag-title">Pressure to Visit Shops or Restaurants</div>
        <div class="a3-redflag-desc">Some drivers receive commissions from specific establishments and will divert your itinerary accordingly. This is a well-documented issue in Sri Lanka's tourism sector.</div>
      </div>
    </div>
    <div class="a3-redflag-card">
      <div class="a3-redflag-icon">⚠</div>
      <div class="a3-redflag-body">
        <div class="a3-redflag-title">No Written Confirmation</div>
        <div class="a3-redflag-desc">Any reputable operator will provide a written quote with itemised inclusions. Verbal-only agreements leave you with no recourse if the service does not match expectations.</div>
      </div>
    </div>
  </div>

  <div class="a3-quote-box">
    <h2 class="a3-quote-heading">How to Get an Accurate Quote</h2>
    <p class="a3-quote-lead">
      The most reliable way to get an accurate price for your specific trip is to share your itinerary — even a rough one — with the operator directly. At SLTCS, we provide free, personalised estimates in English based on your travel dates, group size, preferred vehicle, and the destinations you want to visit. There is no obligation to book, and no pressure to commit before you are ready.
    </p>
    <div class="a3-quote-steps">
      <div class="a3-quote-step">
        <div class="a3-quote-step-num">1</div>
        <div class="a3-quote-step-text">Share your travel dates &amp; group size</div>
      </div>
      <div class="a3-quote-step">
        <div class="a3-quote-step-num">2</div>
        <div class="a3-quote-step-text">Tell us your preferred vehicle &amp; destinations</div>
      </div>
      <div class="a3-quote-step">
        <div class="a3-quote-step-num">3</div>
        <div class="a3-quote-step-text">Receive a detailed estimate within 24 hours</div>
      </div>
    </div>
    <a href="/#contact" class="article-cta-btn">Get a Free Quote</a>
  </div>

</article>
`,
  },
  // ─── Article 10: Van Hire with Driver for Families and Small Groups ───────────
  {
    id: "010",
    slug: "van-hire-driver-sri-lanka-families-small-groups",
    category: "family-group-travel",
    title: "Van Hire with Driver in Sri Lanka for Families and Small Groups",
    excerpt:
      "Travelling with children, grandparents, or a group of friends? A private van with a dedicated driver is the most comfortable and practical way to explore Sri Lanka together. Here is everything you need to know.",
    coverImage: "/manus-storage/review_smith_3ba6750f.jpeg",
    publishedAt: "2026-06-02",
    readingTime: 10,
    tags: ["Family Travel", "Group Travel", "Van Hire", "Sri Lanka", "Private Driver"],
    seo: {
      metaTitle: "Van Hire with Driver in Sri Lanka for Families & Small Groups | SLTCS",
      metaDescription:
        "Planning a family or group trip to Sri Lanka? Discover why a private van with driver is the best option — luggage space, child safety, flexible itineraries, and transparent pricing.",
      keywords: [
        "van hire sri lanka family",
        "sri lanka group travel private driver",
        "family car hire sri lanka",
        "private van driver sri lanka",
        "sri lanka travel with children",
        "group charter sri lanka",
      ],
    },
    content: `
<article class="article-body">

  <p class="article-lead">
    Sri Lanka is one of the most rewarding destinations in Asia for family and group travel — but getting around comfortably with multiple passengers, pushchairs, luggage, and different energy levels requires the right vehicle and the right driver. A private van charter with a dedicated English-speaking driver solves every one of these challenges in a single booking.
  </p>

  <img
    src="/manus-storage/review1_r_family_eranga_a3545b4c.png"
    alt="Family travellers with their private driver in Sri Lanka"
    class="article-inline-img"
  />

  <h2>Why a Private Van Is the Best Choice for Families and Groups</h2>

  <p>
    Public transport in Sri Lanka — buses and trains — can be a wonderful experience for solo travellers or adventurous couples, but it is rarely practical for families or groups of four or more. Luggage space is limited, air conditioning is inconsistent, and coordinating multiple passengers across connections adds significant stress to every journey.
  </p>
  <p>
    A private van charter eliminates all of these friction points. Your group travels together in a single air-conditioned vehicle, departures happen on your schedule, and the driver handles all navigation and logistics. There are no connections to miss, no queues to manage, and no strangers in your personal space.
  </p>

  <h3>What Makes a Van the Right Vehicle for Groups?</h3>

  <p>
    The standard vehicle for group travel in Sri Lanka is the <strong>Japanese KDH Hi-Ace van</strong> — a high-roof minibus that seats up to six passengers comfortably, with generous luggage space in the rear. For larger groups of up to nine, a <strong>luxury Japanese MPV</strong> with captain's seats provides the most comfort on longer journeys.
  </p>
  <p>
    Both vehicle types offer high seating positions — ideal for viewing wildlife, paddy fields, and coastal scenery — and the elevated cabin keeps the interior cooler than a standard sedan in Sri Lanka's tropical heat. For families with young children, the step-up entry and wide sliding doors make boarding and alighting with car seats or pushchairs straightforward.
  </p>
  <p>
    For a full overview of all available vehicle types and their passenger capacities, visit our <a href="/vehicles" class="article-link">Vehicles page</a>.
  </p>

  <h2>The 7 Biggest Advantages for Family and Group Travellers</h2>

  <div class="a10-advantage-grid">
    <div class="a10-advantage-card">
      <div class="a10-advantage-num">01</div>
      <div class="a10-advantage-title">Door-to-Door Service</div>
      <div class="a10-advantage-desc">Your driver meets you at the airport arrivals hall and drops you at every hotel entrance. No transfers, no taxis, no navigating unfamiliar streets with luggage.</div>
    </div>
    <div class="a10-advantage-card">
      <div class="a10-advantage-num">02</div>
      <div class="a10-advantage-title">Flexible Itinerary</div>
      <div class="a10-advantage-desc">Stop whenever the children need a break, change plans when someone is tired, or add an unplanned beach stop. The itinerary adapts to your group — not the other way around.</div>
    </div>
    <div class="a10-advantage-card">
      <div class="a10-advantage-num">03</div>
      <div class="a10-advantage-title">Luggage Space</div>
      <div class="a10-advantage-desc">The KDH van's rear cargo area accommodates large suitcases, pushchairs, and sports equipment with ease — a significant advantage over smaller vehicles or shared transfers.</div>
    </div>
    <div class="a10-advantage-card">
      <div class="a10-advantage-num">04</div>
      <div class="a10-advantage-title">Child Safety</div>
      <div class="a10-advantage-desc">SLTCS drivers are experienced with family groups and drive with particular care on mountain roads and coastal highways. Child car seats can be arranged on request.</div>
    </div>
    <div class="a10-advantage-card">
      <div class="a10-advantage-num">05</div>
      <div class="a10-advantage-title">English-Speaking Driver</div>
      <div class="a10-advantage-desc">Every SLTCS driver communicates clearly in English — essential for families who need to explain dietary requirements, medical needs, or simply ask for a restaurant recommendation.</div>
    </div>
    <div class="a10-advantage-card">
      <div class="a10-advantage-num">06</div>
      <div class="a10-advantage-title">Flat-Rate Pricing</div>
      <div class="a10-advantage-desc">All SLTCS prices are fixed and tax-inclusive. Fuel, tolls, and driver accommodation are included. There are no mileage charges or end-of-trip surprises — particularly important when splitting costs across a group.</div>
    </div>
    <div class="a10-advantage-card">
      <div class="a10-advantage-num">07</div>
      <div class="a10-advantage-title">Local Knowledge</div>
      <div class="a10-advantage-desc">A good driver knows the best family-friendly restaurants, the quietest times to visit popular sites, and the shortcuts that keep long driving days manageable. This knowledge is invaluable when travelling with children or elderly passengers.</div>
    </div>
  </div>

  <h2>Van Hire Pricing for Families and Groups (2026)</h2>

  <p>
    Van hire pricing at SLTCS is flat-rate and tax-inclusive. The table below shows indicative prices for the most common trip durations. All prices are in USD; quotes are also available in <strong>GBP, EUR, and AUD</strong>.
  </p>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Duration</th>
          <th>Bronze (Van)<br/><span style="font-weight:400;font-size:0.8em;">Trainee Driver</span></th>
          <th>Silver (Van)<br/><span style="font-weight:400;font-size:0.8em;">Tourist / Chauffeur Guide</span></th>
          <th>Gold (Van)<br/><span style="font-weight:400;font-size:0.8em;">Chauffeur Guide (Highly Rated)</span></th>
        </tr>
      </thead>
      <tbody>
        <tr><td>2 Days</td><td>USD 180</td><td>USD 220</td><td>USD 280</td></tr>
        <tr><td>3 Days</td><td>USD 255</td><td>USD 315</td><td>USD 400</td></tr>
        <tr><td>5 Days</td><td>USD 395</td><td>USD 490</td><td>USD 625</td></tr>
        <tr><td>7 Days</td><td>USD 525</td><td>USD 650</td><td>USD 830</td></tr>
        <tr><td>10 Days</td><td>USD 720</td><td>USD 895</td><td>USD 1,140</td></tr>
        <tr><td>14 Days</td><td>USD 980</td><td>USD 1,215</td><td>USD 1,550</td></tr>
      </tbody>
    </table>
  </div>

  <p style="font-size:0.82rem;color:#9a9080;margin-top:-8px;">
    Prices are indicative and subject to itinerary. For a personalised quote, visit the <a href="/price" class="article-link">Pricing page</a> or <a href="/#contact" class="article-link">contact us directly</a>.
  </p>

  <p>
    For groups of six to nine passengers, the <strong>Big Van</strong> (luxury Japanese MPV) is available at a slightly higher rate. Full pricing for all vehicle types and durations is available on our <a href="/price" class="article-link">Pricing page</a>.
  </p>

  <h2>Choosing the Right Service Plan for Your Group</h2>

  <p>
    SLTCS offers three service tiers. For families and groups, the choice of plan often comes down to the type of experience you are looking for:
  </p>

  <div class="a10-plan-row">
    <div class="a10-plan-card a10-plan-bronze">
      <div class="a10-plan-label">BRONZE</div>
      <div class="a10-plan-name">Best Value</div>
      <div class="a10-plan-driver">Trainee Driver</div>
      <p class="a10-plan-desc">A reliable, government-licensed driver for groups who are comfortable navigating independently. Ideal for repeat visitors to Sri Lanka or travellers with a fixed itinerary who do not need guiding commentary.</p>
    </div>
    <div class="a10-plan-card a10-plan-silver">
      <div class="a10-plan-badge">★ MOST POPULAR</div>
      <div class="a10-plan-label">SILVER</div>
      <div class="a10-plan-name">Most Popular</div>
      <div class="a10-plan-driver">Highly-Rated Tourist Driver or Chauffeur Guide Driver</div>
      <p class="a10-plan-desc">The most popular choice for families. Your driver accompanies you at sightseeing spots, provides guiding commentary, and handles safari and activity arrangements. Recommended for first-time visitors and families with children.</p>
    </div>
    <div class="a10-plan-card a10-plan-gold">
      <div class="a10-plan-label">GOLD</div>
      <div class="a10-plan-name">Premium Service</div>
      <div class="a10-plan-driver">Chauffeur Guide Driver (Highly Rated)</div>
      <p class="a10-plan-desc">Full-itinerary accompaniment with a highly rated Chauffeur Guide Driver. Dual support system throughout. Recommended for multi-generational families, groups with elderly passengers, or travellers who want the highest level of personalised attention.</p>
    </div>
  </div>

  <p>For a full comparison of all three plans, visit our <a href="/plans" class="article-link">Plans page</a>.</p>

  <h2>What Families and Groups Say About Travelling with SLTCS</h2>

  <p>The following reviews are from families and groups who have completed their trips with SLTCS drivers.</p>

  <div class="a10-review-grid">
    <div class="a10-review-card">
      <div class="a10-review-photo-wrap">
        <img src="/manus-storage/review_smith_3ba6750f.jpeg" alt="The K Family with Driver Smith" class="a10-review-photo" />
      </div>
      <div class="a10-review-body">
        <div class="a10-review-stars">★★★★★</div>
        <div class="a10-review-quote">"Smith's calm professionalism and genuine warmth made our family holiday truly exceptional."</div>
        <div class="a10-review-meta">The K Family · 5 passengers · Colombo – Ella – Yala – Mirissa</div>
        <p class="a10-review-text">We travelled as a family of five — including two young children and a grandmother — and Smith handled every logistical challenge with quiet efficiency and a constant smile. His knowledge of Yala National Park was outstanding — we saw leopards, elephants, and crocodiles in a single morning.</p>
      </div>
    </div>
    <div class="a10-review-card">
      <div class="a10-review-photo-wrap">
        <img src="/manus-storage/review_lasith_family_ae2d2464.jpeg" alt="The W Family with Driver Lasith" class="a10-review-photo" />
      </div>
      <div class="a10-review-body">
        <div class="a10-review-stars">★★★★★</div>
        <div class="a10-review-quote">"Lasith was endlessly patient with our children and made every moment of the trip feel effortless."</div>
        <div class="a10-review-meta">The W Family · 3 passengers · Colombo – Sigiriya – Kandy – Galle</div>
        <p class="a10-review-text">His warm manner with the kids put us all at ease, and his clear English meant nothing was ever lost in translation. Punctual, full of thoughtful suggestions for sights and local restaurants, and consistently calm behind the wheel.</p>
      </div>
    </div>
    <div class="a10-review-card">
      <div class="a10-review-photo-wrap">
        <img src="/manus-storage/review_dfamily_chamil_9214e24c.png" alt="The D Family with Driver Chamil" class="a10-review-photo" />
      </div>
      <div class="a10-review-body">
        <div class="a10-review-stars">★★★★★</div>
        <div class="a10-review-quote">"Chamil's warmth, quick thinking, and natural thoughtfulness won over every member of our family."</div>
        <div class="a10-review-meta">The D Family · 3 generations · Sigiriya – Kandy – Colombo</div>
        <p class="a10-review-text">We travelled as three generations — grandparents, parents, and a child. Chamil constantly gathered the latest information on road conditions and safety, and his attentiveness to our child was especially touching.</p>
      </div>
    </div>
  </div>

  <p>Read more verified reviews on our <a href="/voice" class="article-link">Guest Voices page</a>.</p>

  <img
    src="/manus-storage/review1_r_family_eranga_a3545b4c.png"
    alt="The R Family exploring Sri Lanka with their private driver"
    class="article-inline-img"
  />

  <h2>Practical Tips for Families and Groups</h2>

  <h3>Travelling with Young Children</h3>
  <p>
    Sri Lanka's roads vary considerably in quality — smooth expressways connect the major cities, but mountain routes and rural roads can be winding and bumpy. For infants and toddlers, a child car seat is strongly recommended. SLTCS can arrange a suitable seat on request; please mention this when you enquire.
  </p>
  <p>
    Plan for rest stops every two to three hours on longer driving days. Most drivers know the best roadside stops — shaded areas with clean facilities and cold drinks. The hill country routes in particular benefit from an early start to avoid afternoon heat and to make the most of the morning light.
  </p>

  <h3>Travelling with Elderly Passengers</h3>
  <p>
    For groups that include elderly passengers, the <strong>Gold plan</strong> with a Chauffeur Guide Driver is the most appropriate choice. These drivers are experienced in managing the pace of the itinerary to suit all energy levels, and the dual support system ensures that no passenger is left without assistance at any point during the trip.
  </p>
  <p>
    The KDH van's high seating position can require a step up to board — if mobility is a concern, the luxury MPV with lower entry and captain's seats may be more comfortable. Please mention any mobility requirements when you enquire.
  </p>

  <h3>Splitting Costs Across a Group</h3>
  <p>
    One of the most significant advantages of a private van charter for groups is the cost-per-person value. The table below illustrates how the per-person cost decreases as group size increases, using the Silver Van 7-day rate as an example:
  </p>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Group Size</th>
          <th>Total (Silver Van, 7 Days)</th>
          <th>Cost Per Person</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>2 passengers</td><td>USD 650</td><td>USD 325</td></tr>
        <tr><td>3 passengers</td><td>USD 650</td><td>USD 217</td></tr>
        <tr><td>4 passengers</td><td>USD 650</td><td>USD 163</td></tr>
        <tr><td>5 passengers</td><td>USD 650</td><td>USD 130</td></tr>
        <tr><td>6 passengers</td><td>USD 650</td><td>USD 108</td></tr>
      </tbody>
    </table>
  </div>

  <p style="font-size:0.82rem;color:#9a9080;margin-top:-8px;">Based on indicative Silver Van 7-day rate. Actual prices may vary by itinerary.</p>

  <h2>How to Book a Van Charter for Your Group</h2>

  <div class="a3-quote-box">
    <h3 class="a3-quote-heading">Get a Free, No-Obligation Quote</h3>
    <p class="a3-quote-lead">
      The easiest way to confirm the right vehicle and plan for your group is to share your travel dates, group size, and a rough itinerary with us. We will provide a personalised estimate in English — with no obligation to book and no pressure to commit before you are ready.
    </p>
    <div class="a3-quote-steps">
      <div class="a3-quote-step">
        <div class="a3-quote-step-num">1</div>
        <div class="a3-quote-step-text">Share your travel dates, group size &amp; destinations</div>
      </div>
      <div class="a3-quote-step">
        <div class="a3-quote-step-num">2</div>
        <div class="a3-quote-step-text">Choose your preferred vehicle &amp; service plan</div>
      </div>
      <div class="a3-quote-step">
        <div class="a3-quote-step-num">3</div>
        <div class="a3-quote-step-text">Receive a detailed estimate within 24 hours</div>
      </div>
    </div>
    <a href="/#contact" class="article-cta-btn">Get a Free Quote</a>
  </div>

</article>
`,
  },
  // ─── Article 6: Chauffeur Guide in Sri Lanka ────────────────────────────────
  {
    id: "006",
    slug: "chauffeur-guide-sri-lanka-driver-vs-tourist-guide",
    category: "private-driver-guide",
    title: "Chauffeur Guide in Sri Lanka: Driver vs Tourist Guide Explained",
    excerpt:
      "Confused by the different types of drivers available in Sri Lanka? This guide explains the difference between a Tourist Driver, Chauffeur Guide Driver, and National Guide — and helps you choose the right level of service for your trip.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/a6_cover_chauffeur_guide-EkZi3Nkk4pVnxtJjusWdnt.webp",
    publishedAt: "2026-06-02",
    readingTime: 9,
    tags: ["Chauffeur Guide", "Tourist Driver", "Private Driver", "Sri Lanka", "Travel Planning"],
    seo: {
      metaTitle: "Chauffeur Guide in Sri Lanka: Driver vs Tourist Guide Explained | SLTCS",
      metaDescription:
        "What is the difference between a Tourist Driver, Chauffeur Guide Driver, and National Guide in Sri Lanka? This guide explains each role, what qualifications they hold, and which type of driver is right for your trip.",
      keywords: [
        "chauffeur guide sri lanka",
        "sri lanka chauffeur",
        "tourist driver sri lanka",
        "national guide sri lanka",
        "private driver guide sri lanka",
        "sri lanka driver types",
      ],
    },
    content: `
<article class="article-body">
  <p class="article-lead">
    When you start researching private transport in Sri Lanka, you will quickly encounter several different titles: <strong>Tourist Driver</strong>, <strong>Chauffeur Guide Driver</strong>, and <strong>National Guide</strong>. These are not interchangeable terms — each represents a different level of qualification, a different scope of service, and a different price point. Understanding the distinction before you book can make the difference between a good trip and a genuinely exceptional one.
  </p>

  <img
    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/a6_cover_chauffeur_guide-EkZi3Nkk4pVnxtJjusWdnt.webp"
    alt="Professional chauffeur guide standing beside a white van at Sigiriya Rock Fortress"
    class="article-inline-img"
    loading="lazy"
  />

  <h2>The Three Driver Types in Sri Lanka — At a Glance</h2>
  <p>
    Sri Lanka's tourism industry is regulated by the <strong>Sri Lanka Tourism Development Authority (SLTDA)</strong>, which issues different categories of licences to drivers and guides. The three most relevant categories for travellers hiring private transport are outlined below.
  </p>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Driver Type</th>
          <th>Primary Role</th>
          <th>Guiding Ability</th>
          <th>English Level</th>
          <th>Best For</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Tourist Driver</strong></td>
          <td>Safe, reliable transport</td>
          <td>Basic local knowledge</td>
          <td>Conversational</td>
          <td>Travellers who prefer self-guided exploration</td>
        </tr>
        <tr>
          <td><strong>Chauffeur Guide Driver</strong></td>
          <td>Transport + cultural commentary</td>
          <td>Certified guiding at major sites</td>
          <td class="val-yes">Fluent</td>
          <td>First-time visitors, couples, families wanting depth</td>
        </tr>
        <tr>
          <td><strong>National Guide</strong></td>
          <td>Full guided tour leadership</td>
          <td>Comprehensive — history, archaeology, ecology</td>
          <td class="val-yes">Fluent / professional</td>
          <td>Large groups, specialist cultural or wildlife tours</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Tourist Driver: Reliable Transport, Minimal Commentary</h2>
  <p>
    A Tourist Driver holds a government-issued tourist vehicle licence and is authorised to transport visitors throughout Sri Lanka. Their primary responsibility is safe, punctual driving — not guiding. Most Tourist Drivers have a working knowledge of English and can recommend restaurants or help with basic logistics, but they are not trained or certified to deliver historical or cultural commentary at sites.
  </p>
  <p>
    This category suits travellers who have already researched the destinations they plan to visit, prefer to explore independently at each stop, or are travelling with a separate tour leader. It is also the most common driver type offered by budget operators and ride-hailing platforms.
  </p>
  <p>
    At SLTCS, all drivers — regardless of category — hold a valid government tourist vehicle licence and have been individually vetted. You can learn more about our <a href="/vehicles" class="article-link">vehicle fleet</a> and the standards we apply to every booking.
  </p>

  <h2>Chauffeur Guide Driver: The Best of Both Worlds</h2>
  <p>
    A Chauffeur Guide Driver holds an additional certification issued by the SLTDA that qualifies them to provide guided commentary at tourist sites. This is the most popular choice among independent travellers from the UK, Australia, and Europe who want more than a driver — they want someone who can bring the country to life.
  </p>

  <img
    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/a6_inline2_kandy_temple-ctUQ7HJMF9PHm5B4D9pqGx.webp"
    alt="Chauffeur guide explaining the history of the Temple of the Tooth in Kandy to a Western couple"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>What a Chauffeur Guide Driver Provides</h3>
  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Service Element</th>
          <th>Tourist Driver</th>
          <th>Chauffeur Guide Driver</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Airport pick-up and drop-off</td>
          <td class="val-yes">Yes</td>
          <td class="val-yes">Yes</td>
        </tr>
        <tr>
          <td>Multi-day island-wide charter</td>
          <td class="val-yes">Yes</td>
          <td class="val-yes">Yes</td>
        </tr>
        <tr>
          <td>Flexible itinerary adjustments</td>
          <td class="val-yes">Yes</td>
          <td class="val-yes">Yes</td>
        </tr>
        <tr>
          <td>Cultural &amp; historical commentary at sites</td>
          <td class="val-limited">Limited</td>
          <td class="val-yes">Yes — SLTDA certified</td>
        </tr>
        <tr>
          <td>Restaurant and local experience recommendations</td>
          <td class="val-limited">Basic</td>
          <td class="val-yes">Detailed, personalised</td>
        </tr>
        <tr>
          <td>Assistance with ticket purchase and entry logistics</td>
          <td class="val-limited">Limited</td>
          <td class="val-yes">Yes</td>
        </tr>
        <tr>
          <td>Itinerary planning advice before travel</td>
          <td class="val-limited">Rarely</td>
          <td class="val-yes">Yes</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    A Chauffeur Guide Driver is the right choice if you want to understand what you are seeing — not just visit a list of sites. At Sigiriya, they will explain the hydraulic engineering of the ancient water gardens. At the Temple of the Tooth in Kandy, they will describe the significance of the relic and the correct way to observe the evening ceremony. At Yala, they will identify wildlife and explain the ecosystem.
  </p>
  <p>
    SLTCS offers Chauffeur Guide Drivers under the <a href="/plans" class="article-link">Silver Plan</a> (Highly-Rated Tourist Driver or Chauffeur Guide Driver) and the <a href="/plans" class="article-link">Gold Plan</a> (dedicated Chauffeur Guide Driver with a second support driver for longer itineraries).
  </p>

  <h2>National Guide: Specialist Expertise for Complex Tours</h2>
  <p>
    A National Guide holds the highest level of guiding certification in Sri Lanka, issued after a rigorous multi-year training programme covering history, archaeology, ecology, and multiple languages. National Guides are typically engaged for large group tours, specialist cultural programmes, or high-end itineraries that require deep expertise across multiple disciplines.
  </p>
  <p>
    For most independent travellers booking a private car or van charter, a National Guide is not necessary — and the additional cost is rarely justified unless the itinerary is specifically focused on archaeological depth (for example, a dedicated tour of the ancient cities of Anuradhapura and Polonnaruwa). A well-qualified Chauffeur Guide Driver provides more than enough cultural context for the vast majority of Sri Lanka itineraries.
  </p>

  <img
    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/a6_inline1_driver_types-AHEoJ9oNFD8U4UHrP2ipNH.webp"
    alt="Three driver types in Sri Lanka: Tourist Driver, Chauffeur Guide Driver, and National Guide"
    class="article-inline-img"
    loading="lazy"
  />

  <h2>Which Driver Type Is Right for Your Trip?</h2>
  <p>
    The right choice depends on how you prefer to travel, the length of your itinerary, and how much depth you want from each destination. The table below summarises the most common scenarios.
  </p>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Travel Style</th>
          <th>Recommended Driver Type</th>
          <th>SLTCS Plan</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>First-time visitor, wants cultural context</td>
          <td>Chauffeur Guide Driver</td>
          <td><a href="/plans" class="article-link">Silver or Gold</a></td>
        </tr>
        <tr>
          <td>Repeat visitor, prefers self-guided exploration</td>
          <td>Tourist Driver</td>
          <td><a href="/plans" class="article-link">Bronze</a></td>
        </tr>
        <tr>
          <td>Family with children, needs flexibility and patience</td>
          <td>Chauffeur Guide Driver</td>
          <td><a href="/plans" class="article-link">Silver or Gold</a></td>
        </tr>
        <tr>
          <td>Couple on a honeymoon or anniversary trip</td>
          <td>Chauffeur Guide Driver</td>
          <td><a href="/plans" class="article-link">Gold</a></td>
        </tr>
        <tr>
          <td>Group of friends, relaxed pace</td>
          <td>Tourist Driver or Chauffeur Guide Driver</td>
          <td><a href="/plans" class="article-link">Bronze or Silver</a></td>
        </tr>
        <tr>
          <td>Senior travellers, comfort and care a priority</td>
          <td>Chauffeur Guide Driver</td>
          <td><a href="/plans" class="article-link">Gold</a></td>
        </tr>
        <tr>
          <td>Specialist cultural or archaeological focus</td>
          <td>National Guide + Driver</td>
          <td>Contact us for a custom quote</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>How SLTCS Selects and Certifies Its Drivers</h2>
  <p>
    Every driver working with SLTCS holds a valid government-issued tourist vehicle licence as a minimum requirement. Chauffeur Guide Drivers on the Silver and Gold plans hold additional SLTDA guiding certification and have been individually assessed for English fluency, cultural knowledge, and service standards.
  </p>
  <p>
    Beyond formal qualifications, SLTCS applies its own internal rating system based on guest feedback after every charter. Drivers are rated on punctuality, vehicle cleanliness, route knowledge, communication, and cultural commentary quality. Only drivers who maintain consistently high ratings across all categories are offered to new guests.
  </p>
  <p>
    You can read first-hand accounts from past guests on our <a href="/voice" class="article-link">Guest Voices page</a>, where reviews include specific ratings for driver performance, vehicle condition, and overall service.
  </p>

  <h2>Understanding the SLTCS Plan Structure</h2>
  <p>
    SLTCS organises its service into three plans, each reflecting a different driver category and level of support. The plan you choose determines not just the driver type, but also the vehicle options available and the overall experience of your charter.
  </p>

  <div class="a6-plan-grid">
    <div class="a6-plan-card a6-plan-bronze">
      <div class="a6-plan-label">Bronze Plan</div>
      <div class="a6-plan-driver">Experienced Tourist Driver</div>
      <ul class="a6-plan-features">
        <li>Government-licensed tourist vehicle driver</li>
        <li>Sedan or van available</li>
        <li>Flexible itinerary, English communication</li>
        <li>Best for independent, self-guided travellers</li>
      </ul>
      <a href="/plans" class="a6-plan-btn">View Bronze Plan</a>
    </div>
    <div class="a6-plan-card a6-plan-silver">
      <div class="a6-plan-badge">Most Popular</div>
      <div class="a6-plan-label">Silver Plan</div>
      <div class="a6-plan-driver">Highly-Rated Tourist Driver or Chauffeur Guide Driver</div>
      <ul class="a6-plan-features">
        <li>SLTDA-certified guiding at major sites</li>
        <li>Sedan, van, or large van available</li>
        <li>Cultural commentary, restaurant recommendations</li>
        <li>Best for first-time visitors and families</li>
      </ul>
      <a href="/plans" class="a6-plan-btn">View Silver Plan</a>
    </div>
    <div class="a6-plan-card a6-plan-gold">
      <div class="a6-plan-label">Gold Plan</div>
      <div class="a6-plan-driver">Dedicated Chauffeur Guide Driver + Support Driver</div>
      <ul class="a6-plan-features">
        <li>Dual-driver system for longer itineraries</li>
        <li>Luxury MPV or large van available</li>
        <li>Premium service, full itinerary planning</li>
        <li>Best for couples, seniors, and premium travel</li>
      </ul>
      <a href="/plans" class="a6-plan-btn">View Gold Plan</a>
    </div>
  </div>

  <h2>Frequently Asked Questions</h2>

  <h3>Can I request a Chauffeur Guide Driver on the Bronze Plan?</h3>
  <p>
    The Bronze Plan is designed around experienced Tourist Drivers. If you would like a certified Chauffeur Guide Driver, the Silver or Gold Plan is the appropriate choice. You can compare all three plans on the <a href="/plans" class="article-link">Plans page</a>.
  </p>

  <h3>Is a Chauffeur Guide Driver the same as a tour guide?</h3>
  <p>
    Not exactly. A Chauffeur Guide Driver is primarily your driver — they are responsible for your transport throughout the trip. Their guiding role is complementary: they provide cultural context and commentary at the sites you visit, but they do not lead large group tours or replace a specialist guide for in-depth archaeological programmes. For most independent travellers, this combination is ideal.
  </p>

  <h3>Do Chauffeur Guide Drivers speak English fluently?</h3>
  <p>
    All Chauffeur Guide Drivers working with SLTCS have been assessed for English fluency as part of our internal vetting process. Fluent English communication is a core requirement for the Silver and Gold plans. If you have specific language requirements, please mention this when you <a href="/#contact" class="article-link">submit your enquiry</a>.
  </p>

  <h3>How much more does a Chauffeur Guide Driver cost compared to a Tourist Driver?</h3>
  <p>
    The price difference between the Bronze and Silver plans reflects the additional qualification and experience of the driver. For a full breakdown of rates by vehicle type and duration, visit the <a href="/price" class="article-link">Pricing page</a>.
  </p>

  <div class="article-cta-box">
    <div class="article-cta-title">Not Sure Which Plan Is Right for You?</div>
    <p class="article-cta-desc">
      Share your travel dates, group size, and a rough itinerary — we will recommend the most suitable driver type and provide a personalised quote in English within 24 hours. No obligation, no pressure.
    </p>
    <a href="/#contact" class="article-cta-btn">Get a Free Quote</a>
  </div>
</article>
`,
  },
  // ─── Model Itinerary Articles ─────────────────────────────────────────────
  {
    id: "mi-4n5d",
    slug: "sri-lanka-4-nights-5-days-itinerary",
    category: "model-itinerary",
    title: "Sri Lanka 4 Nights / 5 Days Itinerary: Cultural Highlights by Private Driver",
    excerpt: "A compact yet rewarding 5-day private driver tour covering Sigiriya, Kandy, Nuwara Eliya, and Galle — perfect for first-time visitors on a tight schedule.",
    coverImage: "/manus-storage/slide2_sigiriya_b8468f12.jpg",
    publishedAt: "2026-06-02",
    readingTime: 8,
    tags: ["4 Nights 5 Days", "Sigiriya", "Kandy", "Galle", "Private Driver", "First-Time Visitors"],
    seo: {
      metaTitle: "Sri Lanka 4 Nights 5 Days Itinerary | Private Driver Tour",
      metaDescription: "Explore Sri Lanka in 5 days with a private driver. Visit Sigiriya, Kandy, Nuwara Eliya, and Galle Fort on this compact cultural highlights tour.",
      keywords: ["Sri Lanka 4 nights 5 days", "Sri Lanka 5 day itinerary", "private driver Sri Lanka", "Sigiriya Kandy Galle tour"],
    },
    content: `
<article class="article-body">

  <img
    src="/manus-storage/slide2_sigiriya_b8468f12.jpg"
    alt="Sigiriya Rock Fortress aerial view, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h2>Overview: 4 Nights / 5 Days Cultural Highlights</h2>
  <p>
    This 5-day private driver itinerary is designed for first-time visitors who want to experience the very best of Sri Lanka without feeling rushed. In five days, you will visit four of the island's most celebrated UNESCO World Heritage sites, travel through stunning highland scenery, and arrive at the historic southern coast — all from the comfort of a fully private, air-conditioned vehicle with a dedicated driver.
  </p>
  <p>
    All SLTCS itineraries are flexible by design. If you want to linger longer at Sigiriya, skip a stop, or add a spontaneous detour, your driver will adapt. This plan is a starting point, not a rigid schedule.
  </p>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Detail</th>
          <th>Information</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Duration</td><td>5 Days / 4 Nights</td></tr>
        <tr><td>Focus</td><td>Cultural Highlights</td></tr>
        <tr><td>Key Destinations</td><td>Sigiriya, Kandy, Nuwara Eliya, Galle</td></tr>
        <tr><td>Ideal For</td><td>First-time visitors on a tight schedule</td></tr>
        <tr><td>Start / End Point</td><td>Colombo Airport (BIA)</td></tr>
        <tr><td>Recommended Plan</td><td><a href="/plans" class="article-link">Silver or Gold</a></td></tr>
      </tbody>
    </table>
  </div>

  <h2>Day-by-Day Itinerary</h2>

  <h3>Day 1 — Arrival → Sigiriya</h3>
  <p>
    Arrive at Bandaranaike International Airport (BIA) in Colombo. Your driver will meet you at the arrivals hall with a name board. Drive north to the Sigiriya area (approximately 3–4 hours), stopping en route at the <strong>Dambulla Cave Temple</strong> — a UNESCO World Heritage site featuring five cave shrines adorned with over 150 Buddha statues and ancient murals. Check in to your hotel in the Sigiriya or Kandalama area.
  </p>

  <h3>Day 2 — Sigiriya Rock Fortress</h3>
  <p>
    Begin the day with an early morning climb of <strong>Sigiriya Rock Fortress</strong> (UNESCO), one of the most extraordinary archaeological sites in Asia. The 5th-century royal citadel rises 200 metres above the surrounding jungle, and the summit offers panoramic views across the plains. Allow 2.5–3 hours for the full climb and descent.
  </p>

  <img
    src="/manus-storage/sigiriya_top_driver_guests_4n5d_e9dfe478.jpeg"
    alt="SLTCS driver with guests at the summit of Sigiriya Rock Fortress, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <p>
    In the afternoon, enjoy an optional jeep safari at <strong>Minneriya National Park</strong>, famous for its seasonal elephant gatherings — one of the largest in the world. Return to your hotel for the evening.
  </p>

  <div class="article-highlight-box">
    <h4>🚙 Private Jeep Safari — Arranged by SLTCS</h4>
    <p>
      SLTCS can arrange a <strong>fully private jeep safari</strong> for your Minneriya or Yala visit. Unlike shared group safaris, your private jeep is reserved exclusively for your party — no strangers, no fixed schedule. What truly sets the SLTCS experience apart is that <strong>your dedicated driver can ride along inside the jeep</strong>, providing real-time commentary on the wildlife, habitats, and park history throughout the safari. This means you benefit from both a certified park tracker and your trusted SLTCS driver in one seamless experience.
    </p>
    <p>
      Interested in a private jeep safari? <a href="/#contact" class="article-link">Contact us</a> when making your enquiry and we will include it in your personalised quote.
    </p>
  </div>

  <img
    src="/manus-storage/safari_jeep_wilpatthu_guests_c0e078f1.jpeg"
    alt="Private jeep safari arranged by SLTCS — guests aboard a safari jeep in Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <img
    src="/manus-storage/safari_jeep_yala_group_08928221.jpeg"
    alt="Group enjoying a private jeep safari in Yala National Park, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 3 — Kandy: Temple of the Tooth</h3>
  <p>
    Drive to <strong>Kandy</strong> (approximately 2.5 hours), stopping at a traditional spice garden in Matale along the way. Visit the <strong>Temple of the Sacred Tooth Relic</strong> (UNESCO), the most sacred Buddhist site in Sri Lanka, which houses a relic of the Buddha. In the evening, attend a Kandyan cultural dance performance — a vibrant showcase of traditional drumming and costumed dancers.
  </p>

  <h3>Day 4 — Nuwara Eliya → Galle</h3>
  <p>
    Depart Kandy for a scenic drive through rolling <strong>tea estates</strong> to Nuwara Eliya — Sri Lanka's 'Little England', set at 1,868 metres above sea level. Stop at a tea factory for a guided tour and tasting. Continue south through the highlands and down to the coast, arriving at <strong>Galle Fort</strong> (UNESCO) on the southern coast by late afternoon.
  </p>

  <img
    src="/manus-storage/slide5_galle_8aced38c.jpg"
    alt="Galle Fort Dutch colonial ramparts and lighthouse, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 5 — Galle Fort → Departure</h3>
  <p>
    Spend the morning exploring <strong>Galle Fort</strong> — a remarkably well-preserved Dutch colonial fortification dating from the 17th century. Walk the ramparts, browse the boutique shops and galleries within the fort walls, and enjoy a coffee overlooking the Indian Ocean. Your driver will then transfer you to Colombo Airport for your departure flight.
  </p>

  <h2>What's Included in This Itinerary</h2>
  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Included</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Private air-conditioned vehicle</td><td class="val-yes">Yes</td></tr>
        <tr><td>Dedicated driver for all 5 days</td><td class="val-yes">Yes</td></tr>
        <tr><td>Airport pick-up and drop-off</td><td class="val-yes">Yes</td></tr>
        <tr><td>Flexible itinerary adjustments</td><td class="val-yes">Yes</td></tr>
        <tr><td>Hotel bookings</td><td class="val-limited">Not included (we can recommend)</td></tr>
        <tr><td>Site entrance fees</td><td class="val-limited">Not included (paid separately)</td></tr>
        <tr><td>Meals</td><td class="val-limited">Not included</td></tr>
      </tbody>
    </table>
  </div>

  <h2>Recommended SLTCS Plans</h2>
  <p>
    For a 5-day cultural itinerary, we recommend the <a href="/plans" class="article-link">Silver Plan</a> (Highly-Rated Tourist Driver or Chauffeur Guide Driver) or the <a href="/plans" class="article-link">Gold Plan</a> (dedicated Chauffeur Guide Driver with a second support driver). A Chauffeur Guide Driver will significantly enrich your experience at Sigiriya, Kandy, and Galle by providing certified cultural commentary at each site.
  </p>
  <p>
    View our full <a href="/price" class="article-link">pricing page</a> for transparent rates, or <a href="/#contact" class="article-link">submit a free enquiry</a> and we will prepare a personalised quote within 24 hours.
  </p>

  <div class="article-cta">
    <div class="article-cta-title">Ready to Book Your 5-Day Sri Lanka Tour?</div>
    <div class="article-cta-desc">Tell us your travel dates and group size. We'll respond with a tailored quote within 24 hours.</div>
    <a href="/#contact" class="article-cta-btn">Get a Free Quote</a>
  </div>

</article>
`,
  },
  {
    id: "mi-5n6d",
    slug: "sri-lanka-5-nights-6-days-itinerary",
    category: "model-itinerary",
    title: "Sri Lanka 5 Nights / 6 Days Itinerary: Culture + Nature by Private Driver",
    excerpt: "A well-balanced 6-day private driver tour combining cultural landmarks, highland scenery, and wildlife safari — ideal for couples and small groups.",
    coverImage: "/manus-storage/slide3_tea_train_e100395a.jpg",
    publishedAt: "2026-06-02",
    readingTime: 9,
    tags: ["5 Nights 6 Days", "Sigiriya", "Kandy", "Ella", "Yala", "Private Driver", "Couples"],
    seo: {
      metaTitle: "Sri Lanka 5 Nights 6 Days Itinerary | Private Driver Tour",
      metaDescription: "Explore Sri Lanka in 6 days with a private driver. Sigiriya, Kandy, Ella, Yala National Park, and Galle — the perfect balance of culture and nature.",
      keywords: ["Sri Lanka 5 nights 6 days", "Sri Lanka 6 day itinerary", "private driver Sri Lanka", "Sigiriya Ella Yala tour"],
    },
    content: `
<article class="article-body">

  <img
    src="/manus-storage/slide3_tea_train_e100395a.jpg"
    alt="Scenic tea country train journey in Sri Lanka highlands"
    class="article-inline-img"
    loading="lazy"
  />

  <h2>Overview: 5 Nights / 6 Days Culture + Nature</h2>

  <img
    src="/manus-storage/itinerary_5n6d_route_map_83f6d60b.png"
    alt="Sri Lanka 5 Nights 6 Days Itinerary Illustrated Route Map"
    class="article-inline-img"
    loading="lazy"
  />

  <p>
    This 6-day private driver itinerary strikes the ideal balance between cultural exploration and natural adventure. You will climb Sigiriya, explore the sacred city of Kandy, travel through the tea highlands to Ella, embark on a full-day wildlife safari at Yala, and finish at the historic Galle Fort — all in a fully private vehicle with a dedicated driver.
  </p>
  <p>
    This plan is particularly popular among couples and small groups who want to experience both the cultural depth and the natural beauty of Sri Lanka without feeling rushed.
  </p>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Detail</th>
          <th>Information</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Duration</td><td>6 Days / 5 Nights</td></tr>
        <tr><td>Focus</td><td>Culture + Nature</td></tr>
        <tr><td>Key Destinations</td><td>Sigiriya, Kandy, Ella, Yala, Galle</td></tr>
        <tr><td>Ideal For</td><td>Couples &amp; small groups</td></tr>
        <tr><td>Start / End Point</td><td>Colombo Airport (BIA)</td></tr>
        <tr><td>Recommended Plan</td><td><a href="/plans" class="article-link">Silver or Gold</a></td></tr>
      </tbody>
    </table>
  </div>

  <h2>Day-by-Day Itinerary</h2>

  <h3>Day 1 — Arrival → Sigiriya</h3>
  <p>
    Arrive at Colombo Airport. Your driver will meet you at arrivals and transfer you north to the Sigiriya area (approximately 3–4 hours), stopping at the <strong>Dambulla Cave Temple</strong> (UNESCO) en route. Check in to your hotel in the Sigiriya or Kandalama area.
  </p>

  <h3>Day 2 — Sigiriya Rock & Wildlife Safari</h3>
  <p>
    Climb <strong>Sigiriya Rock Fortress</strong> (UNESCO) in the morning — allow 2.5–3 hours for the full ascent and descent. In the afternoon, take a jeep safari at <strong>Minneriya or Kaudulla National Park</strong>, where you may encounter large herds of wild elephants gathering around the ancient reservoirs.
  </p>

  <img
    src="/manus-storage/itinerary_5n6d_sigiriya_top_24b584a1.jpg"
    alt="Driver and guests at the top of Sigiriya Rock Fortress, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 3 — Kandy Sightseeing</h3>
  <p>
    Travel to <strong>Kandy</strong> via the Matale Spice Garden. Visit the <strong>Temple of the Sacred Tooth Relic</strong> (UNESCO) and the beautiful <strong>Peradeniya Botanical Gardens</strong>, home to over 4,000 plant species including a famous avenue of royal palms. Evening at leisure in Kandy town.
  </p>

  <h3>Day 4 — Nuwara Eliya & Ella</h3>
  <p>
    Drive through the stunning <strong>tea highlands</strong> to Nuwara Eliya. Visit a tea factory and enjoy high tea with views across the estate. Continue to <strong>Ella</strong> — a charming hill village famous for the <strong>Nine Arches Bridge</strong>, a colonial-era viaduct set amid jungle and tea terraces. Overnight in Ella.
  </p>

  <img
    src="/manus-storage/dest_ella_bd8060fc.jpg"
    alt="Nine Arches Bridge in Ella, Sri Lanka surrounded by tea terraces"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 5 — Yala National Park Safari</h3>
  <p>
    Transfer to the Yala area (approximately 2 hours from Ella). Spend the full day on a <strong>jeep safari at Yala National Park</strong> — Sri Lanka's most famous wildlife reserve and home to the world's highest density of leopards. Also look out for elephants, sloth bears, crocodiles, and hundreds of bird species. Overnight near Yala or Tissamaharama.
  </p>

  <img
    src="/manus-storage/itinerary_5n6d_family_safari_7774d932.jpg"
    alt="Family enjoying a jeep safari at Yala National Park, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 6 — Galle Fort → Departure</h3>
  <p>
    Drive to <strong>Galle Fort</strong> (UNESCO) on the southern coast. Spend the morning exploring the Dutch colonial ramparts, boutique shops, and ocean views before your driver transfers you to Colombo Airport for departure.
  </p>

  <h2>What's Included in This Itinerary</h2>
  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Included</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Private air-conditioned vehicle</td><td class="val-yes">Yes</td></tr>
        <tr><td>Dedicated driver for all 6 days</td><td class="val-yes">Yes</td></tr>
        <tr><td>Airport pick-up and drop-off</td><td class="val-yes">Yes</td></tr>
        <tr><td>Flexible itinerary adjustments</td><td class="val-yes">Yes</td></tr>
        <tr><td>Hotel bookings</td><td class="val-limited">Not included (we can recommend)</td></tr>
        <tr><td>Yala jeep safari fee</td><td class="val-limited">Not included (paid separately)</td></tr>
        <tr><td>Meals</td><td class="val-limited">Not included</td></tr>
      </tbody>
    </table>
  </div>

  <h2>Recommended SLTCS Plans</h2>
  <p>
    For a 6-day culture-and-nature itinerary, we recommend the <a href="/plans" class="article-link">Silver Plan</a> or <a href="/plans" class="article-link">Gold Plan</a>. A Chauffeur Guide Driver on the Gold Plan will provide certified commentary at Sigiriya, Kandy, and Galle, and can help coordinate your Yala safari logistics.
  </p>
  <p>
    View our <a href="/price" class="article-link">pricing page</a> for transparent rates, or <a href="/#contact" class="article-link">submit a free enquiry</a> for a personalised quote.
  </p>

  <div class="article-cta">
    <div class="article-cta-title">Ready to Book Your 6-Day Sri Lanka Tour?</div>
    <div class="article-cta-desc">Tell us your travel dates and group size. We'll respond with a tailored quote within 24 hours.</div>
    <a href="/#contact" class="article-cta-btn">Get a Free Quote</a>
  </div>

</article>
`,
  },
  {
    id: "mi-6n7d",
    slug: "sri-lanka-6-nights-7-days-itinerary",
    category: "model-itinerary",
    title: "Sri Lanka 6 Nights / 7 Days Itinerary: Full Island Experience by Private Driver",
    excerpt: "A comprehensive 7-day private driver tour covering the Cultural Triangle, Kandy, tea highlands, Ella, Yala, and Galle — ideal for families and thorough explorers.",
    coverImage: "/manus-storage/slide4_kandy_19bf406f.jpg",
    publishedAt: "2026-06-02",
    readingTime: 10,
    tags: ["6 Nights 7 Days", "Sigiriya", "Polonnaruwa", "Kandy", "Ella", "Yala", "Galle", "Families"],
    seo: {
      metaTitle: "Sri Lanka 6 Nights 7 Days Itinerary | Private Driver Tour",
      metaDescription: "A 7-day private driver itinerary covering Sigiriya, Polonnaruwa, Kandy, tea highlands, Ella, Yala, and Galle — the full Sri Lanka experience.",
      keywords: ["Sri Lanka 6 nights 7 days", "Sri Lanka 7 day itinerary", "private driver Sri Lanka", "full island tour Sri Lanka"],
    },
    content: `
<article class="article-body">

  <img
    src="/manus-storage/slide4_kandy_19bf406f.jpg"
    alt="Temple of the Sacred Tooth Relic in Kandy, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h2>Overview: 6 Nights / 7 Days Full Island Experience</h2>
  <p>
    This 7-day private driver itinerary is the most popular choice for families and travellers who want a thorough introduction to Sri Lanka. Over seven days, you will explore the ancient Cultural Triangle, the sacred city of Kandy, the dramatic tea highlands, the scenic village of Ella, the wildlife-rich Yala National Park, and the historic Galle Fort — a genuinely complete island experience.
  </p>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Detail</th>
          <th>Information</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Duration</td><td>7 Days / 6 Nights</td></tr>
        <tr><td>Focus</td><td>Full Island Experience</td></tr>
        <tr><td>Key Destinations</td><td>Sigiriya, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Yala, Galle</td></tr>
        <tr><td>Ideal For</td><td>Families &amp; thorough explorers</td></tr>
        <tr><td>Start / End Point</td><td>Colombo Airport (BIA)</td></tr>
        <tr><td>Recommended Plan</td><td><a href="/plans" class="article-link">Silver or Gold</a></td></tr>
      </tbody>
    </table>
  </div>

  <h2>Day-by-Day Itinerary</h2>

  <h3>Day 1 — Arrival → Cultural Triangle</h3>
  <p>
    Arrive at Colombo Airport. Drive north via the <strong>Dambulla Cave Temple</strong> (UNESCO) to the Sigiriya or Kandalama area (approximately 3–4 hours). Check in to your hotel.
  </p>

  <h3>Day 2 — Sigiriya & Polonnaruwa</h3>
  <p>
    Climb <strong>Sigiriya Rock Fortress</strong> (UNESCO) in the morning. In the afternoon, transfer to the ancient city of <strong>Polonnaruwa</strong> (UNESCO) — a remarkably well-preserved medieval capital with temples, palaces, and colossal Buddha statues. Return to your hotel.
  </p>

  <img
    src="/manus-storage/6n7d_day2_sigiriya_top_b1661daf.jpg"
    alt="SLTCS driver and guests at the top of Sigiriya Rock Fortress, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 3 — Kandy</h3>
  <p>
    Drive to <strong>Kandy</strong> via a spice garden in Matale. Visit the <strong>Temple of the Sacred Tooth Relic</strong> (UNESCO) and enjoy a traditional Kandyan dance performance in the evening.
  </p>

  <img
    src="/manus-storage/6n7d_day3_kandy_temple_5f18e5cf.jpg"
    alt="Temple of the Sacred Tooth Relic illuminated at sunset, Kandy, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 4 — Nuwara Eliya: Tea Highlands</h3>
  <p>
    Scenic mountain drive to <strong>Nuwara Eliya</strong> through rolling tea estates. Enjoy a tea-plucking experience and high tea at a colonial-era plantation hotel. Explore the charming town, often called 'Little England' for its cool climate and British colonial architecture.
  </p>

  <img
    src="/manus-storage/lasith_nuwara_eliya_tea_family_107c01c5.jpeg"
    alt="SLTCS driver with guests at Nuwara Eliya tea estate, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 5 — Ella & Nine Arches Bridge</h3>
  <p>
    Travel to <strong>Ella</strong> and ride (or photograph) the iconic tea-country train. Visit the <strong>Nine Arches Bridge</strong> and hike to <strong>Little Adam's Peak</strong> for panoramic views across the valley. Overnight in Ella.
  </p>

  <img
    src="/manus-storage/6n7d_day5_ella_bridge_f782b415.jpg"
    alt="SLTCS driver and guests at Nine Arches Bridge, Ella, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 6 — Yala National Park Safari</h3>
  <p>
    Full-day jeep safari at <strong>Yala National Park</strong> — Sri Lanka's premier wildlife reserve. Look out for leopards, elephants, sloth bears, crocodiles, and over 200 bird species. Overnight near Yala or Tissamaharama.
  </p>

  <div class="article-highlight-box">
    <h4>🚙 Private Jeep Safari — Arranged by SLTCS</h4>
    <p>
      SLTCS can arrange a <strong>fully private jeep safari</strong> for your Yala visit. Unlike shared group safaris, your private jeep is reserved exclusively for your party — no strangers, no fixed schedule. What truly sets the SLTCS experience apart is that <strong>your dedicated driver can ride along inside the jeep</strong>, providing real-time commentary on the wildlife, habitats, and park history throughout the safari. This means you benefit from both a certified park tracker and your trusted SLTCS driver in one seamless experience.
    </p>
    <p>
      Interested in a private jeep safari? <a href="/#contact" class="article-link">Contact us</a> when making your enquiry and we will include it in your personalised quote.
    </p>
  </div>

  <img
    src="/manus-storage/6n7d_day6_yala_jeep_c0d55756.jpg"
    alt="Private jeep safari at Yala National Park, Sri Lanka — arranged by SLTCS"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 7 — Galle Fort → Departure</h3>
  <p>
    Morning visit to <strong>Galle Fort</strong> (UNESCO) — walk the ramparts, explore the boutique lanes, and enjoy a final coffee with ocean views. Optional stop at <strong>Mirissa beach</strong>. Transfer to Colombo Airport for departure.
  </p>

  <h2>What's Included in This Itinerary</h2>
  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Included</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Private air-conditioned vehicle</td><td class="val-yes">Yes</td></tr>
        <tr><td>Dedicated driver for all 7 days</td><td class="val-yes">Yes</td></tr>
        <tr><td>Airport pick-up and drop-off</td><td class="val-yes">Yes</td></tr>
        <tr><td>Flexible itinerary adjustments</td><td class="val-yes">Yes</td></tr>
        <tr><td>Hotel bookings</td><td class="val-limited">Not included (we can recommend)</td></tr>
        <tr><td>Yala jeep safari fee</td><td class="val-limited">Not included (paid separately)</td></tr>
        <tr><td>Meals</td><td class="val-limited">Not included</td></tr>
      </tbody>
    </table>
  </div>

  <h2>Recommended SLTCS Plans</h2>
  <p>
    For a 7-day full island itinerary, we recommend the <a href="/plans" class="article-link">Silver Plan</a> or <a href="/plans" class="article-link">Gold Plan</a>. The Gold Plan includes a dedicated Chauffeur Guide Driver plus a second support driver — ideal for families with children or travellers who want maximum flexibility and cultural depth.
  </p>
  <p>
    View our <a href="/price" class="article-link">pricing page</a>, or <a href="/#contact" class="article-link">submit a free enquiry</a> for a personalised quote.
  </p>

  <div class="article-cta">
    <div class="article-cta-title">Ready to Book Your 7-Day Sri Lanka Tour?</div>
    <div class="article-cta-desc">Tell us your travel dates and group size. We'll respond with a tailored quote within 24 hours.</div>
    <a href="/#contact" class="article-cta-btn">Get a Free Quote</a>
  </div>

</article>
`,
  },
  {
    id: "mi-cultural",
    slug: "sri-lanka-5-7-days-cultural-triangle-itinerary",
    category: "model-itinerary",
    title: "Sri Lanka 5–7 Days Cultural Triangle Itinerary: UNESCO Heritage Focus",
    excerpt: "An in-depth 5 to 7-day private driver tour focused on Sri Lanka's UNESCO Cultural Triangle — Sigiriya, Anuradhapura, Polonnaruwa, and Kandy.",
    coverImage: "/manus-storage/slide2_sigiriya_b8468f12.jpg",
    publishedAt: "2026-06-02",
    readingTime: 10,
    tags: ["Cultural Triangle", "UNESCO", "Sigiriya", "Anuradhapura", "Polonnaruwa", "Kandy", "History"],
    seo: {
      metaTitle: "Sri Lanka Cultural Triangle Itinerary 5-7 Days | Private Driver",
      metaDescription: "Explore Sri Lanka's UNESCO Cultural Triangle in 5 to 7 days with a private driver. Sigiriya, Anuradhapura, Polonnaruwa, and Kandy in depth.",
      keywords: ["Sri Lanka Cultural Triangle itinerary", "Sri Lanka UNESCO sites tour", "Sigiriya Anuradhapura Polonnaruwa", "private driver Cultural Triangle"],
    },
    content: `
<article class="article-body">

  <img
    src="/manus-storage/slide2_sigiriya_b8468f12.jpg"
    alt="Sigiriya Rock Fortress — centrepiece of Sri Lanka's Cultural Triangle"
    class="article-inline-img"
    loading="lazy"
  />

  <h2>Overview: 5–7 Days Cultural Triangle Focus</h2>
  <p>
    Sri Lanka's Cultural Triangle is a region in the north-central part of the island that contains an extraordinary concentration of UNESCO World Heritage sites — ancient capitals, rock fortresses, sacred temples, and cave shrines that together tell the story of over 2,000 years of Sinhalese civilisation. This itinerary is designed for history and culture enthusiasts who want to explore these sites in depth, rather than rushing through them.
  </p>
  <p>
    The plan can be completed in 5 days at a moderate pace, or extended to 7 days for a more relaxed and thorough experience. A <a href="/information/private-driver-guide/chauffeur-guide-sri-lanka-driver-vs-tourist-guide" class="article-link">Chauffeur Guide Driver</a> is strongly recommended for this itinerary, as the historical context provided at each site significantly enriches the experience.
  </p>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Detail</th>
          <th>Information</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Duration</td><td>5–7 Days</td></tr>
        <tr><td>Focus</td><td>UNESCO Heritage Sites &amp; Safari</td></tr>
        <tr><td>Key Destinations</td><td>Sigiriya, Anuradhapura, Polonnaruwa, Kandy</td></tr>
        <tr><td>Ideal For</td><td>History &amp; culture enthusiasts</td></tr>
        <tr><td>Start / End Point</td><td>Colombo Airport (BIA)</td></tr>
        <tr><td>Recommended Plan</td><td><a href="/plans" class="article-link">Gold Plan</a></td></tr>
      </tbody>
    </table>
  </div>

  <h2>The UNESCO World Heritage Sites of the Cultural Triangle</h2>
  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Site</th>
          <th>UNESCO Status</th>
          <th>Highlights</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Sigiriya</strong></td><td class="val-yes">World Heritage Site</td><td>5th-century rock fortress, frescoes, water gardens</td></tr>
        <tr><td><strong>Dambulla Cave Temple</strong></td><td class="val-yes">World Heritage Site</td><td>5 cave shrines, 150+ Buddha statues, ancient murals</td></tr>
        <tr><td><strong>Anuradhapura</strong></td><td class="val-yes">World Heritage Site</td><td>Sri Lanka's first ancient capital, sacred Bodhi Tree, stupas</td></tr>
        <tr><td><strong>Polonnaruwa</strong></td><td class="val-yes">World Heritage Site</td><td>Medieval capital, Gal Vihara Buddha statues, palaces</td></tr>
        <tr><td><strong>Kandy</strong></td><td class="val-yes">World Heritage Site</td><td>Temple of the Sacred Tooth Relic, Kandyan dance</td></tr>
      </tbody>
    </table>
  </div>

  <h2>Day-by-Day Itinerary</h2>

  <h3>Day 1 — Airport → Dambulla Cave Temple → Sigiriya</h3>
  <p>
    Depart from Colombo Airport (approximately 3–4 hours drive). En route, visit the <strong>Dambulla Cave Temple</strong> — a stunning UNESCO World Heritage site carved into a rock face, featuring five cave shrines with over 150 Buddha statues and ancient murals. Check in at Heritance Kandalama, a Geoffrey Bawa–designed architectural masterpiece set amid forest and lake.
  </p>

  <h3>Day 2 — Sigiriya Rock Fortress & Minneriya Safari</h3>
  <p>
    Early morning climb of <strong>Sigiriya Rock</strong> (UNESCO) — allow 2.5–3 hours for the round trip. The summit offers extraordinary views and the ascent passes the famous 5th-century frescoes and the Mirror Wall. In the afternoon, take a jeep safari at <strong>Minneriya National Park</strong>, famous for its elephant gatherings. Return to hotel.
  </p>

  <h3>Day 3 — Ancient Capital of Anuradhapura</h3>
  <p>
    Explore the vast UNESCO-listed ruins of <strong>Anuradhapura</strong> — Sri Lanka's first ancient capital, founded in the 4th century BC. Visit the sacred <strong>Sri Maha Bodhi</strong> (the oldest documented tree in the world, grown from a cutting of the original Bodhi Tree under which the Buddha attained enlightenment), the <strong>Ruwanwelisaya Stupa</strong>, and the Jetavanaramaya. Allow a full day for this sprawling site.
  </p>

  <img
    src="/manus-storage/slide4_kandy_19bf406f.jpg"
    alt="Temple of the Sacred Tooth Relic in Kandy, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <img
    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/itinerary_cultural_dambulla-GQToxw2VpoCgxDxgX5Err5.webp"
    alt="Dambulla Cave Temple golden Buddha statues, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3>Day 4 — Polonnaruwa & Pidurangala Rock</h3>
  <p>
    Optional morning climb of <strong>Pidurangala Rock</strong> for spectacular views of Sigiriya from above. Then explore the medieval city of <strong>Polonnaruwa</strong> (UNESCO) — remarkably well-preserved temples, palaces, and the famous <strong>Gal Vihara</strong> rock temple with its colossal Buddha statues carved directly into the granite face.
  </p>

  <h3>Day 5 — Kandy via Spice Garden</h3>
  <p>
    Drive to <strong>Kandy</strong> via a traditional spice garden in Matale. Visit the <strong>Temple of the Sacred Tooth Relic</strong> (UNESCO) and enjoy a Kandyan cultural dance performance in the evening.
  </p>

  <h3>Day 6 — Colombo Sightseeing & Ayurveda (Optional Extension)</h3>
  <p>
    For travellers extending to 6 or 7 days: explore Colombo's colonial architecture, vibrant Pettah Market, and the Gangaramaya Temple. Optional: check into an Ayurveda hotel in Negombo to unwind before departure.
  </p>

  <h3>Day 7 — Transfer to Airport</h3>
  <p>
    Final morning at leisure. Transfer to Colombo Airport (BIA) for your homeward flight.
  </p>

  <h2>Recommended SLTCS Plans</h2>
  <p>
    For a Cultural Triangle itinerary, we strongly recommend the <a href="/plans" class="article-link">Gold Plan</a> with a dedicated Chauffeur Guide Driver. The depth of historical and archaeological knowledge required to fully appreciate Anuradhapura and Polonnaruwa makes a qualified guide invaluable. See our <a href="/information/private-driver-guide/chauffeur-guide-sri-lanka-driver-vs-tourist-guide" class="article-link">Chauffeur Guide Driver guide</a> for more information.
  </p>
  <p>
    View our <a href="/price" class="article-link">pricing page</a>, or <a href="/#contact" class="article-link">submit a free enquiry</a> for a personalised quote.
  </p>

  <div class="article-cta">
    <div class="article-cta-title">Explore Sri Lanka's Ancient Heritage</div>
    <div class="article-cta-desc">Tell us your travel dates and interests. We'll prepare a tailored Cultural Triangle itinerary and quote within 24 hours.</div>
    <a href="/#contact" class="article-cta-btn">Get a Free Quote</a>
  </div>

</article>
`,
  },
  {
    id: "mi-10to14d",
    slug: "sri-lanka-10-days-2-weeks-itinerary",
    category: "model-itinerary",
    title: "Sri Lanka 10 Days to 2 Weeks Itinerary: Classic First-Timer Plan by Private Driver",
    excerpt: "The ultimate Sri Lanka private driver itinerary — 10 to 14 days covering Sigiriya, Kandy, the tea train, Ella, Yala, Galle, and beach relaxation. Perfect for first-timers wanting the complete experience.",
    coverImage: "/manus-storage/hero_van_srilanka_706f8966.jpg",
    publishedAt: "2026-06-02",
    readingTime: 12,
    tags: ["10 Days", "2 Weeks", "Classic Plan", "Sigiriya", "Kandy", "Ella", "Yala", "Galle", "Beach"],
    seo: {
      metaTitle: "Sri Lanka 10 Days to 2 Weeks Itinerary | Classic Private Driver Tour",
      metaDescription: "The complete Sri Lanka private driver itinerary — 10 to 14 days covering all the highlights: Sigiriya, Kandy, tea train, Ella, Yala, Galle, and beach.",
      keywords: ["Sri Lanka 10 day itinerary", "Sri Lanka 2 weeks itinerary", "private driver Sri Lanka", "Sri Lanka classic tour"],
    },
    content: `
<article class="article-body">

  <img
    src="/manus-storage/hero_van_srilanka_706f8966.jpg"
    alt="Private driver van on a scenic Sri Lanka road at sunset"
    class="article-inline-img"
    loading="lazy"
  />

  <nav class="article-toc">
    <div class="article-toc-title">Table of Contents</div>
    <ol class="article-toc-list">
      <li><a href="#day1">Day 1 — Airport → Anuradhapura → Sigiriya</a></li>
      <li><a href="#day2">Day 2 — Sigiriya Rock &amp; Minneriya Jeep Safari</a></li>
      <li><a href="#day3">Day 3 — Kandy: Spice Garden &amp; Temple</a></li>
      <li><a href="#day4">Day 4 — Nuwara Eliya: Tea Highlands</a></li>
      <li><a href="#day5">Day 5 — Scenic Tea Train → Nine Arches Bridge → Ella</a></li>
      <li><a href="#day6">Day 6 — Ella Sightseeing → Yala</a></li>
      <li><a href="#day7">Day 7 — Yala National Park Safari → Mirissa Beach</a></li>
      <li><a href="#day8">Day 8 — Galle Fort &amp; Beach Day</a></li>
      <li><a href="#day9">Day 9 — Negombo: Ayurveda &amp; Rest</a></li>
      <li><a href="#day10">Day 10 — Colombo Sightseeing → Airport</a></li>
    </ol>
  </nav>

  <h2>Overview: 10 Days to 2 Weeks Classic First-Timer Plan</h2>

  <img
    src="/manus-storage/itinerary_10days_route_map_a68b9a7c.png"
    alt="10-Day Sri Lanka Itinerary Illustrated Route Map"
    class="article-inline-img"
    loading="lazy"
  />

  <p>
    This is the itinerary we recommend most often to first-time visitors who have the time to experience Sri Lanka properly. Over 10 to 14 days, you will travel from the ancient Cultural Triangle through the sacred city of Kandy, up into the dramatic tea highlands, across to the wildlife-rich south, and finally to the beaches of the southern coast — all in a fully private vehicle with a dedicated driver.
  </p>
  <p>
    This plan can be completed in 10 days at a comfortable pace, or extended to 14 days by adding extra nights at your favourite locations, incorporating an Ayurveda retreat, or exploring additional destinations such as Trincomalee on the east coast.
  </p>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Detail</th>
          <th>Information</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Duration</td><td>10–14 Days</td></tr>
        <tr><td>Focus</td><td>Complete Island Experience</td></tr>
        <tr><td>Key Destinations</td><td>Sigiriya, Kandy, Tea Train, Ella, Yala, Galle, Beach</td></tr>
        <tr><td>Ideal For</td><td>First-timers wanting the full Sri Lanka experience</td></tr>
        <tr><td>Start / End Point</td><td>Colombo Airport (BIA)</td></tr>
        <tr><td>Recommended Plan</td><td><a href="/plans" class="article-link">Gold Plan</a></td></tr>
      </tbody>
    </table>
  </div>

  <h2>Day-by-Day Itinerary</h2>

  <h3 id="day1">Day 1 — Airport → Anuradhapura → Sigiriya</h3>
  <p>
    Depart from Colombo Airport or Negombo. Drive north to the ancient capital of <strong>Anuradhapura</strong> (approximately 3.5–4 hours). Explore the UNESCO World Heritage Site — the sacred <strong>Sri Maha Bodhi</strong> (the world's oldest documented tree), the great <strong>Ruwanwelisaya Stupa</strong>, and the sprawling ancient ruins of this 2,500-year-old city. Continue to the Sigiriya area (approximately 1.5 hours) and check in to your hotel.
  </p>

  <h3 id="day2">Day 2 — Sigiriya Rock & Minneriya Jeep Safari</h3>
  <p>
    Morning climb of <strong>Sigiriya Rock Fortress</strong> (UNESCO) — allow 2.5–3 hours for the full ascent and descent, taking in the ancient water gardens, the famous frescoes of the celestial maidens, and the breathtaking panoramic views from the summit plateau. In the afternoon, head to <strong>Minneriya National Park</strong> for a thrilling jeep safari. Minneriya is renowned for <em>The Gathering</em> — one of Asia's greatest wildlife spectacles, where hundreds of wild elephants congregate around the ancient reservoir. Overnight in Sigiriya.
  </p>

  <h3 id="day3">Day 3 — Kandy: Spice Garden & Temple</h3>
  <p>
    Drive to <strong>Kandy</strong> via a spice garden in Matale (approximately 3 hours). Visit the <strong>Geragama Tea Factory</strong> and the <strong>Temple of the Sacred Tooth Relic</strong> (UNESCO). Evening Kandyan dance performance.
  </p>

  <h3 id="day4">Day 4 — Nuwara Eliya: Tea Highlands</h3>
  <p>
    Scenic mountain drive to <strong>Nuwara Eliya</strong> through rolling tea estates. Tea-plucking experience and high tea at a colonial plantation hotel. Explore the charming 'Little England' town.
  </p>

  <h3 id="day5">Day 5 — Scenic Tea Train → Nine Arches Bridge → Ella</h3>
  <p>
    Board the iconic <strong>tea-country train</strong> for a breathtaking journey through misty mountains. Photograph the famous <strong>Nine Arches Bridge</strong>. Arrive in <strong>Ella</strong>.
  </p>

  <img
    src="/manus-storage/dest_ella_bd8060fc.jpg"
    alt="Nine Arches Bridge in Ella, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3 id="day6">Day 6 — Ella Sightseeing → Yala</h3>
  <p>
    Morning hike to <strong>Little Adam's Peak</strong> and Ella Rock for panoramic views. Afternoon transfer to the Yala area (approximately 2 hours). Check in to a safari lodge.
  </p>

  <h3 id="day7">Day 7 — Yala National Park Safari → Mirissa Beach</h3>
  <p>
    Early morning jeep safari at <strong>Yala National Park</strong> — Sri Lanka's most famous wildlife park, home to the world's highest density of leopards. Afternoon transfer to the beach resort of <strong>Mirissa</strong>.
  </p>

  <img
    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529989815/6DaLAFXsm6QrASiQYZBXXj/itinerary_10days_bentota-AFBmRkdBvTUXKvEwtA2mQt.webp"
    alt="Bentota beach resort aerial view, Sri Lanka"
    class="article-inline-img"
    loading="lazy"
  />

  <h3 id="day8">Day 8 — Galle Fort & Beach Day</h3>
  <p>
    Morning visit to the UNESCO-listed <strong>Galle Fort</strong> — Dutch colonial ramparts, boutique shops, and ocean views. Afternoon at leisure on Mirissa beach. Optional whale watching (seasonal: November–April).
  </p>

  <h3 id="day9">Day 9 — Negombo: Ayurveda & Rest</h3>
  <p>
    Transfer to <strong>Negombo</strong> on the west coast (approximately 3–4 hours). Check into an Ayurveda hotel for traditional treatments and relaxation before your departure.
  </p>

  <h3 id="day10">Day 10 — Colombo Sightseeing → Airport</h3>
  <p>
    Morning exploration of <strong>Colombo</strong> — Gangaramaya Temple, Pettah Market, and the vibrant Galle Face Green. Transfer to Colombo Airport (BIA) for your departure flight.
  </p>

  <h2>Optional Extensions (Days 11–14)</h2>
  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th>Extension</th>
          <th>Duration</th>
          <th>Highlights</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Trincomalee East Coast</td><td>2–3 days</td><td>Pristine beaches, Pigeon Island snorkelling, whale watching</td></tr>
        <tr><td>Polonnaruwa Deep Dive</td><td>1 day</td><td>Medieval capital, Gal Vihara rock temple, ancient reservoirs</td></tr>
        <tr><td>Ayurveda Retreat</td><td>2–4 days</td><td>Traditional treatments, yoga, relaxation before departure</td></tr>
        <tr><td>Jaffna (Far North)</td><td>2–3 days</td><td>Tamil culture, Nallur Kandaswamy Temple, unique cuisine</td></tr>
      </tbody>
    </table>
  </div>

  <h2>Recommended SLTCS Plans</h2>
  <p>
    For a 10 to 14-day itinerary, we strongly recommend the <a href="/plans" class="article-link">Gold Plan</a> — a dedicated Chauffeur Guide Driver with a second support driver. Over a longer journey, the value of having a knowledgeable, certified guide who can bring each destination to life becomes even more apparent. The second support driver also ensures maximum flexibility and safety on longer travel days.
  </p>
  <p>
    View our <a href="/price" class="article-link">pricing page</a> for transparent rates, or <a href="/#contact" class="article-link">submit a free enquiry</a> for a personalised quote tailored to your exact dates and group size.
  </p>

  <div class="article-cta">
    <div class="article-cta-title">Plan Your Dream Sri Lanka Journey</div>
    <div class="article-cta-desc">Tell us your travel dates and group size. We'll respond with a tailored 10–14 day itinerary and quote within 24 hours.</div>
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
