'use client';

import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const testimonials = [
  {
    quote: "Working with this developer was a fantastic experience. They are highly skilled, communicative, and delivered a product that exceeded our expectations. I would highly recommend them to anyone looking for a top-notch developer.",
    name: "Aarav Sharma",
    title: "CEO, Horizon Tech"
  },
  {
    quote: "I was impressed by their attention to detail and their commitment to quality. They were able to take our vision and turn it into a reality, and we couldn't be happier with the final product.",
    name: "Priya Patel",
    title: "Product Manager, Nexus Labs"
  },
  {
    quote: "Their expertise in modern web technologies is evident in the quality of their work. They are a true professional and a pleasure to work with.",
    name: "Rohan Mukherjee",
    title: "Lead Developer, Innovate Software"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-8 my-12">
      <div className="w-full max-w-5xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="testimonials-item" className="border-none">
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-8 shadow-xl hover:border-sky-500/50 transition-all duration-300">
              <AccordionTrigger hideChevron className="w-full p-0">
                <div className="flex flex-col items-center justify-center text-center w-full py-4 space-y-2">
                  <span className="text-xs font-mono tracking-widest text-sky-500 dark:text-sky-400 uppercase flex items-center gap-2">
                    <MessageSquareQuote className="w-4 h-4" /> CLICK ANYWHERE TO VIEW REVIEWS
                  </span>
                  <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
                    What Others Are Saying
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                      <CardContent className="pt-6 flex flex-col justify-between h-full space-y-4">
                        <blockquote className="italic text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                          “{testimonial.quote}”
                        </blockquote>
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-right">
                          <p className="font-bold text-sky-600 dark:text-sky-400 text-sm">{testimonial.name}</p>
                          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">{testimonial.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default TestimonialsSection;