## Helmet.js Configuration

### Configuration Applied

import helmet from "helmet";

helmet({
  contentSecurityPolicy: false,
  hidePoweredBy: true,
  noSniff: true,
  hsts: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "no-referrer" },
});

### Justification

The helmetConfig.ts used for this project is copy-pasted from the Recommended Approach for Most Student in Module 5 notes. 
I will explain the comfigurations used here using resources from the official Helmet.js documentation with some support with
the OWASP Secure Headers Project.

1. **contentSecurityPolicy: false** - This is disabled because the API for it serves only JSON responses and does not deliver HTML
content. The contentSecurityPolicy primarily acts as protection against XSS in browsers rendering HTML.

2. **hidePoweredBy: true** - This will hide the X-Powered-By header to reduce information leakage about the server stack.

3. **noSniff: true** - This will prevent browsers from MIME-sniffing (Multipurpose Internet Mail Extensions) the response, 
protecting against content-type confusion attacks. 

4. **hsts: false** - This is to avoid enforcing HTTPS locally, which can interfere with development workflows. 

5. **maxAge: 31536000** - This forces HTTPS for one year. 

6. **includeSubDomains: true** - This applies HSTS (HTTP Strict-Transport-Security) to all subdomains.

7. **preload: true** - This allows inclusion in browser preload lists.

8. **frameguard: { action: "deny" }** - This prevents clickjacking by disallowing embedding in iframes. 

9. **referrerPolicy: { policy: "no-referrer" }** - This ensures no Referrer header is sent to external sites, protecting 
sensitive URLs.

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. OWASP Secure Headers Project - https://owasp.org/www-project-secure-headers/

## CORS Configuration 

### Configuration Applied

cors({
  origin: true,           
  credentials: true,     
  origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

### Justification

1. **origin: true** - This allows all origins to simplify testing and local development. Only explicitly allowed
origins from ALLOWED_ORIGINS can access the API. This prevents unauthorized domains from making requests, reducing
the risk of cross-origin attacks.

2. **credentials: true** - This enables sending cookies, authorization headers, or TLS (Transport Layer Security) client 
certificates. This is necessary if the API relies on session-based authentication or JWT tokens.

3. **methods: ["GET", "POST", "PUT", "DELETE"]** - Restricting to GET, POST, PUT, DELETE prevents unexpected or unsafe HTTP methods
from being accepted by your API.

### Sources