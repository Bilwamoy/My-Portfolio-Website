export const trackEvent = (eventName: string, eventProperties: Record<string, any> = {}) => {
  if (process.env.NODE_ENV === 'production') {
    // In a real application, you would send this data to your analytics service
    console.log(`Tracking event: ${eventName}`, eventProperties);
  }
};
