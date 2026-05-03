import { useState } from "react";
import SeoHead from "@/components/SeoHead";
import PageWrapper from "@/components/PageWrapper";

const services = [
  "Residential",
  "Commercial",
  "Buy-To-Let",
  "First Time Buyer",
  "Remortgage",
  "Self Employed",
  "Company Director",
  "Insurance/Protection",
  "Other",
];

export default function Contact() {
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaAnswer !== "5") {
      alert("Please answer the security question correctly.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <SeoHead
        title="Regardless of your Mortgage Need or Question, Heritage Estates is here to help"
        description="Contact Heritage Estates for mortgage advice in Leicester and Oadby. Call us on 0116 253 7733 or fill in our enquiry form."
        path="/contact/"
        schemaType="ContactPage"
      />
      <PageWrapper
        regulatory="The Financial Conduct Authority do not regulate commercial and some buy to let mortgages. Commercial mortgages are available by referral only."
      >
        <h1 style={{ color: "#006AC1", marginBottom: 16, letterSpacing: 1 }}>CONTACT US</h1>
        <p style={{ fontSize: 15, color: "#444", marginBottom: 32, lineHeight: 1.7 }}>
          Thank you for visiting the Heritage Estates website. If you'd like more information, or to request a free initial consultation, please call us on{" "}
          <a href="tel:01162537733" style={{ color: "#006AC1", fontWeight: 700 }}>0116 253 7733</a> or use the quick contact form below. The guidance contained within this website is subject to the UK regulatory regime, and is therefore targeted at consumers based in the UK.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
          {/* Form */}
          <div style={{ flex: "1 1 400px" }}>
            <h2 style={{ color: "#006AC1", marginBottom: 24 }}>Enquiry Form</h2>
            {submitted ? (
              <div style={{ background: "#e8f4ff", border: "1px solid #006AC1", padding: 20 }}>
                <p style={{ color: "#006AC1", fontWeight: 600, fontSize: 15, margin: 0 }}>
                  Thank you for your enquiry. We will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="he-form-field">
                    <label>First Name <span style={{ color: "#dc2626" }}>*</span></label>
                    <input type="text" required />
                  </div>
                  <div className="he-form-field">
                    <label>Last Name <span style={{ color: "#dc2626" }}>*</span></label>
                    <input type="text" required />
                  </div>
                </div>
                <div className="he-form-field">
                  <label>Company</label>
                  <input type="text" />
                </div>
                <div className="he-form-field">
                  <label>Address <span style={{ color: "#dc2626" }}>*</span></label>
                  <input type="text" required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="he-form-field">
                    <label>Telephone</label>
                    <input type="tel" />
                  </div>
                  <div className="he-form-field">
                    <label>Email Address <span style={{ color: "#dc2626" }}>*</span></label>
                    <input type="email" required />
                  </div>
                </div>
                <div className="he-form-field">
                  <label>Message <span style={{ color: "#dc2626" }}>*</span></label>
                  <textarea rows={5} required style={{ resize: "vertical" }} />
                </div>
                <div className="he-form-field">
                  <label>Which Services Are You Interested In?</label>
                  <select>
                    <option value="">Which Services Are You Interested In?</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="he-form-field" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <label style={{ marginBottom: 0 }}>2 + 3 =</label>
                  <input
                    type="text"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    style={{ width: 80 }}
                    required
                  />
                </div>
                <button type="submit" className="he-btn" style={{ marginTop: 8 }}>
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Address */}
          <div style={{ flex: "0 1 280px" }}>
            <h2 style={{ color: "#006AC1", marginBottom: 20 }}>Our Address</h2>
            <p style={{ fontSize: 15, color: "#444", lineHeight: 2 }}>
              Newtown Fallowell Offices<br />
              2 Brooksby Drive<br />
              Oadby<br />
              Leicester LE2 5AA
            </p>
            <p style={{ fontSize: 15, marginBottom: 24 }}>
              Call us <a href="tel:01162537733" style={{ color: "#006AC1", fontWeight: 700 }}>0116 253 7733</a>
            </p>
            <img
              src="https://heritageestates.co.uk/wp-content/uploads/logo-heritage-estates.png"
              alt="Heritage Estates"
              style={{ maxWidth: 180 }}
            />

            <div style={{ marginTop: 32, borderTop: "2px solid #dde8f5", paddingTop: 24 }}>
              <h3 style={{ color: "#006AC1", fontSize: 15, marginBottom: 12 }}>If you are unhappy with our service</h3>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                If you have a complaint about your adviser, or any financial advice you have received from your adviser, please contact us:
              </p>
              <p style={{ fontSize: 13, color: "#444", lineHeight: 1.8 }}>
                <strong>Quilter Financial Planning Complaints Department</strong><br />
                Quilter<br />
                SUNDERLAND<br />
                SR43 4JP<br />
                Email: <a href="mailto:QFPcomplaints@quilter.com">QFPcomplaints@quilter.com</a><br />
                Tel: <a href="tel:08081712626">0808 171 2626</a>
              </p>
              <p style={{ fontSize: 13, color: "#555" }}>
                You can find more information by visiting the Quilter Financial Planning website:{" "}
                <a href="https://www.quilter.com/support-help/contact-us/contact-quilter-financial-planning/" target="_blank" rel="noopener noreferrer">
                  Contact Quilter Financial Planning | Quilter
                </a>
              </p>
              <p style={{ fontSize: 13, color: "#555" }}>
                If you cannot settle your complaint with us, you may be entitled to refer it to the Financial Ombudsman Service ({" "}
                <a href="http://www.financial-ombudsman.org.uk/" target="_blank" rel="noopener noreferrer">
                  www.financial-ombudsman.org.uk
                </a>)
              </p>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
