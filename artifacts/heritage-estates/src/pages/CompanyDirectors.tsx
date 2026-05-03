import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";
import CommitmentSection from "@/components/CommitmentSection";
import CtaBoxes from "@/components/CtaBoxes";

export default function CompanyDirectors() {
  return (
    <>
      <SeoHead
        title="Mortgages for Company Directors"
        description="Heritage Estates are whole of market mortgage advisers specialising in mortgages for company directors in Leicester and Oadby."
        path="/mortgages-for-company-directors/"
        ogImage="https://heritageestates.co.uk/wp-content/uploads/company-director-mortgages-524x349.jpg"
        ogImageWidth={524}
        ogImageHeight={349}
      />
      <PageWrapper regulatory="Your home may be repossessed if you do not keep up repayments on your mortgage.">
        <h1 style={{ color: "#006AC1", marginBottom: 24 }}>Mortgages for Company Directors</h1>

        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          Company Directors have access to the same range of lenders and mortgage products as those in regular employment. However, income requirements vary across the market so it's important to understand which lenders are likely to accept your mortgages for company directors application.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          If you're a sole trader or freelancer rather than a director, see our <Link href="/mortgages-for-self-employed/">mortgages for self employed</Link> page. Use our <Link href="/mortgage-calculator/">mortgage calculator</Link> to estimate your monthly repayments before we speak.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Whole of market advisor</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          This is where Heritage Estates can help. We're a whole of market advisor; this means we're not tied to specific lenders and with our knowledge and experience of company director lending criteria we can help to ensure your mortgage application is a success.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Company Director income</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          As a director of a company you'll most likely take a salary up to the tax-free threshold, and then draw quarterly or annual dividends for additional income. Sometimes you might leave cash in the business to avoid paying tax or as a growth fund. In many cases lenders consider your "income" as being the actual amount that you draw out as salary and dividends, however specialist lenders will sometimes account for retained profits within the business.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          For higher earners dividend income is often a more tax efficient way of being paid, and specialist lenders will recognise this and sometimes be willing to lend more based on the greater affordability.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          We also recommend reviewing your <Link href="/insurance-protection/">life and income protection insurance</Link> at the same time — if you're a director, your income protection needs are very different from an employed person.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Proof of income</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          Regular high-street lenders will usually require 2-3 years of accounts to prove your business profitability and earnings. However, specialist lenders might be willing base the mortgage on the last 12 month's of trading for businesses that are growing very quickly.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          If you're a Company Director and don't know where you stand getting a mortgage,{" "}
          <Link href="/contact/">contact us</Link> for a no-obligation chat and to see if we can help.
        </p>

        <h3 style={{ color: "#006AC1", marginBottom: 12 }}>About Heritage Estates</h3>
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
