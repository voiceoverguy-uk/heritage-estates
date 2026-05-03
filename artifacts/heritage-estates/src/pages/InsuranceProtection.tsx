import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";
import CtaBoxes from "@/components/CtaBoxes";

export default function InsuranceProtection() {
  return (
    <>
      <SeoHead
        title="Insurance &amp; Protection Services Leicester | Heritage Estates"
        description="Heritage Estates provide mortgage insurance and protection services in Leicester, including life insurance, critical illness cover and income protection across Leicestershire."
        path="/insurance-protection/"
        ogImage="https://heritageestates.co.uk/wp-content/uploads/insurance-and-protection-524x349.jpg"
        ogImageWidth={524}
        ogImageHeight={349}
      />
      <PageWrapper>
        <h1 style={{ color: "#006AC1", marginBottom: 24, letterSpacing: 1 }}>INSURANCE &amp; PROTECTION</h1>

        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          You're probably familiar with how to protect your property with buildings and home contents insurance. However, your greatest asset is <strong>YOURSELF!</strong>
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          For most people, a <Link href="/residential-mortgages/">residential mortgage</Link> will be the greatest financial commitment that they ever make. Your home or property investment will usually be reliant on income being generated to support payment of the mortgage. This applies equally to <Link href="/buy-to-let-mortgages/">buy-to-let landlords</Link> who depend on rental income.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Is protection only about the mortgage?</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          The primary aim of protection is to help you keep your home (or property) in the event of unforeseen circumstances. The second aim is to maintain you and your family's standard of living.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          We want to help you get the right quality of cover for your insurance &amp; protection within your budget. After we've assessed your requirements, we can advise and make recommendations for you.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 16 }}>Events that could stop you being able to afford your mortgage</h2>
        <ul style={{ fontSize: 15, color: "#444", lineHeight: 2, paddingLeft: 20, marginBottom: 32 }}>
          <li>Short-term illness</li>
          <li>Redundancy</li>
          <li>An accident</li>
          <li>A serious illness</li>
          <li>Death</li>
          <li>Any of the above happening to your tenant in your buy-to-let property.</li>
        </ul>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 16 }}>We specialise in all types of financial protection</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            "Life Insurance",
            "Critical Illness Insurance",
            "Income Protection",
            "Accident & Sickness Insurance",
            "Family Income Benefit",
          ].map((item) => (
            <div key={item} style={{ background: "#f0f6ff", border: "1px solid #dde8f5", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>✓</div>
              <p style={{ color: "#006AC1", fontWeight: 600, fontSize: 14, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 16 }}>Do you need cover?</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
          Particularly for Income Protection insurance, your circumstances might mean that you don't need cover for an accident, sickness and unemployment:
        </p>
        <ul style={{ fontSize: 15, color: "#444", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>You might get a large redundancy pay out</li>
          <li>You might get help from the Government</li>
          <li>You might get substantial sick pay</li>
          <li>You might be already covered</li>
        </ul>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          Trust Heritage Estates to help you get the most appropriate protection for you, your family and your finances.{" "}
          <Link href="/contact/">Contact us</Link> for more information.
        </p>

        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
