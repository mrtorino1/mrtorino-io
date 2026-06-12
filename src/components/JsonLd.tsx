export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "mrtorino.io",
    url: "https://www.mrtorino.io",
    description: "A software studio building trading tools, AI automation systems, and education platforms.",
    foundingLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Medford", addressRegion: "OR", addressCountry: "US" } },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function SoftwareAppJsonLd({ product }: { product: { name: string; description: string; slug: string; tag: string; pricing: string } }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    url: `https://www.mrtorino.io/products/${product.slug}`,
    applicationCategory: product.tag,
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: product.pricing === "free" ? "0" : undefined, priceCurrency: "USD", availability: "https://schema.org/InStock" },
    publisher: { "@type": "Organization", name: "mrtorino.io" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
