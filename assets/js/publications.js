(() => {
  "use strict";

  // W.Gong.8 is the INSPIRE BAI on author record 1869833.
  const endpoint = new URL("https://inspirehep.net/api/literature");
  endpoint.search = new URLSearchParams({
    q: "a W.Gong.8",
    sort: "mostrecent",
    size: "100",
    fields: "titles,authors.full_name,publication_info,arxiv_eprints,dois,earliest_date"
  });
  const list = document.getElementById("publication-list");
  const status = document.getElementById("publications-status");

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function link(label, href) {
    const node = element("a", "", label);
    node.href = href;
    return node;
  }

  function publication(record) {
    const metadata = record.metadata;
    const title = metadata.titles?.[0]?.title;
    if (!title || !/^\d+$/.test(String(record.id))) {
      throw new Error("Invalid publication record");
    }
    const item = element("li", "publication");
    const url = `https://inspirehep.net/literature/${record.id}`;
    const heading = element("h3");
    // Publisher titles can contain inline MathML; render its text, never remote HTML.
    heading.append(link(title.replace(/<[^>]*>/g, ""), url));
    item.append(heading);

    const authors = element("p", "authors");
    (metadata.authors || []).forEach((author, index) => {
      if (index) authors.append(", ");
      const name = author.full_name || "";
      const displayName = name.split(", ").reverse().join(" ");
      authors.append(name === "Gong, Wenjie" ? element("strong", "", displayName) : displayName);
    });
    item.append(authors);

    const info = (metadata.publication_info || []).find(value => value.journal_title) || {};
    const venue = [info.journal_title, info.journal_volume, info.artid].filter(Boolean).join(" ");
    const year = info.year || (metadata.earliest_date || "").slice(0, 4);
    item.append(element("p", "publication-details", [venue, year].filter(Boolean).join(" · ")));

    const links = element("p", "publication-links");
    links.append(link("INSPIRE", url));
    const arxiv = metadata.arxiv_eprints?.[0]?.value;
    const doi = metadata.dois?.[0]?.value;
    if (arxiv) links.append(link("arXiv", `https://arxiv.org/abs/${encodeURIComponent(arxiv)}`));
    if (doi) links.append(link("DOI", `https://doi.org/${encodeURI(doi)}`));
    item.append(links);
    return item;
  }

  async function refresh() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      let next = endpoint.href;
      const records = [];
      const visited = new Set();
      while (next) {
        const url = new URL(next);
        if (url.origin !== endpoint.origin || !url.pathname.startsWith("/api/literature") || visited.has(url.href)) {
          throw new Error("Invalid pagination link");
        }
        visited.add(url.href);
        const response = await fetch(url.href, { signal: controller.signal });
        if (!response.ok) throw new Error(`INSPIRE returned ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data.hits?.hits)) throw new Error("Invalid INSPIRE response");
        records.push(...data.hits.hits);
        next = data.links?.next;
      }
      // Keep the saved list if the upstream service unexpectedly returns no records.
      if (!records.length) throw new Error("No publications returned");
      const unique = [...new Map(records.map(record => [record.id, record])).values()];
      const fragment = document.createDocumentFragment();
      unique.forEach(record => fragment.append(publication(record)));
      list.replaceChildren(fragment);
      status.textContent = "";
    } catch (error) {
      status.textContent = "Showing saved publications. Visit the INSPIRE profile for the latest list.";
    } finally {
      clearTimeout(timeout);
    }
  }

  refresh();
})();
