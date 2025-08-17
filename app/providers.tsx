'use client';

import { ThemeProvider } from '@/components/theme/theme-provider';
import LoadingScreen from '@/components/LoadingScreen';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {!loadingComplete && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className={`page-content ${loadingComplete ? 'loaded' : ''}`}>
        {children}
      </div>
      {/* Floating Back-to-Top button using Ant Design */}
      <div id="floating-ui-root" />
    </ThemeProvider>
  );
}