'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Transform scroll progress to different values
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Scroll Animations
        </h2>
        <p className="text-gray-300 mb-8">
          Elements that animate based on scroll position and viewport visibility.
        </p>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-white/20 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Scroll Progress</span>
          <motion.span 
            className="text-sm text-blue-400 font-mono"
            style={{ opacity }}
          >
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            style={{ scaleX: scrollYProgress, originX: 0 }}
          />
        </div>
      </div>

      {/* Scroll-based Transformations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
          style={{ scale }}
        >
          <div className="text-4xl mb-4">📏</div>
          <h3 className="text-lg font-semibold text-cyan-300">Scale Transform</h3>
          <p className="text-sm text-gray-400 mt-2">
            Scales from 0.8 to 1.2 based on scroll
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
          style={{ rotate }}
        >
          <div className="text-4xl mb-4">🔄</div>
          <h3 className="text-lg font-semibold text-green-300">Rotate Transform</h3>
          <p className="text-sm text-gray-400 mt-2">
            Rotates 360° based on scroll progress
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
          style={{ opacity }}
        >
          <div className="text-4xl mb-4">👻</div>
          <h3 className="text-lg font-semibold text-purple-300">Opacity Transform</h3>
          <p className="text-sm text-gray-400 mt-2">
            Fades in/out based on scroll position
          </p>
        </motion.div>
      </div>

      {/* Scroll Container for demonstrations */}
      <div 
        ref={containerRef}
        className="h-96 overflow-y-auto bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 space-y-8"
      >
        <div className="text-center text-gray-400 mb-8">
          ⬇️ Scroll down to see animations ⬇️
        </div>

        {/* In-view animations */}
        {[...Array(8)].map((_, index) => (
          <ScrollInViewCard key={index} index={index} />
        ))}

        <div className="text-center text-gray-400 mt-8">
          ⬆️ Scroll back up ⬆️
        </div>
      </div>

      {/* Parallax Effect Demo */}
      <div className="relative h-64 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, -100])
          }}
        />
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            className="text-center"
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [0, 50])
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">Parallax Effect</h3>
            <p className="text-gray-300">Background and foreground move at different speeds</p>
          </motion.div>
        </div>
      </div>

      {/* Code Examples */}
      <motion.div
        className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-200">Code Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Scroll Progress</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-green-400">{`const { scrollYProgress } = useScroll();
const scale = useTransform(
  scrollYProgress, 
  [0, 1], 
  [0.8, 1.2]
);

<motion.div style={{ scale }}>
  Content
</motion.div>`}</code>
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">In View Animation</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-blue-400">{`const ref = useRef(null);
const isInView = useInView(ref);

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? 
    { opacity: 1, y: 0 } : 
    { opacity: 0, y: 50 }
  }
>
  Content
</motion.div>`}</code>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ScrollInViewCard({ index }: { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const colors = [
    'from-red-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-teal-500',
    'from-purple-500 to-indigo-500',
    'from-yellow-500 to-orange-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-green-500',
  ];

  const icons = ['🚀', '⭐', '🎯', '💎', '🔥', '⚡', '🌟', '✨'];

  return (
    <motion.div
      ref={ref}
      className={`bg-gradient-to-r ${colors[index]} p-6 rounded-xl text-white`}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? 
        { opacity: 1, y: 0, scale: 1 } : 
        { opacity: 0, y: 50, scale: 0.8 }
      }
      transition={{ 
        duration: 0.6, 
        delay: 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <div className="flex items-center space-x-4">
        <motion.div
          className="text-3xl"
          animate={isInView ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {icons[index]}
        </motion.div>
        <div>
          <h4 className="text-lg font-semibold">Card {index + 1}</h4>
          <p className="text-sm opacity-90">
            This card animates when it comes into view
          </p>
        </div>
      </div>
    </motion.div>
  );
}
