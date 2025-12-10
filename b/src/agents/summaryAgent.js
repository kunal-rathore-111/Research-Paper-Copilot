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
        7. Give me lot of necessary data specially summary.    

        Papers: ${dataInString}
        `

    if (!API_KEY) {
        return {
            answer: '',
            papers: [],
            summary: '',
            validation: null
        };
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`,
                },
                method: "POST",
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 4096
                })
            });

        if (!response.ok) {
            const responseText = await response.text();
            console.error("Groq API error response:", responseText);
            throw new Error(`Groq API error: ${responseText}`);
        }

        const rawData = await response.json();
        console.log("Groq API response status:", rawData);

        const output = rawData?.choices?.[0]?.message?.content;

        if (!output || output.trim() === '') {
            console.error("Empty output from Groq. Full response:", JSON.stringify(rawData, null, 2));
            throw new Error("Model returned empty response. This might be due to content filtering or token limits.");
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