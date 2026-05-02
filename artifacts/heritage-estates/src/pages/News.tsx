import { Helmet } from "react-helmet-async";
import PageWrapper from "@/components/PageWrapper";
import CtaBoxes from "@/components/CtaBoxes";

const newsGroups = [
  {
    title: "Residential Property Review",
    items: [
      { label: "May 2024", url: "https://heritageestates.co.uk/wp-content/uploads/Quilter-FP-RPR-May24-v1-LR.pdf" },
      { label: "June 2024", url: "https://heritageestates.co.uk/wp-content/uploads/Quilter-FP-RPR-June24-v1-LR.pdf" },
    ],
  },
  {
    title: "Essentially Mortgages",
    items: [
      { label: "Q1 2024", url: "https://heritageestates.co.uk/wp-content/uploads/TOMD065-Quilter-FP-Ess-Q1-Winter-2024-Mortgages-v5.pdf" },
      { label: "Q2 2024", url: "https://heritageestates.co.uk/wp-content/uploads/TOMD079-QFP-Ess-Q2-Spring-2024-M-FULL-v6.pdf" },
      { label: "Q3 2024", url: "https://heritageestates.co.uk/wp-content/uploads/Quilter-Essentially-mortgages-July-24.pdf" },
      { label: "Q4 2024", url: "https://heritageestates.co.uk/wp-content/uploads/Quilter-Essentiallly-Mortgages-Q4-2024.pdf" },
      { label: "Q3 2025", url: "https://heritageestates.co.uk/wp-content/uploads/Essentially-Mortgages-Q3-2025.pdf" },
      { label: "Q4 2025", url: "https://heritageestates.co.uk/wp-content/uploads/Essentially-Mort-Q4-2025.pdf" },
    ],
  },
  {
    title: "Economic Review",
    items: [
      { label: "June 2024", url: "https://heritageestates.co.uk/wp-content/uploads/Economic-Review-July-2024.pdf" },
    ],
  },
  {
    title: "Mortgage Update 2025",
    items: [
      { label: "May 2025", url: "https://heritageestates.co.uk/wp-content/uploads/Mortgage-Update-for-May-25.pdf" },
    ],
  },
  {
    title: "Property Review",
    items: [
      { label: "Sept 2024", url: "https://heritageestates.co.uk/wp-content/uploads/Residential-Prop-Review-Sept-24.pdf" },
      { label: "Feb 2025", url: "https://heritageestates.co.uk/wp-content/uploads/Quilter-Q1-2025-property-update.pdf" },
      { label: "July 2025", url: "https://heritageestates.co.uk/wp-content/uploads/Property-Review-July-2025.pdf" },
    ],
  },
  {
    title: "House Price Index",
    items: [
      { label: "July 2024", url: "https://heritageestates.co.uk/wp-content/uploads/House-price-index-July-24.pdf" },
      { label: "August 2024", url: "https://heritageestates.co.uk/wp-content/uploads/House-Price-Index-Aug-24.pdf" },
    ],
  },
  {
    title: "Autumn Budget 2024",
    items: [
      { label: "View", url: "https://heritageestates.co.uk/wp-content/uploads/Autumn-Budget-2024.pdf" },
    ],
  },
];

export default function News() {
  return (
    <>
      <Helmet>
        <title>Latest News - Heritage Estates</title>
        <meta name="description" content="Latest news, mortgage market updates, property reviews and economic insights from Heritage Estates." />
      </Helmet>
      <PageWrapper>
        <h1 style={{ color: "#006AC1", marginBottom: 32 }}>Latest News</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {newsGroups.map((group) => (
            <div key={group.title} style={{ border: "1px solid #dde8f5", padding: "20px 24px" }}>
              <h4 style={{ color: "#006AC1", fontSize: 16, marginBottom: 14, borderBottom: "2px solid #2EA3F2", paddingBottom: 8 }}>
                {group.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {group.items.map((item) => (
                  <li key={item.url} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, color: "#555" }}>{item.label}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#006AC1",
                        fontSize: 13,
                        fontWeight: 700,
                        background: "#f0f6ff",
                        padding: "3px 10px",
                        border: "1px solid #006AC1",
                        textDecoration: "none",
                      }}
                    >
                      View PDF
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
