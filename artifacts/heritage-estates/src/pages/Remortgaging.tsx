import { Helmet } from "react-helmet-async";
import PageWrapper from "@/components/PageWrapper";
import CommitmentSection from "@/components/CommitmentSection";
import CtaBoxes from "@/components/CtaBoxes";

const remortgageCommitment = [
  {
    title: "Saving you money",
    body: "We'll help to ensure you don't waste money unnecessarily by paying a higher monthly amount than you need to for your mortgage.",
  },
  {
    title: "Saving you time",
    body: "We'll help to save your time and effort by recommending only the most appropriate solutions for your circumstances.",
  },
  {
    title: "Guiding you through the process",
    body: "How much will it cost to remortgage? Can I afford it? Will I save money? We're on hand to answer any questions you might have, and help you to remortgage in a smooth and easy manner.",
  },
];

export default function Remortgaging() {
  return (
    <>
      <Helmet>
        <title>Remortgaging, Raising Additional Capital and Re-financing in Leicester</title>
        <meta name="description" content="Heritage Estates help with remortgaging, raising additional capital and re-financing in Leicester and Oadby. Expert whole-of-market mortgage advice." />
      </Helmet>
      <PageWrapper regulatory="Think carefully before securing other debts against your home. Your home may be repossessed if you do not keep up repayments on your mortgage.">
        <h1 style={{ color: "#006AC1", marginBottom: 24, letterSpacing: 0.5 }}>REMORTGAGING, RAISING ADDITIONAL CAPITAL AND RE-FINANCING</h1>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 12 }}>Remortgaging your existing property</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          You might be looking to consolidate your debts, raise money for home improvements, looking for a better monthly payment than you currently have, or want to restructure the terms of your current loan. At Heritage Estates we can help with remortgaging raising additional finance and re-financing.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          Remortgaging can be beneficial to your financial health in various ways. Remortgaging essentially involves moving your current mortgage to a new arrangement, either with your existing lender or a new one.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          The remortgage process is very similar to process of buying a new home. However, since it's not something that you do every day, we can help to guide you through the process.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          There are many different mortgage products to choose from, so it's good to know that Heritage Estates are available to help. We'll answer any questions that you might have, and help you with the process of remortgaging your property based on your requirements and circumstances.
        </p>

        <h2 style={{ color: "#006AC1", fontSize: 20, marginBottom: 16 }}>Reasons to consider remortgaging</h2>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>
          There are a number of different reasons people considering remortgaging their existing property:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 32 }}>
          {[
            { title: "To improve your home", body: "It might be more convenient or cost effective to enhance or extend your existing property, rather than move home." },
            { title: "To save money", body: "When you took out your current mortgage, it would have been competitive and attractive to you at the time. It might be that your incentive period is coming to an end, or simply that the market has changed and there are now better options available that will save you money." },
            { title: "To get a lump sum for a special cause", body: "If you have a wedding or university fees to fund, and your property's value has increased over time, you could release some of the additional equity to help towards this." },
            { title: "To consolidate debts", body: "Remortgaging can allow you to release some of the value in your home. This can be used to consolidate other debts that might be attracting higher rates of interest, for example credit cards. You should think carefully before securing other debts against your home, as the overall term may change and impact the total amount you end up repaying." },
          ].map((item) => (
            <div key={item.title} className="he-commitment-box">
              <h3>{item.title}</h3>
              <p style={{ fontSize: 14, color: "#555", margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <h3 style={{ color: "#006AC1", marginBottom: 12 }}>Why Remortgage?</h3>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
          Many borrowers and homeowners choose to review their mortgage every few years in order to take advantage of new rates that lenders are currently offering.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
          If you remain on the same deal for the full term of the lender's loan you could lose out by paying more money than you need to.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 32 }}>
          Furthermore, you might also have the ability to finish your mortgage term earlier than originally planned, thus saving a significant amount of money in interest payments.
        </p>

        <CommitmentSection items={remortgageCommitment} />
        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
