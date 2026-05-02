import { useState } from "react";
import { Link, useLocation } from "wouter";

const serviceLinks = [
  { label: "Residential", href: "/residential-mortgages/" },
  { label: "Buy-To-Let", href: "/buy-to-let-mortgages/" },
  { label: "First Time Buyers", href: "/mortgages-for-first-time-buyers/" },
  { label: "Remortgages", href: "/remortgaging/" },
  { label: "Self Employed", href: "/mortgages-for-self-employed/" },
  { label: "Insurance & Protection", href: "/insurance-protection/" },
  { label: "Company Directors", href: "/mortgages-for-company-directors/" },
];

const topLinks = [
  { label: "Home", href: "/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Latest News", href: "/news/" },
  { label: "Our Team", href: "/our-team/" },
  { label: "Mortgage Calculator", href: "/mortgage-calculator/" },
  { label: "Contact us", href: "/contact/" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Open Sans', Arial, sans-serif" }}>
      {/* Top announcement bar */}
      <div className="he-top-bar">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#006AC1" style={{ flexShrink: 0 }}>
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span style={{ color: "#555", fontSize: 13 }}>
            Call us for a no-obligation chat | <a href="tel:01162537733" style={{ color: "#006AC1", fontWeight: 600 }}>0116 253 7733</a>
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="he-nav-top">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          {/* Logo */}
          <Link href="/">
            <img
              src="https://heritageestates.co.uk/wp-content/uploads/logo-heritage-estates.png"
              alt="Heritage Estates"
              style={{ height: 70, cursor: "pointer" }}
            />
          </Link>

          {/* Top nav links */}
          <nav className="desktop-nav-top" style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
            {topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "6px 14px",
                  fontSize: 14,
                  color: isActive(link.href) ? "#fff" : "#006AC1",
                  backgroundColor: isActive(link.href) ? "#006AC1" : "transparent",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!isActive(link.href)) {
                    (e.target as HTMLElement).style.backgroundColor = "#f0f6ff";
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!isActive(link.href)) {
                    (e.target as HTMLElement).style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "1px solid #006AC1", padding: "6px 10px", cursor: "pointer", color: "#006AC1" }}
          >
            ☰ Menu
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div style={{ background: "#fff", borderBottom: "2px solid #006AC1", padding: "8px 16px" }}>
          {[...topLinks, ...serviceLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "8px 0", color: "#006AC1", fontSize: 14, fontWeight: 600, borderBottom: "1px solid #eee", textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Services navigation bar */}
      <div className="he-nav-services">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px", display: "flex", flexWrap: "wrap" }}>
          {serviceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`he-nav-services-link${isActive(link.href) ? " active" : ""}`}
              style={{
                padding: "10px 14px",
                fontSize: 14,
                fontWeight: 600,
                color: isActive(link.href) ? "#fff" : "#006AC1",
                backgroundColor: isActive(link.href) ? "#006AC1" : "transparent",
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!isActive(link.href)) {
                  (e.target as HTMLElement).style.backgroundColor = "#006AC1";
                  (e.target as HTMLElement).style.color = "#fff";
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!isActive(link.href)) {
                  (e.target as HTMLElement).style.backgroundColor = "transparent";
                  (e.target as HTMLElement).style.color = "#006AC1";
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Page content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="he-footer">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginBottom: 20 }}>
            <div style={{ flex: "1 1 280px" }}>
              <img
                src="https://heritageestates.co.uk/wp-content/uploads/logo-heritage-estates.png"
                alt="Heritage Estates"
                style={{ height: 50, marginBottom: 12, filter: "brightness(0) invert(1)" }}
              />
              <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>
                Heritage Estates (Leicester) Ltd. is an appointed representative of Quilter Mortgage Planning Limited.
              </p>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Services</h4>
              {serviceLinks.map((l) => (
                <div key={l.href} style={{ marginBottom: 4 }}>
                  <Link href={l.href} style={{ color: "#aac8e8", fontSize: 13, textDecoration: "none" }}>
                    {l.label}
                  </Link>
                </div>
              ))}
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Contact</h4>
              <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.8, margin: 0 }}>
                Newtown Fallowell Offices<br />
                2 Brooksby Drive<br />
                Oadby<br />
                Leicester LE2 5AA<br />
                <a href="tel:01162537733" style={{ color: "#aac8e8" }}>0116 253 7733</a>
              </p>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Information</h4>
              <div style={{ marginBottom: 4 }}><Link href="/faq/" style={{ color: "#aac8e8", fontSize: 13, textDecoration: "none" }}>FAQ</Link></div>
              <div style={{ marginBottom: 4 }}><Link href="/news/" style={{ color: "#aac8e8", fontSize: 13, textDecoration: "none" }}>Latest News</Link></div>
              <div style={{ marginBottom: 4 }}><Link href="/our-team/" style={{ color: "#aac8e8", fontSize: 13, textDecoration: "none" }}>Our Team</Link></div>
              <div style={{ marginBottom: 4 }}><Link href="/mortgage-calculator/" style={{ color: "#aac8e8", fontSize: 13, textDecoration: "none" }}>Mortgage Calculator</Link></div>
              <div style={{ marginBottom: 4 }}><Link href="/privacy-cookies/" style={{ color: "#aac8e8", fontSize: 13, textDecoration: "none" }}>Privacy & Cookies</Link></div>
              <div style={{ marginBottom: 4 }}><Link href="/contact/" style={{ color: "#aac8e8", fontSize: 13, textDecoration: "none" }}>Contact Us</Link></div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #2a4a6a", paddingTop: 16, fontSize: 12, color: "#888", lineHeight: 1.6 }}>
            <p style={{ margin: "0 0 6px" }}>
              Your home may be repossessed if you do not keep up repayments on your mortgage. The Financial Conduct Authority do not regulate commercial and some buy to let mortgages. Commercial mortgages are available by referral only.
            </p>
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Heritage Estates (Leicester) Ltd. All rights reserved. |{" "}
              <Link href="/privacy-cookies/" style={{ color: "#888" }}>Privacy & Cookies</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
