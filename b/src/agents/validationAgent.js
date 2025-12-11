const githubClient = require("./githubClient");

async function validationAgent(summaryAgentAns, query) {


    console.log("validationAgent executing");


    const prompt = `
You are a Validation Agent designed to provide a structured JSON output.

Your task is to validate the AI-generated summary and associated papers based on the given query.

**Query**: """${query}"""

**Summary Agent Output**: """${summaryAgentAns}"""

**Handling Invalid/Unclear Queries**:
If the query is nonsensical, gibberish, or "dust" (unintelligible), or if no valid research can be derived:
1. Set "answer" to a single-line message requesting a clearer query (e.g., "The query provided is unclear; please provide a more specific research topic.").
2. Set "summary" to "No summary available for this query." (Must not be empty).
3. Set "papers" to an empty array [].
4. Set "validation" object with "isValid": false, "score": 0, "feedback": "Query is unclear or invalid.", "citations": [].

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
* **CRITICAL: Generate EXTENSIVE and COMPREHENSIVE content:**
    * The "answer" field should be AT LEAST 1000 words - provide a thorough, detailed response.
    * The "summary" field should be AT LEAST 2000-2500 words.
    * **CRITICAL**: Do not just list the papers. You must SYNTHESIZE them into a long, detailed narrative.
    * **EXPAND** on every single point. If a paper mentions a concept, explain it in detail.
    * **Aim for 5-6 full pages of text.**
    * **DO NOT BE BRIEF.**
   
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
        const messages = [
            {
                role: "user",
                content: prompt
            }
        ];

        const output = await githubClient.generateContent(messages, undefined, 0.5, { type: "json_object" });
        console.log("GitHub Models API response received");

        const validationAgentAns = output;

        if (!validationAgentAns || validationAgentAns.trim() === '') {
            console.error("Empty output from GitHub Models.");
            throw new Error("Model returned empty response.");
        }

        // Strip markdown code blocks if present (```json ... ``` or ``` ... ```)
        let cleanedResponse = validationAgentAns.trim();

        // Remove ```json at the start
        if (cleanedResponse.startsWith('```json')) {
            cleanedResponse = cleanedResponse.slice(7); // Remove ```json
        } else if (cleanedResponse.startsWith('```')) {
            cleanedResponse = cleanedResponse.slice(3); // Remove ```
        }

        // Remove ``` at the end
        if (cleanedResponse.endsWith('```')) {
            cleanedResponse = cleanedResponse.slice(0, -3);
        }

        cleanedResponse = cleanedResponse.trim();

        console.log("validationAgent executed successfully");

        return cleanedResponse;
    } catch (error) {
        console.error("Error in validation agent:", error.message);
        throw new Error(error?.message || 'validationAgent failed');
    }
}

module.exports = validationAgent;