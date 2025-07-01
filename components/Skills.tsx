'use client';
import { motion } from 'framer-motion';
import { Rocket, Server, Palette, Wrench, Smartphone, Bot } from 'lucide-react';

const skillsData = [
    { icon: <Rocket size={32} />, title: "Frontend Development", description: "Responsive interfaces with modern frameworks." },
    { icon: <Server size={32} />, title: "Backend Development", description: "Scalable APIs and efficient database management." },
    { icon: <Palette size={32} />, title: "UI/UX Design", description: "Intuitive, aesthetic, and user-centered designs." },
    { icon: <Wrench size={32} />, title: "DevOps & Deployment", description: "Streamlined CI/CD pipelines and cloud infrastructure." },
    { icon: <Smartphone size={32} />, title: "Mobile Development", description: "Cross-platform apps with native performance." },
    { icon: <Bot size={32} />, title: "AI Integration", description: "Implementing ML solutions and AI-powered features." },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Skills = () => {
    return (
        <section id="skills" className="w-full py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-12">Skills & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="p-8 border border-white/[0.1] rounded-2xl bg-black/30 backdrop-blur-sm"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(120, 81, 229, 0.3)" }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                                {skill.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                            <p className="text-neutral-400">{skill.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
