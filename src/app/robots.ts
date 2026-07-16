import type { MetadataRoute } from "next";
import { BSE_INDEXABLE } from "./bse/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /bse is a client staging site; blocked until its kill switch flips.
      ...(BSE_INDEXABLE ? {} : { disallow: "/bse" }),
    },
    sitemap: "https://www.mrtorino.io/sitemap.xml",
  };
}
