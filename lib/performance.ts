// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private memoryWarningThreshold = 100 * 1024 * 1024; // 100MB
  private fpsThreshold = 30;
  private lastFrameTime = 0;
  private frameCount = 0;
  private fps = 0;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Monitor memory usage
  checkMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMemory = memory.usedJSHeapSize;
      
      if (usedMemory > this.memoryWarningThreshold) {
        console.warn(`High memory usage detected: ${(usedMemory / 1024 / 1024).toFixed(2)}MB`);
        this.triggerGarbageCollection();
      }
    }
  }

  // Monitor FPS
  measureFPS(): void {
    const now = performance.now();
    this.frameCount++;

    if (now - this.lastFrameTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFrameTime = now;

      if (this.fps < this.fpsThreshold) {
        console.warn(`Low FPS detected: ${this.fps}`);
      }
    }
  }

  // Force garbage collection if available
  private triggerGarbageCollection(): void {
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
  }

  // Monitor long tasks
  observeLongTasks(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${entry.duration}ms`);
            }
          }
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('Long task monitoring not supported');
      }
    }
  }

  // Start monitoring
  startMonitoring(): void {
    this.observeLongTasks();
    
    // Check memory every 5 seconds
    setInterval(() => this.checkMemoryUsage(), 5000);
    
    // Measure FPS continuously
    const measureFrame = () => {
      this.measureFPS();
      requestAnimationFrame(measureFrame);
    };
    requestAnimationFrame(measureFrame);
  }

  // Get current performance metrics
  getMetrics(): { memory?: number; fps: number } {
    const metrics: { memory?: number; fps: number } = { fps: this.fps };
    
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      metrics.memory = memory.usedJSHeapSize;
    }
    
    return metrics;
  }
}

// Utility to debounce expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Utility to throttle expensive operations
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}