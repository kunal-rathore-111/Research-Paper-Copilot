import React from 'react'
import { ReactLenis } from 'lenis/react'
import HeroSection from '../components/landing/HeroSection'
import ProblemSection from '../components/landing/ProblemSection'
import SolutionSection from '../components/landing/SolutionSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import ArchitectureSection from '../components/landing/ArchitectureSection'
import ApplicationsSection from '../components/landing/ApplicationsSection'
import TeamSection from '../components/landing/TeamSection'
import Footer from '../components/landing/Footer'

export default function LandingPage({ navigate }) {
    return (
        <ReactLenis root options={{ duration: 1.2 }}>
            <div className="min-h-screen" style={{ backgroundColor: '#F5F2ED' }}>
                <HeroSection navigate={navigate} />
                <ProblemSection />
                <SolutionSection />
                <FeaturesSection />
                <ArchitectureSection />
                <ApplicationsSection />
                <TeamSection />
                <Footer />
            </div>
        </ReactLenis>
    )
}
