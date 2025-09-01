module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": [
            "'self'",
            "https://supabasestrapi.onrender.com",
            "http://localhost:8000",
            "ws://localhost:5173",
            "https://kbgbfxxngaecdjoounhr.supabase.co"
          ],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://kbgbfxxngaecdjoounhr.supabase.co" // <-- allow Supabase images
          ],
        },
      },
    },
  }
  
];
