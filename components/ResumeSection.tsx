'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
    <section id="resume" className="py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-4xl mb-8"
      >
        My Resume
      </motion.h2>
      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-semibold text-slate-800 dark:text-slate-200 hover:no-underline">View Resume</AccordionTrigger>
          <AccordionContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ResumeSection;
