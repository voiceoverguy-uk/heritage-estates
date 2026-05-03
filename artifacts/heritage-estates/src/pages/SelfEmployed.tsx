import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";
import CtaBoxes from "@/components/CtaBoxes";

export default function SelfEmployed() {
  return (
    <>
      <SeoHead
        title="Get your Self Employed Mortgage Application approved with Heritage Estates"
        description="Heritage Estates help self-employed people get mortgage applications approved. Whole of market access to specialist and regular lenders in Leicester."
        path="/mortgages-for-self-employed/"
        ogImage="https://heritageestates.co.uk/wp-content/uploads/mortgages-for-self-employed-524x349.jpg"
      />
      <PageWrapper regulatory="Your home may be repossessed if you do not keep up repayments on your mortgage.">
        <h1 style={{ color: "#006AC1", marginBottom: 24, letterSpacing: 1 }}>MORTGAGES FOR SELF EMPLOYED</h1>

        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          Despite what you might have heard, self-employed people have access to the same range of lenders and mortgages for self employed products as those in regular employment.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          If you're self employed, what usually affects your ability to get a mortgage is being able to prove that your income is sufficient to make the regular loan repayments.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          Usually a lender will request to see at least two years' worth of company accounts, SA302s or tax returns. If you're already a homeowner and want to remortgage, either to move home or to switch to a better deal, your existing lender may not require as much evidence if you have a good history of making repayments on time.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Specialist vs regular lenders</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          There are some specialist lenders who offer mortgages designed especially for self-employed people. However, regular lenders will usually lend to the self-employed too. Heritage Estates have access to the whole of market; this means we're not tied to a specific lender.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Getting your mortgage application approved</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          Sometimes you might use legitimate methods to reduce your income and pay less tax. However this can work against you when applying for a mortgage as most lenders will base at least some of their decision on your taxable income. Fortunately some lenders understand this, and you might be able to demonstrate that your business has retained profits which can help to increase the likelihood of your mortgage application being approved.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          As a self-employed person your income and financial affairs might be more complicated than someone in regular employment. At Heritage Estates we can review your circumstances and explain which mortgage products are most suitable. Why not{" "}
          <Link href="/contact/">contact us</Link> for a no-obligation chat.
        </p>

        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
