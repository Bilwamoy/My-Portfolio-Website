'use client';
import { motion, Variants } from 'framer-motion';
import { Globe, BarChart2, AppWindow, Smartphone, Bot, Puzzle } from 'lucide-react';

const projectsData = [
    { icon: <Globe />, title: "E-Commerce Platform", description: "Full-stack e-commerce solution with payment integration, inventory management, and modern UI/UX design.", link: "#" },
    { icon: <BarChart2 />, title: "Data Analytics Dashboard", description: "Interactive dashboard for data visualization and business intelligence with real-time updates and insights.", link: "#" },
    { icon: <AppWindow />, title: "SaaS Application", description: "Multi-tenant SaaS platform with subscription management, user authentication, and scalable architecture.", link: "#" },
    { icon: <Smartphone />, title: "Mobile App", description: "Cross-platform mobile application with offline functionality, push notifications, and seamless user experience.", link: "#" },
    { icon: <Bot />, title: "AI-Powered Tool", description: "Machine learning application that automates complex tasks and provides intelligent recommendations.", link: "#" },
    { icon: <Puzzle />, title: "Interactive Experience", description: "Engaging web-based interactive experience with 3D graphics, animations, and immersive user interactions.", link: "#" },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeInOut"
        }
    })
};

const Projects = () => {
    return (
        <section id="projects" className="w-full py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col border border-white/[0.1] rounded-2xl overflow-hidden bg-black/30 backdrop-blur-sm"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={index}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(90, 60, 200, 0.2)" }}
                        >
                            <div className="p-8 flex-grow">
                                <div className="text-violet-400 mb-4">{project.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-neutral-400 mb-4 flex-grow">{project.description}</p>
                            </div>
                            <div className="p-8 pt-0">
                                <a href={project.link} className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
                                    View Project →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;