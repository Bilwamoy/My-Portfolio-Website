'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import { PERSONAL_INFO } from '@/lib/constants';

type FormState = 'idle' | 'loading' | 'success' | 'error';
interface FormResponse {
    message: string;
    errors?: any;
}

const ContactSection: React.FC = () => {
    const [formState, setFormState] = useState<FormState>('idle');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormState('loading');
        setResponseMessage('');

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result: FormResponse = await response.json();

            if (!response.ok) {
                setFormState('error');
                if (result.errors) {
                    // Display specific field errors
                    const fieldErrorMessages = Object.entries(result.errors)
                        .map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
                        .join('; ');
                    setResponseMessage(fieldErrorMessages || result.message || 'An error occurred.');
                } else {
                    setResponseMessage(result.message || 'An error occurred.');
                }
                return;
            }
            
            setFormState('success');
            setResponseMessage(result.message);
            (event.target as HTMLFormElement).reset();

        } catch (error) {
            console.error('Contact form submission error:', error);
            setFormState('error');
            setResponseMessage('Failed to send message. Please try again later.');
        }
    };


  return (
    <Section id="contact" title="Contact">
        <h2 className="text-2xl font-bold text-slate-200 mb-4 font-orbitron">Get In Touch</h2>
        <p className="mb-4 max-w-lg">
            I&apos;m currently open to new opportunities and collaborations. Whether you have a question, a project proposal, or just want to say hi, my inbox is always open.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-lg">
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                    <input type="text" id="name" name="name" required className="block w-full rounded-md border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:ring-sky-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                    <input type="email" id="email" name="email" required className="block w-full rounded-md border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:ring-sky-500" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                    <textarea id="message" name="message" rows={4} required className="block w-full rounded-md border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:ring-sky-500"></textarea>
                </div>
            </div>
            <div className="mt-6">
                <motion.button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="inline-flex items-center justify-center bg-sky-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-sky-600 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    whileHover={{ y: formState === 'loading' ? 0 : -4, scale: formState === 'loading' ? 1 : 1.05 }}
                    whileTap={{ scale: formState === 'loading' ? 1 : 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                    {formState === 'loading' ? 'Sending...' : 'Send Message'}
                </motion.button>
            </div>
        </form>

        {responseMessage && (
            <div className={`mt-4 text-sm ${formState === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {responseMessage}
            </div>
        )}
      
        <div className="mt-12 flex items-center space-x-6">
            {PERSONAL_INFO.socials.map((social) => (
            <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.name}
                className="text-slate-400 hover:text-sky-300 transition-colors"
                whileHover={{ y: -3, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <social.icon className="h-8 w-8" />
            </motion.a>
            ))}
        </div>
    </Section>
  );
};

export default ContactSection;
