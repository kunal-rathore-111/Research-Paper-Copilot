import React from 'react'
import { motion } from 'framer-motion'

const features = [
    { title: "Lightning Fast", description: "Process research papers in seconds, not hours", color: "from-yellow-500 to-orange-500" },
    { title: "Precision Search", description: "AI-powered semantic search for accurate results", color: "from-blue-500 to-cyan-500" },
    { title: "Smart Summaries", description: "Automatic extraction of key findings and insights", color: "from-purple-500 to-pink-500" },
    { title: "Credibility Check", description: "Validate sources and assess research quality", color: "from-green-500 to-emerald-500" },
    { title: "Citation Analysis", description: "Track impact and influence of research papers", color: "from-indigo-500 to-blue-500" },
    { title: "Auto-Update", description: "Stay current with latest research in your field", color: "from-teal-500 to-cyan-500" },
    { title: "Analytics Dashboard", description: "Visualize research trends and patterns", color: "from-violet-500 to-purple-500" },
    { title: "Export Reports", description: "Generate formatted reports in multiple formats", color: "from-rose-500 to-pink-500" }
]

export default function FeaturesSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#EDE8E1' }}>

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ backgroundColor: 'rgba(255, 107, 74, 0.1)', color: '#FF6B4A' }}>
                        <span className="text-sm">Powerful Features</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl mb-4" style={{ color: '#2D2D2D' }}>
                        Everything You Need for
                        <span style={{ color: '#FF6B4A' }}> Efficient Research</span>
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: '#57534e' }}>
                        Advanced features designed to accelerate your research workflow and boost productivity.
                    </p>
                </motion.div>

                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group rounded-xl"
                            style={{ border: '1px solid #d6d3d1' }}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundColor: '#FF6B4A' }}></div>

                            <div className="relative">
                                <h3 className="text-lg mb-2" style={{ color: '#2D2D2D' }}>{feature.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: '#57534e' }}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
