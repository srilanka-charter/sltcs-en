/**
 * Voice – Guest Reviews Page
 * URL: /voice
 * All 8 driver reviews with 3-category 5-star ratings (Driver / Vehicle / Operator)
 */

import { Link } from "wouter";

// ─── Star Rating Component ─────────────────────────────────────────────────────
function StarRating({ score }: { score: number }) {
  return (
    <span style={{ color: "#c9a84c", fontSize: "1rem", letterSpacing: "1px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ opacity: i <= Math.round(score) ? 1 : 0.25 }}>★</span>
      ))}
      <span style={{ color: "#6a6a6a", fontSize: "0.8rem", marginLeft: "4px" }}>
        {score.toFixed(1)}
      </span>
    </span>
  );
}

// ─── Category Ratings Display ──────────────────────────────────────────────────
function RatingsBreakdown({ driver, vehicle, operator }: { driver: number; vehicle: number; operator: number }) {
  const total = Math.round(((driver + vehicle + operator) / 3) * 10) / 10;
  return (
    <div className="voice-ratings">
      <div className="voice-total-score">
        <span className="voice-total-label">Overall</span>
        <span className="voice-total-num">{total.toFixed(1)}</span>
        <span className="voice-total-stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ color: i <= Math.round(total) ? "#c9a84c" : "#d1ccc4" }}>★</span>
          ))}
        </span>
      </div>
      <div className="voice-breakdown">
        {[
          { label: "Driver", score: driver },
          { label: "Vehicle", score: vehicle },
          { label: "Operator", score: operator },
        ].map(({ label, score }) => (
          <div key={label} className="voice-breakdown-row">
            <span className="voice-breakdown-label">{label}</span>
            <div className="voice-breakdown-bar-wrap">
              <div className="voice-breakdown-bar" style={{ width: `${(score / 5) * 100}%` }} />
            </div>
            <span className="voice-breakdown-score">{score.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Review Data ───────────────────────────────────────────────────────────────
const VOICE_REVIEWS = [
  {
    id: "aruna",
    photo: "/manus-storage/review_aruna_78705121.jpeg",
    driver: "Aruna",
    name: "The M Couple",
    pax: "2 passengers",
    period: "March 2025",
    route: "Colombo – Ella – Nuwara Eliya – Kandy",
    ratings: { driver: 5.0, vehicle: 4.8, operator: 4.9 },
    quote: "Aruna made every mountain road feel like an adventure, not a challenge.",
    body: "We hired Aruna for a week-long circuit through the hill country, and he exceeded every expectation. His knowledge of the scenic viewpoints — many of which don't appear in guidebooks — was extraordinary. He timed our arrival at Ella Rock perfectly to catch the morning mist, and his suggestion to stop at a small roadside tea stall turned into one of our most cherished memories. Aruna's driving is smooth and confident even on the narrow mountain passes, and his calm demeanour put us completely at ease throughout. He was always punctual, always smiling, and always thinking one step ahead. An outstanding professional and a genuinely warm human being.",
  },
  {
    id: "dhammika",
    photo: "/manus-storage/review_dhammika_f371cfdd.jpeg",
    driver: "Dhammika",
    name: "The R Couple",
    pax: "2 passengers",
    period: "February 2025",
    route: "Colombo – Sigiriya – Kandy – Mirissa",
    ratings: { driver: 5.0, vehicle: 4.7, operator: 4.8 },
    quote: "Dhammika's local knowledge transformed our trip from a holiday into a genuine cultural immersion.",
    body: "From the moment Dhammika met us at Colombo Airport, we knew we were in good hands. He has an encyclopaedic knowledge of Sri Lankan history and culture that he shares with real enthusiasm — never lecturing, always conversational. At Sigiriya he knew exactly which angle to photograph the rock at golden hour, and in Kandy he took us to a Kandyan dance performance that most tourists never find. His vehicle was spotless and air-conditioned, and he always had cold water waiting for us. Dhammika is the kind of driver who genuinely cares whether you're having the best possible experience. We've already recommended him to three sets of friends.",
  },
  {
    id: "kushan",
    photo: "/manus-storage/review_kushan_f9478373.jpeg",
    driver: "Kushan",
    name: "The B Group",
    pax: "4 passengers",
    period: "January 2025",
    route: "Colombo – Dambulla – Polonnaruwa – Trincomalee",
    ratings: { driver: 4.9, vehicle: 4.8, operator: 4.9 },
    quote: "Kushan handled four very different personalities with patience, good humour, and remarkable skill.",
    body: "Our group of four had very different interests — history, wildlife, beaches, and food — and Kushan managed to weave all of them into a seamless itinerary. He was endlessly patient when we couldn't agree on where to eat, always had a suggestion ready, and never once made us feel rushed. His driving on the coastal roads was confident and safe, and he knew every shortcut to avoid the worst of the afternoon traffic. The vehicle was large, comfortable, and immaculately clean throughout the trip. Kushan's easy-going nature made the long driving days genuinely enjoyable. We left Sri Lanka feeling like we'd made a friend.",
  },
  {
    id: "lasith",
    photo: "/manus-storage/review_lasith2_555d5b29.jpeg",
    driver: "Lasith",
    name: "The W Family",
    pax: "3 passengers",
    period: "April 2025",
    route: "Colombo – Sigiriya – Kandy – Galle",
    ratings: { driver: 5.0, vehicle: 4.8, operator: 4.9 },
    quote: "Lasith was endlessly patient with our children and made every moment of the trip feel effortless.",
    body: "Having Lasith with us was a genuine stroke of luck. His warm manner with the kids put us all at ease, and his clear English meant nothing was ever lost in translation. Punctual, full of thoughtful suggestions for sights and local restaurants, and consistently calm behind the wheel — he was everything we could have asked for. We recommend him without hesitation: attentive, knowledgeable, and completely trustworthy. If you're ever in Europe, Lasith — the first round is on us.",
  },
  {
    id: "malinga",
    photo: "/manus-storage/review_malinga_5636b125.jpeg",
    driver: "Malinga",
    name: "The S Couple",
    pax: "2 passengers",
    period: "May 2025",
    route: "Negombo – Wilpattu – Anuradhapura – Trincomalee",
    ratings: { driver: 5.0, vehicle: 4.7, operator: 4.8 },
    quote: "Malinga's enthusiasm for Sri Lanka's wildlife was completely infectious — he made every safari unforgettable.",
    body: "We chose a wildlife-focused itinerary and Malinga was the perfect guide for it. His knowledge of Wilpattu National Park was extraordinary — he spotted a leopard resting in a tree that our official safari jeep had completely missed. He also arranged a boat safari on the Madu River that wasn't in our original plan, and it turned out to be one of the highlights of the entire trip. Malinga drives with real care on the wildlife reserve tracks, and his patience waiting for the perfect sighting is remarkable. His cheerful commentary throughout the journey made every kilometre between parks enjoyable. An exceptional driver for anyone who loves nature.",
  },
  {
    id: "ravi",
    photo: "/manus-storage/review_ravi_b940edfb.jpeg",
    driver: "Ravi",
    name: "The Y Group",
    pax: "7 passengers",
    period: "March 2025",
    route: "Colombo – Sigiriya – Dambulla – Kandy – Galle",
    ratings: { driver: 4.9, vehicle: 4.8, operator: 4.8 },
    quote: "Ravi kept seven of us happy, on schedule, and laughing the entire way — no small achievement.",
    body: "Travelling as a large group of seven young adults, we were a little nervous about whether a private charter would work for us. Ravi put every concern to rest within the first hour. He has a natural gift for managing group dynamics — knowing when to suggest a stop, when to push on, and when to let everyone just enjoy the scenery in silence. His van was spacious and comfortable, and he kept it spotless throughout the trip. Ravi also has an excellent eye for photo opportunities and was always happy to pull over for the perfect shot. He introduced us to local street food that we would never have found on our own, and every recommendation was outstanding. Ravi made our group trip genuinely special.",
  },
  {
    id: "smith",
    photo: "/manus-storage/review_smith_3ba6750f.jpeg",
    driver: "Smith",
    name: "The K Family",
    pax: "5 passengers",
    period: "February 2025",
    route: "Colombo – Ella – Yala – Mirissa",
    ratings: { driver: 5.0, vehicle: 4.9, operator: 4.8 },
    quote: "Smith's calm professionalism and genuine warmth made our family holiday truly exceptional.",
    body: "We travelled as a family of five — including two young children and a grandmother — and Smith handled every logistical challenge with quiet efficiency and a constant smile. He was meticulous about safety, always ensuring everyone was comfortable before setting off, and his driving on the winding roads to Ella was impressively smooth. Smith arranged a surprise birthday cake for our grandmother at a restaurant in Mirissa, which moved the whole family deeply. His knowledge of Yala National Park was outstanding — we saw leopards, elephants, and crocodiles in a single morning. Smith is the kind of driver who genuinely invests in your happiness. We cannot recommend him highly enough.",
  },
  {
    id: "ranjana",
    photo: "/manus-storage/review_ranjana_50bce7fd.jpeg",
    driver: "Ranjana",
    name: "The H Couple",
    pax: "2 passengers",
    period: "November 2025",
    route: "Colombo – Kandy – Nuwara Eliya – Galle",
    ratings: { driver: 4.9, vehicle: 4.8, operator: 4.8 },
    quote: "Ranjana turned our Sri Lanka trip into something far beyond ordinary sightseeing.",
    body: "We booked a private charter for two and were paired with Ranjana — a decision we couldn't be happier about. He brought a quiet confidence to every drive, navigating mountain roads and busy town centres with equal ease. What stood out most was his genuine enthusiasm: he suggested a white-water rafting experience we hadn't planned, and it became one of the highlights of the trip. His local knowledge of hidden viewpoints, authentic eateries, and cultural customs enriched every day. Ranjana is the kind of guide who makes you feel like a guest of the country, not just a tourist passing through.",
  },
];

// ─── Voice Review Card ─────────────────────────────────────────────────────────
function VoiceCard({ review }: { review: typeof VOICE_REVIEWS[0] }) {
  const overall = Math.round(((review.ratings.driver + review.ratings.vehicle + review.ratings.operator) / 3) * 10) / 10;
  return (
    <article className="voice-card">
      <div className="voice-card-photo-wrap">
        <img src={review.photo} alt={`${review.driver} with guests`} className="voice-card-photo" />
        <div className="voice-card-overall-badge">
          <span className="voice-badge-star">★</span>
          <span className="voice-badge-num">{overall.toFixed(1)}</span>
        </div>
      </div>
      <div className="voice-card-content">
        <div className="voice-card-header">
          <div>
            <div className="voice-card-driver">Driver: {review.driver}</div>
            <div className="voice-card-meta">{review.name} · {review.pax} · {review.period}</div>
            <div className="voice-card-route">📍 {review.route}</div>
          </div>
        </div>
        <blockquote className="voice-card-quote">"{review.quote}"</blockquote>
        <p className="voice-card-body">{review.body}</p>
        <RatingsBreakdown
          driver={review.ratings.driver}
          vehicle={review.ratings.vehicle}
          operator={review.ratings.operator}
        />
      </div>
    </article>
  );
}

// ─── Voice Page ────────────────────────────────────────────────────────────────
export default function Voice() {
  const avgOverall = (
    VOICE_REVIEWS.reduce((sum, r) => sum + (r.ratings.driver + r.ratings.vehicle + r.ratings.operator) / 3, 0) /
    VOICE_REVIEWS.length
  ).toFixed(1);

  return (
    <div className="voice-page">
      {/* Navbar placeholder – reuse site nav via layout */}
      <header className="voice-header">
        <div className="voice-header-inner">
          <Link href="/" className="voice-back-link">← Back to Home</Link>
          <a href="/" className="voice-site-title">SLTCS｜Sri Lanka Car Hire with Private Driver</a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="voice-hero">
          <div className="voice-hero-eyebrow">— VOICE —</div>
          <h1 className="voice-hero-title">What Our Guests Say</h1>
          <p className="voice-hero-sub">
            Real reviews from travellers who have explored Sri Lanka with SLTCS private drivers.
          </p>
          <div className="voice-summary-bar">
            <div className="voice-summary-item">
              <span className="voice-summary-num">{VOICE_REVIEWS.length}</span>
              <span className="voice-summary-label">Reviews</span>
            </div>
            <div className="voice-summary-divider" />
            <div className="voice-summary-item">
              <span className="voice-summary-num">{avgOverall}</span>
              <span className="voice-summary-label">Overall Rating</span>
            </div>
            <div className="voice-summary-divider" />
            <div className="voice-summary-item">
              <span className="voice-summary-num">8</span>
              <span className="voice-summary-label">Drivers</span>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="voice-reviews-section">
          <div className="voice-reviews-grid">
            {VOICE_REVIEWS.map((r) => (
              <VoiceCard key={r.id} review={r} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="voice-cta-section">
          <h2 className="voice-cta-title">Ready to Create Your Own Story?</h2>
          <p className="voice-cta-sub">Join hundreds of travellers who have explored Sri Lanka with our private drivers.</p>
          <a href="/#contact" className="voice-cta-btn">Free Enquiry</a>
        </section>
      </main>

      <footer className="voice-footer">
        <p>© 2025 SLTCS – Sri Lanka Car Hire with Private Driver · <a href="/">en.srilanka-charter.com</a></p>
      </footer>
    </div>
  );
}
