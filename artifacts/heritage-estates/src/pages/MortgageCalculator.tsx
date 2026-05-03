import { useState, useCallback } from "react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";

/* ─────────────────────────────────────────────────────────────────
   MORTGAGE CALCULATOR LOGIC
───────────────────────────────────────────────────────────────── */

type MortgageType = "repayment" | "interest-only";
type DepositMode  = "amount" | "percent";

function calcRepayment(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0 || termYears <= 0) return 0;
  if (annualRate === 0) return principal / (termYears * 12);
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calcInterestOnly(principal: number, annualRate: number): number {
  if (principal <= 0 || annualRate === 0) return 0;
  return (principal * (annualRate / 100)) / 12;
}

function fmt(n: number): string {
  return n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ─────────────────────────────────────────────────────────────────
   SDLT CALCULATOR LOGIC
   Rates: England & Northern Ireland post 1 April 2025
   Source: https://www.gov.uk/stamp-duty-land-tax
───────────────────────────────────────────────────────────────── */

type BuyerType = "main-residence" | "investor" | "first-time-buyer";

interface Band { from: number; to: number; rate: number; }

// Main Residence — standard rates from 1 April 2025
const MAIN_RESIDENCE_BANDS: Band[] = [
  { from: 0,       to: 125_000,  rate: 0  },
  { from: 125_000, to: 250_000,  rate: 2  },
  { from: 250_000, to: 925_000,  rate: 5  },
  { from: 925_000, to: 1_500_000, rate: 10 },
  { from: 1_500_000, to: Infinity, rate: 12 },
];

// Investor / Additional Property — standard rates + 5% surcharge
const INVESTOR_BANDS: Band[] = [
  { from: 0,       to: 125_000,  rate: 5  },
  { from: 125_000, to: 250_000,  rate: 7  },
  { from: 250_000, to: 925_000,  rate: 10 },
  { from: 925_000, to: 1_500_000, rate: 15 },
  { from: 1_500_000, to: Infinity, rate: 17 },
];

// First-Time Buyer — 0% to £300k, 5% £300k–£500k
// Above £500k: no relief, use main residence rates
const FTB_BANDS: Band[] = [
  { from: 0,       to: 300_000, rate: 0 },
  { from: 300_000, to: 500_000, rate: 5 },
];

interface SDLTBandResult { from: number; to: number; rate: number; tax: number; }

function calcSDLT(price: number, buyerType: BuyerType) {
  if (price <= 0) return { bands: [] as SDLTBandResult[], total: 0, ftbExceeds: false };

  const ftbExceeds = buyerType === "first-time-buyer" && price > 500_000;
  const bands =
    buyerType === "investor"            ? INVESTOR_BANDS :
    buyerType === "first-time-buyer" && !ftbExceeds ? FTB_BANDS :
    MAIN_RESIDENCE_BANDS;

  const result: SDLTBandResult[] = [];
  let total = 0;

  for (const band of bands) {
    if (price <= band.from) break;
    const ceiling = band.to === Infinity ? price : band.to;
    const taxable = Math.min(price, ceiling) - band.from;
    if (taxable <= 0) continue;
    const tax = Math.round(taxable * (band.rate / 100));
    result.push({ from: band.from, to: Math.min(price, ceiling), rate: band.rate, tax });
    total += tax;
  }

  return { bands: result, total, ftbExceeds };
}

// Format a band boundary value for display (£125k, £1.5m etc.)
function fmtBoundary(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `£${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}m`;
  }
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`;
  return `£${n}`;
}

function fmtInt(n: number): string {
  return n.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/* ─────────────────────────────────────────────────────────────────
   BUYER TYPE INFO TEXT
───────────────────────────────────────────────────────────────── */

const BUYER_INFO: Record<BuyerType, { heading: string; text: string }> = {
  "main-residence": {
    heading: "SDLT — MAIN RESIDENCE",
    text: "Standard residential rates apply. No SDLT on the first £125,000, then 2% on £125,001–£250,000, 5% on £250,001–£925,000, 10% on £925,001–£1.5m, and 12% above that.",
  },
  "first-time-buyer": {
    heading: "SDLT — FIRST-TIME BUYER",
    text: "First-time buyers pay no SDLT on the first £300,000. Between £300,001 and £500,000, a 5% rate applies on that portion only. Properties above £500,000 do not qualify for first-time buyer relief — standard rates apply instead.",
  },
  "investor": {
    heading: "SDLT — INVESTOR / ADDITIONAL PROPERTY",
    text: "Investors and additional property buyers pay a 5% surcharge on top of standard rates at every band. SDLT starts at 5% from £0 (there is no 0% band), rising to 7% on £125,001–£250,000, and 10% on £250,001–£925,000.",
  },
};

/* ─────────────────────────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────────────────────────── */

function tabBtn(active: boolean, extra?: React.CSSProperties): React.CSSProperties {
  return {
    flex: 1,
    padding: "12px 16px",
    background: active ? "#006AC1" : "#fff",
    color: active ? "#fff" : "#006AC1",
    border: "none",
    fontFamily: "'Open Sans', Arial, sans-serif",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s",
    ...extra,
  };
}

/* ─────────────────────────────────────────────────────────────────
   STAMP DUTY CALCULATOR
───────────────────────────────────────────────────────────────── */

function StampDutyCalculator() {
  const [price, setPrice] = useState("");
  const [buyerType, setBuyerType] = useState<BuyerType>("main-residence");

  const priceNum = parseFloat(price.replace(/,/g, "")) || 0;
  const { bands, total, ftbExceeds } = calcSDLT(priceNum, buyerType);
  const hasResult = priceNum > 0;
  const info = BUYER_INFO[buyerType];

  const buyerButtons: { key: BuyerType; label: string }[] = [
    { key: "main-residence",   label: "Main Residence"   },
    { key: "investor",         label: "Investor"         },
    { key: "first-time-buyer", label: "First-Time Buyer" },
  ];

  return (
    <div>
      <p style={{ fontSize: 15, color: "#555", marginBottom: 28, lineHeight: 1.7 }}>
        Instantly calculate Stamp Duty Land Tax (SDLT) for main residences, first-time buyers and
        investors. Rates based on current GOV.UK guidance for England &amp; Northern Ireland.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>

        {/* ── Inputs ── */}
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ background: "#fff", border: "1px solid #dde8f5", padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#333", marginBottom: 24 }}>
              Property Details
            </h2>

            <div className="he-form-field">
              <label>Asking Price (£)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 250000"
                min="0"
              />
            </div>

            <div style={{ marginTop: 8 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 10 }}>
                Buyer Type
              </label>
              <div style={{ display: "flex", border: "2px solid #006AC1" }}>
                {buyerButtons.map(({ key, label }, i) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setBuyerType(key)}
                    style={tabBtn(buyerType === key, {
                      borderLeft: i > 0 ? "2px solid #006AC1" : "none",
                      fontSize: 12,
                      padding: "10px 6px",
                    })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        <div style={{ flex: "1 1 320px" }}>
          <div style={{ background: "#fff", border: "1px solid #dde8f5", padding: 28, minHeight: 260 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#333", marginBottom: 4 }}>
              SDLT Calculation
            </h2>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>
              Rates based on current GOV.UK guidance (England &amp; Northern Ireland).
            </p>

            {hasResult ? (
              <>
                <p style={{
                  fontSize: 12, fontWeight: 700, color: "#555", letterSpacing: 0.6,
                  textTransform: "uppercase", marginBottom: 14,
                }}>
                  {ftbExceeds
                    ? "SDLT — MAIN RESIDENCE (FTB relief not applicable above £500,000)"
                    : info.heading}
                </p>

                {/* Band table */}
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginBottom: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #dde8f5" }}>
                      <th style={{ textAlign: "left",  padding: "6px 0", color: "#555", fontWeight: 700 }}>Band</th>
                      <th style={{ textAlign: "right", padding: "6px 0", color: "#555", fontWeight: 700 }}>Rate</th>
                      <th style={{ textAlign: "right", padding: "6px 0", color: "#555", fontWeight: 700 }}>Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bands.map((b, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0f4fa" }}>
                        <td style={{ padding: "8px 0", color: "#444" }}>
                          {fmtBoundary(b.from)} – {fmtBoundary(b.to)}
                        </td>
                        <td style={{ padding: "8px 0", textAlign: "right", color: "#444" }}>{b.rate}%</td>
                        <td style={{ padding: "8px 0", textAlign: "right", color: "#444" }}>£{fmtInt(b.tax)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Total row */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  borderTop: "2px solid #006AC1", paddingTop: 12, marginBottom: 20,
                }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#333" }}>Total SDLT</span>
                  <span style={{ fontWeight: 700, fontSize: 22, color: total === 0 ? "#16a34a" : "#006AC1" }}>
                    £{fmtInt(total)}
                  </span>
                </div>

                {/* Info box */}
                <div style={{ borderLeft: "4px solid #006AC1", paddingLeft: 12 }}>
                  <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px", lineHeight: 1.65 }}>
                    {ftbExceeds
                      ? "This property exceeds £500,000, so first-time buyer relief does not apply. Standard main residence rates are used instead."
                      : info.text}
                  </p>
                  <a
                    href="https://www.gov.uk/stamp-duty-land-tax"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: "#006AC1", fontWeight: 700, textDecoration: "none" }}
                  >
                    Verify on GOV.UK →
                  </a>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 44, marginBottom: 12, color: "#dde8f5" }}>🏷️</div>
                <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>
                  Enter a property price to see your SDLT breakdown.
                </p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 16, padding: "14px 16px", background: "#fff8e1", borderLeft: "4px solid #f59e0b", fontSize: 13, color: "#666", lineHeight: 1.6 }}>
            <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#555" }}>Important</p>
            <p style={{ margin: 0 }}>
              This calculator covers England &amp; Northern Ireland SDLT only. Scotland uses Land and
              Buildings Transaction Tax (LBTT) and Wales uses Land Transaction Tax (LTT). Always verify
              figures with your solicitor before exchanging contracts.
            </p>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 16, background: "#006AC1", padding: "20px 24px", textAlign: "center" }}>
            <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
              Want personalised advice?
            </p>
            <Link
              href="/contact/"
              style={{ background: "#fff", color: "#006AC1", padding: "10px 24px", fontWeight: 700, fontSize: 14, display: "inline-block", textDecoration: "none" }}
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MORTGAGE CALCULATOR
───────────────────────────────────────────────────────────────── */

function MortgageCalc() {
  const [price, setPrice]                 = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositPercent, setDepositPercent] = useState("");
  const [depositMode, setDepositMode]     = useState<DepositMode>("amount");
  const [rate, setRate]                   = useState("4.5");
  const [term, setTerm]                   = useState("25");
  const [type, setType]                   = useState<MortgageType>("repayment");
  const [stressRate, setStressRate]       = useState("");

  const priceNum         = parseFloat(price.replace(/,/g, ""))         || 0;
  const depositAmountNum = parseFloat(depositAmount.replace(/,/g, "")) || 0;
  const depositPercentNum = parseFloat(depositPercent)                  || 0;
  const rateNum           = parseFloat(rate)                            || 0;
  const termNum           = parseInt(term)                              || 0;
  const stressRateNum     = parseFloat(stressRate)                      || 0;

  const effectiveDeposit = depositMode === "amount"
    ? depositAmountNum
    : (priceNum * depositPercentNum) / 100;

  const mortgageAmount = Math.max(0, priceNum - effectiveDeposit);
  const months         = termNum * 12;

  const monthly = type === "repayment"
    ? calcRepayment(mortgageAmount, rateNum, termNum)
    : calcInterestOnly(mortgageAmount, rateNum);

  const totalRepaid   = type === "repayment" ? monthly * months : 0;
  const totalInterest = type === "repayment"
    ? totalRepaid - mortgageAmount
    : calcInterestOnly(mortgageAmount, rateNum) * months;

  const stressedMonthly = stressRateNum > 0
    ? (type === "repayment"
        ? calcRepayment(mortgageAmount, stressRateNum, termNum)
        : calcInterestOnly(mortgageAmount, stressRateNum))
    : 0;

  const handlePriceChange = useCallback((val: string) => {
    setPrice(val);
    if (depositMode === "percent" && depositPercentNum > 0) {
      const p = parseFloat(val.replace(/,/g, "")) || 0;
      setDepositAmount(((p * depositPercentNum) / 100).toFixed(0));
    }
  }, [depositMode, depositPercentNum]);

  const handleDepositAmountChange = useCallback((val: string) => {
    setDepositAmount(val);
    if (priceNum > 0) {
      const d = parseFloat(val.replace(/,/g, "")) || 0;
      setDepositPercent(((d / priceNum) * 100).toFixed(1));
    }
  }, [priceNum]);

  const handleDepositPercentChange = useCallback((val: string) => {
    setDepositPercent(val);
    if (priceNum > 0) {
      const pct = parseFloat(val) || 0;
      setDepositAmount(((priceNum * pct) / 100).toFixed(0));
    }
  }, [priceNum]);

  const hasResults = mortgageAmount > 0 && rateNum > 0 && termNum > 0;

  return (
    <div>
      <p style={{ fontSize: 15, color: "#555", marginBottom: 32, lineHeight: 1.7 }}>
        Use our mortgage calculator to estimate your monthly repayments. For personalised advice,{" "}
        <Link href="/contact/">contact our team</Link>.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>

        {/* ── Inputs ── */}
        <div style={{ flex: "1 1 360px" }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 8 }}>
              Mortgage Type
            </label>
            <div style={{ display: "flex", border: "2px solid #006AC1" }}>
              <button type="button" onClick={() => setType("repayment")}
                style={tabBtn(type === "repayment")}>Repayment</button>
              <button type="button" onClick={() => setType("interest-only")}
                style={tabBtn(type === "interest-only", { borderLeft: "2px solid #006AC1" })}>Interest Only</button>
            </div>
          </div>

          <div className="he-form-field">
            <label>Property Price (£)</label>
            <input type="number" value={price} onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="e.g. 250000" min="0" />
          </div>

          <div className="he-form-field">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <label style={{ marginBottom: 0 }}>Deposit</label>
              <div style={{ display: "flex", border: "1px solid #006AC1" }}>
                <button type="button" onClick={() => setDepositMode("amount")} style={{
                  padding: "2px 10px", background: depositMode === "amount" ? "#006AC1" : "#fff",
                  color: depositMode === "amount" ? "#fff" : "#006AC1", border: "none",
                  fontFamily: "'Open Sans', Arial, sans-serif", cursor: "pointer", fontWeight: 600, fontSize: 12,
                }}>£</button>
                <button type="button" onClick={() => setDepositMode("percent")} style={{
                  padding: "2px 10px", background: depositMode === "percent" ? "#006AC1" : "#fff",
                  color: depositMode === "percent" ? "#fff" : "#006AC1", border: "none",
                  borderLeft: "1px solid #006AC1",
                  fontFamily: "'Open Sans', Arial, sans-serif", cursor: "pointer", fontWeight: 600, fontSize: 12,
                }}>%</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="number" value={depositAmount} onChange={(e) => handleDepositAmountChange(e.target.value)}
                placeholder="Amount (£)" min="0" style={{ flex: 1 }} />
              <input type="number" value={depositPercent} onChange={(e) => handleDepositPercentChange(e.target.value)}
                placeholder="%" min="0" max="100" step="0.1" style={{ width: 80 }} />
            </div>
          </div>

          <div className="he-form-field">
            <label>Mortgage Amount (£)</label>
            <input type="text" value={mortgageAmount > 0 ? fmt(mortgageAmount) : ""} readOnly
              style={{ background: "#f0f6ff", cursor: "not-allowed", color: "#006AC1", fontWeight: 700 }}
              placeholder="Auto-calculated" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="he-form-field">
              <label>Interest Rate (%)</label>
              <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.01" min="0" max="25" />
            </div>
            <div className="he-form-field">
              <label>Term (years)</label>
              <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} min="1" max="40" />
            </div>
          </div>

          <div className="he-form-field">
            <label>Stress Test Rate (%) <span style={{ fontWeight: 400, color: "#888", fontSize: 12 }}>— optional</span></label>
            <input type="number" value={stressRate} onChange={(e) => setStressRate(e.target.value)}
              placeholder="e.g. 7.0" step="0.01" min="0" max="25" />
            <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Shows your payment at a higher rate.</p>
          </div>
        </div>

        {/* ── Results ── */}
        <div style={{ flex: "1 1 300px" }}>
          {hasResults ? (
            <div className="he-results-panel">
              <h2 style={{ color: "#006AC1", fontSize: 18, marginBottom: 20 }}>Your Results</h2>

              <div className="he-result-item">
                <span className="he-result-label">Monthly Repayment</span>
                <span className="he-result-value">£{fmt(monthly)}</span>
              </div>

              {type === "repayment" && (<>
                <div className="he-result-item">
                  <span className="he-result-label">Total Amount Repaid</span>
                  <span className="he-result-value">£{fmt(totalRepaid)}</span>
                </div>
                <div className="he-result-item">
                  <span className="he-result-label">Total Interest Paid</span>
                  <span className="he-result-value">£{fmt(totalInterest)}</span>
                </div>
              </>)}

              {type === "interest-only" && (
                <div className="he-result-item">
                  <span className="he-result-label">Total Interest (full term)</span>
                  <span className="he-result-value">£{fmt(totalInterest)}</span>
                </div>
              )}

              <div className="he-result-item">
                <span className="he-result-label">Mortgage Amount</span>
                <span style={{ color: "#555", fontWeight: 600 }}>£{fmt(mortgageAmount)}</span>
              </div>
              <div className="he-result-item">
                <span className="he-result-label">Term</span>
                <span style={{ color: "#555", fontWeight: 600 }}>{termNum} years ({termNum * 12} payments)</span>
              </div>
              <div className="he-result-item">
                <span className="he-result-label">Rate</span>
                <span style={{ color: "#555", fontWeight: 600 }}>{rateNum}%</span>
              </div>

              {stressedMonthly > 0 && (
                <div style={{ marginTop: 20, padding: 16, background: "#fff5f5", border: "2px solid #dc2626" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", margin: "0 0 8px" }}>
                    ⚠ Stress Test at {stressRateNum}%
                  </p>
                  <div className="he-result-item" style={{ borderBottom: "none", padding: 0 }}>
                    <span className="he-result-label" style={{ color: "#dc2626" }}>Stressed Monthly Repayment</span>
                    <span className="he-result-value he-result-stressed">£{fmt(stressedMonthly)}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#dc2626", marginTop: 8, marginBottom: 0 }}>
                    Monthly increase: £{fmt(stressedMonthly - monthly)}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ background: "#f7faff", border: "2px dashed #dde8f5", padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>
                Enter your property price, deposit, interest rate and term to see your estimated monthly repayments.
              </p>
            </div>
          )}

          <div style={{ marginTop: 20, padding: "14px 16px", background: "#fff8e1", borderLeft: "4px solid #f59e0b", fontSize: 13, color: "#666", lineHeight: 1.6 }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#555" }}>Important</p>
            <p style={{ margin: 0 }}>
              This calculator is for illustrative purposes only. Your home may be repossessed if you do not
              keep up repayments on your mortgage. The actual rate available will depend on your circumstances.
              Speak to a qualified adviser.
            </p>
          </div>

          <div style={{ marginTop: 20, background: "#006AC1", padding: "20px 24px", textAlign: "center" }}>
            <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Want personalised advice?</p>
            <Link href="/contact/" style={{ background: "#fff", color: "#006AC1", padding: "10px 24px", fontWeight: 700, fontSize: 14, display: "inline-block", textDecoration: "none" }}>
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — tabs wrapper
───────────────────────────────────────────────────────────────── */

type CalcTab = "mortgage" | "stamp-duty";

export default function MortgageCalculatorPage() {
  const [activeTab, setActiveTab] = useState<CalcTab>("mortgage");

  return (
    <>
      <SeoHead
        title="Mortgage & Stamp Duty Calculators – Heritage Estates"
        description="Free mortgage calculator and stamp duty (SDLT) calculator from Heritage Estates. Estimate monthly repayments and stamp duty costs for main residences, first-time buyers and investors."
        path="/mortgage-calculator/"
      />
      <PageWrapper>
        <h1 style={{ color: "#006AC1", marginBottom: 20 }}>
          {activeTab === "mortgage" ? "Mortgage Calculator" : "Stamp Duty Calculator (SDLT)"}
        </h1>

        {/* Tab bar */}
        <div style={{ display: "flex", border: "2px solid #006AC1", marginBottom: 36, maxWidth: 480 }}>
          <button type="button" onClick={() => setActiveTab("mortgage")}
            style={tabBtn(activeTab === "mortgage")}>
            Mortgage Calculator
          </button>
          <button type="button" onClick={() => setActiveTab("stamp-duty")}
            style={tabBtn(activeTab === "stamp-duty", { borderLeft: "2px solid #006AC1" })}>
            Stamp Duty (SDLT)
          </button>
        </div>

        {activeTab === "mortgage" ? <MortgageCalc /> : <StampDutyCalculator />}
      </PageWrapper>
    </>
  );
}
