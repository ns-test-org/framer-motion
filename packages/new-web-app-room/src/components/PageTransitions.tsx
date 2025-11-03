'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const pages = [
  { id: 'home', title: 'Home', color: 'from-blue-500 to-purple-500', icon: '🏠' },
  { id: 'about', title: 'About', color: 'from-green-500 to-teal-500', icon: '👋' },
  { id: 'services', title: 'Services', color: 'from-pink-500 to-red-500', icon: '⚡' },
  { id: 'contact', title: 'Contact', color: 'from-yellow-500 to-orange-500', icon: '📧' },
];

const pageVariants = {
  initial: { opacity: 0, x: 300 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -300 }
};

const slideVariants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -50 }
};

const scaleVariants = {
  initial: { opacity: 0, scale: 0.8 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.2 }
};

const rotateVariants = {
  initial: { opacity: 0, rotate: -180 },
  in: { opacity: 1, rotate: 0 },
  out: { opacity: 0, rotate: 180 }
};

export default function PageTransitions() {
  const [currentPage, setCurrentPage] = useState('home');
  const [transitionType, setTransitionType] = useState('slide');

  const getVariants = () => {
    switch (transitionType) {
      case 'slide': return pageVariants;
      case 'fade': return slideVariants;
      case 'scale': return scaleVariants;
      case 'rotate': return rotateVariants;
      default: return pageVariants;
    }
  };

  const currentPageData = pages.find(page => page.id === currentPage);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
          Page Transitions
        </h2>
        <p className="text-gray-300 mb-8">
          Smooth page transitions using AnimatePresence for enter/exit animations.
        </p>
      </motion.div>

      {/* Transition Type Selector */}
      <div className="flex flex-wrap gap-4 mb-8">
        {['slide', 'fade', 'scale', 'rotate'].map((type) => (
          <motion.button
            key={type}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              transitionType === type 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            onClick={() => setTransitionType(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        {pages.map((page) => (
          <motion.button
            key={page.id}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentPage === page.id 
                ? `bg-gradient-to-r ${page.color} text-white` 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            onClick={() => setCurrentPage(page.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{page.icon}</span>
            {page.title}
          </motion.button>
        ))}
      </div>

      {/* Page Content Area */}
      <div className="relative h-96 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className={`absolute inset-0 bg-gradient-to-br ${currentPageData?.color} p-8 flex flex-col items-center justify-center text-white`}
            variants={getVariants()}
            initial="initial"
            animate="in"
            exit="out"
            transition={{
              duration: 0.5,
              type: "tween",
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="text-8xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {currentPageData?.icon}
            </motion.div>
            <motion.h3
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentPageData?.title}
            </motion.h3>
            <motion.p
              className="text-xl opacity-90 text-center max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              This is the {currentPageData?.title.toLowerCase()} page with a beautiful {transitionType} transition effect.
            </motion.p>
            
            {/* Animated decorative elements */}
            <div className="absolute top-4 right-4">
              <motion.div
                className="w-16 h-16 border-2 border-white/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="absolute bottom-4 left-4">
              <motion.div
                className="w-12 h-12 bg-white/20 rounded-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Staggered List Example */}
      <motion.div
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-200">Staggered List Animation</h3>
        <AnimatePresence>
          <motion.div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <motion.div
                key={`${currentPage}-${item}`}
                className="bg-white/10 p-4 rounded-lg border border-white/20"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentPageData?.color}`} />
                  <span className="text-gray-300">
                    {currentPageData?.title} item #{item}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

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
            <h4 className="text-sm font-medium text-gray-300 mb-2">AnimatePresence Setup</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-green-400">{`<AnimatePresence mode="wait">
  <motion.div
    key={currentPage}
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -300 }}
    transition={{ duration: 0.5 }}
  >
    Page content
  </motion.div>
</AnimatePresence>`}</code>
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Staggered Children</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-blue-400">{`{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      delay: index * 0.1 
    }}
  >
    {item.content}
  </motion.div>
))}`}</code>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
