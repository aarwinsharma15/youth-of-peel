import { useEffect } from 'react';

export default function SEO({ title, description, url, image }) {
  useEffect(() => {
    // Determine tags
    const siteTitle = 'Youth of Peel Region';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const desc = description || "A youth-led nonprofit organization dedicated to unifying young people across Brampton, Mississauga, and Caledon, and closing the opportunity gap through advocacy and community action.";
    const metaUrl = url ? `https://youthofpeel.com${url}` : 'https://youthofpeel.com/';
    const metaImage = image || '/logo-full.png';

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

    // Standard Meta
    setMetaTag('meta[name="title"]', 'content', fullTitle);
    setMetaTag('meta[name="description"]', 'content', desc);
    setMetaTag('meta[name="robots"]', 'content', 'index, follow');
    setMetaTag('meta[name="language"]', 'content', 'English');

    // Open Graph / Facebook
    setMetaTag('meta[property="og:title"]', 'content', fullTitle);
    setMetaTag('meta[property="og:description"]', 'content', desc);
    setMetaTag('meta[property="og:url"]', 'content', metaUrl);
    setMetaTag('meta[property="og:image"]', 'content', metaImage);
    setMetaTag('meta[property="og:site_name"]', 'content', siteTitle);

    // Twitter
    setMetaTag('meta[property="twitter:title"]', 'content', fullTitle);
    setMetaTag('meta[property="twitter:description"]', 'content', desc);
    setMetaTag('meta[property="twitter:url"]', 'content', metaUrl);
    setMetaTag('meta[property="twitter:image"]', 'content', metaImage);
    setMetaTag('meta[property="twitter:card"]', 'content', 'summary_large_image');

    // JSON-LD Schema
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "NGO",
      "name": "Youth of Peel Region",
      "alternateName": "YPR",
      "url": "https://youthofpeel.com",
      "logo": "https://youthofpeel.com/logo-full.png",
      "description": desc,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Peel",
        "addressCountry": "CA"
      },
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
    
  }, [title, description, url, image]);

  return null;
}
