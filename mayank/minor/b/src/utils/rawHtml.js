function returnRawHtml(query, answer, papers, summary, validation) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>AI in Medical Research Data</title>
<style>
  @page { size: A4; margin: 20mm; }
  html,body { height:100%; margin:0; padding:0; -webkit-print-color-adjust:exact; }
  body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color:#333;
    background: #f6f7f9;
    padding: 24px;
    -webkit-font-smoothing:antialiased;
  }
  .wrap { max-width: 950px; margin: 0 auto; }

  /* removed sticky header to avoid print layout issues */

  footer {
    width:100%;
    box-sizing:border-box;
    background: white;
    padding: 10px 24px;
    border-top:1px solid #e6e8eb;
    font-size:0.85rem;
    color:#666;
  }

  h1 { font-size:28px; margin:18px 0; color:#2c3e50; text-align:center; letter-spacing:0.3px; }
  h2 { font-size:20px; margin:0 0 12px 0; color:#1a5276; }
  h3 { font-size:16px; margin:0 0 8px 0; color:#4a148c; }

  .section {
    background: white;
    border-radius:10px;
    padding:18px;
    margin: 18px 0;
    box-shadow: 0 6px 18px rgba(12,18,30,0.04);
    box-sizing: border-box;
    page-break-inside: avoid;
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
  }

  .papers { display:block; }
  .paper {
    border:1px solid #ece7f7;
    border-radius:8px;
    padding:14px;
    margin-bottom:12px;
    background:#fff;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  p { margin: 0 0 10px 0; line-height:1.6; orphans:3; widows:3; }
  a { color: #007bff; text-decoration: none; word-break: break-all; }
  .meta strong { color:#333; }
  .valid { color: green; font-weight:600; }
  .invalid { color: red; font-weight:600; }

  @media print {
    body { background: white; padding: 0; }
    .wrap { margin: 0; }
    .section { box-shadow: none; border: 0; }
  }

  @media (max-width:720px) {
    .wrap { padding: 12px; }
    h1 { font-size:22px; }
  }
</style>
</head>
<body>

  <div class="wrap">

    <section class="section" aria-labelledby="q-title">
      <h1 id="q-title">AI in Medical</h1>
      <h2>Query</h2>
      <p>${query}</p>
    </section>

    <section class="section" aria-labelledby="a-title">
      <h2 id="a-title">Answer</h2>
      <p>${answer}</p>
    </section>

    <section class="section" aria-labelledby="p-title">
      <h2 id="p-title" style="color:#6a1b9a;">Papers</h2>
      <div class="papers">
        ${Array.isArray(papers) ? papers.map(p => `
          <article class="paper" role="article">
            <h3>${p.title || ''}</h3>
            <p class="meta"><strong>Authors:</strong> ${(p.authors || []).join(", ")}</p>
            <p class="meta"><strong>Link:</strong> <a href="${p.url || '#'}" target="_blank" rel="noopener">${p.url || ''}</a></p>
            <p class="meta"><strong>Paper ID:</strong> ${p.paperId || ''}</p>
          </article>
        `).join("") : `<p>No papers provided.</p>`}
      </div>
    </section>

    <section class="section" aria-labelledby="s-title">
      <h2 id="s-title" style="color:#ff8f00;">Summary</h2>
      <p>${summary}</p>
    </section>

    <section class="section" aria-labelledby="v-title">
      <h2 id="v-title" style="color:#388e3c;">Validation</h2>
      <p>
        <strong>Is Valid:</strong>
        <span class="${validation && validation.isValid ? 'valid' : 'invalid'}">${validation && validation.isValid}</span>
      </p>
      <p><strong>Score:</strong> ${validation && (validation.score != null ? validation.score : '')}</p>
      <p><strong>Feedback:</strong> <em>${validation && (validation.feedback || '')}</em></p>
      <p><strong>Citations:</strong> ${(validation && Array.isArray(validation.citations) ? validation.citations.join(", ") : '')}</p>
    </section>

  </div>

  <footer>
    <div style="max-width:950px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;">
      <div>Generated HTML</div>
      <div style="font-size:0.85rem;color:#888;">A4 friendly · sections avoid page-breaks</div>
    </div>
  </footer>
</body>
</html>`;
}

module.exports = returnRawHtml;
