import { useState } from "react";

// ─── Price Data ───────────────────────────────────────────────────────────────
type VehicleKey = "sedan" | "van" | "bigvan";
type TierKey = "bronze" | "silver" | "gold";
type CurrencyKey = "USD" | "GBP" | "EUR";

const CURRENCY_SYMBOLS: Record<CurrencyKey, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
};

// price[currency][tier][vehicle][dayIndex] — days 2..20
const PRICES: Record<CurrencyKey, Record<TierKey, Record<VehicleKey, number[]>>> = {
  USD: {
    bronze: {
      sedan:  [270,340,410,480,520,560,600,680,750,830,900,980,1050,1130,1200,1280,1350,1430,1500],
      van:    [330,410,500,580,630,670,720,820,900,1000,1080,1180,1260,1360,1440,1540,1620,1720,1800],
      bigvan: [390,480,590,680,740,780,840,950,1050,1160,1260,1370,1470,1580,1680,1790,1890,2000,2100],
    },
    silver: {
      sedan:  [310,400,490,580,640,700,760,860,950,1050,1140,1240,1330,1430,1520,1620,1710,1810,1900],
      van:    [370,470,580,680,750,810,880,1000,1100,1220,1320,1440,1540,1660,1760,1880,1980,2100,2200],
      bigvan: [430,540,670,780,860,920,1000,1130,1250,1380,1500,1630,1750,1880,2000,2130,2250,2380,2500],
    },
    gold: {
      sedan:  [350,460,570,680,760,840,920,1040,1150,1270,1380,1500,1610,1730,1840,1960,2070,2190,2300],
      van:    [410,530,660,780,870,950,1040,1180,1300,1440,1560,1700,1820,1960,2080,2220,2340,2480,2600],
      bigvan: [470,600,750,880,980,1060,1160,1310,1450,1600,1740,1890,2030,2180,2320,2470,2610,2760,2900],
    },
  },
  GBP: {
    bronze: {
      sedan:  [200,240,290,340,370,400,420,480,530,590,640,690,740,800,850,910,950,1010,1060],
      van:    [250,290,360,420,450,480,510,570,640,710,770,830,890,960,1030,1090,1150,1210,1280],
      bigvan: [290,350,430,490,540,570,600,680,760,840,920,980,1060,1140,1220,1300,1360,1440,1520],
    },
    silver: {
      sedan:  [230,290,350,420,460,510,540,620,680,760,820,890,950,1030,1090,1170,1220,1300,1360],
      van:    [280,340,420,500,540,590,630,710,790,880,950,1030,1100,1190,1270,1350,1420,1500,1580],
      bigvan: [320,400,490,570,630,680,720,820,910,1010,1100,1180,1270,1370,1460,1560,1630,1730,1820],
    },
    gold: {
      sedan:  [260,340,410,500,550,620,660,760,830,930,1000,1090,1160,1260,1330,1430,1490,1590,1660],
      van:    [310,390,480,580,630,700,750,850,940,1050,1130,1230,1310,1420,1510,1610,1690,1790,1880],
      bigvan: [350,450,550,650,720,790,840,960,1060,1180,1280,1380,1480,1600,1700,1820,1900,2020,2120],
    },
  },
  EUR: {
    bronze: {
      sedan:  [230,280,350,400,440,460,500,560,620,680,740,810,870,930,990,1050,1120,1180,1240],
      van:    [280,340,420,480,530,560,600,680,750,830,900,980,1050,1130,1200,1280,1350,1430,1500],
      bigvan: [330,400,500,570,620,650,700,790,880,970,1060,1140,1230,1320,1410,1500,1580,1670,1760],
    },
    silver: {
      sedan:  [270,330,420,490,550,590,640,720,800,880,960,1040,1120,1200,1280,1360,1440,1520,1600],
      van:    [320,390,490,570,640,690,740,840,930,1030,1120,1210,1300,1400,1490,1590,1670,1770,1860],
      bigvan: [370,450,570,660,730,780,840,950,1060,1170,1280,1370,1480,1590,1700,1810,1900,2010,2120],
    },
    gold: {
      sedan:  [310,380,490,580,660,720,780,880,980,1080,1180,1270,1370,1470,1570,1670,1760,1860,1960],
      van:    [360,440,560,660,750,820,880,1000,1110,1230,1340,1440,1550,1670,1780,1900,1990,2110,2220],
      bigvan: [410,500,640,750,840,910,980,1110,1240,1370,1500,1600,1730,1860,1990,2120,2220,2350,2480],
    },
  },
};

const DAYS = Array.from({ length: 19 }, (_, i) => i + 2); // 2..20

