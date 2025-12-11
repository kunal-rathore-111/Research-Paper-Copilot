const githubClient = require("./githubClient");

const returnRawHtml = require("../utils/rawHtml");

async function generateHtml(conversation) {
  const { query, answer } = conversation;
  const { papers, summary, validation } = conversation.papers[0];


  const papersText = Array.isArray(papers)
    ? papers.map(p => (typeof p === 'string' ? p : p?.title || p?.url || JSON.stringify(p))).join(', ')
    : '';
  const prompt = `
              You are an "HTML Agent". Format the following research assistant data into a visually appealing HTML page for pdf generation.

              - DO NOT include any code block markers like \`\`\`html.
              - Use <section> for main categories: Query, Answer, Papers, Summary, Validation.
              - Use <article> for each paper including title, authors, link, and paper ID.
              - Use <h1> for the main heading, which MUST be exactly: "Research Report: ${query}".
              - Use <h2> for section headings, <h3> for paper titles.
              - Bold important labels like Authors, Link, Paper ID, Feedback.
              - Include inline CSS for better readability:
                  - Add spacing (margin/padding) between sections and articles.
                  - Use different colors for headings (vary colors slightly each time).
                  - For Validation: if "Is Valid" is true → green text, if false → red text.
                  - Use readable font-family and appropriate font sizes.
                  - Optional: subtle background color or border for sections for modern look.
              - Make the format modern and visually appealing, vary layout, or font sizes slightly each time.
              - *Make it well looking, there are no division of paragraph on two pages on the A4 size page like half was on bottom of page1 and half was on top of page2, ignore such things keep it will formated*
              - Return ONLY HTML (no explanations).

              Query: ${query}
              Answer: ${answer}
              Papers: ${papersText}
              Summary: ${summary}
              Validation: ${JSON.stringify(validation)}
              `;

  console.log("executing htmlagent");

  try {
    const messages = [
      {
        role: "user",
        content: prompt
      }
    ];

    const html = await githubClient.generateContent(messages);
    console.log("htmlagent executed successfully with GitHub Models");

    if (!html || html.trim() === '') {
      console.error("Empty output from GitHub Models.");
      throw new Error("Model returned empty HTML response.");
    }

    console.log(`\n\n\n\n${html}\n\n\n`);
    return html;

  } catch (error) {
    console.error("Error in html agent:", error.message);
    return returnRawHtml(query, answer, papers, summary, validation);
  }
}

module.exports = generateHtml;