import React from 'react'
import { motion } from 'framer-motion'

const teamMembers = [
    { name: "Kunal Rathore", role: "Backend Development", initials: "KR", skills: ["Node.js", "API Design", "Database"] },
    { name: "Mayank Babariya", role: "Backend Development", initials: "MB", skills: ["Node.js", "Express.js", "Agents Design"] },
    { name: "Khushi Satav", role: "Frontend Development", initials: "KS", skills: ["React", "JavaScript", "Tailwind"] },
    { name: "Archita Temre", role: "UI/UX Design", initials: "AT", skills: ["Figma", "Design Systems", "Prototyping"] }
]

export default function TeamSection() {
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
                    <h2 className="text-4xl sm:text-5xl mb-4" style={{ color: '#2D2D2D' }}>
                        Our
                        <span style={{ color: '#FF6B4A' }}> Team</span>
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white shadow-lg rounded-xl text-center"
                            style={{ border: '1px solid #d6d3d1' }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4" style={{ backgroundColor: '#FF6B4A' }}>
                                {member.initials}
                            </div>
                            <h4 className="text-lg mb-1" style={{ color: '#2D2D2D' }}>{member.name}</h4>
                            <p className="text-sm mb-4" style={{ color: '#57534e' }}>{member.role}</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {member.skills.map((skill, idx) => (
                                    <span key={idx} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#EDE8E1', color: '#2D2D2D' }}>{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-16 p-8 text-white rounded-2xl text-center"
                    style={{ backgroundColor: '#2D2D2D' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-2xl mb-4">Special Thanks</h3>
                    <p style={{ color: '#d6d3d1' }}>
                        We would like to express our gratitude to Acropolis Institute of Technology and Research, the Information Technology Department,
                        and our project guide Prof. Ankita Agrawal for their continuous support and guidance throughout this project.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