const TIERS: { key: TierKey; label: string; badge?: string; color: string; features: string[] }[] = [
  {
    key: "bronze",
    label: "Bronze Plan",
    color: "#cd7f32",
    features: [
      "Trainee driver assigned",
      "Transfer & transportation service",
      "English-speaking local coordinator",
      "Clean air-conditioned vehicle",
      "Recommended plan for those who want to enjoy traveling economically",
    ],
  },
  {
    key: "silver",
    label: "Silver Plan",
    badge: "Most Popular",
    color: "#c9a84c",
    features: [
      "Government-certified Tourist Driver or above",
      "Accompaniment & guiding at sightseeing spots",
      "English-speaking local coordinator",
      "Safari & activity arrangements",
      "Guide service at no extra charge",
    ],
  },
  {
    key: "gold",
    label: "Gold Plan",
    color: "#d4af37",
    features: [
      "Highly-rated Chauffeur Guide Driver guaranteed",
      "Full-itinerary accompaniment & guiding at sightseeing spots",
      "English-speaking local coordinator",
      "Dual support system",
      "Safari & activity arrangements",
    ],
  },
];

const VEHICLES: { key: VehicleKey; label: string; capacity: string }[] = [
  { key: "sedan", label: "Sedan", capacity: "1–3 people" },
  { key: "van", label: "Van", capacity: "3–6 people" },
  { key: "bigvan", label: "Big Van", capacity: "6–9 people" },
];

const CURRENCIES: CurrencyKey[] = ["USD", "GBP", "EUR"];

