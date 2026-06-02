import { useEffect } from "react";
import SiteNavbar from "@/components/SiteNavbar";

// ─── Plan Data ────────────────────────────────────────────────────────────────
const PLANS = [
  {
    key: "bronze",
    tier: "BRONZE",
    name: "Bronze Plan",
    tagline: "For budget-conscious travellers who want reliable transport",
    description:
      "The most economical option for exploring Sri Lanka. A trainee driver handles all transfers with care, supported by our English-speaking coordinator team. Ideal for independent travellers who prefer to manage their own sightseeing.",
    driver: "Trainee Driver",
    driverNote: "Fully licensed, supervised by our coordinator team",
    color: "#cd7f32",
    bgGradient: "linear-gradient(135deg, rgba(205,127,50,0.08) 0%, rgba(205,127,50,0.03) 100%)",
    borderColor: "rgba(205,127,50,0.35)",
    icon: "B",
    features: [
      { label: "Trainee driver arrangement", detail: "Fully licensed and background-checked" },
      { label: "Airport transfers & point-to-point transfers", detail: "Including hotel and restaurant pick-up/drop-off" },
      { label: "English-speaking local coordinator", detail: "Available throughout your trip for support" },
      { label: "Clean, air-conditioned vehicle", detail: "Japanese-made sedan, van, or big van" },
      { label: "Flexible itinerary", detail: "Adjust your schedule as you travel" },
    ],
    popular: false,
  },
  {
    key: "silver",
    tier: "SILVER",
    name: "Silver Plan",
    tagline: "The best balance of value and quality — our most popular choice",
    description:
      "Our most popular plan. A highly-rated government-certified Tourist Driver or Chauffeur Guide Driver accompanies you throughout your trip — guiding at sightseeing spots, arranging safaris and activities, and ensuring every day runs smoothly.",
    driver: "Highly-Rated Tourist Driver or Chauffeur Guide Driver",
    driverNote: "Government-certified (SLTDA), selected for high ratings",
    color: "#c9a84c",
    bgGradient: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.05) 100%)",
    borderColor: "rgba(201,168,76,0.55)",
    icon: "S",
    features: [
      { label: "Highly-rated Tourist Driver or Chauffeur Guide Driver", detail: "Government-certified, selected for consistently high reviews" },
      { label: "Accompaniment & guiding at sightseeing spots", detail: "Expert commentary at temples, ruins, and viewpoints" },
      { label: "English-speaking local coordinator", detail: "Full-trip support and itinerary assistance" },
      { label: "Safari & activity arrangements", detail: "Yala, Udawalawe, white-water rafting, and more" },
      { label: "Guide service at no extra charge", detail: "Included in the flat-rate price" },
      { label: "Itinerary customisation", detail: "Adjust your route and pace at any time" },
    ],
    popular: true,
  },
  {
    key: "gold",
    tier: "GOLD",
    name: "Gold Plan",
    tagline: "For travellers who demand the very finest Sri Lanka experience",
    description:
      "The premium choice for discerning travellers. A top-rated Chauffeur Guide Driver accompanies you for the entire journey, providing expert commentary, concierge-level service, and a dual support structure that ensures nothing is left to chance.",
    driver: "Top-Rated Chauffeur Guide Driver",
    driverNote: "Guaranteed — our highest-rated drivers only",
    color: "#d4af37",
    bgGradient: "linear-gradient(135deg, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0.03) 100%)",
    borderColor: "rgba(212,175,55,0.4)",
    icon: "G",
    features: [
      { label: "Top-rated Chauffeur Guide Driver guaranteed", detail: "Confirmed at the time of booking" },
      { label: "Full-itinerary accompaniment & expert commentary", detail: "Present at every attraction throughout your trip" },
      { label: "English-speaking local coordinator", detail: "Dedicated support from first enquiry to final drop-off" },
      { label: "Dual support system", detail: "Driver plus coordinator for complete peace of mind" },
      { label: "Safari & activity arrangements", detail: "Priority booking for popular experiences" },
      { label: "Premium vehicle priority", detail: "Best available vehicle allocated first" },
      { label: "24-hour emergency support", detail: "Available throughout your stay in Sri Lanka" },
    ],
    popular: false,
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Which plan is right for me?",
    a: "For most first-time visitors, the Silver Plan offers the best experience. The driver accompanies you at sightseeing spots and handles activity bookings — so you can focus entirely on enjoying the trip. If you are travelling on a tight budget and are comfortable navigating independently, the Bronze Plan is a solid choice. For travellers who want the highest level of personal attention and guaranteed premium service, the Gold Plan is the right choice.",
  },
  {
    q: "Can I change plans after booking?",
    a: "Yes. If you would like to upgrade your plan before your trip begins, please contact us and we will arrange the change. Upgrades are subject to driver availability at the time of request.",
  },
  {
    q: "What is the difference between a Tourist Driver and a Chauffeur Guide Driver?",
    a: "Both hold government-issued Tourist Driver Licences from the Sri Lanka Tourism Development Authority (SLTDA). A Chauffeur Guide Driver has completed additional training in cultural heritage, history, and guiding, and is certified to provide in-depth commentary at major attractions. The Silver Plan assigns a highly-rated Tourist Driver or Chauffeur Guide Driver depending on availability; the Gold Plan guarantees a Chauffeur Guide Driver.",
  },
  {
    q: "Are prices the same for all vehicles?",
    a: "No — prices vary by vehicle type (Sedan, Van, or Big Van) and trip duration. All prices are flat-rate and tax-inclusive. Visit our Pricing page for a full breakdown by vehicle, plan, and currency (USD, GBP, EUR, AUD).",
  },
  {
    q: "Is the price all-inclusive?",
    a: "For standard itineraries, yes. Fuel, highway tolls, driver accommodation, and English-speaking coordinator support are all included in the quoted price. Entrance fees to national parks and cultural sites are paid directly at the gate and are not included. There are no hidden mileage charges.",
  },
];

