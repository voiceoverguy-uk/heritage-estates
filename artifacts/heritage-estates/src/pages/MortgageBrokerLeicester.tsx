import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";
import CtaBoxes from "@/components/CtaBoxes";

const faqItems = [
  {
    q: "What is a mortgage broker?",
    a: "A mortgage broker is an independent adviser who searches the whole mortgage market on your behalf to find the most suitable deal for your circumstances. Unlike going directly to a single bank or building society, a broker like Heritage Estates has access to hundreds of lenders and can compare thousands of products to find the right fit.",
  },
  {
    q: "How much does a mortgage broker in Leicester charge?",
    a: "Heritage Estates charges a broker fee which will be confirmed at your initial consultation. In many cases we also receive a commission from the lender. We are fully transparent about all fees before you commit to anything, in line with FCA requirements.",
  },
  {
    q: "Are Heritage Estates FCA authorised?",
    a: "Yes. Heritage Estates (Leicester) Ltd. is an appointed representative of Quilter Mortgage Planning Limited, which is authorised and regulated by the Financial Conduct Authority. You can verify this on the FCA register.",
  },
  {
    q: "Can you help first-time buyers in Leicester?",
    a: "Absolutely. We specialise in helping first-time buyers in Leicester and across Leicestershire understand their options, navigate the mortgage process, and access schemes such as Shared Ownership and the Mortgage Guarantee Scheme.",
  },
  {
    q: "Do you cover areas outside Leicester city centre?",
    a: "Yes — we work with clients across the whole of Leicestershire and beyond, including Oadby, Wigston, Hinckley, Loughborough, Market Harborough, Melton Mowbray, and Rutland. We are also able to advise clients purchasing elsewhere in England.",
  },
  {
    q: "Can I get a mortgage if I'm self-employed in Leicestershire?",
    a: "Yes. Self-employed mortgage applications require careful preparation, but we have significant experience securing mortgages for sole traders, limited company directors, and contractors across Leicestershire. We know which lenders are most flexible with self-employed income.",
  },
  {
    q: "What is the difference between a mortgage broker and going direct to a bank?",
    a: "When you go directly to a bank you can only access that bank's own products. A whole-of-market mortgage broker like Heritage Estates searches across the entire market — including exclusive broker-only deals not available on the high street — to find you the most competitive rate and the right product for your situation.",
  },
];

const areasServed = [
  {
    name: "Leicester City",
    description:
      "Our office is based in Oadby, just two miles from Leicester city centre. We regularly help clients buying, remortgaging, and investing across all Leicester postcodes.",
  },
  {
    name: "Oadby & Wigston",
    description:
      "As a local Oadby business ourselves, we have an in-depth understanding of the local property market and regularly help residents in Oadby and Wigston find the right mortgage.",
  },
  {
    name: "Hinckley & Loughborough",
    description:
      "Whether you are buying a family home in Hinckley or an investment property in Loughborough, our advisers can source suitable mortgages from across the whole market.",
  },
  {
    name: "Market Harborough & Melton Mowbray",
    description:
      "We help clients in Market Harborough, Melton Mowbray, and the surrounding rural Leicestershire villages access the same quality of whole-of-market advice as those in the city.",
  },
  {
    name: "Rutland & East Midlands",
    description:
      "Our reach extends across the wider East Midlands region. Wherever you are purchasing or remortgaging, we can advise — in person, by phone, or by video call.",
  },
];

function ClientNote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fffbea",
      border: "1px solid #f59e0b",
      borderLeft: "4px solid #f59e0b",
      padding: "12px 16px",
      margin: "12px 0",
      fontSize: 13,
      color: "#7c5a00",
      lineHeight: 1.6,
    }}>
      <strong>✏️ CLIENT TO ADD:</strong> {children}
    </div>
  );
}

interface SaleRecord {
  address: string;
  propertyType: string;
  pricePaid: number;
  transactionDate: string;
}

function fmt(n: number) {
  return n.toLocaleString("en-GB");
}

function formatDate(raw: string) {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function buildAddress(addr: Record<string, string | undefined>): string {
  return [addr.paon, addr.saon, addr.street, addr.locality, addr.town, addr.postcode]
    .filter(Boolean)
    .join(", ");
}

function extractLabel(val: unknown): string | null {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) {
    const first = val[0];
    if (typeof first === "string") return first;
    if (typeof first === "object" && first !== null) {
      const o = first as Record<string, unknown>;
      return typeof o._value === "string" ? o._value : null;
    }
  }
  if (typeof val === "object" && val !== null) {
    const o = val as Record<string, unknown>;
    return typeof o._value === "string" ? o._value : null;
  }
  return null;
}

