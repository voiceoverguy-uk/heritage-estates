import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";
import CommitmentSection from "@/components/CommitmentSection";
import CtaBoxes from "@/components/CtaBoxes";

export default function ResidentialMortgages() {
  return (
    <>
      <SeoHead
        title="Residential Mortgages Leicester | Heritage Estates | Whole of Market"
        description="Heritage Estates offer residential mortgage advice in Leicester and across Leicestershire. Whole-of-market advisers helping you find the right mortgage deal."
        path="/residential-mortgages/"
        ogImage="https://heritageestates.co.uk/wp-content/uploads/residential-mortgages-524x349.jpg"
        ogImageWidth={524}
        ogImageHeight={349}
      />
      <PageWrapper regulatory="Your home may be repossessed if you do not keep up repayments on your mortgage.">
        <h1 style={{ color: "#006AC1", marginBottom: 24 }}>Residential Mortgages</h1>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>The right mortgage for you</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 24 }}>
          Moving home is something you'll only usually do a few times in your life. For many reasons, buying your first or next home can be a stressful experience, so it's good to know that Heritage Estates are available to help with our residential mortgages. We'll answer any questions that you might have, and help you with the process of getting the right residential mortgage for your home and circumstances.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Personal Service</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 24 }}>
          We offer a personal service that takes into account your individual requirements. Since everyone's financial situation is unique, we'll work with you to understand your goals, and make financial recommendations based on a comprehensive and careful analysis of your circumstances.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Whole of Market Advisor</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          Heritage Estates have access to the whole of market; this means we're not tied to a specific lender.
        </p>

        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 24 }}>
          We also advise on <Link href="/insurance-protection/">mortgage protection insurance</Link> — so you're covered if the unexpected happens. If you're buying for the first time, see our dedicated <Link href="/mortgages-for-first-time-buyers/">first time buyer mortgage</Link> page, or use our <Link href="/mortgage-calculator/">mortgage calculator</Link> to estimate your monthly repayments. As an independent <Link href="/mortgage-broker-leicester/">mortgage broker in Leicester</Link>, we search the whole market to find the right deal for you.
        </p>

        <h3 style={{ color: "#006AC1", marginBottom: 12 }}>How We Work</h3>
        <ul style={{ fontSize: 15, color: "#444", lineHeight: 2, paddingLeft: 20, marginBottom: 32 }}>
          <li>Firstly, we'll arrange a no-obligation consultation at your convenience, to discuss your requirements.</li>
          <li>We'll discuss your existing borrowing and obligations, and look at the appropriate mortgage products available for your new home from a wide range of lenders.</li>
          <li>Before applying for a mortgage product, we can use our <Link href="/mortgage-calculator/">mortgage calculator</Link> to show you the monthly and lifetime costs of a mortgage to check its affordability.</li>
          <li>When you're happy with a particular mortgage product, we can help you with the application and get an "agreement in principle" from the lender.</li>
          <li>We're available for you to contact should you have a question about your mortgage at a later date.</li>
        </ul>

        <CommitmentSection />
        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
