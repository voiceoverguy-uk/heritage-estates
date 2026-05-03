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

const services = [
  { label: "Residential Mortgages", href: "/residential-mortgages/" },
  { label: "Buy-To-Let Mortgages", href: "/buy-to-let-mortgages/" },
  { label: "First Time Buyer Mortgages", href: "/mortgages-for-first-time-buyers/" },
  { label: "Remortgages", href: "/remortgaging/" },
  { label: "Self-Employed Mortgages", href: "/mortgages-for-self-employed/" },
  { label: "Company Director Mortgages", href: "/mortgages-for-company-directors/" },
  { label: "Insurance & Protection", href: "/insurance-protection/" },
];

export default function MortgageBrokerLeicester() {
  return (
    <>
      <SeoHead
        title="Mortgage Broker Leicester | Heritage Estates | Independent Advice"
        description="Heritage Estates are independent whole-of-market mortgage brokers based in Leicester. Expert mortgage advice for first-time buyers, home movers, buy-to-let investors and remortgages across Leicestershire."
        path="/mortgage-broker-leicester/"
        schemaType="WebPage"
        faqItems={faqItems}
        datePublished="2026-05-03"
      />

      <PageWrapper regulatory="Your home may be repossessed if you do not keep up repayments on your mortgage.">

        <h1 style={{ color: "#006AC1", marginBottom: 8 }}>Mortgage Broker in Leicester</h1>
        <p style={{ fontSize: 16, color: "#555", marginBottom: 36, lineHeight: 1.75 }}>
          Heritage Estates are an independent, whole-of-market mortgage broker based in Oadby, Leicester.
          We search hundreds of lenders to find the right mortgage for your circumstances — whether you are
          buying your first home, moving, remortgaging, or investing in buy-to-let property across
          Leicester and Leicestershire.
        </p>

        {/* Why a local broker */}
        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 16 }}>Why choose a local Leicester mortgage broker?</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 44 }}>
          {[
            {
              heading: "Whole-of-market access",
              body: "We are not tied to any single lender. That means we can compare thousands of mortgage products — including exclusive broker-only deals — to find the most competitive rate for you.",
            },
            {
              heading: "Local knowledge",
              body: "We understand the Leicester property market. Our advisers live and work here, and have helped hundreds of local families, landlords, and professionals secure the right mortgage.",
            },
            {
              heading: "No-obligation consultation",
              body: "Your first conversation with us is completely free and without obligation. We will discuss your situation, explain your options clearly, and only recommend a product we believe is right for you.",
            },
            {
              heading: "FCA authorised",
              body: "Heritage Estates (Leicester) Ltd. is an appointed representative of Quilter Mortgage Planning Limited, authorised and regulated by the Financial Conduct Authority.",
            },
          ].map(({ heading, body }) => (
            <div
              key={heading}
              style={{ flex: "1 1 260px", background: "#f7faff", border: "1px solid #dde8f5", borderLeft: "4px solid #006AC1", padding: "20px 22px" }}
            >
              <p style={{ fontWeight: 700, color: "#333", marginBottom: 8, fontSize: 15 }}>{heading}</p>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.65, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 16 }}>Our mortgage services in Leicester</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 44 }}>
          {services.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "#006AC1",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {label} →
            </Link>
          ))}
        </div>

        {/* Areas served */}
        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 16 }}>Areas we serve across Leicestershire</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 44 }}>
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

        {/* FAQ */}
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

        {/* Google Business Profile note */}
        <div style={{ background: "#fff8e1", border: "1px solid #f59e0b", borderLeft: "4px solid #f59e0b", padding: "16px 20px", marginBottom: 40, fontSize: 13, color: "#666", lineHeight: 1.6 }}>
          <strong style={{ color: "#555" }}>Looking for us on Google?</strong> Search "Heritage Estates Leicester" or "Heritage Estates Oadby" to find our Google Business Profile, read client reviews, and get directions to our office at 2 Brooksby Drive, Oadby, Leicester LE2 5AA.
        </div>

        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
