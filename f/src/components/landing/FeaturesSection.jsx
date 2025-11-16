import React from 'react'

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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-full filter blur-3xl opacity-30"></div>

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 mb-6">
                        <span className="text-sm">Powerful Features</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl mb-4">
                        Everything You Need for
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Efficient Research</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Advanced features designed to accelerate your research workflow and boost productivity.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group rounded-xl">
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                            <div className="relative">
                                <h3 className="text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