// ─── Plans Page ───────────────────────────────────────────────────────────────
export default function Plans() {
  useEffect(() => {
    document.title = "Our Plans | SLTCS – Sri Lanka Car Hire with Private Driver";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Compare Bronze, Silver, and Gold plans for private driver hire in Sri Lanka. All plans include flat-rate pricing, English-speaking support, and government-certified drivers. Find the plan that suits your travel style."
      );
    }
  }, []);

  return (
    <div className="plans-page">
      <SiteNavbar mode="page" />

      {/* ── Hero ── */}
      <section className="plans-hero">
        <div className="plans-hero-inner">
          <div className="plans-eyebrow">OUR PLANS</div>
          <h1 className="plans-hero-title">
            Choose the Plan<br />
            <em>That Suits You Best</em>
          </h1>
          <p className="plans-hero-sub">
            Three service tiers, each designed for a different travel style and budget.
            All plans include flat-rate pricing, English-speaking support, and government-certified drivers.
          </p>
          <div className="plans-hero-badges">
            <span className="plans-hero-badge">Flat-Rate Pricing</span>
            <span className="plans-hero-badge">No Hidden Charges</span>
            <span className="plans-hero-badge">English Support</span>
            <span className="plans-hero-badge">Government-Certified Drivers</span>
          </div>
        </div>
      </section>

      {/* ── Plan Cards ── */}
      <section className="plans-section">
        <div className="plans-container">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`plans-card-wrapper${plan.popular ? " plans-card-wrapper--popular" : ""}`}
            >
              {plan.popular && (
                <div className="plans-card-badge-outer" style={{ background: plan.color }}>
                  ★ Most Popular
                </div>
              )}
              <div
                className={`plans-card${plan.popular ? " plans-card--popular" : ""}`}
                style={{ background: plan.bgGradient, borderColor: plan.borderColor }}
              >

              {/* Header */}
              <div className="plans-card-header">
                <div className="plans-card-tier-row">
                  <span
                    className="plans-card-icon"
                    style={{
                      background: plan.color,
                      color: "#0a0a0a",
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      letterSpacing: "0",
                      flexShrink: 0,
                    }}
                  >{plan.icon}</span>
                  <span className="plans-card-tier" style={{ color: plan.color }}>{plan.tier}</span>
                </div>
                <h2 className="plans-card-name" style={{ color: plan.color }}>{plan.name}</h2>
                <p className="plans-card-tagline">{plan.tagline}</p>
              </div>

              {/* Driver */}
              <div className="plans-card-driver" style={{ borderColor: plan.borderColor }}>
                <div className="plans-card-driver-label">ASSIGNED DRIVER</div>
                <div className="plans-card-driver-value">{plan.driver}</div>
                <div className="plans-card-driver-note">{plan.driverNote}</div>
              </div>

              {/* Description */}
              <p className="plans-card-desc">{plan.description}</p>

              {/* Features */}
              <div className="plans-card-features-title">What's Included</div>
              <ul className="plans-card-features">
                {plan.features.map((f, i) => (
                  <li key={i} className="plans-card-feature">
                    <span className="plans-card-check" style={{ color: plan.color }}>✓</span>
                    <div>
                      <span className="plans-card-feature-label">{f.label}</span>
                      <span className="plans-card-feature-detail">{f.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pricing note */}
              <div className="plans-card-pricing" style={{ borderColor: plan.borderColor }}>
                <div className="plans-card-pricing-label">Pricing</div>
                <div className="plans-card-pricing-text">
                  Varies by trip duration, group size, and vehicle type.
                  Free personalised estimate within 24 hours.
                </div>
                <a href="/price" className="plans-card-price-link" style={{ color: plan.color }}>
                  View full price list →
                </a>
              </div>

              {/* CTA */}
              <a
                href="/#contact"
                className={`plans-card-cta${plan.popular ? " plans-card-cta--popular" : ""}`}
                style={plan.popular ? { background: plan.color } : { borderColor: plan.color, color: plan.color }}
              >
                Enquire About This Plan
              </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="plans-compare-section">
        <div className="plans-container">
          <h2 className="plans-section-title">Plan Comparison at a Glance</h2>
          <div className="plans-compare-wrap">
            <table className="plans-compare-table">
              <thead>
                <tr>
                  <th className="plans-compare-th plans-compare-th--feature">Feature</th>
                  <th className="plans-compare-th" style={{ color: "#cd7f32" }}>Bronze</th>
                  <th className="plans-compare-th plans-compare-th--popular" style={{ color: "#c9a84c" }}>Silver ★</th>
                  <th className="plans-compare-th" style={{ color: "#d4af37" }}>Gold</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Driver type", "Trainee Driver", "Highly-Rated Tourist Driver / Chauffeur Guide Driver", "Top-Rated Chauffeur Guide Driver"],
                  ["Airport transfers", "✓", "✓", "✓"],
                  ["English-speaking coordinator", "✓", "✓", "✓"],
                  ["Accompaniment at attractions", "—", "✓", "✓"],
                  ["Safari & activity arrangements", "—", "✓", "✓"],
                  ["Guide service (no extra charge)", "—", "✓", "✓"],
                  ["Dual support system", "—", "—", "✓"],
                  ["Premium vehicle priority", "—", "—", "✓"],
                  ["24-hour emergency support", "—", "—", "✓"],
                  ["Flat-rate pricing", "✓", "✓", "✓"],
                  ["No hidden mileage charges", "✓", "✓", "✓"],
                ].map(([feature, bronze, silver, gold], i) => (
                  <tr key={i} className={i % 2 === 0 ? "plans-compare-row--even" : ""}>
                    <td className="plans-compare-td plans-compare-td--feature">{feature}</td>
                    <td className="plans-compare-td plans-compare-td--center">{bronze}</td>
                    <td className="plans-compare-td plans-compare-td--center plans-compare-td--popular">{silver}</td>
                    <td className="plans-compare-td plans-compare-td--center">{gold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="plans-faq-section">
        <div className="plans-container plans-container--narrow">
          <h2 className="plans-section-title">Frequently Asked Questions</h2>
          <div className="plans-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className="plans-faq-item">
                <div className="plans-faq-q">Q. {faq.q}</div>
                <div className="plans-faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="plans-cta-section">
        <div className="plans-container plans-container--narrow">
          <h2 className="plans-cta-title">Not Sure Which Plan Is Right for You?</h2>
          <p className="plans-cta-sub">
            Send us your travel dates, group size, and the places you'd like to visit.
            We'll recommend the best plan and send a free, personalised estimate — usually within 24 hours.
          </p>
          <a href="/#contact" className="plans-cta-btn">Get a Free Recommendation</a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">SLTCS</div>
            <p className="footer-tagline">Sri Lanka Car Hire with Private Driver</p>
          </div>
          <div className="footer-links">
            <a href="/plans">Plans</a>
            <a href="/vehicles">Vehicles</a>
            <a href="/price">Price</a>
            <a href="/voice">Voice</a>
            <a href="/faq">FAQ</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SLTCS – Sri Lanka Car Hire with Private Driver. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
