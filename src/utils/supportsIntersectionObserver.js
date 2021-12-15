const supportsIntersectionObserver =
  process.browser &&
  typeof window !== 'undefined' &&
  ('IntersectionObserver' in window ||
    ('IntersectionObserverEntry' in window &&
      'isIntersecting' in window.IntersectionObserverEntry.prototype));

export default supportsIntersectionObserver;