// ─── Plan Card ────────────────────────────────────────────────────────────────
function PlanCard({
  tier,
  currency,
}: {
  tier: (typeof TIERS)[number];
  currency: CurrencyKey;
}) {
  const [vehicle, setVehicle] = useState<VehicleKey>("sedan");
  const sym = CURRENCY_SYMBOLS[currency];
  const prices = PRICES[currency][tier.key][vehicle];

  return (
    <div
      style={{
        background: "var(--dark2, #1a1a1a)",
        border: `1px solid ${tier.color}40`,
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${tier.color}22, ${tier.color}08)`,
          borderBottom: `1px solid ${tier.color}30`,
          padding: "24px 28px 20px",
          minHeight: "200px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <span
            style={{
              background: tier.color,
              color: "#000",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "3px 10px",
              borderRadius: "20px",
              textTransform: "uppercase",
            }}
          >
            {tier.key.toUpperCase()}
          </span>
          {tier.badge && (
            <span
              style={{
                background: "rgba(201,168,76,0.15)",
                border: "1px solid rgba(201,168,76,0.4)",
                color: "#c9a84c",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                padding: "2px 8px",
                borderRadius: "20px",
                textTransform: "uppercase",
              }}
            >
              {tier.badge}
            </span>
          )}
        </div>
        <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700, margin: "0 0 12px" }}>
          {tier.label}
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tier.features.map((f) => (
            <li
              key={f}
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.82rem",
                padding: "3px 0",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              {f.trim() && <span style={{ color: tier.color, flexShrink: 0, marginTop: "1px" }}>✓</span>}
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Vehicle Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.2)",
        }}
      >
        {VEHICLES.map((v) => (
          <button
            key={v.key}
            onClick={() => setVehicle(v.key)}
            style={{
              flex: 1,
              padding: "10px 4px",
              background: "none",
              border: "none",
              borderBottom: vehicle === v.key ? `2px solid ${tier.color}` : "2px solid transparent",
              color: vehicle === v.key ? tier.color : "rgba(255,255,255,0.5)",
              fontSize: "0.75rem",
              fontWeight: vehicle === v.key ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            <div>{v.label}</div>
            <div style={{ fontSize: "0.65rem", opacity: 0.7 }}>{v.capacity}</div>
          </button>
        ))}
      </div>

      {/* Price Table */}
      <div style={{ flex: 1, overflowY: "auto", maxHeight: "420px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.3)" }}>
              <th
                style={{
                  padding: "10px 16px",
                  textAlign: "left",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  position: "sticky",
                  top: 0,
                  background: "rgba(20,20,20,0.95)",
                }}
              >
                Days
              </th>
              <th
                style={{
                  padding: "10px 16px",
                  textAlign: "right",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  position: "sticky",
                  top: 0,
                  background: "rgba(20,20,20,0.95)",
                }}
              >
                Price (incl. tax)
              </th>
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day, idx) => (
              <tr
                key={day}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                }}
              >
                <td
                  style={{
                    padding: "10px 16px",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                  }}
                >
                  {day} days
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    textAlign: "right",
                    color: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  {sym}
                  {prices[idx].toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Pricing() {
  const [currency, setCurrency] = useState<CurrencyKey>("USD");

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--dark, #0d1117)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Hero */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "60px",
          textAlign: "center",
          background: "linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)",
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
          PRICING
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            margin: "0 auto 20px",
            maxWidth: "700px",
          }}
        >
          Sri Lanka Car Hire{" "}
          <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Pricing</em>
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "1.05rem",
            maxWidth: "600px",
            margin: "0 auto 0",
            lineHeight: 1.7,
          }}
        >
          Transparent flat-rate pricing at industry-leading low rates — for a safe and worry-free journey through Sri Lanka.
        </p>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Intro */}
        <section style={{ padding: "56px 0 0" }}>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: "820px" }}>
            At Sri Lanka Taxi Charter Service (SLTCS), we keep our prices as low as possible while maintaining the highest quality of service. We believe that going any lower would compromise the experience we are committed to delivering.
          </p>
        </section>

        {/* Risks section */}
        <section
          style={{
            margin: "40px 0",
            background: "rgba(255,180,0,0.05)",
            border: "1px solid rgba(255,180,0,0.2)",
            borderRadius: "12px",
            padding: "28px 32px",
          }}
        >
          <h2
            style={{
              color: "#c9a84c",
              fontSize: "1.05rem",
              fontWeight: 700,
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ⚠ Risks of Choosing Ultra-Low-Cost Services
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "14px" }}>
            Services that compete solely on price may expose you to the following issues:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              "A large gap between the quoted price and the final amount charged",
              "No English support from the initial enquiry stage",
              "Old or poorly maintained vehicles assigned",
              "Persistent detours to kickback-affiliated shops, disrupting your itinerary",
            ].map((item) => (
              <li
                key={item}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.88rem",
                  padding: "5px 0",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span style={{ color: "#c9a84c", flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: 1.7, marginTop: "16px" }}>
            In particular, some seemingly low-cost services impose mileage limits and charge for overages. There have been cases where drivers reported inflated distances, resulting in bills far exceeding expectations.
          </p>
        </section>

        {/* Transparent pricing */}
        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            SLTCS's Transparent Flat-Rate Pricing
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: "820px" }}>
            SLTCS provides a fixed quote based on your itinerary, discussed in English from the very first enquiry. Even if your itinerary is not yet finalised, simply share the spots you wish to visit and we will suggest the best route with a detailed estimate.
          </p>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: "820px", marginTop: "12px" }}>
            All prices below are <strong style={{ color: "#fff" }}>tax-inclusive</strong> and apply to <strong style={{ color: "#fff" }}>English-speaking drivers</strong>. We offer three plans to match your travel style.
          </p>
        </section>

        {/* Plan Overview */}
        <section style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              color: "#fff",
              marginBottom: "24px",
              marginTop: "0",
              textAlign: "center",
            }}
          >
            Plan Overview
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {TIERS.map((tier) => (
              <div
                key={tier.key}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${tier.color}30`,
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span
                    style={{
                      background: tier.color,
                      color: "#000",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      textTransform: "uppercase",
                    }}
                  >
                    {tier.key.toUpperCase()}
                  </span>
                  {tier.badge && (
                    <span
                      style={{
                        background: "rgba(201,168,76,0.15)",
                        border: "1px solid rgba(201,168,76,0.4)",
                        color: "#c9a84c",
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        padding: "2px 8px",
                        borderRadius: "20px",
                        textTransform: "uppercase",
                      }}
                    >
                      {tier.badge}
                    </span>
                  )}
                </div>
                <h3 style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 700, margin: "0 0 12px" }}>
                  {tier.label}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.82rem",
                        padding: "4px 0",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: tier.color, flexShrink: 0, marginTop: "1px" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Currency Tabs */}
        <section style={{ marginTop: "0", paddingTop: "0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "12px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                color: "#fff",
                margin: 0,
              }}
            >
              Price List
            </h2>
            <div
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  style={{
                    padding: "8px 20px",
                    background: currency === c ? "rgba(201,168,76,0.2)" : "none",
                    border: "none",
                    borderRight: c !== "EUR" ? "1px solid rgba(255,255,255,0.1)" : "none",
                    color: currency === c ? "#c9a84c" : "rgba(255,255,255,0.55)",
                    fontSize: "0.85rem",
                    fontWeight: currency === c ? 700 : 400,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {CURRENCY_SYMBOLS[c]} {c}
                </button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "8px",
              padding: "14px 20px",
              marginBottom: "32px",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#c9a84c" }}>Note:</strong> The prices below apply to standard itineraries. Additional charges may apply if the total distance exceeds the standard estimate, or if the pick-up or drop-off point is outside the airport area (including Colombo and Negombo).
            </p>
          </div>

          {/* Plan Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {TIERS.map((tier) => (
              <PlanCard key={tier.key} tier={tier} currency={currency} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: "center", marginTop: "64px" }}>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", marginBottom: "24px" }}>
            Not sure which plan suits you? Feel free to contact us for a free, personalised estimate.
          </p>
          <button
            onClick={scrollToContact}
            style={{
              background: "#c9a84c",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              padding: "14px 36px",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            💬 Free Enquiry
          </button>
        </section>
      </div>
    </div>
  );
}
