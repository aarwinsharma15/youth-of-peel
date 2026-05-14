import { useEffect } from 'react';

export default function SEO({ title, description, url, image, keywords }) {
  useEffect(() => {
    const siteTitle = 'Youth of Peel';
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Empowering Youth in the Peel Region`;
    const desc = description || "Youth of Peel is a youth-led organization empowering young people across Brampton, Mississauga, and Caledon through advocacy, mentorship, and community action in the Peel Region.";
    const metaUrl = url ? `https://youthofpeel.ca${url}` : 'https://youthofpeel.ca/';
    const metaImage = image || 'https://youthofpeel.ca/og-preview.png';

    document.title = fullTitle;

    const setMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
        } else if (selector.startsWith('meta[property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    const setLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Canonical
    setLinkTag('canonical', metaUrl);

    // Standard Meta
    const defaultKeywords = "Youth of Peel, YPR, youth organization Peel Region, youth programs Brampton, youth services Mississauga, youth organization Caledon, youth advocacy Ontario, youth leadership Peel, volunteer hours Peel Region";
    setMetaTag('meta[name="title"]', 'content', fullTitle);
    setMetaTag('meta[name="description"]', 'content', desc);
    setMetaTag('meta[name="keywords"]', 'content', keywords || defaultKeywords);
    setMetaTag('meta[name="robots"]', 'content', 'index, follow');
    setMetaTag('meta[name="language"]', 'content', 'English');

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'content', fullTitle);
    setMetaTag('meta[property="og:description"]', 'content', desc);
    setMetaTag('meta[property="og:url"]', 'content', metaUrl);
    setMetaTag('meta[property="og:image"]', 'content', metaImage);
    setMetaTag('meta[property="og:site_name"]', 'content', siteTitle);

    // Twitter
    setMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', desc);
    setMetaTag('meta[name="twitter:url"]', 'content', metaUrl);
    setMetaTag('meta[name="twitter:image"]', 'content', metaImage);
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');

    // JSON-LD Schema
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "NonprofitOrganization",
      "name": "Youth of Peel",
      "alternateName": ["YPR", "Youth of Peel", "Peel Youth", "Youth of Peel Region"],
      "url": "https://youthofpeel.ca",
      "logo": {
        "@type": "ImageObject",
        "url": "https://youthofpeel.ca/logo.png"
      },
      "image": metaImage,
      "description": desc,
      "foundingDate": "2024",
      "address": [
        {
          "@type": "PostalAddress",
          "addressLocality": "Brampton",
          "addressRegion": "ON",
          "addressCountry": "CA"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Mississauga",
          "addressRegion": "ON",
          "addressCountry": "CA"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Caledon",
          "addressRegion": "ON",
          "addressCountry": "CA"
        }
      ],
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Region of Peel"
      },
      "email": "info.peelyouth@gmail.com",
      "sameAs": [
        "https://www.instagram.com/youthofpeelregion/",
        "https://www.linkedin.com/company/youthofpeel/",
        "https://www.tiktok.com/@youthofpeel",
        "https://x.com/YouthofPeel"
      ]
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

  }, [title, description, url, image, keywords]);

  return null;
}
