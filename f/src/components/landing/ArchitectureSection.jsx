import React from 'react'
import { motion } from 'framer-motion'

export default function ArchitectureSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F5F2ED' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ backgroundColor: 'rgba(255, 107, 74, 0.1)', color: '#FF6B4A' }}>
                        <span className="text-sm">Technical Architecture</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl mb-4" style={{ color: '#2D2D2D' }}>
                        System
                        <span style={{ color: '#FF6B4A' }}> Architecture</span>
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: '#57534e' }}>
                        A modern, scalable architecture built with cutting-edge technologies for optimal performance.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <motion.div
                        className="p-8 bg-white shadow-xl rounded-xl"
                        style={{ border: '1px solid #d6d3d1' }}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl mb-6" style={{ color: '#2D2D2D' }}>Architecture Flow</h3>
                        <div className="rounded-xl p-6 text-white" style={{ backgroundColor: '#2D2D2D' }}>
                            <div className="space-y-4 text-center text-sm">
                                <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: '#FF6B4A' }}>User Query</div>
                                <div style={{ color: '#d6d3d1' }}>↓</div>
                                <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: '#FF6B4A' }}>Agent Coordinator</div>
                                <div style={{ color: '#d6d3d1' }}>↓</div>
                                <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: '#FF6B4A' }}>Search Agent</div>
                                <div style={{ color: '#d6d3d1' }}>↓</div>
                                <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: '#FF6B4A' }}>Summary Agent</div>
                                <div style={{ color: '#d6d3d1' }}>↓</div>
                                <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: '#FF6B4A' }}>Validation Agent</div>
                                <div style={{ color: '#d6d3d1' }}>↓</div>
                                <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: '#FF6B4A' }}>Response</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="p-8 bg-white shadow-xl rounded-xl"
                        style={{ border: '1px solid #d6d3d1' }}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl mb-6" style={{ color: '#2D2D2D' }}>Technology Stack</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'React', desc: 'Frontend Framework' },
                                { name: 'Node.js', desc: 'Backend Runtime' },
                                { name: 'MongoDB', desc: 'Database' },
                                { name: 'OpenAI API', desc: 'AI Engine' }
                            ].map((tech, i) => (
                                <motion.div
                                    key={i}
                                    className="p-4 rounded-lg"
                                    style={{ backgroundColor: '#EDE8E1' }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                >
                                    <h4 className="text-lg mb-1" style={{ color: '#2D2D2D' }}>{tech.name}</h4>
                                    <p className="text-sm" style={{ color: '#57534e' }}>{tech.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
