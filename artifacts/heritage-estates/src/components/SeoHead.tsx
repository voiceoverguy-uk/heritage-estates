import { Helmet } from "react-helmet-async";

const SITE_NAME = "Heritage Estates";
const SITE_URL = "https://heritageestates.co.uk";
const DEFAULT_IMAGE = "https://heritageestates.co.uk/wp-content/uploads/mortgages-in-leicester-hero-3.jpg";
const LOGO_URL = "https://heritageestates.co.uk/wp-content/uploads/logo-heritage-estates.png";
const PHONE = "+441162537733";
const ADDRESS = {
  streetAddress: "2 Brooksby Drive",
  addressLocality: "Oadby",
  addressRegion: "Leicester",
  postalCode: "LE2 5AA",
  addressCountry: "GB",
};

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schemaType?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage";
  faqItems?: Array<{ q: string; a: string }>;
}

const localBusinessSchema = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PHONE,
  logo: LOGO_URL,
  image: DEFAULT_IMAGE,
  description:
    "Heritage Estates are independent mortgage brokers based in Oadby, Leicester, offering residential mortgages, buy-to-let, remortgages, first-time buyer advice, self-employed mortgages, company director mortgages, and insurance & protection services.",
  address: {
    "@type": "PostalAddress",
    ...ADDRESS,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.5914,
    longitude: -1.0882,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:30",
    },
  ],
  sameAs: [SITE_URL],
  priceRange: "££",
  areaServed: [
    { "@type": "City", name: "Leicester" },
    { "@type": "City", name: "Oadby" },
    { "@type": "City", name: "Wigston" },
    { "@type": "City", name: "Hinckley" },
    { "@type": "City", name: "Loughborough" },
    { "@type": "City", name: "Market Harborough" },
    { "@type": "City", name: "Melton Mowbray" },
    { "@type": "AdministrativeArea", name: "Leicestershire" },
    { "@type": "AdministrativeArea", name: "East Midlands" },
  ],
};

export default function SeoHead({
  title,
  description,
  path,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  schemaType = "WebPage",
  faqItems,
}: SeoHeadProps) {
  const canonicalUrl = `${SITE_URL}${path}`;

  const webPageSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: LOGO_URL,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE,
          contactType: "customer service",
          areaServed: "GB",
          availableLanguage: "English",
        },
      },
      {
        ...localBusinessSchema,
        "@context": "https://schema.org",
      },
      {
        "@type": schemaType,
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: { "@id": SITE_URL },
        inLanguage: "en-GB",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: buildBreadcrumb(path),
        },
      },
      ...(faqItems
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqItems.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} – ${title}`} />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} – ${title}`} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema, null, 0)}
      </script>
    </Helmet>
  );
}

function buildBreadcrumb(path: string) {
  const crumbs: Array<{ "@type": string; position: number; name: string; item: string }> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ];

  if (path !== "/") {
    const slug = path.replace(/\//g, "");
    const label = slugToLabel(slug);
    crumbs.push({
      "@type": "ListItem",
      position: 2,
      name: label,
      item: `${SITE_URL}${path}`,
    });
  }

  return crumbs;
}

function slugToLabel(slug: string): string {
  const map: Record<string, string> = {
    faq: "FAQ",
    news: "Latest News",
    "our-team": "Our Team",
    contact: "Contact",
    "residential-mortgages": "Residential Mortgages",
    "buy-to-let-mortgages": "Buy To Let Mortgages",
    "mortgages-for-first-time-buyers": "Mortgages for First Time Buyers",
    remortgaging: "Remortgaging",
    "mortgages-for-self-employed": "Mortgages for Self Employed",
    "insurance-protection": "Insurance & Protection",
    "mortgages-for-company-directors": "Mortgages for Company Directors",
    "privacy-cookies": "Privacy & Cookies",
    "mortgage-calculator": "Mortgage Calculator",
  };
  return map[slug] ?? slug;
}
