import './globals.css';
import 'antd/dist/reset.css'; // Ant Design base styles
import { Sora, Orbitron } from 'next/font/google';
import { Providers } from './providers';
import { siteConfig } from '@/lib/site';

// This metadata object will now be used by Next.js
export { metadata } from './metadata';

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

import LenisProvider from '@/components/LenisProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  return (
    <html lang="en" className={`scroll-smooth ${sora.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <LenisProvider>{children}</LenisProvider>
        </Providers>
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
