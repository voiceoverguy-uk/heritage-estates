import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";
import CommitmentSection from "@/components/CommitmentSection";
import CtaBoxes from "@/components/CtaBoxes";

export default function FirstTimeBuyers() {
  return (
    <>
      <SeoHead
        title="First Time Buyer Mortgages Leicester | Heritage Estates | Expert Advice"
        description="Heritage Estates help first-time buyers in Leicester and across Leicestershire navigate the mortgage process. Expert, whole-of-market advice tailored to your circumstances."
        path="/mortgages-for-first-time-buyers/"
        ogImage="https://heritageestates.co.uk/wp-content/uploads/mortgages-for-first-time-buyers-524x349.jpg"
        ogImageWidth={524}
        ogImageHeight={349}
      />
      <PageWrapper regulatory="Your home may be repossessed if you do not keep up repayments on your mortgage.">
        <h1 style={{ color: "#006AC1", marginBottom: 24, letterSpacing: 1 }}>MORTGAGES FOR FIRST TIME BUYERS</h1>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Buying your first home</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          Finding a suitable mortgage for first time buyers, you'll need a strategy to improve your chances of being accepted by a lender. Fortunately, Heritage Estates are here to help with the process of mortgages for first time buyers.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 24 }}>
          You'll also need to determine how much you can borrow before falling in love with a property. Traditionally this was based on a multiple of your salary, but lenders now take affordability into account based on both your income and outgoings.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>The right mortgage for you</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          You'll need to decide on the best type of mortgage for your circumstances. This could be a fixed-rate mortgage which will allow you to budget with certainty, since you'll know exactly how much your monthly payments will be. Alternatively you might prefer a tracker or variable mortgage, where your payments can go both up and down depending on the Bank of England base rate. See our <Link href="/faq/">FAQ page</Link> for plain-English explanations of fixed, tracker and variable rate mortgages.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          Finally, you'll need a suitable deposit to place down in order to secure a mortgage. Typically this would be around 20% of the property's value, but this will vary depending on your circumstances. Try our <Link href="/mortgage-calculator/">mortgage calculator</Link> to see how different deposit amounts affect your monthly repayments.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 24 }}>
          As a first time buyer, it's also worth considering <Link href="/insurance-protection/">life and income protection insurance</Link> at the same time as your mortgage — it protects your home if you're ever unable to work.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Don't leave it to chance</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          Applying for a mortgage and being rejected will leave a "search" on your credit file. Another lender might take a negative view of this if you then apply for another mortgage soon afterwards. We can advise on the likelihood of your mortgage application being accepted and help to reduce the number of mortgages that you might otherwise need to apply for. Why not{" "}
          <Link href="/contact/">contact us today</Link> for a no-obligation chat?
        </p>

        <h3 style={{ color: "#006AC1", marginBottom: 12 }}>How We Work</h3>
        <ul style={{ fontSize: 15, color: "#444", lineHeight: 2, paddingLeft: 20, marginBottom: 32 }}>
          <li>Firstly, we'll arrange a no-obligation consultation at your convenience, to discuss your requirements.</li>
          <li>We'll discuss your existing borrowing and obligations, and look at the appropriate mortgage products available for your new home from a wide range of lenders.</li>
          <li>Before applying for a mortgage product, we can do calculations to show you the monthly and lifetime costs of a mortgage to check its affordability.</li>
          <li>When you're happy with a particular mortgage product, we can help you with the application and get an "agreement in principle" from the lender.</li>
          <li>We're available for you to contact should you have a question about your mortgage at a later date.</li>
        </ul>

        <CommitmentSection />
        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
