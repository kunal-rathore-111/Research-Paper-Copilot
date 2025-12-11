const { parseStringPromise } = require("xml2js");

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fallback: Semantic Scholar API
async function searchWithSemanticScholar(query) {
    console.log("Falling back to Semantic Scholar API...");

    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=5&fields=title,abstract,authors,url,publicationDate,venue`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Research-Paper-Copilot/1.0 (contact: your-email@example.com)'
            }
        });

        if (!response.ok) {
            throw new Error(`Semantic Scholar API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            console.log("No papers found on Semantic Scholar for query:", query);
            return [];
        }

        // Transform Semantic Scholar format to match ArXiv format expected by summaryAgent
        const papers = data.data.map(paper => ({
            title: paper.title || "Untitled",
            summary: paper.abstract || "No abstract available.",
            author: paper.authors ? paper.authors.map(a => a.name) : ["Unknown Author"],
            link: paper.url || `https://www.semanticscholar.org/paper/${paper.paperId}`,
            published: paper.publicationDate || "Unknown",
            categories: paper.venue ? [paper.venue] : ["General Research"]
        }));

        console.log("Semantic Scholar found", papers.length, "papers");
        return papers;

    } catch (error) {
        console.error("Semantic Scholar fallback also failed:", error.message);
        throw new Error("Both ArXiv and Semantic Scholar are unavailable. Please try again later.");
    }
}

async function searchAgent(query, maxRetries = 3) {

    console.log("searchAgent executing");

    const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=5`;

    // ArXiv API recommends adding a User-Agent header
    const headers = {
        'User-Agent': 'Research-Paper-Copilot/1.0 (contact: your-email@example.com)'
    };

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            // Add delay between retries (except for first attempt)
            if (attempt > 0) {
                const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s
                console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${waitTime}ms...`);
                await delay(waitTime);
            }

            const response = await fetch(url, { headers });
            const responseText = await response.text();

            if (!response.ok) {
                // If it's a 503, we should retry
                if (response.status === 503 && attempt < maxRetries - 1) {
                    console.log(`ArXiv returned 503, will retry (attempt ${attempt + 1}/${maxRetries})`);
                    continue; // Try again
                }

                // If last retry failed, try fallback
                if (attempt === maxRetries - 1) {
                    console.log("ArXiv failed after all retries, trying fallback...");
                    return await searchWithSemanticScholar(query);
                }

                throw new Error(`ArXiv API error: ${response.status} - ${responseText}`)
            }

            const jsonData = await parseStringPromise(responseText);

            // Check if entries exist
            if (!jsonData.feed || !jsonData.feed.entry) {
                console.log("No papers found on ArXiv, trying Semantic Scholar...");
                return await searchWithSemanticScholar(query);
            }

            // Handle both single entry (object) and multiple entries (array)
            const entries = Array.isArray(jsonData.feed.entry)
                ? jsonData.feed.entry
                : [jsonData.feed.entry];

            const searchAgentAns = entries.map(e => ({
                title: e.title[0],
                summary: e.summary[0],
                author: e.author.map(a => a.name[0]),
                link: e.link[0].$.href,
                published: e.published[0],
                categories: e.category ? e.category.map(c => c.$.term) : []
            }))

            console.log("searchAgent executed with ArXiv, found", searchAgentAns.length, "papers");
            return searchAgentAns;

        } catch (error) {
            console.error(`Error in arxiv search (attempt ${attempt + 1}/${maxRetries}):`, error.message);

            // If this was the last retry, try fallback
            if (attempt === maxRetries - 1) {
                console.log("ArXiv completely failed, attempting fallback to Semantic Scholar...");
                try {
                    return await searchWithSemanticScholar(query);
                } catch (fallbackError) {
                    console.error("Full error:", error);
                    throw new Error('Both ArXiv and Semantic Scholar services are unavailable. Please try again later.');
                }
            }
            // Otherwise, continue to next retry
        }
    }

}


module.exports = searchAgent;                                                                                                                                                                                                                                                        