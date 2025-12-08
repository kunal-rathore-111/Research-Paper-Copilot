import React from 'react'
import { motion } from 'framer-motion'

const applications = [
    {
        title: "Students",
        description: "Accelerate your academic journey with intelligent research assistance",
        benefits: ["Complete literature reviews faster", "Understand complex papers easily", "Find relevant sources quickly", "Improve research quality"]
    },
    {
        title: "Researchers",
        description: "Stay ahead of the curve with automated research monitoring",
        benefits: ["Track emerging trends", "Discover cross-disciplinary insights", "Validate research methodology", "Build comprehensive bibliographies"]
    },
    {
        title: "Industry",
        description: "Make data-driven decisions with curated research insights",
        benefits: ["Stay competitive with latest findings", "Evidence-based decision making", "R&D efficiency improvement", "Innovation acceleration"]
    },
    {
        title: "Educators",
        description: "Enhance teaching with up-to-date research and materials",
        benefits: ["Curate course materials efficiently", "Share verified sources with students", "Track academic developments", "Create engaging content"]
    }
]

export default function ApplicationsSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EDE8E1' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl sm:text-5xl mb-4" style={{ color: '#2D2D2D' }}>
                        Built for
                        <span style={{ color: '#FF6B4A' }}> Everyone</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {applications.map((app, index) => (
                        <motion.div
                            key={index}
                            className="p-8 bg-white shadow-xl rounded-xl"
                            style={{ border: '1px solid #d6d3d1' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="text-2xl mb-2" style={{ color: '#2D2D2D' }}>{app.title}</h3>
                            <p className="mb-4" style={{ color: '#57534e' }}>{app.description}</p>
                            <ul className="space-y-2">
                                {app.benefits.map((benefit, idx) => (
                                    <li key={idx} className="text-sm" style={{ color: '#2D2D2D' }}>• {benefit}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
