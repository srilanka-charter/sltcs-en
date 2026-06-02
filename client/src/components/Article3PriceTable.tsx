/**
 * Article3PriceTable.tsx
 * Interactive price table for Article 3 (Cost & Booking Guide)
 * Features: Sedan / Van / Big Van tab switching, USD / GBP / EUR / AUD currency
 */

import { useState } from "react";

type VehicleKey = "sedan" | "van" | "bigvan";
type CurrencyKey = "USD" | "GBP" | "EUR" | "AUD";

const CURRENCY_SYMBOLS: Record<CurrencyKey, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  AUD: "A$",
};

const CURRENCY_LABELS: Record<CurrencyKey, string> = {
  USD: "$ USD",
  GBP: "£ GBP",
  EUR: "€ EUR",
  AUD: "A$ AUD",
};

// price[currency][tier][vehicle][dayIndex] — days 2..20 (index 0 = 2 days)
const PRICES: Record<CurrencyKey, Record<"bronze" | "silver" | "gold", Record<VehicleKey, number[]>>> = {
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
  AUD: {
    bronze: {
      sedan:  [380,480,580,680,730,790,840,960,1050,1170,1260,1380,1470,1590,1680,1800,1890,2010,2100],
      van:    [470,580,700,820,890,940,1010,1150,1260,1400,1520,1660,1770,1910,2020,2160,2270,2410,2520],
      bigvan: [550,680,830,960,1040,1100,1180,1330,1470,1630,1770,1920,2060,2220,2360,2510,2650,2800,2940],
    },
    silver: {
      sedan:  [440,560,690,820,900,980,1070,1210,1330,1470,1600,1740,1870,2010,2130,2270,2400,2540,2660],
      van:    [520,660,820,960,1050,1140,1240,1400,1540,1710,1850,2020,2160,2330,2470,2640,2780,2940,3080],
      bigvan: [610,760,940,1100,1210,1290,1400,1590,1750,1940,2100,2290,2450,2640,2800,2990,3150,3340,3500],
    },
    gold: {
      sedan:  [490,650,800,960,1070,1180,1290,1460,1610,1780,1940,2100,2260,2430,2580,2750,2900,3070,3220],
      van:    [580,750,930,1100,1220,1330,1460,1640,1820,2020,2190,2380,2550,2750,2920,3110,3280,3480,3640],
      bigvan: [660,840,1050,1240,1380,1490,1630,1840,2030,2240,2440,2650,2850,3060,3250,3460,3660,3870,4060],
    },
  },
};

// Show only key durations in the article (2,3,5,7,10,14 days)
// dayIndex = day - 2  (e.g. 2 days → index 0, 3 days → index 1, 5 days → index 3, ...)
const DISPLAY_DAYS: { label: string; index: number }[] = [
  { label: "2 days", index: 0 },
  { label: "3 days", index: 1 },
  { label: "5 days", index: 3 },
  { label: "7 days", index: 5 },
  { label: "10 days", index: 8 },
  { label: "14 days", index: 12 },
];

const VEHICLES: { key: VehicleKey; label: string; capacity: string }[] = [
  { key: "sedan", label: "Sedan", capacity: "1–3 people" },
  { key: "van", label: "Van", capacity: "3–6 people" },
  { key: "bigvan", label: "Big Van", capacity: "6–9 people" },
];

const CURRENCIES: CurrencyKey[] = ["USD", "GBP", "EUR", "AUD"];

const TIER_COLORS = {
  bronze: "#cd7f32",
  silver: "#c9a84c",
  gold: "#d4af37",
};

function fmt(sym: string, val: number): string {
  return `${sym}${val.toLocaleString()}`;
}

export default function Article3PriceTable() {
  const [vehicle, setVehicle] = useState<VehicleKey>("sedan");
  const [currency, setCurrency] = useState<CurrencyKey>("USD");
  const sym = CURRENCY_SYMBOLS[currency];
  const tiers = ["bronze", "silver", "gold"] as const;

  return (
    <div className="a3-price-table-wrap">
      {/* Currency selector */}
      <div className="a3-currency-tabs">
        {CURRENCIES.map((c) => (
          <button
            key={c}
            className={`a3-currency-btn${currency === c ? " active" : ""}`}
            onClick={() => setCurrency(c)}
          >
            {CURRENCY_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Vehicle tabs */}
      <div className="a3-vehicle-tabs">
        {VEHICLES.map((v) => (
          <button
            key={v.key}
            className={`a3-vehicle-btn${vehicle === v.key ? " active" : ""}`}
            onClick={() => setVehicle(v.key)}
          >
            <span className="a3-vehicle-label">{v.label}</span>
            <span className="a3-vehicle-capacity">{v.capacity}</span>
          </button>
        ))}
      </div>

      {/* Price table */}
      <div className="a3-table-scroll">
        <table className="a3-price-table">
          <thead>
            <tr>
              <th className="a3-th-duration">Duration</th>
              {tiers.map((t) => (
                <th key={t} className="a3-th-tier" style={{ color: TIER_COLORS[t] }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                  {t === "silver" && (
                    <span className="a3-popular-badge">Most Popular</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DISPLAY_DAYS.map(({ label, index }) => (
              <tr key={label} className="a3-tr">
                <td className="a3-td-duration">{label}</td>
                {tiers.map((t) => (
                  <td key={t} className="a3-td-price">
                    {fmt(sym, PRICES[currency][t][vehicle][index])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <p className="a3-table-note">
        All prices are tax-inclusive and apply to standard itineraries with English-speaking drivers.
        Additional charges may apply if the total distance significantly exceeds the standard estimate,
        or if the pick-up or drop-off point is outside the airport area (including Colombo and Negombo).
      </p>

      {/* Currency note */}
      <p className="a3-currency-note">
        Quotes are available in <strong>USD, GBP, EUR, and AUD</strong>. Simply let us know your preferred
        currency when you enquire and we will provide a full estimate in that currency.
        For a complete price list covering all durations (2–20 days) and all vehicle types,
        visit our <a href="/price" className="article-internal-link">Pricing page</a>.
      </p>
    </div>
  );
}
