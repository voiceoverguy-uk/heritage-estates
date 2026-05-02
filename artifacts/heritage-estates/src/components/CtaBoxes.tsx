import { Link } from "wouter";

export default function CtaBoxes() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginTop: 40, gap: 0 }}>
      <div className="he-cta-box">
        <h4>FAQ</h4>
        <p style={{ fontSize: 14, marginBottom: 8, color: "#e8f4ff" }}>
          Read our FAQ's page for more information you may have –{" "}
          <Link href="/faq/" style={{ color: "#fff", fontWeight: 700 }}>Click Here</Link>
        </p>
      </div>
      <div className="he-cta-box">
        <h4>Contact Us</h4>
        <p style={{ fontSize: 14, marginBottom: 8, color: "#e8f4ff" }}>
          To contact us or need more advice on any of our services –{" "}
          <Link href="/contact/" style={{ color: "#fff", fontWeight: 700 }}>Click Here</Link>
        </p>
      </div>
    </div>
  );
}
