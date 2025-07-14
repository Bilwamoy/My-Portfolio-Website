import React from 'react';
import Section from './Section';
import { Button } from './ui/button';
import Link from 'next/link';

const FeedbackSection: React.FC = () => {
  return (
    <Section id="feedback" title="Share Your Feedback">
      <div className="text-center max-w-lg mx-auto">
        <p className="text-lg mb-6">We&apos;d love to hear your thoughts and suggestions!</p>
        <Link href="/feedback" passHref>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Give Feedback
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default FeedbackSection;
