import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#2D2D2D' }}>
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                style={{ color: '#d6d3d1' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
            >
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-white text-lg mb-4">Research Paper Co-Pilot</h3>
                        <p className="text-sm text-slate-400">
                            An innovative AI-powered solution for automated research paper analysis and discovery.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="transition" style={{ color: '#d6d3d1' }} onMouseEnter={(e) => e.target.style.color = '#FF6B4A'} onMouseLeave={(e) => e.target.style.color = '#d6d3d1'}>About Project</a></li>
                            <li><a href="#" className="transition" style={{ color: '#d6d3d1' }} onMouseEnter={(e) => e.target.style.color = '#FF6B4A'} onMouseLeave={(e) => e.target.style.color = '#d6d3d1'}>Documentation</a></li>
                            <li><a href="#" className="transition" style={{ color: '#d6d3d1' }} onMouseEnter={(e) => e.target.style.color = '#FF6B4A'} onMouseLeave={(e) => e.target.style.color = '#d6d3d1'}>GitHub Repository</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white mb-4">Institution</h4>
                        <p className="text-sm">Acropolis Institute of Technology and Research</p>
                        <p className="text-sm text-slate-400">Department of Information Technology</p>
                    </div>
                    <div>
                        <h4 className="text-white mb-4">Contact Us</h4>
                        <p className="text-sm">Team DeepDraft</p>
                        <a href="mailto:deepdraft11@gmail.com" className="text-sm text-slate-400">deepdraft11@gmail.com</a>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-800 text-center text-sm">
                    © 2025 Research Paper Co-Pilot. Minor Project - Information Technology Department.
                </div>
            </motion.div>
        </footer>
    )
}
