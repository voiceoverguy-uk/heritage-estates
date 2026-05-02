import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import PageWrapper from "@/components/PageWrapper";
import CtaBoxes from "@/components/CtaBoxes";

const faqs = [
  {
    q: "Do you charge a fee?",
    a: "We charge a fee of £500 which is payable on completion. This is for advice, research, recommendation and implementation and we see your mortgage through to completion. We believe that we offer value for money as with our expertise we can ensure that you do not pay more for your mortgage than you have to by securing the right interest rates and avoid paying hefty early redemption fees. We avoid wasting time and money with lenders and providers that appear attractive at first glance, but would ultimately not accept the clients due to their strict underwriting criteria.",
  },
  {
    q: "Which lenders do you work with or recommend?",
    a: "Heritage Estates have access to the whole of market; this means we're not tied to a specific lender.",
  },
  {
    q: "Can I get a mortgage if I'm self employed?",
    a: "Yes! Please see Mortgages for Self Employed for further details.",
  },
  {
    q: "Can I get a mortgage with less than 2 year's of accounts?",
    a: "Usually a lender will request to see at least two years' worth of company accounts, SA302s or tax returns. However, there are some lenders who would be prepared to consider your application with only 1 years accounts, each client's case is viewed on an individual basis, so we would have to look at your individual circumstances. If you're already a homeowner and want to remortgage, either to move home or to switch to a better deal, your existing lender may not require as much evidence if you have a good history of making repayments on time.",
  },
  {
    q: "What deposit will I need?",
    a: "Typically you'll need at least 5% of the cost of your home as a deposit. Usually, the bigger your deposit the better deal you can get on a mortgage (i.e. lower interest rate).",
  },
  {
    q: "What is a Fixed Rate Mortgage?",
    a: "A fixed rate mortgage is a type of mortgage where the interest rate on your mortgage stays the same, for the duration of your deal. They can be a useful way to manage your money, as you'll have a good idea about what you're going to pay each month.",
  },
  {
    q: "What is a Tracker Mortgage?",
    a: "A tracker mortgage has a variable interest rate which 'tracks' the movement of another rate – typically the Bank of England Base Rate. With tracker mortgages the interest rate can go up and down, which means your monthly payments can also increase and decrease. Tracker rates can be for a set period – for example one year to five years.",
  },
  {
    q: "What is a Lifetime Tracker Mortgage?",
    a: "A Lifetime Tracker Mortgage is a Tracker Mortgage that lasts for the whole term, rather than being for a set period.",
  },
  {
    q: "What is a Standard Variable Rate Mortgage?",
    a: "The standard variable rate is the mortgage rate your lender will usually move you onto once any introductory deal has finished. The standard variable rate (SVR) is a lender's normal interest rate without any discounts or deals. This interest rate is variable and can go up or down.",
  },
  {
    q: "When will interest rates go up?",
    a: "Unfortunately it's not possible to predict when interest rates will increase, or decrease. We can however provide estimates of how your monthly payments might be affected by a change in interest rates in the future.",
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className="accordion-trigger" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span style={{ fontSize: 20, color: "#006AC1", flexShrink: 0 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="accordion-content">
          <p style={{ margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQs on Fees, Lenders, Fixed rate Mortgages, Lifetime Tracker Mortgages</title>
        <meta name="description" content="Frequently asked questions about mortgages and the service Heritage Estates provide, including fees, lenders, fixed rate mortgages and tracker mortgages." />
      </Helmet>
      <PageWrapper>
        <h1 style={{ color: "#006AC1", marginBottom: 16 }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: 15, color: "#555", marginBottom: 32 }}>
          Below are some frequently asked questions about mortgages and the service we provide. If you can't find the answer to your question, why not{" "}
          <Link href="/contact/">contact us</Link>?
        </p>
        <div>
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
        <CtaBoxes />
      </PageWrapper>
    </>
  );
}
