const API_KEY = process.env.GEMINI_API;

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
        7. **CRITICAL: Provide extensive, comprehensive, and detailed summaries. Each paper should have AT LEAST 500-700 words of analysis. Include technical details, methodologies, results, implications, and future work. Make the output rich and informative - aim for 3-4 full pages of content when rendered as PDF.**
        8. **Add detailed comparative analysis between papers where applicable.**
        9. **Include specific metrics, numbers, and quantitative results mentioned in the abstracts.**
        10. **Discuss the broader context and significance of each paper's contributions.**
        11. **DO NOT BE BRIEF. EXPAND ON EVERY POINT. USE AS MANY WORDS AS POSSIBLE TO EXPLAIN THE CONCEPTS.**

        Papers: ${dataInString}
        `

    if (!process.env.OPENAI_API_KEY) {
        return {
            answer: '',
            papers: [],
            summary: '',
            validation: null
        };
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                method: "POST",
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                })
            });

        if (!response.ok) {
            const responseText = await response.text();
            console.error("OpenAI API error response:", responseText);
            throw new Error(`OpenAI API error: ${responseText}`);
        }

        const rawData = await response.json();
        console.log("OpenAI API response received");

        const output = rawData?.choices?.[0]?.message?.content;

        if (!output || output.trim() === '') {
            console.error("Empty output from OpenAI. Full response:", JSON.stringify(rawData, null, 2));
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