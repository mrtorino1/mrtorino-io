import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /bse was the BSE client staging site, now redirecting to
      // bigskyexploration.com — keep it out of this site's index.
      disallow: "/bse",
    },
    sitemap: "https://www.mrtorino.io/sitemap.xml",
  };
}
