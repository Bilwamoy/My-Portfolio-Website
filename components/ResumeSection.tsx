'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-12 glass-effect mb-12 flex flex-col items-center justify-center">
      <h2
        className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-4xl mb-8"
      >
        My Resume
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-semibold text-slate-800 dark:text-slate-200 hover:no-underline text-center">View Resume</AccordionTrigger>
          <AccordionContent>
            <div
              className="mt-4 flex flex-col items-center gap-8"
            >
              <div className="w-full">
                <iframe
                  src="/resume.pdf"
                  title="My Resume"
                  className="h-[600px] w-full rounded-lg border border-slate-300 dark:border-slate-700"
                />
              </div>
              <Button asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ResumeSection;
