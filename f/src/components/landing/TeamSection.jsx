import React from 'react'

const teamMembers = [
    { name: "Kunal Rathore", role: "Backend Development", initials: "KR", skills: ["Node.js", "API Design", "Database"] },
    { name: "Mayank Babariya", role: "Backend Development", initials: "MB", skills: ["Node.js", "Express.js", "Agents Design"] },
    { name: "Khushi Satav", role: "Frontend Development", initials: "KS", skills: ["React", "JavaScript", "Tailwind"] },
    { name: "Archita Temre", role: "UI/UX Design", initials: "AT", skills: ["Figma", "Design Systems", "Prototyping"] }
]

export default function TeamSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl mb-4">
                        Our
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Team</span>
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="p-6 bg-white border-slate-200 shadow-lg rounded-xl text-center">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4">
                                {member.initials}
                            </div>
                            <h4 className="text-lg mb-1">{member.name}</h4>
                            <p className="text-sm text-slate-600 mb-4">{member.role}</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {member.skills.map((skill, idx) => (
                                    <span key={idx} className="text-xs px-2 py-1 bg-slate-100 rounded">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-2xl text-center">
                    <h3 className="text-2xl mb-4">Special Thanks</h3>
                    <p className="text-blue-200">
                        We would like to express our gratitude to Acropolis Institute of Technology and Research, the Information Technology Department,
                        and our project guide Prof. Ankita Agrawal for their continuous support and guidance throughout this project.
                    </p>
                </div>
            </div>
        </section>
    )
}
