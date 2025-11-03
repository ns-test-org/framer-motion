'use client';

import { motion } from 'framer-motion';

export default function HoverEffects() {
  const cardVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Hover & Tap Effects
        </h2>
        <p className="text-gray-300 mb-8">
          Interactive animations that respond to user interactions like hover and tap events.
        </p>
      </motion.div>

      {/* Interactive Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Scale Button
        </motion.button>

        <motion.button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-medium"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#10b981",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Color Change
        </motion.button>

        <motion.button
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium"
          whileHover={{ 
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          Wiggle Button
        </motion.button>

        <motion.button
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium"
          whileHover={{ 
            y: -5,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ y: 0 }}
        >
          Lift Button
        </motion.button>
      </div>

      {/* Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer"
          variants={cardVariants}
          whileHover="hover"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="text-2xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold mb-2 text-blue-300">3D Tilt Card</h3>
          <p className="text-gray-400 text-sm">
            Hover to see 3D rotation effect with perspective
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer overflow-hidden relative"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <div className="relative z-10">
            <div className="text-2xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Shine Effect</h3>
            <p className="text-gray-400 text-sm">
              Hover to see the shine animation sweep across
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer"
          whileHover={{ 
            borderColor: "#8b5cf6",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="text-2xl mb-4">🌟</div>
          <h3 className="text-xl font-semibold mb-2 text-yellow-300">Glow Effect</h3>
          <p className="text-gray-400 text-sm">
            Hover to see the glowing border effect
          </p>
        </motion.div>
      </div>

      {/* Complex Hover Interactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer"
          whileHover="hover"
          initial="rest"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 }
          }}
        >
          <h3 className="text-xl font-semibold mb-4 text-green-300">Staggered Children</h3>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded"
                variants={{
                  rest: { scale: 1, opacity: 0.7 },
                  hover: { 
                    scale: 1.1, 
                    opacity: 1,
                    transition: { delay: i * 0.1 }
                  }
                }}
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Hover to see staggered animation of child elements
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer relative overflow-hidden"
          whileHover="hover"
          initial="rest"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
            variants={{
              rest: { scaleX: 0, originX: 0 },
              hover: { 
                scaleX: 1,
                transition: { duration: 0.3 }
              }
            }}
          />
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Progress Bar</h3>
          <motion.p 
            className="text-gray-400 text-sm"
            variants={{
              rest: { opacity: 0.7 },
              hover: { opacity: 1 }
            }}
          >
            Hover to see the progress bar fill animation
          </motion.p>
        </motion.div>
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
            <h4 className="text-sm font-medium text-gray-300 mb-2">Basic Hover Effect</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-green-400">{`<motion.button
  whileHover={{ 
    scale: 1.1,
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  }}
  whileTap={{ scale: 0.95 }}
>
  Hover me!
</motion.button>`}</code>
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Variants Pattern</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-blue-400">{`const variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

<motion.div
  variants={variants}
  whileHover="hover"
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
