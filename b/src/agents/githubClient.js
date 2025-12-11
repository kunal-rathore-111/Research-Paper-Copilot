const API_KEY = process.env.GITHUB_TOKEN;

async function generateContent(messages, model = "gpt-4o", temperature = 0.7, response_format = null) {
    if (!API_KEY) {
        throw new Error("GITHUB_TOKEN is missing in environment variables.");
    }

    const url = "https://models.inference.ai.azure.com/chat/completions";

    const body = {
        messages: messages,
        model: model,
        temperature: temperature,
        top_p: 1.0
    };

    if (response_format) {
        body.response_format = response_format;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`GitHub Models API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
            throw new Error("GitHub Models returned empty response.");
        }

        return data.choices[0].message.content;

    } catch (error) {
        console.error("Error in githubClient:", error);
        throw error;
    }
}

module.exports = { generateContent };
