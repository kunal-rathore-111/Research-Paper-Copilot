

const API_KEY = process.env.GEMINI_API;;

async function validationAgent(summaryAgentAns, query) {


    console.log("validationAgent executing");


    const prompt = `
You are a Validation Agent designed to provide a structured JSON output.

Your task is to validate the AI-generated summary and associated papers based on the given query.

**Query**: """${query}"""

**Summary Agent Output**: """${summaryAgentAns}"""

**Validation Requirements**:
1.  **Top-level fields MUST include**:
    *   "answer" (string, required, **non-empty**): A concise AI-powered summary of the query.
    *   "summary" (string, required, **non-empty**): A comprehensive summary reflecting the key points of ALL provided papers.
2.  **"papers" field MUST be an array of objects**:
    *   Each object MUST have:
        *   "paperId" (string, required, **non-empty**)
        *   "title" (string, required, **non-empty**)
        *   "authors" (array of strings, required, with at least one author, **non-empty strings**)
        *   "url" (string, required; if the URL is unknown or missing, use "not provided", **non-empty**)
3.  **"validation" field MUST be an object**:
    *   It MUST have:
        *   "isValid" (boolean, required): True if the answer, summary, and papers are consistent and meet all requirements, otherwise false.
        *   "score" (number, required): A confidence score from 0.0 to 1.0, indicating how well the output aligns with the query and requirements.
        *   "feedback" (string, optional): Any specific comments or areas for improvement.
        *   "citations" (array of paperIds, required): A list of paperIds that were directly referenced or contributed to the "answer" and "summary".

**Instructions for Output**:
*   Generate the complete JSON object directly.
*   **DO NOT include any markdown code blocks (e.g., \`\`\`json\`)**.
*   **DO NOT include any extra commentary, explanations, or conversational text before or after the JSON**.
*   Ensure all strings are properly quoted and escape any internal quotes if necessary.
*   The final output MUST be a parseable JSON object.
*   **Crucially, ensure all required string fields (answer, summary, paperId, title, authors[i], url) are populated with meaningful, non-empty values. If information is truly unavailable for a paper's URL, use "not provided".**
* Give me a lot of necessary data and specially answer and summary having atleast 2-3 pages in for pdf parsing.

  
**Example of Desired Output Format (Schema)**:
{
    "answer": "string_answer_here",
    "papers": [
        {
            "paperId": "string_paper_id_1",
            "title": "string_title_1",
            "authors": ["string_author_1a", "string_author_1b"],
            "url": "string_url_1_or_not_provided"
        },
        {
            "paperId": "string_paper_id_2",
            "title": "string_title_2",
            "authors": ["string_author_2a"],
            "url": "string_url_2_or_not_provided"
        }
    ],
    "summary": "string_overall_summary_here",
    "validation": {
        "isValid": true,
        "score": 0.95,
        "feedback": "All requirements met. Clear and well-cited.",
        "citations": ["string_paper_id_1", "string_paper_id_2"]
    }
}

Return ONLY the JSON object.
`;


    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": `${API_KEY} `,
                },
                method: "POST",
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            });

        if (!response.ok) {
            const responseText = response.text();
            throw new Error(`${responseText}`);
        }
        const output = await response.json();
        console.log("Output from vlaidation agent is- " + JSON.stringify(output));

        const validationAgentAns = output.candidates[0].content.parts[0].text;


        console.log("validationAgent executed");

        return validationAgentAns;
    } catch (error) {
        console.log("Error in validation agent- " + error);
        throw new Error();
    }
}

module.exports = validationAgent;