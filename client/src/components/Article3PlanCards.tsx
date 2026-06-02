/**
 * Article3PlanCards.tsx
 * Visual plan comparison cards for Article 3
 * Bronze / Silver / Gold with internal links to /plans
 */

export default function Article3PlanCards() {
  const plans = [
    {
      key: "bronze",
      label: "Bronze Plan",
      tagline: "Best Value",
      color: "#cd7f32",
      bgColor: "rgba(205,127,50,0.08)",
      borderColor: "rgba(205,127,50,0.4)",
      driver: "Trainee Driver",
      features: [
        "Full transfer service included",
        "English-speaking coordinator support",
        "Most economical option",
        "Ideal for independent travellers",
      ],
      note: "Best for travellers comfortable navigating on their own.",
      href: "/plans",
    },
    {
      key: "silver",
      label: "Silver Plan",
      tagline: "Most Popular",
      color: "#c9a84c",
      bgColor: "rgba(201,168,76,0.12)",
      borderColor: "rgba(201,168,76,0.6)",
      driver: "Highly-Rated Tourist Driver or Chauffeur Guide Driver",
      features: [
        "Accompaniment & guiding at sightseeing spots",
        "Safari & activity arrangements included",
        "Guide service at no extra charge",
        "Best balance of value and experience",
      ],
      note: "The recommended choice for most first-time visitors to Sri Lanka.",
      href: "/plans",
      highlight: true,
    },
    {
      key: "gold",
      label: "Gold Plan",
      tagline: "Premium Service",
      color: "#d4af37",
      bgColor: "rgba(212,175,55,0.08)",
      borderColor: "rgba(212,175,55,0.4)",
      driver: "Chauffeur Guide Driver (Highly Rated)",
      features: [
        "Full-itinerary accompaniment",
        "Dual support system throughout",
        "Priority service & personalised attention",
        "Highest level of care for every traveller",
      ],
      note: "Recommended for travellers who want the finest personal experience.",
      href: "/plans",
    },
  ];

  return (
    <div className="a3-plan-cards">
      {plans.map((plan) => (
        <a
          key={plan.key}
          href={plan.href}
          className={`a3-plan-card${plan.highlight ? " a3-plan-card--highlight" : ""}`}
          style={{
            background: plan.bgColor,
            borderColor: plan.borderColor,
          }}
        >
          {plan.highlight && (
            <div className="a3-plan-badge" style={{ background: plan.color }}>
              Most Popular
            </div>
          )}
          <div className="a3-plan-header">
            <div>
              <div className="a3-plan-name" style={{ color: plan.color }}>
                {plan.label}
              </div>
              <div className="a3-plan-tagline">{plan.tagline}</div>
            </div>
          </div>
          <div className="a3-plan-driver" style={{ borderColor: plan.borderColor }}>
            <span className="a3-plan-driver-label">Driver</span>
            <span className="a3-plan-driver-value">{plan.driver}</span>
          </div>
          <ul className="a3-plan-features">
            {plan.features.map((f, i) => (
              <li key={i} className="a3-plan-feature">
                <span className="a3-plan-check" style={{ color: plan.color }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="a3-plan-note">{plan.note}</p>
          <div className="a3-plan-link" style={{ color: plan.color }}>
            View Plan Details →
          </div>
        </a>
      ))}
    </div>
  );
}
