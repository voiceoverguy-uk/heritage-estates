import { Helmet } from "react-helmet-async";
import PageWrapper from "@/components/PageWrapper";

export default function OurTeam() {
  return (
    <>
      <Helmet>
        <title>Our Team - Heritage Estates</title>
        <meta name="description" content="Meet the Heritage Estates team. Julia Towarianskyj is our CeMAP-trained Mortgage & Insurance Adviser with over 15 years of experience." />
      </Helmet>
      <PageWrapper>
        <h1 style={{ color: "#006AC1", marginBottom: 32 }}>Our Team</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
          <div style={{ flex: "0 0 220px" }}>
            <img
              src="https://heritageestates.co.uk/wp-content/uploads/julia-towarrianskyj.png"
              alt="Julia Towarianskyj"
              style={{ width: "100%", maxWidth: 220, border: "3px solid #dde8f5" }}
            />
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <h2 style={{ color: "#006AC1", marginBottom: 4 }}>Julia Towarianskyj</h2>
            <p style={{ color: "#2EA3F2", fontWeight: 600, fontSize: 15, marginBottom: 20 }}>Mortgage &amp; Insurance Adviser</p>

            <h3 style={{ color: "#006AC1", fontSize: 16, marginBottom: 12 }}>Overview</h3>
            <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, marginBottom: 16 }}>
              With over 15 years of experience in financial services, I have held various roles from administration to mortgage and insurance adviser. I specialise in guiding clients through the mortgage process for both residential and buy-to-let properties, as well as providing mortgage protection insurance for everyone from first-time buyers to seasoned homeowners.
            </p>
            <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, marginBottom: 16 }}>
              As a CeMAP-trained professional, I am fully qualified to offer advice on a wide range of market products. This allows me to thoroughly explore the mortgage market, saving my clients valuable time and money by targeting lenders whose underwriting criteria align with their unique situations, ensuring optimal outcomes regardless of their needs.
            </p>
            <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, marginBottom: 24 }}>
              At Heritage Estates in Oadby, Leicester, our small, friendly team is dedicated to building strong relationships with our clients to find mortgages that are specifically tailored to their individual requirements.
            </p>

            <h3 style={{ color: "#006AC1", fontSize: 16, marginBottom: 12 }}>Specific Areas of Expertise</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid #dde8f5", marginBottom: 24 }}>
              <div style={{ padding: "16px", borderRight: "1px solid #dde8f5" }}>
                <ul style={{ listStyle: "disc", paddingLeft: 18, margin: 0, fontSize: 14, color: "#444", lineHeight: 2 }}>
                  <li>First Time Buyers</li>
                  <li>Remortgages</li>
                  <li>Buy to Let</li>
                  <li>Debt Consolidation</li>
                  <li>Credit Impaired</li>
                  <li>Ltd Co. BTL Mortgages</li>
                  <li>Company Directors</li>
                </ul>
              </div>
              <div style={{ padding: "16px" }}>
                <ul style={{ listStyle: "disc", paddingLeft: 18, margin: 0, fontSize: 14, color: "#444", lineHeight: 2 }}>
                  <li>Self Employed / 1yr accounts</li>
                  <li>Unusual income stream</li>
                  <li>Foreign Nationals</li>
                  <li>General Insurance</li>
                  <li>Life Cover</li>
                  <li>Critical Illness Cover</li>
                  <li>Income Protection</li>
                </ul>
              </div>
            </div>

            <h3 style={{ color: "#006AC1", fontSize: 16, marginBottom: 12 }}>And finally…</h3>
            <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7 }}>
              If you are looking for assistance with a mortgage or insurance, please feel free to give us a call on{" "}
              <a href="tel:01163660990" style={{ color: "#006AC1", fontWeight: 700 }}>0116 366 0990</a> for a chat or to arrange an appointment. I offer a free no-obligation initial consultation, where we can discuss your needs and assess your options.
            </p>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
