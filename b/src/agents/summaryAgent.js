const githubClient = require("./githubClient");

async function summaryAgent(searchAgentAns, query) {


    console.log("summaryAgent executing");

    // formating the ans in single string
    const data = searchAgentAns.map((d, i) => {
        return `Paper ${i + 1}- ${d.title} by ${d.author.join(", ")} \n Abstract: ${d.summary} \n Link- ${d.link} \n Published- ${d.published} \n categories- ${d.categories}`
    });
    const dataInString = data.join("\n\n");


    const prompt = `You are a research assistant AI. The user is researching: "${query}".

        For each paper below:

        1. Summarize the **main contributions** in simple, clear language.
        2. Highlight the **key findings**, especially comparing Web3 vs Web2 where relevant.
        3. Note any **important limitations** or gaps.
        4. Keep abstracts **short (2-3 lines max)**.
        5. Normalize the category field (e.g., if multiple letters, keep only one main category).
        6. Present the output in **numbered format**:
        - Paper #: Title, Authors
            1. Main Contributions:
            2. Key Findings:
            3. Important Limitations:
            4. Links:
        7. **CRITICAL: Provide EXTREMELY EXTENSIVE, COMPREHENSIVE, and DETAILED summaries. Each paper should have AT LEAST 800-1000 words of analysis.**
        8. **For each paper, you MUST cover:**
            - **Methodology**: Detailed explanation of how the research was conducted.
            - **Results**: Specific quantitative data, numbers, and metrics found.
            - **Discussion**: Deep dive into the implications.
            - **Comparison**: How it relates to other papers in this list.
        9. **DO NOT BE BRIEF. DO NOT SUMMARIZE IN ONE SENTENCE. WRITE ESSAYS FOR EACH PAPER.**
        10. **Make the output rich and informative - aim for 5-6 full pages of content.**
        11. **EXPAND ON EVERY POINT. USE AS MANY WORDS AS POSSIBLE.**

        Papers: ${dataInString}
        `

    if (!process.env.GITHUB_TOKEN) {
        return {
            answer: '',
            papers: [],
            summary: '',
            validation: null
        };
    }

    try {
        const messages = [
            {
                role: "user",
                content: prompt
            }
        ];

        const output = await githubClient.generateContent(messages);
        console.log("GitHub Models API response received");

        if (!output || output.trim() === '') {
            console.error("Empty output from GitHub Models.");
            throw new Error("Model returned empty response.");
        }

        console.log("summaryAgent executed successfully");

        return output;
    } catch (e) {
        console.error("Error in summaryAgent:", e.message);
        // rethrow to be caught by controller next(err)
        throw e;
    }
}

module.exports = summaryAgent;