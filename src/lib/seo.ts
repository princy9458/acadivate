export async function getSEO(slug: string) {
  const defaultSEO = {
    metaTitle: "Acadivate | Excellence in Academia",
    metaDescription: "Empowering researchers and institutions through global conferences, awards, and scholarly collaboration.",
  };

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    const res = await fetch(`${apiUrl}/api/pages`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return defaultSEO;
    }

    const data = await res.json();
    const pages = data.pages || [];
    const page = pages.find((item: any) => item.slug === slug);

    if (!page || !page.seo) {
      return defaultSEO;
    }

    return {
      metaTitle: page.seo.metaTitle || defaultSEO.metaTitle,
      metaDescription: page.seo.metaDescription || defaultSEO.metaDescription,
    };
  } catch (error: any) {
    // Log error but don't throw, return defaults to keep page working
    console.error("DEBUG ERROR in getSEO:", error.message);
    return defaultSEO;
  }
}