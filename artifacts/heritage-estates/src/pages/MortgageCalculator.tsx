import { useState, useCallback } from "react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */

type MortgageType = "repayment" | "interest-only";
type DepositMode  = "amount" | "percent";
type BuyerType    = "main-residence" | "first-time-buyer" | "investor";
type CalcTab      = "mortgage" | "stamp-duty";

/* ─────────────────────────────────────────────────────────────────
   MORTGAGE LOGIC
───────────────────────────────────────────────────────────────── */

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

function fmtInt(n: number): string {
  return n.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function todayStr(): string {
  return new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/* ─────────────────────────────────────────────────────────────────
   SDLT LOGIC  — England & N. Ireland, post 1 April 2025
───────────────────────────────────────────────────────────────── */

interface Band { from: number; to: number; rate: number; }
interface SDLTBandResult { from: number; to: number; rate: number; tax: number; }

const MAIN_RESIDENCE_BANDS: Band[] = [
  { from: 0,         to: 125_000,   rate: 0  },
  { from: 125_000,   to: 250_000,   rate: 2  },
  { from: 250_000,   to: 925_000,   rate: 5  },
  { from: 925_000,   to: 1_500_000, rate: 10 },
  { from: 1_500_000, to: Infinity,  rate: 12 },
];

const INVESTOR_BANDS: Band[] = [
  { from: 0,         to: 125_000,   rate: 5  },
  { from: 125_000,   to: 250_000,   rate: 7  },
  { from: 250_000,   to: 925_000,   rate: 10 },
  { from: 925_000,   to: 1_500_000, rate: 15 },
  { from: 1_500_000, to: Infinity,  rate: 17 },
];

const FTB_BANDS: Band[] = [
  { from: 0,       to: 300_000, rate: 0 },
  { from: 300_000, to: 500_000, rate: 5 },
];

function calcSDLT(price: number, buyerType: BuyerType) {
  if (price <= 0) return { bands: [] as SDLTBandResult[], total: 0, ftbExceeds: false };
  const ftbExceeds = buyerType === "first-time-buyer" && price > 500_000;
  const bands =
    buyerType === "investor"                         ? INVESTOR_BANDS :
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

function fmtBoundary(n: number): string {
  if (n >= 1_000_000) { const m = n / 1_000_000; return `£${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}m`; }
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`;
  return `£${n}`;
}

const BUYER_LABEL: Record<BuyerType, string> = {
  "main-residence":   "Main Residence",
  "first-time-buyer": "First-Time Buyer",
  "investor":         "Second Home / Investor",
};

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
    heading: "SDLT — SECOND HOME / INVESTOR",
    text: "Second home and investment property buyers pay a 5% surcharge on top of standard rates at every band. SDLT starts at 5% from £0 (there is no 0% band), rising to 7% on £125,001–£250,000, and 10% on £250,001–£925,000.",
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
   BUYER TYPE SELECTOR  — shared between both tabs
───────────────────────────────────────────────────────────────── */

const BUYER_BUTTONS: { key: BuyerType; label: string }[] = [
  { key: "main-residence",   label: "Main Residence"         },
  { key: "first-time-buyer", label: "First-Time Buyer"       },
  { key: "investor",         label: "Second Home / Investor" },
];

function BuyerTypeSelector({ value, onChange }: { value: BuyerType; onChange: (v: BuyerType) => void }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 10 }}>
        Buyer Type
      </label>
      <div style={{ display: "flex", border: "2px solid #006AC1" }}>
        {BUYER_BUTTONS.map(({ key, label }, i) => (
          <button key={key} type="button" onClick={() => onChange(key)}
            style={tabBtn(value === key, { borderLeft: i > 0 ? "2px solid #006AC1" : "none", fontSize: 12, padding: "10px 6px", flex: 1 })}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SHARED STATE INTERFACE
───────────────────────────────────────────────────────────────── */

interface SharedState {
  propertyRef: string;       setPropertyRef: (v: string) => void;
  price: string;             setPrice: (v: string) => void;
  depositAmount: string;     setDepositAmount: (v: string) => void;
  depositPercent: string;    setDepositPercent: (v: string) => void;
  depositMode: DepositMode;  setDepositMode: (v: DepositMode) => void;
  rate: string;              setRate: (v: string) => void;
  term: string;              setTerm: (v: string) => void;
  mortgageType: MortgageType; setMortgageType: (v: MortgageType) => void;
  stressRate: string;        setStressRate: (v: string) => void;
  buyerType: BuyerType;      setBuyerType: (v: BuyerType) => void;
}

/* ─────────────────────────────────────────────────────────────────
   PRINT HEADER  — hidden on screen, shown only when printing
───────────────────────────────────────────────────────────────── */

function PrintHeader({ propertyRef, title }: { propertyRef: string; title: string }) {
  return (
    <div className="he-print-header" style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "2px solid #006AC1" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#006AC1", letterSpacing: -0.5 }}>
            HERITAGE ESTATES
          </div>
          <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>Mortgage &amp; Insurance Services</div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 6, lineHeight: 1.5 }}>
            2 Brooksby Drive, Oadby, Leicester LE2 5AA<br />
            Tel: 0116 253 7733 · heritageestates.co.uk
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, color: "#555" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#333", marginBottom: 4 }}>{title}</div>
          <div>Date: {todayStr()}</div>
          {propertyRef && <div style={{ marginTop: 4 }}>Ref: <strong>{propertyRef}</strong></div>}
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: "#888" }}>
        This document is for illustrative purposes only. Figures are estimates and do not constitute financial advice.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MORTGAGE CALCULATOR TAB
───────────────────────────────────────────────────────────────── */

interface MortgageCalcProps extends SharedState {
  onViewSDLT: () => void;
}

function MortgageCalc(props: MortgageCalcProps) {
  const {
    propertyRef, setPropertyRef,
    price, setPrice,
    depositAmount, setDepositAmount,
    depositPercent, setDepositPercent,
    depositMode, setDepositMode,
    rate, setRate,
    term, setTerm,
    mortgageType, setMortgageType,
    stressRate, setStressRate,
    buyerType, setBuyerType,
    onViewSDLT,
  } = props;

  const priceNum          = parseFloat(price.replace(/,/g, ""))         || 0;
  const depositAmountNum  = parseFloat(depositAmount.replace(/,/g, "")) || 0;
  const depositPercentNum = parseFloat(depositPercent)                   || 0;
  const rateNum           = parseFloat(rate)                             || 0;
  const termNum           = parseInt(term)                               || 0;
  const stressRateNum     = parseFloat(stressRate)                       || 0;

  const effectiveDeposit = depositMode === "amount"
    ? depositAmountNum
    : (priceNum * depositPercentNum) / 100;

  const mortgageAmount = Math.max(0, priceNum - effectiveDeposit);
  const months         = termNum * 12;

  const monthly = mortgageType === "repayment"
    ? calcRepayment(mortgageAmount, rateNum, termNum)
    : calcInterestOnly(mortgageAmount, rateNum);

  const totalRepaid   = mortgageType === "repayment" ? monthly * months : 0;
  const totalInterest = mortgageType === "repayment"
    ? totalRepaid - mortgageAmount
    : calcInterestOnly(mortgageAmount, rateNum) * months;

  const stressedMonthly = stressRateNum > 0
    ? (mortgageType === "repayment"
        ? calcRepayment(mortgageAmount, stressRateNum, termNum)
        : calcInterestOnly(mortgageAmount, stressRateNum))
    : 0;

  const handlePriceChange = useCallback((val: string) => {
    setPrice(val);
    if (depositMode === "percent" && depositPercentNum > 0) {
      const p = parseFloat(val.replace(/,/g, "")) || 0;
      setDepositAmount(((p * depositPercentNum) / 100).toFixed(0));
    }
  }, [setPrice, depositMode, depositPercentNum, setDepositAmount]);

  const handleDepositAmountChange = useCallback((val: string) => {
    setDepositAmount(val);
    if (priceNum > 0) {
      const d = parseFloat(val.replace(/,/g, "")) || 0;
      setDepositPercent(((d / priceNum) * 100).toFixed(1));
    }
  }, [setDepositAmount, priceNum, setDepositPercent]);

  const handleDepositPercentChange = useCallback((val: string) => {
    setDepositPercent(val);
    if (priceNum > 0) {
      const pct = parseFloat(val) || 0;
      setDepositAmount(((priceNum * pct) / 100).toFixed(0));
    }
  }, [setDepositPercent, priceNum, setDepositAmount]);

  const hasResults = mortgageAmount > 0 && rateNum > 0 && termNum > 0;
  const { total: sdltTotal, ftbExceeds } = calcSDLT(priceNum, buyerType);
  const sdltLabel = ftbExceeds ? "Main Residence (FTB >£500k)" : BUYER_LABEL[buyerType];

  return (
    <div>
      <p style={{ fontSize: 15, color: "#555", marginBottom: 32, lineHeight: 1.7 }}>
        Use our mortgage calculator to estimate your monthly repayments. For personalised advice,{" "}
        <Link href="/contact/">contact our team</Link>.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>

        {/* ── Inputs ── */}
        <div style={{ flex: "1 1 360px" }}>

          {/* Property reference */}
          <div className="he-form-field">
            <label>
              Property Reference{" "}
              <span style={{ fontWeight: 400, color: "#888", fontSize: 12 }}>— optional</span>
            </label>
            <input
              type="text"
              value={propertyRef}
              onChange={(e) => setPropertyRef(e.target.value)}
              placeholder="e.g. 12 Acacia Avenue, Leicester"
              maxLength={100}
            />
            <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
              Appears in Your Results and on the saved PDF.
            </p>
          </div>

          {/* Mortgage type */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 8 }}>
              Mortgage Type
            </label>
            <div style={{ display: "flex", border: "2px solid #006AC1" }}>
              <button type="button" onClick={() => setMortgageType("repayment")}
                style={tabBtn(mortgageType === "repayment")}>Repayment</button>
              <button type="button" onClick={() => setMortgageType("interest-only")}
                style={tabBtn(mortgageType === "interest-only", { borderLeft: "2px solid #006AC1" })}>Interest Only</button>
            </div>
          </div>

          {/* Buyer type */}
          <div style={{ marginBottom: 16 }}>
            <BuyerTypeSelector value={buyerType} onChange={setBuyerType} />
            <p style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
              Used to calculate your estimated stamp duty shown in results.
            </p>
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
                {(["amount", "percent"] as DepositMode[]).map((mode, i) => (
                  <button key={mode} type="button" onClick={() => setDepositMode(mode)} style={{
                    padding: "2px 10px",
                    background: depositMode === mode ? "#006AC1" : "#fff",
                    color: depositMode === mode ? "#fff" : "#006AC1",
                    border: "none",
                    borderLeft: i > 0 ? "1px solid #006AC1" : "none",
                    fontFamily: "'Open Sans', Arial, sans-serif",
                    cursor: "pointer", fontWeight: 600, fontSize: 12,
                  }}>{mode === "amount" ? "£" : "%"}</button>
                ))}
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

        {/* ── Results (print target) ── */}
        <div style={{ flex: "1 1 300px" }} id="he-print-target">

          {/* Print-only header — hidden on screen */}
          <PrintHeader propertyRef={propertyRef} title="Mortgage Calculation" />

          {hasResults ? (
            <div className="he-results-panel">

              {/* Results header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h2 style={{ color: "#006AC1", fontSize: 18, margin: 0 }}>Your Results</h2>
                  {propertyRef && (
                    <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0", fontStyle: "italic" }}>
                      {propertyRef}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="he-no-print"
                  onClick={() => window.print()}
                  style={{
                    background: "#fff",
                    color: "#006AC1",
                    border: "2px solid #006AC1",
                    padding: "7px 14px",
                    fontFamily: "'Open Sans', Arial, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>⬇</span> Save as PDF
                </button>
              </div>

              {/* ── 1. Monthly Repayment — hero number ── */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 0 16px",
                borderBottom: "2px solid #006AC1",
                marginBottom: 4,
              }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#333" }}>Monthly Repayment</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: "#006AC1", letterSpacing: -0.5 }}>
                  £{fmt(monthly)}
                </span>
              </div>

              {/* ── 2. Property Price ── */}
              <div className="he-result-item">
                <span className="he-result-label">Property Price</span>
                <span style={{ color: "#555", fontWeight: 600 }}>£{fmt(priceNum)}</span>
              </div>

              {/* ── 3. SDLT estimate (inline row + breakdown button) ── */}
              <div className="he-result-item" style={{ alignItems: "flex-start", gap: 8 }}>
                <span className="he-result-label" style={{ paddingTop: 2 }}>
                  Estimated SDLT
                  <span style={{ display: "block", fontSize: 11, color: "#aaa", fontWeight: 400, marginTop: 1 }}>
                    {sdltLabel}
                  </span>
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: sdltTotal === 0 ? "#16a34a" : "#555" }}>
                    £{fmtInt(sdltTotal)}
                  </span>
                  <button
                    type="button"
                    className="he-no-print"
                    onClick={onViewSDLT}
                    style={{
                      background: "transparent", color: "#006AC1", border: "1px solid #006AC1",
                      padding: "3px 9px", fontFamily: "'Open Sans', Arial, sans-serif",
                      fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                    }}
                  >
                    breakdown →
                  </button>
                </div>
              </div>

              {/* ── 4. Deposit ── */}
              <div className="he-result-item">
                <span className="he-result-label">Deposit</span>
                <span style={{ color: "#555", fontWeight: 600 }}>
                  £{fmt(effectiveDeposit)}
                  {depositPercentNum > 0 && (
                    <span style={{ fontSize: 12, color: "#aaa", fontWeight: 400, marginLeft: 6 }}>
                      ({depositPercentNum.toFixed(1)}%)
                    </span>
                  )}
                </span>
              </div>

              {/* ── 5. Mortgage Amount ── */}
              <div className="he-result-item">
                <span className="he-result-label">Mortgage Amount</span>
                <span style={{ color: "#555", fontWeight: 600 }}>£{fmt(mortgageAmount)}</span>
              </div>

              {/* ── 6 & 7. Totals ── */}
              {mortgageType === "repayment" && (<>
                <div className="he-result-item">
                  <span className="he-result-label">Total Amount Repaid</span>
                  <span className="he-result-value">£{fmt(totalRepaid)}</span>
                </div>
                <div className="he-result-item">
                  <span className="he-result-label">Total Interest Paid</span>
                  <span className="he-result-value">£{fmt(totalInterest)}</span>
                </div>
              </>)}

              {mortgageType === "interest-only" && (
                <div className="he-result-item">
                  <span className="he-result-label">Total Interest (full term)</span>
                  <span className="he-result-value">£{fmt(totalInterest)}</span>
                </div>
              )}

              {/* ── 8–12. Detail rows ── */}
              <div className="he-result-item">
                <span className="he-result-label">Mortgage Type</span>
                <span style={{ color: "#555", fontWeight: 600 }}>{mortgageType === "repayment" ? "Repayment" : "Interest Only"}</span>
              </div>
              <div className="he-result-item">
                <span className="he-result-label">Buyer Type</span>
                <span style={{ color: "#555", fontWeight: 600 }}>{BUYER_LABEL[buyerType]}</span>
              </div>
              <div className="he-result-item">
                <span className="he-result-label">Term</span>
                <span style={{ color: "#555", fontWeight: 600 }}>{termNum} years ({termNum * 12} payments)</span>
              </div>
              <div className="he-result-item">
                <span className="he-result-label">Rate</span>
                <span style={{ color: "#555", fontWeight: 600 }}>{rateNum}%</span>
              </div>

              {/* Stress test */}
              {stressedMonthly > 0 && (
                <div style={{ marginTop: 20, padding: 16, background: "#fff5f5", border: "2px solid #dc2626" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", margin: "0 0 8px" }}>
                    ⚠ Stress Test at {stressRateNum}%
                  </p>
                  <div className="he-result-item" style={{ borderBottom: "none", padding: 0 }}>
                    <span className="he-result-label" style={{ color: "#dc2626" }}>Stressed Monthly</span>
                    <span className="he-result-value he-result-stressed">£{fmt(stressedMonthly)}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#dc2626", marginTop: 8, marginBottom: 0 }}>
                    Monthly increase: £{fmt(stressedMonthly - monthly)}
                  </p>
                </div>
              )}

              {/* Print-only disclaimer */}
              <div className="he-print-only" style={{ marginTop: 24, fontSize: 11, color: "#666", borderTop: "1px solid #ddd", paddingTop: 12, lineHeight: 1.6 }}>
                Your home may be repossessed if you do not keep up repayments on your mortgage. This
                calculation is for illustrative purposes only and does not constitute financial advice.
                Heritage Estates is an appointed representative. Always consult a qualified mortgage adviser.
              </div>
            </div>
          ) : (
            <div className="he-no-print" style={{ background: "#f7faff", border: "2px dashed #dde8f5", padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>
                Enter your property price, deposit, interest rate and term to see your estimated monthly repayments.
              </p>
            </div>
          )}

          <div className="he-no-print" style={{ marginTop: 20, padding: "14px 16px", background: "#fff8e1", borderLeft: "4px solid #f59e0b", fontSize: 13, color: "#666", lineHeight: 1.6 }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#555" }}>Important</p>
            <p style={{ margin: 0 }}>
              This calculator is for illustrative purposes only. Your home may be repossessed if you do not
              keep up repayments on your mortgage. The actual rate available will depend on your circumstances.
              Speak to a qualified adviser.
            </p>
          </div>

          <div className="he-no-print" style={{ marginTop: 20, background: "#006AC1", padding: "20px 24px", textAlign: "center" }}>
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
   STAMP DUTY TAB
───────────────────────────────────────────────────────────────── */

interface StampDutyProps {
  propertyRef: string;
  price: string;        setPrice: (v: string) => void;
  buyerType: BuyerType; setBuyerType: (v: BuyerType) => void;
}

function StampDutyCalculator({ propertyRef, price, setPrice, buyerType, setBuyerType }: StampDutyProps) {
  const priceNum = parseFloat(price.replace(/,/g, "")) || 0;
  const { bands, total, ftbExceeds } = calcSDLT(priceNum, buyerType);
  const hasResult = priceNum > 0;
  const info = BUYER_INFO[buyerType];

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
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#333", marginBottom: 24 }}>Property Details</h2>

            {propertyRef && (
              <div style={{ marginBottom: 16, padding: "8px 12px", background: "#f0f6ff", borderLeft: "3px solid #006AC1", fontSize: 13, color: "#555" }}>
                <span style={{ fontWeight: 700 }}>Ref:</span> {propertyRef}
              </div>
            )}

            <div className="he-form-field">
              <label>Property Price (£)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 250000" min="0" />
              <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Shared with the Mortgage Calculator tab.</p>
            </div>

            <BuyerTypeSelector value={buyerType} onChange={setBuyerType} />
          </div>
        </div>

        {/* ── Results (print target) ── */}
        <div style={{ flex: "1 1 320px" }} id="he-print-target">

          {/* Print-only header */}
          <PrintHeader propertyRef={propertyRef} title="Stamp Duty (SDLT) Calculation" />

          <div style={{ background: "#fff", border: "1px solid #dde8f5", padding: 28, minHeight: 260 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#333", margin: 0 }}>SDLT Calculation</h2>
              {hasResult && (
                <button
                  type="button"
                  className="he-no-print"
                  onClick={() => window.print()}
                  style={{
                    background: "#fff",
                    color: "#006AC1",
                    border: "2px solid #006AC1",
                    padding: "6px 12px",
                    fontFamily: "'Open Sans', Arial, sans-serif",
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                  }}
                >
                  <span>⬇</span> Save as PDF
                </button>
              )}
            </div>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20, marginTop: 4 }}>
              Rates based on current GOV.UK guidance (England &amp; Northern Ireland).
            </p>

            {hasResult ? (
              <>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#555", letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 14 }}>
                  {ftbExceeds ? "SDLT — MAIN RESIDENCE (FTB relief not applicable above £500,000)" : info.heading}
                </p>

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
                        <td style={{ padding: "8px 0", color: "#444" }}>{fmtBoundary(b.from)} – {fmtBoundary(b.to)}</td>
                        <td style={{ padding: "8px 0", textAlign: "right", color: "#444" }}>{b.rate}%</td>
                        <td style={{ padding: "8px 0", textAlign: "right", color: "#444" }}>£{fmtInt(b.tax)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #006AC1", paddingTop: 12, marginBottom: 20 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#333" }}>Total SDLT</span>
                  <span style={{ fontWeight: 700, fontSize: 22, color: total === 0 ? "#16a34a" : "#006AC1" }}>
                    £{fmtInt(total)}
                  </span>
                </div>

                <div style={{ borderLeft: "4px solid #006AC1", paddingLeft: 12 }}>
                  <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px", lineHeight: 1.65 }}>
                    {ftbExceeds
                      ? "This property exceeds £500,000, so first-time buyer relief does not apply. Standard main residence rates are used instead."
                      : info.text}
                  </p>
                  <a href="https://www.gov.uk/stamp-duty-land-tax" target="_blank" rel="noopener noreferrer"
                    className="he-no-print"
                    style={{ fontSize: 13, color: "#006AC1", fontWeight: 700, textDecoration: "none" }}>
                    Verify on GOV.UK →
                  </a>
                  <p className="he-print-only" style={{ fontSize: 11, color: "#888", margin: "8px 0 0" }}>
                    Source: gov.uk/stamp-duty-land-tax (England &amp; Northern Ireland, post 1 April 2025)
                  </p>
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

          <div className="he-no-print" style={{ marginTop: 16, padding: "14px 16px", background: "#fff8e1", borderLeft: "4px solid #f59e0b", fontSize: 13, color: "#666", lineHeight: 1.6 }}>
            <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#555" }}>Important</p>
            <p style={{ margin: 0 }}>
              This calculator covers England &amp; Northern Ireland SDLT only. Scotland uses Land and
              Buildings Transaction Tax (LBTT) and Wales uses Land Transaction Tax (LTT). Always verify
              figures with your solicitor before exchanging contracts.
            </p>
          </div>

          <div className="he-no-print" style={{ marginTop: 16, background: "#006AC1", padding: "20px 24px", textAlign: "center" }}>
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
   PAGE  — all shared state lives here
───────────────────────────────────────────────────────────────── */

export default function MortgageCalculatorPage() {
  const [activeTab, setActiveTab] = useState<CalcTab>("mortgage");

  const [propertyRef,    setPropertyRef]    = useState("");
  const [price,          setPrice]          = useState("");
  const [depositAmount,  setDepositAmount]  = useState("");
  const [depositPercent, setDepositPercent] = useState("");
  const [depositMode,    setDepositMode]    = useState<DepositMode>("amount");
  const [rate,           setRate]           = useState("4.5");
  const [term,           setTerm]           = useState("25");
  const [mortgageType,   setMortgageType]   = useState<MortgageType>("repayment");
  const [stressRate,     setStressRate]     = useState("");
  const [buyerType,      setBuyerType]      = useState<BuyerType>("main-residence");

  const shared: SharedState = {
    propertyRef, setPropertyRef,
    price, setPrice,
    depositAmount, setDepositAmount,
    depositPercent, setDepositPercent,
    depositMode, setDepositMode,
    rate, setRate,
    term, setTerm,
    mortgageType, setMortgageType,
    stressRate, setStressRate,
    buyerType, setBuyerType,
  };

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

        {activeTab === "mortgage" ? (
          <MortgageCalc {...shared} onViewSDLT={() => setActiveTab("stamp-duty")} />
        ) : (
          <StampDutyCalculator
            propertyRef={propertyRef}
            price={price}
            setPrice={setPrice}
            buyerType={buyerType}
            setBuyerType={setBuyerType}
          />
        )}
      </PageWrapper>
    </>
  );
}
