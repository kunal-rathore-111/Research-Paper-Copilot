import React from 'react'
import { motion } from 'framer-motion'

const problems = [
    {
        title: "Information Overload",
        description: "Researchers face thousands of papers daily, making it impossible to stay updated with relevant literature.",
        stat: "2.5M+",
        statLabel: "Papers Published/Year"
    },
    {
        title: "Time-Consuming Reading",
        description: "Reading and analyzing research papers takes hours of valuable time that could be spent on actual research.",
        stat: "8-12hrs",
        statLabel: "Per Paper Analysis"
    },
    {
        title: "Quality Validation",
        description: "Determining credibility and relevance of sources requires expertise and extensive background knowledge.",
        stat: "40%",
        statLabel: "Time on Validation"
    },
    {
        title: "Context Extraction",
        description: "Extracting key insights and understanding complex relationships between multiple papers is challenging.",
        stat: "60%",
        statLabel: "Missed Connections"
    }
]

export default function ProblemSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EDE8E1' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ backgroundColor: 'rgba(255, 107, 74, 0.1)', color: '#FF6B4A' }}>
                        <span className="text-sm">Current Challenges</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl mb-4" style={{ color: '#2D2D2D' }}>
                        The Research
                        <span style={{ color: '#FF6B4A' }}> Problem</span>
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: '#57534e' }}>
                        Modern researchers struggle with an overwhelming amount of information and limited time to process it effectively.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group rounded-xl"
                            style={{ border: '1px solid #d6d3d1' }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(255, 107, 74, 0.1)' }}></div>

                            <div className="relative">
                                <h3 className="text-xl mb-2" style={{ color: '#2D2D2D' }}>{problem.title}</h3>
                                <p className="mb-6 text-sm leading-relaxed" style={{ color: '#57534e' }}>{problem.description}</p>

                                <div className="pt-4" style={{ borderTop: '1px solid #d6d3d1' }}>
                                    <div className="text-2xl" style={{ color: '#FF6B4A' }}>{problem.stat}</div>
                                    <div className="text-xs" style={{ color: '#78716c' }}>{problem.statLabel}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
