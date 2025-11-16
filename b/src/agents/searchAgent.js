
const { parseStringPromise } = require("xml2js");

async function searchAgent(query) {

    console.log("searchAgent executing");

    const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=7`;

    try {
        const response = await fetch(url);
        const responseText = await response.text();

        if (!response.ok) {
            // call gpt model for finding papers or may be in catch
            throw new Error(`${responseText}`)
        }
        const jsonData = await parseStringPromise(responseText);
        const searchAgentAns = jsonData.feed.entry.map(e => ({
            title: e.title[0],
            summary: e.summary[0],
            author: e.author.map(a => a.name[0]),
            link: e.link[0].$.href,
            published: e.published[0],
            categories: e.category.map(c => c.$.term[0])

        }))

        console.log("searchAgent executed");
        return searchAgentAns;


    } catch (error) {
        console.log("Error in arxiv search- ");
        throw new Error();

    }

}


module.exports = searchAgent;