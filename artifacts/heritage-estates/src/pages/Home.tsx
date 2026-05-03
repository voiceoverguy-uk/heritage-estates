import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import CtaBoxes from "@/components/CtaBoxes";

const services = [
  {
    label: "Residential Mortgages",
    href: "/residential-mortgages/",
    img: "https://heritageestates.co.uk/wp-content/uploads/residential-mortgages-524x349.jpg",
  },
  {
    label: "Mortgages For Company Directors",
    href: "/mortgages-for-company-directors/",
    img: "https://heritageestates.co.uk/wp-content/uploads/company-director-mortgages-524x349.jpg",
  },
  {
    label: "Buy To Let Mortgages",
    href: "/buy-to-let-mortgages/",
    img: "https://heritageestates.co.uk/wp-content/uploads/buy-to-let-mortgages-524x349.jpg",
  },
  {
    label: "Mortgages For Self Employed",
    href: "/mortgages-for-self-employed/",
    img: "https://heritageestates.co.uk/wp-content/uploads/mortgages-for-self-employed-524x349.jpg",
  },
  {
    label: "First Time Buyers",
    href: "/mortgages-for-first-time-buyers/",
    img: "https://heritageestates.co.uk/wp-content/uploads/mortgages-for-first-time-buyers-524x349.jpg",
  },
  {
    label: "Insurance & Protection",
    href: "/insurance-protection/",
    img: "https://heritageestates.co.uk/wp-content/uploads/insurance-and-protection-524x349.jpg",
  },
  {
    label: "Remortgages",
    href: "/remortgaging/",
    img: "https://heritageestates.co.uk/wp-content/uploads/remortgage-524x349.jpg",
  },
  {
    label: "Latest News",
    href: "/news/",
    img: "https://heritageestates.co.uk/wp-content/uploads/latest-news-mobile-524x349.jpg",
  },
];

export default function Home() {
  return (
    <>
      <SeoHead
        title="Mortgage Broker Leicester | Heritage Estates | Independent Advice"
        description="Heritage Estates are independent whole-of-market mortgage brokers based in Leicester. Residential mortgages, buy-to-let, remortgages, first-time buyers and insurance across Leicestershire."
        path="/"
        schemaType="WebPage"
      />

      {/* Hero */}
      <div className="he-hero">
        <img
          src="https://heritageestates.co.uk/wp-content/uploads/mortgages-in-leicester-hero-3.jpg"
          alt="Heritage Estates – Mortgage Broker in Leicester"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Main heading */}
      <div style={{ textAlign: "center", padding: "40px 16px 20px", maxWidth: 1100, margin: "0 auto" }}>
        <h1 className="he-home-heading" style={{ color: "#006AC1", fontSize: 32, fontWeight: 400 }}>Mortgage Broker in Leicester &amp; Oadby</h1>
        <p style={{ maxWidth: 680, margin: "16px auto 0", fontSize: 15, color: "#555", lineHeight: 1.7 }}>
          Your home may be repossessed if you do not keep up repayments on your mortgage. The Financial Conduct Authority do not regulate commercial and some buy to let mortgages. Commercial mortgages are available by referral only.
        </p>
      </div>

      {/* Service grid */}
      <div style={{ maxWidth: 1100, margin: "30px auto", padding: "0 16px" }}>
        <div className="he-service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {services.map((svc) => (
            <Link key={svc.href} href={svc.href} style={{ textDecoration: "none" }}>
              <div className="he-service-card">
                <img src={svc.img} alt={svc.label} loading="lazy" />
                <h4>{svc.label}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* About section */}
      <div style={{ background: "#f7faff", padding: "50px 16px", marginTop: 40 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ color: "#006AC1", marginBottom: 20 }}>About Heritage Estates</h2>
          <ul style={{ fontSize: 15, color: "#444", lineHeight: 2, paddingLeft: 20 }}>
            <li>We are a mortgage broker based in Oadby, Leicester</li>
            <li>Arrange a no-obligation consultation at your convenience, to discuss your requirements.</li>
            <li>Discuss your existing borrowing and obligations, and look at the appropriate mortgage products available for your new home from a wide range of lenders.</li>
            <li>Before applying for a mortgage &amp; Insurance services, we can do calculations to show you the monthly and lifetime costs of a mortgage to check its affordability.</li>
            <li>When you're happy with a particular mortgage product, we can help you with the application and get an "agreement in principle" from the lender.</li>
            <li>We're available for you to contact should you have a question about your mortgage at a later date.</li>
          </ul>
        </div>
      </div>

      {/* Areas served — local SEO */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 50px" }}>
        <h2 style={{ color: "#006AC1", marginBottom: 16 }}>Serving Leicester and the Surrounding Area</h2>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 12 }}>
          Based in <strong>Oadby, Leicester</strong>, Heritage Estates provides independent mortgage and insurance advice to clients across Leicestershire and the East Midlands, including:
        </p>
        <ul style={{ fontSize: 15, color: "#555", lineHeight: 2.2, paddingLeft: 20, columns: 2, columnGap: 40, marginBottom: 16 }}>
          <li>Leicester City</li>
          <li>Oadby &amp; Wigston</li>
          <li>Hinckley</li>
          <li>Loughborough</li>
          <li>Market Harborough</li>
          <li>Melton Mowbray</li>
          <li>Coalville</li>
          <li>Lutterworth</li>
          <li>Blaby</li>
          <li>Birstall</li>
        </ul>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
          Whether you're a <Link href="/mortgages-for-first-time-buyers/" style={{ color: "#006AC1" }}>first time buyer</Link> in Leicester, a landlord with <Link href="/buy-to-let-mortgages/" style={{ color: "#006AC1" }}>buy-to-let properties</Link> across Leicestershire, or a <Link href="/mortgages-for-self-employed/" style={{ color: "#006AC1" }}>self-employed professional</Link> in Oadby seeking specialist mortgage advice — we're here to help. Find out more about how we work as your <Link href="/mortgage-broker-leicester/" style={{ color: "#006AC1" }}>local mortgage broker in Leicester</Link>.
        </p>
      </div>

      {/* Commitment section */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "50px 16px 0" }}>
        <h2 style={{ color: "#006AC1", marginBottom: 24 }}>Our Commitment To You</h2>
        <div className="he-commitment-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          <div className="he-commitment-box">
            <h3>Saving you money</h3>
            <p style={{ fontSize: 14, color: "#555", margin: 0 }}>We'll help to ensure you don't waste money unnecessarily by paying a higher monthly amount than you need to for your mortgage.</p>
          </div>
          <div className="he-commitment-box">
            <h3>Saving you time</h3>
            <p style={{ fontSize: 14, color: "#555", margin: 0 }}>We'll help to save your time and effort by recommending only the most appropriate solutions for your circumstances. We can also advise which lenders you are more likely to be accepted by, so that you don't apply for mortgage products unnecessarily.</p>
          </div>
          <div className="he-commitment-box">
            <h3>Guiding you through the process</h3>
            <p style={{ fontSize: 14, color: "#555", margin: 0 }}>How much will a mortgage cost? Can I afford it? What deposit will I need? We're on hand to answer any questions you might have, and help you to apply for the appropriate mortgage in a smooth and easy manner.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
        <CtaBoxes />
      </div>
    </>
  );
}
