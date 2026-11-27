# mamunabdu.com

My little corner of the web. Right now it's a simple "still cooking" page with a few of my projects, my latest Hashnode posts, and where to find me. A proper portfolio is on the way.

Plain HTML, CSS, and a bit of JavaScript. No frameworks, no build step.

Live at **[mamunabdu.com](https://mamunabdu.com)**.

## Run it locally

Clone the repo and serve the folder with any static server. Python's built-in one is enough:

```bash
git clone https://github.com/mamun-abdu/mamunabdu.com.git
cd mamunabdu.com
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly also works, but the 404 page uses root paths (`/styles.css`), so it only looks right when served.

## What's in here

| File | What it is |
| --- | --- |
| `index.html` | The landing page |
| `styles.css` | All styles, including the code card animation |
| `script.js` | Scroll-in reveal and nav highlighting |
| `404.html` | Not-found page that GitHub Pages serves automatically |
| `robots.txt`, `sitemap.xml` | Help search engines find the page |
| `CNAME` | Custom domain for GitHub Pages |
| `og-image.png`, favicons | Link preview image and icons |

## Deploying

The site is published with GitHub Pages from this repo, so pushing to the published branch (`main`) updates the live site within a few minutes. When you change `styles.css` or `script.js`, bump the `?v=` number where they're linked in `index.html` so browsers fetch the new file.

Say hi: [GitHub](https://github.com/mamun-abdu) · [LinkedIn](https://linkedin.com/in/mamunabdu) · [Hashnode](https://mamunabdu.hashnode.dev/) · [X](https://x.com/mamunabdux) · [Instagram](https://www.instagram.com/mamunabdux)
