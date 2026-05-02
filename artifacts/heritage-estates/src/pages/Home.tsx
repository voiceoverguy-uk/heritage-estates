import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import CtaBoxes from "@/components/CtaBoxes";

const services = [
  {
    label: "Residential Mortgages",
    href: "/residential-mortgages/",
    img: "https://heritageestates.co.uk/wp-content/uploads/residential-mortgages-524x349.jpg",
  },
  {
    label: "Mortgages For Directors",
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
      <Helmet>
        <title>Mortgage Broker in Leicester and Oadby</title>
        <meta name="description" content="Heritage Estates are mortgage brokers based in Oadby, Leicester. We offer residential mortgages, buy-to-let, remortgages, first time buyer advice and insurance services." />
      </Helmet>

      {/* Hero */}
      <div className="he-hero">
        <img
          src="https://heritageestates.co.uk/wp-content/uploads/mortgages-in-leicester-hero-3.jpg"
          alt="Heritage Estates – Mortgage Broker in Leicester"
        />
      </div>

      {/* Main heading */}
      <div style={{ textAlign: "center", padding: "40px 16px 20px", maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ color: "#006AC1", fontSize: 32, fontWeight: 400 }}>Mortgage &amp; Insurance Services</h1>
        <p style={{ maxWidth: 680, margin: "16px auto 0", fontSize: 15, color: "#555", lineHeight: 1.7 }}>
          Your home may be repossessed if you do not keep up repayments on your mortgage. The Financial Conduct Authority do not regulate commercial and some buy to let mortgages. Commercial mortgages are available by referral only.
        </p>
      </div>

      {/* Service grid */}
      <div style={{ maxWidth: 1100, margin: "30px auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
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

      {/* Commitment section */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "50px 16px 0" }}>
        <h2 style={{ color: "#006AC1", marginBottom: 24 }}>Our Commitment To You</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
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
