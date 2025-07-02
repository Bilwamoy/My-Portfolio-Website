
import './globals.css';
import { Sora, Orbitron } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata = {
  title: "Bilwamoy | Interactive Portfolio",
  description: "An interactive, animated portfolio website for Bilwamoy (Joy) to showcase projects, skills, and experience as a creative developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${sora.variable} ${orbitron.variable}`}>
      <body className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-sky-300 selection:text-sky-900 font-sora">
        {children}
      </body>
    </html>
  )
}