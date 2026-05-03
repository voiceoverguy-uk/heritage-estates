import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";
import CtaBoxes from "@/components/CtaBoxes";

const commitmentItems = [
  {
    title: "Saving you money",
    body: "Buy-to-let is more complex – we'll help to ensure you don't end up paying a higher monthly amount than you need to for your buy to let mortgage.",
  },
  {
    title: "Saving you time",
    body: "We'll help to save you time by recommending only the most appropriate buy-to-let mortgages for your investment property.",
  },
  {
    title: "Guiding you through the process",
    body: "What are the interest rates for buy-to-let mortgages? Will the lender require a minimum income? Can I afford it? We're on hand to answer any questions you might have.",
  },
];

export default function BuyToLet() {
  return (
    <>
      <SeoHead
        title="Buy-To-Let Mortgages offered by the advisors from Heritage Estates"
        description="Heritage Estates offer buy-to-let mortgage advice in Leicester and Oadby. Whole of market access to help you find the right investment property mortgage."
        path="/buy-to-let-mortgages/"
        ogImage="https://heritageestates.co.uk/wp-content/uploads/buy-to-let-mortgages-524x349.jpg"
      />
      <PageWrapper regulatory="The Financial Conduct Authority do not regulate some buy to let mortgages.">
        <h1 style={{ color: "#006AC1", marginBottom: 24, letterSpacing: 1 }}>BUY TO LET MORTGAGES</h1>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Your investment property</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 24 }}>
          Buying your first or next investment property can be daunting, the buy to let mortgage market can be complex with many different products to choose from. Therefore, it's good to know that Heritage Estates are available to help. We'll answer any questions that you might have and help you with the process of getting the right buy-to-let mortgage for your investment property.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Finding a good deal on buy-to-let mortgage</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 24 }}>
          Lenders generally view buy-to-let mortgages as higher risk than standard residential mortgages because they know that landlords often rely on rental income to make the mortgage repayments. Because of this perceived risk, interest rates tend to be higher for buy-to-let mortgages and the lender will also require a larger deposit.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Whole of Market Advisor</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 24 }}>
          Heritage Estates have access to the whole of market; this means we're not tied to a specific lender.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          Use our <Link href="/mortgage-calculator/">mortgage calculator</Link> to get an estimate of repayments on a buy-to-let property. We also advise on <Link href="/insurance-protection/">landlord and rental protection insurance</Link> to protect your income if your tenant is unable to pay.
        </p>

        <h3 style={{ color: "#006AC1", marginBottom: 12 }}>Why buy-to-let?</h3>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
          With a steady increase in rental incomes over recent years, buying a property to rent out can be a good way to bring in additional regular income.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
          As an investment, buy-to-let also has the potential benefit of capital growth on the property's value over a longer period of time.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
          The value of the investment and the income they produce can go down as well as up and you may not get back as much as you put in.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          Getting the right mortgage helps to ensure you'll make a good return on your investment. Buy-to-let mortgages are usually more expensive than residential loans, but there are still competitive rates and we can help you to secure a good deal.
        </p>

        <h3 style={{ color: "#006AC1", marginBottom: 20 }}>Our Commitment To You</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 32 }}>
          {commitmentItems.map((item) => (
            <div key={item.title} className="he-commitment-box">
              <h3>{item.title}</h3>
              <p style={{ fontSize: 14, color: "#555", margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
