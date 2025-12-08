import React from 'react'
import { motion } from 'framer-motion'

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
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#F5F2ED' }}>

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ backgroundColor: 'rgba(255, 107, 74, 0.1)', color: '#FF6B4A' }}>
                        <span className="text-sm">Our Solution</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl mb-4" style={{ color: '#2D2D2D' }}>
                        Three Intelligent
                        <span style={{ color: '#FF6B4A' }}> AI Agents</span>
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: '#57534e' }}>
                        A collaborative multi-agent system that automates the entire research workflow from discovery to validation.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {agents.map((agent, index) => (
                        <motion.div
                            key={index}
                            className="p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group rounded-xl"
                            style={{ border: '1px solid #d6d3d1' }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full group-hover:opacity-20 transition-opacity opacity-10" style={{ backgroundColor: '#FF6B4A' }}></div>

                            <div className="relative">
                                <h3 className="text-2xl mb-3" style={{ color: '#2D2D2D' }}>{agent.name}</h3>
                                <p className="mb-6 leading-relaxed" style={{ color: '#57534e' }}>{agent.description}</p>

                                <div className="space-y-3">
                                    <div className="text-sm" style={{ color: '#2D2D2D' }}>Key Capabilities:</div>
                                    {agent.capabilities.map((capability, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <span className="text-sm" style={{ color: '#57534e' }}>{capability}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="rounded-2xl p-8 sm:p-12 text-white shadow-2xl"
                    style={{ backgroundColor: '#2D2D2D' }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-2xl sm:text-3xl mb-8 text-center">How They Work Together</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-4" style={{ backgroundColor: '#FF6B4A' }}>1</div>
                            <h4 className="text-lg mb-2">Search & Discover</h4>
                            <p className="text-sm" style={{ color: '#d6d3d1' }}>Search Agent finds relevant papers based on your research query</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-4" style={{ backgroundColor: '#FF6B4A' }}>2</div>
                            <h4 className="text-lg mb-2">Analyze & Summarize</h4>
                            <p className="text-sm" style={{ color: '#d6d3d1' }}>Summary Agent extracts key insights and creates structured summaries</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-4" style={{ backgroundColor: '#FF6B4A' }}>3</div>
                            <h4 className="text-lg mb-2">Validate & Verify</h4>
                            <p className="text-sm" style={{ color: '#d6d3d1' }}>Validation Agent checks credibility and assesses research quality</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
