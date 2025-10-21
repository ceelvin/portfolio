import { useEffect } from 'react';
import { INTERSECTION_THRESHOLDS, ROOT_MARGINS, ANIMATION_CLASSES } from '../constants';

const useIntersectionObserver = (
  refs,
  options = {},
  className = ANIMATION_CLASSES.ANIMATE
) => {
  useEffect(() => {
    const defaultOptions = {
      threshold: INTERSECTION_THRESHOLDS.LOW,
      rootMargin: ROOT_MARGINS.DEFAULT,
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, defaultOptions);

    // Handle both single ref and array of refs
    const refArray = Array.isArray(refs) ? refs : [refs];

    refArray.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refArray.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs, options, className]);
};

export default useIntersectionObserver;
