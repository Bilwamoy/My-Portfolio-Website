'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Sending...');
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setStatus('An error occurred. Please try again.');
        }
    };

    return (
        <section id="contact" className="w-full py-20 px-4 bg-black/20">
            <div className="container mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
                <p className="text-neutral-300 mb-12">Ready to bring your ideas to life? Let's discuss your next project.</p>
                <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">Name</label>
                        <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-violet-500 focus:outline-none" placeholder="Your name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                        <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-violet-500 focus:outline-none" placeholder="your@email.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
                        <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-violet-500 focus:outline-none" placeholder="Tell me about your project..."></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="px-8 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed">
                            Send Message
                        </button>
                    </div>
                </motion.form>
                {status && <p className="mt-6 text-center">{status}</p>}
            </div>
        </section>
    );
};

export default Contact;
