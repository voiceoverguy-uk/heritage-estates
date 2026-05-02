interface PageWrapperProps {
  children: React.ReactNode;
  regulatory?: string;
}

export default function PageWrapper({ children, regulatory }: PageWrapperProps) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 16px" }}>
      {regulatory && (
        <div className="he-regulatory">
          {regulatory}
        </div>
      )}
      {children}
    </div>
  );
}
