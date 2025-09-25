// animationVariants.js
// 💡 Each export below is a Framer Motion "variants" object.
//    - `hidden`: initial state before animation
//    - `visible`: state when animated in
//    - `exit`: state when leaving (used with AnimatePresence)

// ========== BASIC FADES ==========

// 1. Simple fade in
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// 2. Fade in with upward movement
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 40, transition: { duration: 0.3 } },
};

// 3. Fade in with downward movement
export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3 } },
};

// 4. Fade in with left movement
export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
};

// 5. Fade in with right movement
export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.3 } },
};

// ========== SLIDES ==========

// 6. Slide in from top
export const slideInTop = {
  hidden: { y: -60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { y: -60, opacity: 0, transition: { duration: 0.3 } },
};

// 7. Slide in from bottom
export const slideInBottom = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { y: 60, opacity: 0, transition: { duration: 0.3 } },
};

// 8. Slide in from left
export const slideInLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { x: -60, opacity: 0, transition: { duration: 0.3 } },
};

// 9. Slide in from right
export const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { x: 60, opacity: 0, transition: { duration: 0.3 } },
};

// 10. Slide with bounce
export const slideBounce = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60 },
  },
};

// ========== ZOOM / SCALE ==========

// 11. Zoom in
export const zoomIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};

// 12. Zoom out
export const zoomOut = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  exit: { scale: 1.2, opacity: 0, transition: { duration: 0.3 } },
};

// 13. Pop-in (scale from 0)
export const popIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

// 14. Pop-out
export const popOut = {
  hidden: { scale: 1, opacity: 1 },
  visible: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
};

// 15. Pulse (use animate not variants for continuous)
export const pulse = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 1.5 },
  },
};

// ========== ROTATE / FLIP ==========

// 16. Rotate in
export const rotateIn = {
  hidden: { rotate: -15, opacity: 0 },
  visible: { rotate: 0, opacity: 1, transition: { duration: 0.5 } },
};

// 17. Rotate out
export const rotateOut = {
  hidden: { rotate: 0, opacity: 1 },
  visible: { rotate: 15, opacity: 0, transition: { duration: 0.3 } },
};

// 18. Flip horizontally
export const flipX = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: { rotateY: 0, opacity: 1, transition: { duration: 0.5 } },
};

// 19. Flip vertically
export const flipY = {
  hidden: { rotateX: 90, opacity: 0 },
  visible: { rotateX: 0, opacity: 1, transition: { duration: 0.5 } },
};

// 20. Continuous spin (use animate)
export const spin = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 2, ease: "linear" },
  },
};

// ========== STAGGER / SEQUENCES ==========

// 21. Container with staggered children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// 22. Wave text effect
export const waveText = (index) => ({
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: index * 0.05 },
  },
});

// ========== SPECIAL MODERN EFFECTS ==========

// 23. Blur in
export const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.4 } },
};

// 24. Clip path reveal (works on block elements)
export const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// 25. Color fade (for backgrounds)
export const bgColorFade = (from, to) => ({
  hidden: { backgroundColor: from },
  visible: { backgroundColor: to, transition: { duration: 0.6 } },
});

// 26. SVG draw (for stroke paths)
export const drawSVG = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
};

// 27. Parallax slight shift
export const parallax = {
  hidden: { y: 0 },
  visible: {
    y: -20,
    transition: { type: "spring", stiffness: 40 },
  },
};

// 28. Bounce in
export const bounceIn = {
  hidden: { scale: 0.3, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 8 },
  },
};

// 29. Shake effect
export const shake = {
  hidden: { x: 0 },
  visible: {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.5 },
  },
};

// 30. Skew in
export const skewIn = {
  hidden: { skewX: 15, opacity: 0 },
  visible: { skewX: 0, opacity: 1, transition: { duration: 0.5 } },
};

// ANIMATION VARIANTS (continued from 30)

// 30. Text Typing Effect (scale up with opacity)
export const typingTextVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
};

// 31. Rotate In (rotate from -180deg)
export const rotateInVariants = {
  hidden: { rotate: -180, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// 32. Rotate Out (rotate to 180deg)
export const rotateOutVariants = {
  hidden: { rotate: 0, opacity: 1 },
  exit: {
    rotate: 180,
    opacity: 0,
    transition: { duration: 0.6 }
  }
};

// 33. Skew In (skew X and fade in)
export const skewInVariants = {
  hidden: { opacity: 0, skewX: 30 },
  visible: {
    opacity: 1,
    skewX: 0,
    transition: { duration: 0.5 }
  }
};

// 34. Flip Card (used for flipping cards)
export const flipCardVariants = {
  hidden: { rotateY: 180, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

// 35. Pop Up (scale from 0 with spring)
export const popUpVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  }
};

// 36. Slide Diagonal (X & Y simultaneously)
export const slideDiagonalVariants = {
  hidden: { opacity: 0, x: -100, y: 100 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6 }
  }
};

// 37. Zoom Flip (zoom and rotate)
export const zoomFlipVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7 }
  }
};

// 38. Fade + Border Radius Morph
export const morphVariants = {
  hidden: { opacity: 0, borderRadius: '0%' },
  visible: {
    opacity: 1,
    borderRadius: '50%',
    transition: { duration: 0.6 }
  }
};

// 39. Pulse In (opacity + scale pulse)
export const pulseVariants = {
  hidden: { opacity: 0.5, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      repeat: 1,
      repeatType: 'reverse'
    }
  }
};

// 40. Bounce Slide Up
export const bounceSlideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.4, duration: 0.6 }
  }
};

// 41. Wave In (X sinusoidal style)
export const waveInVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 10 }
  }
};

// 42. Stagger Children Container
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // delays children one after another
    }
  }
};

// 43. Child Fade Up (to be used inside stagger container)
export const childFadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

// 44. Rotate Scale In
export const rotateScaleVariants = {
  hidden: { opacity: 0, rotate: -45, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6 }
  }
};

// 45. Slide Out Left
export const slideOutLeftVariants = {
  hidden: { x: 0, opacity: 1 },
  exit: {
    x: -200,
    opacity: 0,
    transition: { duration: 0.4 }
  }
};

// 46. Slide Out Right
export const slideOutRightVariants = {
  hidden: { x: 0, opacity: 1 },
  exit: {
    x: 200,
    opacity: 0,
    transition: { duration: 0.4 }
  }
};

// 47. Curtain Reveal (height from 0 to full)
export const curtainRevealVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// 48. Fade with Delay
export const fadeDelayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5 }
  }
};

// 49. Drop Down (like dropdown menu)
export const dropDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

// 50. Blur In (opacity + filter blur)
export const blurInVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5 }
  }
};
