# Wenjie Gong’s website

A minimal homepage and a Blog page that says “coming soon”.

- `index.html`: biography and manually curated Selected Publications, grouped into Quantum Control, Quantum Sensing and Benchmarking, and Quantum Phenomena in High Energy Physics.
- `blog/index.html`: Blog placeholder.
- `assets/css/site.css`: responsive styling.
- `assets/fonts/OpenSans-Variable.ttf`: bundled Open Sans font, served directly by the site without requiring a local installation or a third-party font service. Its SIL Open Font License is included in `assets/fonts/OpenSans-LICENSE.txt`; source: [Google Fonts](https://github.com/google/fonts/tree/main/ofl/opensans).
- `assets/js/publications.js`: preserved INSPIRE auto-update code, currently disabled. Both its script tag and the original publication layout are commented out in `index.html`.

Edit the visible Selected Publications section in `index.html` to update the curated list. Journal citations use the journal publication year when available.

## Preview

Run `python3 -m http.server 8000` from this directory and visit <http://localhost:8000>.

## Publish

Commit and push to the branch configured in GitHub Settings → Pages. The site remains compatible with GitHub Pages’ standard Jekyll build. `_config.yml` excludes the original template’s sample pages, posts, and collections. Those sources are retained in the repository but are not published.

To restore automatic INSPIRE updates, remove the Selected Publications section and uncomment the original layout and script tag. The preserved query uses `W.Gong.8`, associated with <https://inspirehep.net/authors/1869833>.

## Search visibility

The intended public homepage is `https://wenjieg.github.io/`. The homepage includes a descriptive search title and summary, an absolute canonical URL, ProfilePage/Person structured data, and social preview metadata. All selected publications are in the HTML, readable without JavaScript. `robots.txt` permits crawling and advertises `sitemap.xml`, which lists the homepage. The empty Blog page uses `noindex, follow`; remove `noindex` and add its URL to the sitemap when it has real content.

The current Git remote is `wenjieg/wenjiegong.github.io`. To publish at `https://wenjieg.github.io/`, rename the repository to `wenjieg.github.io` under your existing `wenjieg` account, update the local Git remote and the `repository` field in `_config.yml` to match, and configure Settings → Pages. The repository has not been renamed or deployed by these local SEO edits. See [GitHub Pages URL rules](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

After publishing:

1. Confirm the homepage, `/robots.txt`, `/sitemap.xml`, and `/wenjie.jpeg` return HTTP 200 at the intended domain.
2. Add `https://wenjieg.github.io/` as a URL-prefix property in [Google Search Console](https://search.google.com/search-console). Verify ownership using the exact HTML verification file or meta tag Google supplies, and publish it. No verification token has been added yet.
3. Submit `https://wenjieg.github.io/sitemap.xml` in Search Console, inspect the homepage URL, and request indexing.
4. Link to the homepage from your Google Scholar, LinkedIn, and institutional profiles where you can edit them.

Google controls indexing and ranking; these changes do not guarantee inclusion or a particular position. See [Google’s indexing instructions](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). If the public URL changes, update canonical, social, and structured-data URLs in `index.html`, the Blog canonical URL, `_config.yml`, `robots.txt`, and `sitemap.xml` together.
