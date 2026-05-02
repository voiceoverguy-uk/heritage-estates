import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import PageWrapper from "@/components/PageWrapper";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Heritage Estates</title>
      </Helmet>
      <PageWrapper>
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <h1 style={{ fontSize: 72, color: "#dde8f5", fontWeight: 700, margin: 0 }}>404</h1>
          <h2 style={{ color: "#006AC1", marginBottom: 16 }}>Page Not Found</h2>
          <p style={{ fontSize: 15, color: "#555", marginBottom: 32 }}>
            Sorry, we couldn't find the page you were looking for.
          </p>
          <Link href="/" className="he-btn">Return to Home</Link>
        </div>
      </PageWrapper>
    </>
  );
}
