import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import PageWrapper from "@/components/PageWrapper";

type MortgageType = "repayment" | "interest-only";
type DepositMode = "amount" | "percent";

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

export default function MortgageCalculator() {
  const [price, setPrice] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [depositPercent, setDepositPercent] = useState<string>("");
  const [depositMode, setDepositMode] = useState<DepositMode>("amount");
  const [rate, setRate] = useState<string>("4.5");
  const [term, setTerm] = useState<string>("25");
  const [type, setType] = useState<MortgageType>("repayment");
  const [stressRate, setStressRate] = useState<string>("");

  const priceNum = parseFloat(price.replace(/,/g, "")) || 0;
  const depositAmountNum = parseFloat(depositAmount.replace(/,/g, "")) || 0;
  const depositPercentNum = parseFloat(depositPercent) || 0;
  const rateNum = parseFloat(rate) || 0;
  const termNum = parseInt(term) || 0;
  const stressRateNum = parseFloat(stressRate) || 0;

  const effectiveDeposit = depositMode === "amount"
    ? depositAmountNum
    : (priceNum * depositPercentNum) / 100;

  const mortgageAmount = Math.max(0, priceNum - effectiveDeposit);
  const months = termNum * 12;

  const monthly = type === "repayment"
    ? calcRepayment(mortgageAmount, rateNum, termNum)
    : calcInterestOnly(mortgageAmount, rateNum);

  const totalRepaid = type === "repayment" ? monthly * months : 0;
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
    <>
      <Helmet>
        <title>Mortgage Calculator - Heritage Estates</title>
        <meta name="description" content="Use Heritage Estates' mortgage calculator to estimate your monthly repayments. Calculate repayment and interest-only mortgages with stress testing." />
      </Helmet>
      <PageWrapper>
        <h1 style={{ color: "#006AC1", marginBottom: 12 }}>Mortgage Calculator</h1>
        <p style={{ fontSize: 15, color: "#555", marginBottom: 32, lineHeight: 1.7 }}>
          Use our mortgage calculator to get an estimate of your monthly repayments. For personalised advice, contact our team.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
          {/* Inputs */}
          <div style={{ flex: "1 1 360px" }}>
            {/* Mortgage type toggle */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 8 }}>
                Mortgage Type
              </label>
              <div style={{ display: "flex", border: "2px solid #006AC1" }}>
                <button
                  type="button"
                  onClick={() => setType("repayment")}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: type === "repayment" ? "#006AC1" : "#fff",
                    color: type === "repayment" ? "#fff" : "#006AC1",
                    border: "none",
                    fontFamily: "'Open Sans', Arial, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Repayment
                </button>
                <button
                  type="button"
                  onClick={() => setType("interest-only")}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: type === "interest-only" ? "#006AC1" : "#fff",
                    color: type === "interest-only" ? "#fff" : "#006AC1",
                    border: "none",
                    borderLeft: "2px solid #006AC1",
                    fontFamily: "'Open Sans', Arial, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Interest Only
                </button>
              </div>
            </div>

            <div className="he-form-field">
              <label>Property Price (£)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="e.g. 250000"
                min="0"
              />
            </div>

            {/* Deposit with mode toggle */}
            <div className="he-form-field">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <label style={{ marginBottom: 0 }}>Deposit</label>
                <div style={{ display: "flex", border: "1px solid #006AC1", fontSize: 12 }}>
                  <button
                    type="button"
                    onClick={() => setDepositMode("amount")}
                    style={{
                      padding: "2px 10px",
                      background: depositMode === "amount" ? "#006AC1" : "#fff",
                      color: depositMode === "amount" ? "#fff" : "#006AC1",
                      border: "none",
                      fontFamily: "'Open Sans', Arial, sans-serif",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >£</button>
                  <button
                    type="button"
                    onClick={() => setDepositMode("percent")}
                    style={{
                      padding: "2px 10px",
                      background: depositMode === "percent" ? "#006AC1" : "#fff",
                      color: depositMode === "percent" ? "#fff" : "#006AC1",
                      border: "none",
                      borderLeft: "1px solid #006AC1",
                      fontFamily: "'Open Sans', Arial, sans-serif",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >%</button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => handleDepositAmountChange(e.target.value)}
                  placeholder="Amount (£)"
                  min="0"
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  value={depositPercent}
                  onChange={(e) => handleDepositPercentChange(e.target.value)}
                  placeholder="%"
                  min="0"
                  max="100"
                  step="0.1"
                  style={{ width: 80 }}
                />
              </div>
            </div>

            {/* Mortgage amount (read-only) */}
            <div className="he-form-field">
              <label>Mortgage Amount (£)</label>
              <input
                type="text"
                value={mortgageAmount > 0 ? fmt(mortgageAmount) : ""}
                readOnly
                style={{ background: "#f0f6ff", cursor: "not-allowed", color: "#006AC1", fontWeight: 700 }}
                placeholder="Auto-calculated"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="he-form-field">
                <label>Interest Rate (%)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  step="0.01"
                  min="0"
                  max="25"
                />
              </div>
              <div className="he-form-field">
                <label>Term (years)</label>
                <input
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  min="1"
                  max="40"
                />
              </div>
            </div>

            <div className="he-form-field">
              <label>Stress Test Rate (%) <span style={{ fontWeight: 400, color: "#888", fontSize: 12 }}>— optional</span></label>
              <input
                type="number"
                value={stressRate}
                onChange={(e) => setStressRate(e.target.value)}
                placeholder="e.g. 7.0"
                step="0.01"
                min="0"
                max="25"
              />
              <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                Shows what your payment would be at a higher rate.
              </p>
            </div>
          </div>

          {/* Results */}
          <div style={{ flex: "1 1 300px" }}>
            {hasResults ? (
              <div className="he-results-panel">
                <h2 style={{ color: "#006AC1", fontSize: 18, marginBottom: 20 }}>Your Results</h2>

                <div className="he-result-item">
                  <span className="he-result-label">Monthly Repayment</span>
                  <span className="he-result-value">£{fmt(monthly)}</span>
                </div>

                {type === "repayment" && (
                  <>
                    <div className="he-result-item">
                      <span className="he-result-label">Total Amount Repaid</span>
                      <span className="he-result-value">£{fmt(totalRepaid)}</span>
                    </div>
                    <div className="he-result-item">
                      <span className="he-result-label">Total Interest Paid</span>
                      <span className="he-result-value">£{fmt(totalInterest)}</span>
                    </div>
                  </>
                )}

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
                  <div style={{ marginTop: 20, padding: "16px", background: "#fff5f5", border: "2px solid #dc2626" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", margin: "0 0 8px" }}>
                      ⚠ Stress Test at {stressRateNum}%
                    </p>
                    <div className="he-result-item" style={{ borderBottom: "none", padding: 0 }}>
                      <span className="he-result-label" style={{ color: "#dc2626" }}>Stressed Monthly Payment</span>
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

            {/* Regulatory disclaimer */}
            <div style={{ marginTop: 20, padding: "14px 16px", background: "#fff8e1", borderLeft: "4px solid #f59e0b", fontSize: 13, color: "#666", lineHeight: 1.6 }}>
              <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#555" }}>Important</p>
              <p style={{ margin: 0 }}>
                This calculator is for illustrative purposes only. Your home may be repossessed if you do not keep up repayments on your mortgage. The actual rate available will depend on your circumstances. Speak to a qualified adviser.
              </p>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 20, background: "#006AC1", padding: "20px 24px", textAlign: "center" }}>
              <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
                Want personalised advice?
              </p>
              <Link
                href="/contact/"
                style={{
                  background: "#fff",
                  color: "#006AC1",
                  padding: "10px 24px",
                  fontWeight: 700,
                  fontSize: 14,
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
