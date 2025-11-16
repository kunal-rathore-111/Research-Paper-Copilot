import React from 'react'

export default function ArchitectureSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-6">
                        <span className="text-sm">Technical Architecture</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl mb-4">
                        System
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Architecture</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        A modern, scalable architecture built with cutting-edge technologies for optimal performance.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <div className="p-8 bg-white border-slate-200 shadow-xl rounded-xl">
                        <h3 className="text-2xl mb-6">Architecture Flow</h3>
                        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-6 text-white">
                            <div className="space-y-4 text-center text-sm">
                                <div className="bg-blue-500 rounded-lg px-4 py-2 inline-block">User Query</div>
                                <div className="text-blue-400">↓</div>
                                <div className="bg-purple-500 rounded-lg px-4 py-2 inline-block">Agent Coordinator</div>
                                <div className="text-purple-400">↓</div>
                                <div className="bg-green-500 rounded-lg px-4 py-2 inline-block">Search Agent</div>
                                <div className="text-green-400">↓</div>
                                <div className="bg-indigo-500 rounded-lg px-4 py-2 inline-block">Summary Agent</div>
                                <div className="text-indigo-400">↓</div>
                                <div className="bg-pink-500 rounded-lg px-4 py-2 inline-block">Validation Agent</div>
                                <div className="text-pink-400">↓</div>
                                <div className="bg-yellow-500 rounded-lg px-4 py-2 inline-block">Response</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white border-slate-200 shadow-xl rounded-xl">
                        <h3 className="text-2xl mb-6">Technology Stack</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'React', desc: 'Frontend Framework' },
                                { name: 'Node.js', desc: 'Backend Runtime' },
                                { name: 'MongoDB', desc: 'Database' },
                                { name: 'OpenAI API', desc: 'AI Engine' }
                            ].map((tech, i) => (
                                <div key={i} className="p-4 bg-slate-50 rounded-lg">
                                    <h4 className="text-lg mb-1">{tech.name}</h4>
                                    <p className="text-sm text-slate-600">{tech.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
