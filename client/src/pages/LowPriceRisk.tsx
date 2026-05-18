import { useEffect } from "react";
import { Link } from "wouter";
import SiteNavbar from "@/components/SiteNavbar";

// ─── SEO ─────────────────────────────────────────────────────────────────────
const PAGE_TITLE =
  "Risks of Low-Price Car Hire in Sri Lanka | Why Cheap Services Cost More | SLTCS";
const PAGE_DESC =
  "Discover the hidden risks of ultra-low-cost car hire in Sri Lanka: mileage limits, inflated distances, no-show drivers, kickback detours, and poor support. Learn why SLTCS prioritises quality over price.";

// ─── Risk Items ───────────────────────────────────────────────────────────────
const RISKS = [
  {
    id: "mileage-limits",
    icon: "📏",
    title: "Hidden Mileage Limits and Overage Charges",
    body: [
      "Budget-priced services almost always include distance caps buried in the fine print. A headline rate of £80 per day may look attractive — until you notice the 150 km daily limit. Sri Lanka's top attractions are spread across the island, and a single day of sightseeing can easily exceed 250 km.",
      "One of our team members experienced this firsthand as a tourist: a Colombo–Sigiriya transfer of roughly 180 km was billed as 250 km. The dispute that followed was stressful and time-consuming — the last thing you want on a holiday.",
      "SLTCS quotes a single flat rate based on your full itinerary. There are no per-kilometre charges, no distance caps, and no surprise additions at the end of each day.",
    ],
    highlight:
      "With SLTCS, your price is agreed in writing before departure. What you see is what you pay.",
  },
  {
    id: "old-vehicles",
    icon: "🚗",
    title: "Ageing Vehicles in Poor Condition",
    body: [
      "Sri Lanka imposes steep import tariffs on vehicles — a car priced at £12,000 in Japan can cost £36,000 once imported. Drivers who cannot afford newer models continue operating vehicles that are 20 years old or more.",
      "A driver who does invest in a newer car must service a substantial loan, which means their daily rates must be higher to remain viable. When a price seems unusually low, the vehicle quality is almost always the reason.",
      "SLTCS works exclusively with drivers who maintain modern, well-serviced vehicles. Every car in our network is air-conditioned, clean, and regularly inspected.",
    ],
    highlight: "There is always a reason behind a low price — and it usually affects your comfort and safety.",
  },
  {
    id: "no-show",
    icon: "⏰",
    title: "Drivers Who Fail to Appear",
    body: [
      "The first moments of a trip — arriving at an airport or hotel and looking for your driver — are already nerve-wracking. Budget operators sometimes fail to show up entirely, leaving travellers stranded in an unfamiliar place with no local support.",
      "Even a significant delay at the start of the day can cascade into missed entry times, closed attractions, and a ruined schedule.",
      "SLTCS employs drivers with a proven track record of punctuality. Any driver who is late without good reason receives immediate feedback; repeated issues result in contract termination. Should an unforeseen problem ever arise, our English-speaking coordinators are available around the clock to resolve it.",
    ],
    highlight:
      "Our 24/7 English-speaking support team ensures you are never left without assistance.",
  },
  {
    id: "limited-scope",
    icon: "🗺️",
    title: "Drivers Who Only Cover Point-to-Point Transfers",
    body: [
      "A private charter should handle all ground transportation throughout your trip — not just the main inter-city legs. Some low-cost drivers drop you at your hotel and consider their job done, leaving you to arrange separate transport to each attraction.",
      "For example, a driver might take you from Colombo to Sigiriya but refuse to drive the short distance from your hotel to Sigiriya Rock or the Dambulla Cave Temple. Negotiating fares with unfamiliar local drivers at each stop adds cost, stress, and unpredictability.",
      "SLTCS drivers accompany you door to door throughout your entire itinerary. If a driver ever falls short of this standard, we compensate the customer for any additional costs incurred and terminate the driver's contract.",
    ],
    highlight:
      "Your SLTCS driver is responsible for every journey from the moment you land to the moment you depart.",
  },
  {
    id: "kickbacks",
    icon: "🛍️",
    title: "Persistent Detours to Kickback-Affiliated Shops",
    body: [
      "This is a well-known frustration for travellers across South and South-East Asia. Drivers operating on thin margins supplement their income by steering passengers to restaurants, gem shops, and Ayurvedic spas that pay referral commissions.",
      "The establishments involved are rarely the best options — prices tend to be inflated and quality inconsistent. Worse, these unplanned stops eat into your day and can prevent you from completing your original itinerary.",
      "SLTCS drivers are paid fairly, so they have no financial incentive to take you anywhere you have not asked to visit. If you would like recommendations for an Ayurvedic treatment, a jeep safari, or a whale-watching excursion, your driver can arrange trusted options — but only when you ask.",
    ],
    highlight:
      "SLTCS drivers suggest activities only when requested. Your itinerary remains entirely under your control.",
  },
  {
    id: "poor-support",
    icon: "💬",
    title: "No Meaningful Support Before or During Your Trip",
    body: [
      "Low-cost operators often lack the infrastructure to provide genuine pre-trip assistance. Planning a Sri Lanka itinerary involves many moving parts — distances, road conditions, opening hours, seasonal closures — and expert guidance makes a significant difference.",
      "Many budget services go silent once a booking is confirmed, leaving customers without help if anything changes or goes wrong on the ground.",
      "SLTCS provides English-language support from your very first enquiry through to your final drop-off. Our locally based coordinators — with over 20 years of combined experience — are on hand to assist with itinerary planning, last-minute changes, and any issues that arise during your trip.",
    ],
    highlight:
      "From first contact to final farewell, SLTCS is with you every step of the way.",
  },
];

