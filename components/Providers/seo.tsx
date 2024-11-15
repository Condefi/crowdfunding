"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Your Default Title",
  description = "Your default description goes here.",
  keywords = "your, default, keywords",
  ogImage = "https://example.com/default-og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
}) => {
  const pathname = usePathname();
  const canonicalUrl = `https://yourdomain.com${pathname}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default SEO;
