import { useEffect } from 'react';

export default function SEO({ title, description, url, image, keywords }) {
  useEffect(() => {
    // Determine tags
    const siteTitle = 'Youth of Peel';
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Empowering Youth in the Peel Region`;
    const desc = description || "Youth of Peel is a youth-led organization empowering young people across Brampton, Mississauga, and Caledon through advocacy, mentorship, and community action in the Peel Region.";
    const metaUrl = url ? `https://youthofpeel.ca${url}` : 'https://youthofpeel.ca/';
    const metaImage = image || 'https://youthofpeel.ca/og-image.jpg';

    // Update document title
    document.title = fullTitle;

    // Helper function to set meta tags
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

    // Helper to set link tags (e.g. canonical)
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
    const defaultKeywords = "Youth of Peel, youth organization Peel Region, youth programs Brampton, youth services Mississauga, youth organization Caledon, youth advocacy Ontario, youth leadership Peel, volunteer hours Peel Region";
    setMetaTag('meta[name="title"]', 'content', fullTitle);
    setMetaTag('meta[name="description"]', 'content', desc);
    setMetaTag('meta[name="keywords"]', 'content', keywords || defaultKeywords);
    setMetaTag('meta[name="robots"]', 'content', 'index, follow');
    setMetaTag('meta[name="language"]', 'content', 'English');

    // Open Graph / Facebook
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
      "@type": "Organization",
      "name": "Youth of Peel",
      "url": "https://youthofpeel.ca",
      "logo": "https://youthofpeel.ca/logo.png",
      "description": desc,
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Brampton",
        "addressRegion": "ON",
        "addressCountry": "CA"
      },
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
