/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bassir-system.ma',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: [
    '/admin', '/admin/*',
    '/client', '/client/*',
    '/api/*',
    '/*/admin', '/*/admin/*',
    '/*/client', '/*/client/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/client', '/api'],
      },
      // Allow AI crawlers for AEO
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    additionalSitemaps: [
      'https://bassir-system.ma/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Priority map — higher = more important to Google
    const priorities = {
      '/fr': 1.0,
      '/ar': 1.0,
      '/fr/logiciel': 0.95,
      '/ar/logiciel': 0.95,
      '/fr/produits': 0.9,
      '/ar/produits': 0.9,
      '/fr/rfid': 0.9,
      '/ar/rfid': 0.9,
      '/fr/demo': 0.9,
      '/ar/demo': 0.9,
      '/fr/contact': 0.85,
      '/ar/contact': 0.85,
      '/fr/tarifs': 0.8,
      '/ar/tarifs': 0.8,
      '/fr/blog': 0.75,
      '/ar/blog': 0.75,
    };

    // Product pages
    const productSlugs = [
      'terminal-double-ecran',
      'imprimante-thermique',
      'balance-codes-barres',
      'bracelet-rfid',
      'logiciel-pos',
    ];

    // Blog slugs
    const blogSlugs = [
      'meilleur-logiciel-pos-maroc',
      'caisse-enregistreuse-arabe-maroc',
      'logiciel-hammam-rfid-maroc',
      'licence-vie-vs-abonnement-pos',
    ];

    productSlugs.forEach(slug => {
      priorities[`/fr/produits/${slug}`] = 0.85;
      priorities[`/ar/produits/${slug}`] = 0.85;
    });

    blogSlugs.forEach(slug => {
      priorities[`/fr/blog/${slug}`] = 0.7;
      priorities[`/ar/blog/${slug}`] = 0.7;
    });

    // Determine the alternate locale path
    const isAr = path.startsWith('/ar');
    const isFr = path.startsWith('/fr');
    const basePath = isAr ? path.replace(/^\/ar/, '') : isFr ? path.replace(/^\/fr/, '') : path;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? 0.65,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      // hreflang alternates for every page
      alternateRefs: [
        {
          href: `https://bassir-system.ma/fr${basePath}`,
          hreflang: 'fr-MA',
        },
        {
          href: `https://bassir-system.ma/ar${basePath}`,
          hreflang: 'ar-MA',
        },
        {
          href: `https://bassir-system.ma/fr${basePath}`,
          hreflang: 'x-default',
        },
      ],
    };
  },

  // Additional paths not auto-detected
  additionalPaths: async (config) => {
    const result = [];
    const locales = ['fr', 'ar'];
    const productSlugs = [
      'terminal-double-ecran',
      'imprimante-thermique',
      'balance-codes-barres',
      'bracelet-rfid',
      'logiciel-pos',
    ];
    const blogSlugs = [
      'meilleur-logiciel-pos-maroc',
      'caisse-enregistreuse-arabe-maroc',
      'logiciel-hammam-rfid-maroc',
      'licence-vie-vs-abonnement-pos',
    ];

    for (const locale of locales) {
      for (const slug of productSlugs) {
        result.push(await config.transform(config, `/${locale}/produits/${slug}`));
      }
      for (const slug of blogSlugs) {
        result.push(await config.transform(config, `/${locale}/blog/${slug}`));
      }
    }
    return result;
  },
};
