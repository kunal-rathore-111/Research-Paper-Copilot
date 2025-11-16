import React from 'react'

const agents = [
    {
        name: "Search Agent",
        description: "Intelligently discovers and retrieves relevant research papers from multiple academic databases using advanced NLP and semantic search.",
        capabilities: [
            "Semantic query understanding",
            "Multi-database integration",
            "Relevance ranking",
            "Citation network analysis"
        ],
        gradient: "from-blue-500 to-blue-600"
    },
    {
        name: "Summary Agent",
        description: "Analyzes and synthesizes research papers into concise, structured summaries highlighting key findings, methodologies, and contributions.",
        capabilities: [
            "Key insight extraction",
            "Methodology identification",
            "Result summarization",
            "Comparative analysis"
        ],
        gradient: "from-purple-500 to-purple-600"
    },
    {
        name: "Validation Agent",
        description: "Evaluates the credibility, methodology, and relevance of research papers using citation analysis and peer review metrics.",
        capabilities: [
            "Citation impact analysis",
            "Source credibility check",
            "Methodology validation",
            "Bias detection"
        ],
        gradient: "from-green-500 to-green-600"
    }
]

export default function SolutionSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-30"></div>

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-6">
                        <span className="text-sm">Our Solution</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl mb-4">
                        Three Intelligent
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI Agents</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        A collaborative multi-agent system that automates the entire research workflow from discovery to validation.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {agents.map((agent, index) => (
                        <div key={index} className="p-8 bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group rounded-xl">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${agent.gradient} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`}></div>

                            <div className="relative">
                                <h3 className="text-2xl mb-3">{agent.name}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">{agent.description}</p>

                                <div className="space-y-3">
                                    <div className="text-sm text-slate-700">Key Capabilities:</div>
                                    {agent.capabilities.map((capability, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <span className="text-sm text-slate-600">{capability}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
                    <h3 className="text-2xl sm:text-3xl mb-8 text-center">How They Work Together</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl mx-auto mb-4">1</div>
                            <h4 className="text-lg mb-2">Search & Discover</h4>
                            <p className="text-blue-200 text-sm">Search Agent finds relevant papers based on your research query</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-xl mx-auto mb-4">2</div>
                            <h4 className="text-lg mb-2">Analyze & Summarize</h4>
                            <p className="text-purple-200 text-sm">Summary Agent extracts key insights and creates structured summaries</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl mx-auto mb-4">3</div>
                            <h4 className="text-lg mb-2">Validate & Verify</h4>
                            <p className="text-green-200 text-sm">Validation Agent checks credibility and assesses research quality</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
