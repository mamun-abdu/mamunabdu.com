# mamunabdu.com

Personal site for [Md. Abdullah Al Mamun](https://github.com/mamun-abdu) — a still-cooking landing page with a few projects, Hashnode posts, milestones, and ways to get in touch.

This is a static site: HTML, CSS, and a little JavaScript. No build step. Open `index.html` in a browser, or serve the folder with any static file server.

Live domain (after DNS is pointed at GitHub Pages): [https://mamunabdu.com](https://mamunabdu.com)

## GitHub Pages

The site is served from the `main` branch root, with a `CNAME` file set to `mamunabdu.com`.

For an apex domain, GitHub Pages expects these records (also add IPv6 if you want):

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `mamun-abdu.github.io` |

Until the custom domain is connected, the Pages URL is `https://mamun-abdu.github.io/mamunabdu.com/`.
