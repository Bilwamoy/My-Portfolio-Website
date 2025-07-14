
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
    <html lang="en" className={`scroll-smooth ${sora.variable} ${orbitron.variable}`} suppressHydrationWarning={true}>
      <head>
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content="Next.js, React, Portfolio, Developer, Web Development, JavaScript, TypeScript" />
        <meta name="author" content="Bilwamoy Chakraborty" />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.name} />
        <meta name="twitter:description" content={siteConfig.description} />
      </head>
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