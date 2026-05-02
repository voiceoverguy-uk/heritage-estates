interface CommitmentItem {
  title: string;
  body: string;
}

interface CommitmentSectionProps {
  items?: CommitmentItem[];
}

const defaultItems: CommitmentItem[] = [
  {
    title: "Saving you money",
    body: "We'll help to ensure you don't waste money unnecessarily by paying a higher monthly amount than you need to for your mortgage.",
  },
  {
    title: "Saving you time",
    body: "We'll help to save your time and effort by recommending only the most appropriate solutions for your circumstances. We can also advise which lenders you are more likely to be accepted by, so that you don't apply for mortgage products unnecessarily.",
  },
  {
    title: "Guiding you through the process",
    body: "How much will a mortgage cost? Can I afford it? What deposit will I need? We're on hand to answer any questions you might have, and help you to apply for the appropriate mortgage in a smooth and easy manner.",
  },
];

export default function CommitmentSection({ items = defaultItems }: CommitmentSectionProps) {
  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ color: "#006AC1", marginBottom: 24 }}>Our Commitment To You</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        {items.map((item) => (
          <div key={item.title} className="he-commitment-box">
            <h3>{item.title}</h3>
            <p style={{ fontSize: 14, color: "#555", margin: 0 }}>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