// ─── Why Prices Are What They Are ────────────────────────────────────────────
const COST_FACTORS = [
  {
    label: "Vehicle Import Tariffs",
    desc: "Sri Lanka levies high import duties on automobiles. A car worth £12,000 in Japan costs approximately £36,000 after importation. Drivers must price their services accordingly to service vehicle loans.",
  },
  {
    label: "Government-Certified Drivers",
    desc: "SLTCS works only with drivers holding official Sri Lanka Tourism Development Authority (SLTDA) licences. Qualified drivers command higher rates — and deliver a measurably better experience.",
  },
  {
    label: "Rigorous Driver Selection",
    desc: "Our local managers, with over 20 years of experience, personally vet every driver on attitude, language ability, punctuality, and vehicle condition. Only the top candidates are accepted.",
  },
  {
    label: "Ongoing Quality Management",
    desc: "Customer feedback is reviewed after every trip. Drivers who receive complaints are counselled immediately; those who fail to improve are removed from the network.",
  },
];

export default function LowPriceRisk() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Title
    document.title = PAGE_TITLE;

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    metaDesc.content = PAGE_DESC;

    // JSON-LD: Article schema
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Risks of Low-Price Car Hire in Sri Lanka: Why Cheap Services Often Cost More",
      description: PAGE_DESC,
      url: "https://en.srilanka-charter.com/low-price-risk",
      author: {
        "@type": "Organization",
        name: "SLTCS – Sri Lanka Car Hire with Private Driver",
        url: "https://en.srilanka-charter.com",
      },
      publisher: {
        "@type": "Organization",
        name: "SLTCS – Sri Lanka Car Hire with Private Driver",
        url: "https://en.srilanka-charter.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://en.srilanka-charter.com/low-price-risk",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "low-price-risk-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = "SLTCS｜Sri Lanka Car Hire with Private Driver";
      metaDesc!.content = prevDesc;
      document.getElementById("low-price-risk-jsonld")?.remove();
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--dark, #0d1117)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <SiteNavbar mode="page" />

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "60px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "#c9a84c",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            padding: "6px 18px",
            borderRadius: "20px",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          SERVICE QUALITY
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.25,
            margin: "0 auto 20px",
            maxWidth: "760px",
          }}
        >
          Why{" "}
          <em style={{ color: "#c9a84c", fontStyle: "italic" }}>
            Low-Price
          </em>{" "}
          Car Hire in Sri Lanka Carries Real Risks
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "1.05rem",
            maxWidth: "640px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          A headline rate that looks too good to be true usually is. This page
          explains the six most common pitfalls of ultra-budget car hire
          services in Sri Lanka — and how SLTCS addresses each one.
        </p>
      </section>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ── Intro ── */}
        <section style={{ padding: "56px 0 0" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.85,
              fontSize: "0.97rem",
            }}
          >
            SLTCS was founded on a straightforward conviction: a Sri Lanka
            holiday should not be spoiled by the very driver hired to make it
            memorable. In the early days of the business, we experimented with
            lower-cost driver arrangements to keep prices competitive. The
            customer complaints that followed taught us an important lesson —
            below a certain threshold, quality cannot be maintained.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.85,
              fontSize: "0.97rem",
              marginTop: "16px",
            }}
          >
            Today, SLTCS works exclusively with government-licensed drivers who
            meet our own strict internal standards. Our rates are set at the
            lowest level that allows us to uphold that commitment. This page
            explains what happens when services cut below that level.
          </p>
        </section>

        {/* ── Risk Cards ── */}
        <section style={{ marginTop: "56px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              color: "#fff",
              marginBottom: "36px",
              textAlign: "center",
            }}
          >
            Six Risks of Choosing an Ultra-Low-Cost Service
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {RISKS.map((risk, idx) => (
              <div
                key={risk.id}
                id={risk.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "14px",
                  padding: "32px",
                }}
              >
                {/* Number + Title */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(201,168,76,0.12)",
                      border: "1px solid rgba(201,168,76,0.3)",
                      color: "#c9a84c",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      color: "#fff",
                      margin: 0,
                      lineHeight: 1.35,
                      paddingTop: "8px",
                    }}
                  >
                    <span style={{ marginRight: "8px" }}>{risk.icon}</span>
                    {risk.title}
                  </h3>
                </div>

                {/* Body paragraphs */}
                {risk.body.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    style={{
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.8,
                      fontSize: "0.93rem",
                      marginBottom: pIdx < risk.body.length - 1 ? "14px" : "20px",
                      marginTop: 0,
                    }}
                  >
                    {para}
                  </p>
                ))}

                {/* Highlight callout */}
                <div
                  style={{
                    background: "rgba(201,168,76,0.07)",
                    borderLeft: "3px solid #c9a84c",
                    borderRadius: "0 8px 8px 0",
                    padding: "12px 16px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                    fontStyle: "italic",
                  }}
                >
                  {risk.highlight}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Prices Are What They Are ── */}
        <section style={{ marginTop: "64px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            Why SLTCS Prices Are What They Are
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.93rem",
              lineHeight: 1.8,
              marginBottom: "28px",
            }}
          >
            Sri Lanka's car hire market looks inexpensive compared with Europe,
            but several structural factors push costs higher than many
            travellers expect. Understanding these factors helps explain why
            responsible operators cannot simply match the lowest advertised
            rates.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {COST_FACTORS.map((factor) => (
              <div
                key={factor.label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  padding: "22px 24px",
                }}
              >
                <div
                  style={{
                    color: "#c9a84c",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  {factor.label}
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.68)",
                    fontSize: "0.88rem",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {factor.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Gold Plan callout ── */}
        <section
          style={{
            marginTop: "64px",
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "14px",
            padding: "36px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#c9a84c",
              color: "#000",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "4px 14px",
              borderRadius: "20px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            GOLD PLAN
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.45rem",
              color: "#fff",
              margin: "0 0 16px",
              lineHeight: 1.3,
            }}
          >
            The Gold Plan: Guided-Tour Quality at a Private-Charter Price
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "0.93rem",
              lineHeight: 1.8,
              maxWidth: "640px",
              margin: "0 auto 24px",
            }}
          >
            Our Gold Plan assigns drivers holding the Chauffeur Guide Driver
            licence — the highest qualification issued by the Sri Lankan
            government. Unlike standard Tourist Driver licences, this
            credential permits the driver to accompany you inside tourist sites
            and provide expert commentary on the history and culture of each
            location.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "0.93rem",
              lineHeight: 1.8,
              maxWidth: "640px",
              margin: "0 auto 28px",
            }}
          >
            Whether you are ascending Sigiriya Rock, exploring the ancient
            ruins of Anuradhapura, or visiting the Temple of the Tooth in
            Kandy, your Gold Plan driver is beside you — explaining, guiding,
            and enhancing every moment. Trusted recommendations for safari
            jeep tours and whale-watching excursions are available on request.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/price"
              style={{
                display: "inline-block",
                background: "#c9a84c",
                color: "#000",
                fontWeight: 700,
                fontSize: "0.9rem",
                padding: "13px 32px",
                borderRadius: "6px",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              View Pricing
            </Link>
            <a
              href="/#contact"
              style={{
                display: "inline-block",
                background: "transparent",
                color: "#c9a84c",
                fontWeight: 600,
                fontSize: "0.9rem",
                padding: "13px 32px",
                borderRadius: "6px",
                textDecoration: "none",
                border: "1px solid rgba(201,168,76,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              Free Enquiry
            </a>
          </div>
        </section>

        {/* ── Summary ── */}
        <section style={{ marginTop: "56px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            The True Cost of a Cheap Service
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.85,
              fontSize: "0.95rem",
              marginBottom: "16px",
            }}
          >
            A low headline price rarely reflects the full cost of a trip. Once
            mileage overages, detour time, last-minute local transport
            arrangements, and the stress of poor communication are factored in,
            a budget service frequently ends up costing more — in money, time,
            and peace of mind — than a properly priced alternative.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.85,
              fontSize: "0.95rem",
            }}
          >
            SLTCS sets its prices at the minimum level that allows us to
            deliver a service we are genuinely proud of. We invite you to
            compare our flat-rate quotes and judge for yourself.
          </p>
        </section>

        {/* ── Back to Pricing ── */}
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <Link
            href="/price"
            style={{
              color: "#c9a84c",
              fontSize: "0.9rem",
              textDecoration: "none",
              borderBottom: "1px solid rgba(201,168,76,0.4)",
              paddingBottom: "2px",
            }}
          >
            ← Back to Pricing
          </Link>
        </div>

      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "32px 24px",
          textAlign: "center",
          color: "rgba(255,255,255,0.35)",
          fontSize: "0.8rem",
        }}
      >
        <p style={{ margin: "0 0 8px" }}>
          © {new Date().getFullYear()} Sri Lanka Taxi Charter Service
          International Limited. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Home</a>
          <a href="/price" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Pricing</a>
          <a href="/vehicles" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Vehicles</a>
          <a href="/faq" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>FAQ</a>
          <a href="/#contact" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
