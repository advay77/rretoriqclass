import React from 'react';
import CTASection from './CTAComponents';

const FinalCTA: React.FC = () => {
    return (
        <CTASection
            title="Ready to Transform Your Communication Skills?"
            subtitle="Join Today"
            description="Start your journey to professional excellence with Rretoriq's AI-powered coaching. Join thousands of professionals and students achieving their career goals."
            primaryCTA={{
                text: "Get Started Now",
                to: "/register"
            }}
            secondaryCTA={{
                text: "View Plans",
                to: "/pricing"
            }}
            background="gradient"
        />
    );
};

export default FinalCTA;
