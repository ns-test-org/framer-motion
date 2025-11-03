'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BasicAnimations() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Basic Animations
        </h2>
        <p className="text-gray-300 mb-8">
          Fundamental Framer Motion animations including fade, scale, rotate, and slide effects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Fade In Animation */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Fade In</h3>
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <p className="text-sm text-gray-400 mt-4">
            opacity: 0 → 1
          </p>
        </motion.div>

        {/* Scale Animation */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-green-300">Scale</h3>
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg mx-auto"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-sm text-gray-400 mt-4">
            scale: 1 → 1.2 → 1
          </p>
        </motion.div>

        {/* Rotate Animation */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Rotate</h3>
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-sm text-gray-400 mt-4">
            rotate: 0° → 360°
          </p>
        </motion.div>

        {/* Slide Animation */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-pink-300">Slide</h3>
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg mx-auto"
            animate={{ x: [0, 30, -30, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <p className="text-sm text-gray-400 mt-4">
            x: 0 → 30 → -30 → 0
          </p>
        </motion.div>

        {/* Combined Animation */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">Combined</h3>
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mx-auto"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
              borderRadius: ["8px", "50%", "8px"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <p className="text-sm text-gray-400 mt-4">
            Multiple properties
          </p>
        </motion.div>

        {/* Toggle Animation */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-cyan-300">Toggle</h3>
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mx-auto cursor-pointer"
            animate={{ 
              scale: isVisible ? 1 : 0,
              opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsVisible(!isVisible)}
          />
          <button 
            className="text-sm text-gray-400 mt-4 hover:text-white transition-colors"
            onClick={() => setIsVisible(!isVisible)}
          >
            Click to toggle
          </button>
        </motion.div>
      </div>

      {/* Code Examples */}
      <motion.div
        className="mt-12 bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-200">Code Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Basic Animation</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-green-400">{`<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>`}</code>
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Repeating Animation</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-blue-400">{`<motion.div
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 2, 
    repeat: Infinity,
    ease: "linear"
  }}
>
  Spinning element
</motion.div>`}</code>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
