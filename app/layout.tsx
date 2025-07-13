
'use client';

import './globals.css';
import { Sora, Orbitron } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import LoadingScreen from '@/components/LoadingScreen';
import { useState } from 'react';

import { siteConfig } from '@/lib/site';

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



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  console.log('Layout: loadingComplete state is', loadingComplete);

  const handleLoadingComplete = () => {
    console.log('Layout: handleLoadingComplete called.');
    setLoadingComplete(true);
  };

  return (
    <html lang="en" className={`scroll-smooth ${sora.variable} ${orbitron.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {!loadingComplete && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
          <div className={`page-content ${loadingComplete ? 'loaded' : ''}`}>
            {children}
          </div>
        </ThemeProvider>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bilwamoy Chakraborty",
              url: siteConfig.url,
              sameAs: [siteConfig.links.twitter, siteConfig.links.github],
              jobTitle: "Creative Full-Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Bilwamoy Chakraborty",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}