import React from 'react'

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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-6">
                        <span className="text-sm">Current Challenges</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl mb-4">
                        The Research
                        <span className="text-red-600"> Problem</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Modern researchers struggle with an overwhelming amount of information and limited time to process it effectively.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {problems.map((problem, index) => (
                        <div key={index} className="p-6 bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group rounded-xl">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative">
                                <h3 className="text-xl mb-2">{problem.title}</h3>
                                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{problem.description}</p>

                                <div className="pt-4 border-t border-slate-200">
                                    <div className="text-2xl text-red-600">{problem.stat}</div>
                                    <div className="text-xs text-slate-500">{problem.statLabel}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
