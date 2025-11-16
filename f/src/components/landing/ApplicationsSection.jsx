import React from 'react'

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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl mb-4">
                        Built for
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Everyone</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {applications.map((app, index) => (
                        <div key={index} className="p-8 bg-white border-slate-200 shadow-xl rounded-xl">
                            <h3 className="text-2xl mb-2">{app.title}</h3>
                            <p className="text-slate-600 mb-4">{app.description}</p>
                            <ul className="space-y-2">
                                {app.benefits.map((benefit, idx) => (
                                    <li key={idx} className="text-slate-700 text-sm">• {benefit}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
