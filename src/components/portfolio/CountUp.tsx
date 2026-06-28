import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CountUp — SSR/no-JS safe.
 * Renders the final number as the initial DOM value so SEO crawlers and
 * link-preview bots never see `0`. On the client, if motion is allowed and
 * the element is not yet in view, it resets to 0 and counts up when the
 * section scrolls into view (IntersectionObserver). If the element is
 * already visible on load, it animates immediately.
 */
export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 1400,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  // Default to the final value so SSR/no-JS shows the real number.
  const [value, setValue] = useState(end);

  useEffect(() => {
    if (reduced) {
      setValue(end);
      return;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setValue(end);
      return;
    }

    let raf = 0;
    let started = false;

    const animate = () => {
      started = true;
      setValue(0);
      const startT = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - startT) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(end * eased));
        if (p < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setValue(end); // safety: always end at the real number
        }
      };
      raf = requestAnimationFrame(step);
    };

    const rect = node.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    if (alreadyVisible) {
      animate();
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            animate();
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
