"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { FloatButton, Tooltip } from "antd";
import { UpOutlined } from "@ant-design/icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global UI/UX enhancements:
 * - Smooth scrolling via Lenis
 * - Section reveal animations via GSAP + ScrollTrigger
 * - Back-to-top FloatButton (Ant Design)
 */
const Enhancements: React.FC = () => {
  useEffect(() => {
    // Smooth scrolling
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,

    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    // Reveal animations for sections marked with data-animate
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-animate='fade-up']"));

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* Back to Top */}
      <FloatButton.BackTop shape="square" tooltip={<Tooltip title="Back to top" />} icon={<UpOutlined />} />
    </>
  );
};

export default Enhancements;