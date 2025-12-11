import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HeroSection({ navigate }) {
    const [typingComplete, setTypingComplete] = useState(false)

    useEffect(() => {
        // Mark animations as complete for subtitle
        const completeTimer = setTimeout(() => {
            setTypingComplete(true)
        }, 1000)

        return () => clearTimeout(completeTimer)
    }, [])

    return (
        <section className="relative overflow-hidden" style={{ backgroundColor: '#F5F2ED', color: '#2D2D2D' }}>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
                {/* Main Heading */}
                <div className="space-y-6 mb-12">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight leading-tight">
                        {/* "Welcome to" fades in smoothly */}
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            Welcome to
                        </motion.span>
                        <br />
                        {/* "DeepDraft Research" fades in as one smooth block */}
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        >
                            <span style={{ color: '#FF6B4A', fontStyle: 'italic' }}>DeepDraft</span> Research
                        </motion.span>
                    </h1>

                    <motion.p
                        className="text-base sm:text-lg max-w-2xl mx-auto font-light"
                        style={{ color: '#57534e' }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={typingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Beautifully designed, AI-powered, and packed with features.
                        <br />
                        We care about your research.
                    </motion.p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                    <button
                        onClick={() => navigate && navigate('register')}
                        className="px-6 py-3 rounded-lg text-sm font-medium transition-all hover:opacity-90 flex items-center gap-2 shadow-lg"
                        style={{ backgroundColor: '#2D2D2D', color: 'white' }}
                    >
                        Beta is now available!
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Bottom Wave Curve - Preserved */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#EDE8E1" />
                </svg>
            </div>
        </section>
    )
}
