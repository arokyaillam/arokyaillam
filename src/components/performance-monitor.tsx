"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  ttfb?: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const pathname = usePathname();

  useEffect(() => {
    // Reset metrics on route change
    setMetrics({});

    // Monitor performance metrics
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
        }
        if (entry.entryType === 'layout-shift') {
          if (!(entry as any).hadRecentInput) {
            setMetrics(prev => ({ ...prev, cls: (prev.cls || 0) + (entry as any).value }));
          }
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });

      // Get TTFB from navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        setMetrics(prev => ({ ...prev, ttfb: navigation.responseStart - navigation.requestStart }));
      }
    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  // Don't render anything in production or if no metrics
  if (process.env.NODE_ENV === 'production' || Object.keys(metrics).length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-3 text-xs font-mono shadow-lg z-50">
      <div className="font-semibold mb-2">Performance Metrics</div>
      {metrics.fcp && <div>FCP: {Math.round(metrics.fcp)}ms</div>}
      {metrics.lcp && <div>LCP: {Math.round(metrics.lcp)}ms</div>}
      {metrics.cls && <div>CLS: {metrics.cls.toFixed(3)}</div>}
      {metrics.ttfb && <div>TTFB: {Math.round(metrics.ttfb)}ms</div>}
    </div>
  );
}