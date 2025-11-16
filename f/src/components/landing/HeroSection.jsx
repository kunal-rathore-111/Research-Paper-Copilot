import React from 'react'

export default function HeroSection({ navigate }) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-purple-900 to-blue-900 text-white">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-blue-200">AI-Powered Research Assistant</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight">
                                Research Paper
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Co-Pilot
                                </span>
                            </h1>
                            <p className="text-xl sm:text-2xl text-blue-100">
                                An Agentic AI Approach for Automated Research
                            </p>
                        </div>

                        <p className="text-lg text-blue-200 max-w-xl">
                            Revolutionizing academic research with intelligent AI agents that search, summarize, and validate research papers automatically.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate && navigate('register')}
                                className="px-6 py-3 bg-white text-blue-950 rounded-lg hover:bg-blue-50 shadow-lg shadow-blue-500/50 font-semibold transition-all hover:scale-105 flex items-center gap-2"
                            >
                                Try Demo
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                            <button className="px-6 py-3 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 font-semibold transition-all">
                                Learn More
                            </button>
                        </div>

                        <div className="flex gap-8 pt-4">
                            <div>
                                <div className="text-3xl">50+</div>
                                <div className="text-sm text-blue-300">Papers Analyzed</div>
                            </div>
                            <div>
                                <div className="text-3xl">3</div>
                                <div className="text-sm text-blue-300">AI Agents</div>
                            </div>
                            <div>
                                <div className="text-3xl">95%</div>
                                <div className="text-sm text-blue-300">Accuracy</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/50 border border-blue-400/20">
                            <img
                                src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjE3MTQ1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="AI Technology"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent"></div>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
                            <div className="text-sm">AI Powered</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc" />
                </svg>
            </div>
        </section>
    )
}
