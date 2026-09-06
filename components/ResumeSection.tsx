'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, ExternalLink } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-8 my-12">
      <div className="w-full max-w-5xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="resume-item" className="border-none">
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-8 shadow-xl hover:border-sky-500/50 transition-all duration-300">
              <AccordionTrigger hideChevron className="w-full p-0">
                <div className="flex flex-col items-center justify-center text-center w-full py-4 space-y-2">
                  <span className="text-xs font-mono tracking-widest text-sky-500 dark:text-sky-400 uppercase flex items-center gap-2">
                    <FileText className="w-4 h-4" /> CLICK ANYWHERE TO EXPAND RESUME
                  </span>
                  <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
                    My Resume
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950">
                    <iframe
                      src="/Resume_Bilwamoy_Chakraborty_BTS_23_046.pdf#toolbar=0&navpanes=0"
                      title="Bilwamoy Chakraborty Resume"
                      className="h-[650px] w-full border-none pointer-events-none select-none"
                    />
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                      <Button size="sm" variant="secondary" className="rounded-full shadow-lg backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800" asChild>
                        <a href="/Resume_Bilwamoy_Chakraborty_BTS_23_046.pdf" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-4 w-4 text-sky-500" />
                          Open Full PDF
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button size="lg" className="rounded-full shadow-lg shadow-sky-500/25" asChild>
                      <a href="/Resume_Bilwamoy_Chakraborty_BTS_23_046.pdf" download="Resume_Bilwamoy_Chakraborty.pdf">
                        <Download className="mr-2 h-5 w-5" />
                        Download Resume PDF
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full shadow-md" asChild>
                      <a href="/Resume_Bilwamoy_Chakraborty_BTS_23_046.pdf" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        View In New Tab
                      </a>
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default ResumeSection;
