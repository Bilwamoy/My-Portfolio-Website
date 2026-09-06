'use client';

import React from 'react';
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const blogPosts = [
  {
    title: "Building Scalable React 19 & Next.js 16 Applications",
    content: "In modern full-stack engineering, performance and clean architecture are vital. Learn how to structure Next.js apps with server actions, Lenis smooth scrolling, and GSAP motion.",
    image: "/blog/Image1.png",
    date: "2026-08-10",
    author: "Bilwamoy Chakraborty"
  },
  {
    title: "Zero-Shot Voice Conversion & Speech Synthesis",
    content: "Exploring how pipeline architectures like Demucs, HuBERT, Resemblyzer, and HiFi-GAN enable voice conversion for unwritten or low-resource dialects without studio recordings.",
    image: "/blog/Image2.png",
    date: "2026-07-22",
    author: "Aarav Sharma"
  },
  {
    title: "Designing Fluid Glassmorphic UIs with Tailwind CSS",
    content: "A deep dive into crafting award-winning portfolios using glassmorphic backdrops, custom color tokens, and spring physics micro-interactions.",
    image: "/blog/Image3.png",
    date: "2026-06-15",
    author: "Rohan Mukherjee"
  }
];

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-8 my-12">
      <div className="w-full max-w-5xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="blog-item" className="border-none">
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-8 shadow-xl hover:border-sky-500/50 transition-all duration-300">
              <AccordionTrigger hideChevron className="w-full p-0">
                <div className="flex flex-col items-center justify-center text-center w-full py-4 space-y-2">
                  <span className="text-xs font-mono tracking-widest text-sky-500 dark:text-sky-400 uppercase flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> CLICK ANYWHERE TO READ ARTICLES
                  </span>
                  <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
                    From the Blog
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {blogPosts.map((post, index) => (
                    <Card key={index} className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between">
                      <div>
                        <div className="relative w-full h-44 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="font-syne font-bold text-lg text-slate-900 dark:text-slate-100 leading-snug">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3">
                            {post.content}
                          </p>
                        </CardContent>
                      </div>
                      <div className="px-4 py-3 border-t border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span>{post.date}</span>
                        <span className="text-sky-600 dark:text-sky-400">{post.author}</span>
                      </div>
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

export default BlogSection;