function getPropertyTypeLabel(raw: unknown): string {
  if (!raw || typeof raw !== "object") return typeof raw === "string" ? raw : "—";
  const obj = raw as Record<string, unknown>;
  return extractLabel(obj.prefLabel) ?? extractLabel(obj.label) ?? "—";
}

type WidgetState = "loading" | "error" | "empty" | "ready";

function LeicesterPropertyData() {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [state, setState] = useState<WidgetState>("loading");

  const fetchData = useCallback(async () => {
    setState("loading");
    try {
      const url =
        "https://landregistry.data.gov.uk/data/ppi/transaction-record.json" +
        "?propertyAddress.town=LEICESTER&_pageSize=50&_sort=-transactionDate";
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      const items: unknown[] = json?.result?.items ?? [];
      const parsed: SaleRecord[] = items
        .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
        .map((item) => ({
          address: buildAddress((item.propertyAddress ?? {}) as Record<string, string | undefined>),
          propertyType: getPropertyTypeLabel(item.propertyType),
          pricePaid: Number(item.pricePaid ?? 0),
          transactionDate: String(item.transactionDate ?? ""),
        }))
        .filter((r) => r.pricePaid > 0)
        .slice(0, 10);
      setSales(parsed);
      setState(parsed.length === 0 ? "empty" : "ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const avgPrice =
    sales.length > 0
      ? Math.round(sales.reduce((s, r) => s + r.pricePaid, 0) / sales.length)
      : 0;

  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <h2 style={{ color: "#006AC1", fontSize: 20, margin: 0 }}>Leicester Property Market — Recent Sales</h2>
        <button
          onClick={fetchData}
          style={{
            background: "#fff",
            border: "2px solid #006AC1",
            color: "#006AC1",
            padding: "7px 18px",
            fontFamily: "'Open Sans', Arial, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            borderRadius: 0,
          }}
        >
          ↻ Refresh
        </button>
      </div>

      {state === "loading" && (
        <div style={{ textAlign: "center", padding: "32px 0", color: "#888", fontSize: 14 }}>
          Loading latest sales data…
        </div>
      )}

      {state === "error" && (
        <div style={{ background: "#f7faff", border: "1px solid #dde8f5", padding: "28px 24px", textAlign: "center", color: "#888", fontSize: 14, lineHeight: 1.7 }}>
          Market data temporarily unavailable. Please check back shortly.
        </div>
      )}

      {state === "empty" && (
        <div style={{ background: "#f7faff", border: "1px solid #dde8f5", padding: "28px 24px", textAlign: "center", color: "#888", fontSize: 14, lineHeight: 1.7 }}>
          No recent sales data found for Leicester. Please check back later.
        </div>
      )}

      {state === "ready" && (
        <>
          <div style={{ background: "#006AC1", color: "#fff", padding: "18px 24px", marginBottom: 20, fontSize: 18, fontWeight: 700 }}>
            Average recent sale price in Leicester:{" "}
            <span style={{ fontSize: 22 }}>£{fmt(avgPrice)}</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f0f6ff", borderBottom: "2px solid #006AC1" }}>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "#333", fontWeight: 700 }}>Address</th>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "#333", fontWeight: 700, whiteSpace: "nowrap" }}>Type</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "#333", fontWeight: 700, whiteSpace: "nowrap" }}>Sale Price</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "#333", fontWeight: 700, whiteSpace: "nowrap" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #dde8f5", background: i % 2 === 0 ? "#fff" : "#f7faff" }}>
                    <td style={{ padding: "10px 12px", color: "#444", lineHeight: 1.4 }}>{r.address}</td>
                    <td style={{ padding: "10px 12px", color: "#555", whiteSpace: "nowrap" }}>{r.propertyType}</td>
                    <td style={{ padding: "10px 12px", color: "#006AC1", fontWeight: 700, textAlign: "right", whiteSpace: "nowrap" }}>
                      £{fmt(r.pricePaid)}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#555", textAlign: "right", whiteSpace: "nowrap" }}>
                      {formatDate(r.transactionDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: 12, color: "#888", marginTop: 12, lineHeight: 1.6 }}>
            Source: HM Land Registry Price Paid Data. Updated regularly. Data shown is for the most recent recorded transactions and may not reflect current market conditions.
          </p>
        </>
      )}
    </div>
  );
}

export default function MortgageBrokerLeicester() {
  return (
    <>
      <SeoHead
        title="Mortgage Broker Leicester | Heritage Estates"
        description="Looking for a trusted mortgage broker in Leicester? Heritage Estates offers whole-of-market mortgage advice, FCA regulated, with local knowledge across Leicester and Leicestershire."
        path="/mortgage-broker-leicester/"
        schemaType="WebPage"
        faqItems={faqItems}
        datePublished="2026-05-03"
      />

      <PageWrapper regulatory="Your home may be repossessed if you do not keep up repayments on your mortgage.">

        <h1 style={{ color: "#006AC1", marginBottom: 16 }}>Mortgage Broker Leicester</h1>

        <h2 style={{ color: "#006AC1", fontSize: 22, marginBottom: 12 }}>Independent Mortgage Advice in Leicester</h2>
        <p style={{ fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 40 }}>
          Heritage Estates is Leicester's trusted estate agent and in-house mortgage broker. Whether
          you're a first-time buyer, moving home, or investing in property, our FCA-regulated mortgage
          advisers are here to help you find the right mortgage from across the whole market — not just
          one lender.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 22, marginBottom: 12 }}>Why Choose Our Mortgage Broker in Leicester</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 8 }}>
          Unlike comparison websites or call centres, our mortgage broker in Leicester sits within our
          estate agency. That means we understand the local market, local property values, and can work
          alongside your sale or purchase from day one.
        </p>
        <ClientNote>Specific broker name, qualifications, and years of experience</ClientNote>
        <div style={{ marginBottom: 40 }} />

        <h2 style={{ color: "#006AC1", fontSize: 22, marginBottom: 12 }}>Whole of Market Access</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 8 }}>
          We search deals from across the whole mortgage market, including lenders not available
          directly to the public. From high street banks to specialist lenders, we find the deal that
          fits your circumstances — not just the easiest one to arrange.
        </p>
        <ClientNote>Lender panel details or accreditations</ClientNote>
        <div style={{ marginBottom: 40 }} />

        <h2 style={{ color: "#006AC1", fontSize: 22, marginBottom: 12 }}>Leicester Property Market</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 8 }}>
          Leicester's property market has remained resilient, with strong demand across areas including
          Oadby, Stoneygate, Birstall, Wigston, and the city centre. Average property prices in
          Leicester have grown steadily, making mortgage planning more important than ever. Our local
          knowledge means we can advise you with genuine context, not just national statistics.
        </p>
        <ClientNote>Latest local market commentary or stats from Land Registry</ClientNote>
        <div style={{ marginBottom: 40 }} />

        <h2 style={{ color: "#006AC1", fontSize: 22, marginBottom: 12 }}>FCA Regulated Advice</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 8 }}>
          All mortgage advice provided through Heritage Estates is fully FCA regulated. Our advisers
          hold CeMAP qualifications and are authorised to provide mortgage recommendations.
        </p>
        <ClientNote>FCA registration number</ClientNote>
        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 40 }}>
          Your home may be repossessed if you do not keep up repayments on your mortgage.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 22, marginBottom: 12 }}>Get in Touch</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 8 }}>
          Ready to find out how much you could borrow? Contact our Leicester mortgage broker team today.
        </p>
        <ClientNote>Phone number, email, or embed contact form here</ClientNote>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
          Alternatively, use our free{" "}
          <Link href="/mortgage-calculator/" style={{ color: "#006AC1", fontWeight: 700 }}>
            mortgage calculator
          </Link>{" "}
          to get an instant estimate.
        </p>
        <div style={{ marginBottom: 48 }} />

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 16 }}>Areas we serve across Leicestershire</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 48 }}>
          {areasServed.map(({ name, description }) => (
            <div
              key={name}
              style={{ flex: "1 1 260px", background: "#fff", border: "1px solid #dde8f5", padding: "20px 22px" }}
            >
              <p style={{ fontWeight: 700, color: "#006AC1", marginBottom: 8, fontSize: 15 }}>{name}</p>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.65, margin: 0 }}>{description}</p>
            </div>
          ))}
        </div>

        <LeicesterPropertyData />

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 20 }}>
          Frequently asked questions — mortgage brokers in Leicester
        </h2>
        <div style={{ marginBottom: 44 }}>
          {faqItems.map(({ q, a }, i) => (
            <div key={i} style={{ borderBottom: "1px solid #dde8f5", paddingBottom: 20, marginBottom: 20 }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: "#333", marginBottom: 8 }}>{q}</p>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff8e1", border: "1px solid #f59e0b", borderLeft: "4px solid #f59e0b", padding: "16px 20px", marginBottom: 40, fontSize: 13, color: "#666", lineHeight: 1.6 }}>
          <strong style={{ color: "#555" }}>Looking for us on Google?</strong> Search "Heritage Estates Leicester" or "Heritage Estates Oadby" to find our Google Business Profile, read client reviews, and get directions to our office at 2 Brooksby Drive, Oadby, Leicester LE2 5AA.
        </div>

        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
