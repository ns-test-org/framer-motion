'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function DragInteractions() {
  const [draggedItems, setDraggedItems] = useState<string[]>([]);
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "#0099ff"]
  );

  const handleDragEnd = (itemId: string) => {
    if (!draggedItems.includes(itemId)) {
      setDraggedItems([...draggedItems, itemId]);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          Drag Interactions
        </h2>
        <p className="text-gray-300 mb-8">
          Interactive draggable elements with constraints, momentum, and visual feedback.
        </p>
      </motion.div>

      {/* Basic Drag */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-orange-300">Free Drag</h3>
          <div className="h-32 bg-white/5 rounded-lg relative overflow-hidden">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg cursor-grab active:cursor-grabbing absolute top-4 left-4"
              drag
              dragMomentum={false}
              whileDrag={{ scale: 1.1, rotate: 5 }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">Drag me anywhere!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-blue-300">Horizontal Only</h3>
          <div className="h-32 bg-white/5 rounded-lg relative overflow-hidden">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg cursor-grab active:cursor-grabbing absolute top-10 left-4"
              drag="x"
              dragConstraints={{ left: 0, right: 200 }}
              whileDrag={{ scale: 1.1 }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">Horizontal drag only</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-green-300">Vertical Only</h3>
          <div className="h-32 bg-white/5 rounded-lg relative overflow-hidden">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg cursor-grab active:cursor-grabbing absolute top-4 left-10"
              drag="y"
              dragConstraints={{ top: 0, bottom: 80 }}
              whileDrag={{ scale: 1.1 }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">Vertical drag only</p>
        </div>
      </div>

      {/* Advanced Drag Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Drag with Transform */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-purple-300">Drag with Color Transform</h3>
          <div className="h-40 bg-white/5 rounded-lg relative overflow-hidden">
            <motion.div
              className="w-16 h-16 rounded-lg cursor-grab active:cursor-grabbing absolute top-12 left-12"
              style={{ 
                background,
                x 
              }}
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              whileDrag={{ scale: 1.2, rotate: 10 }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">Color changes based on position</p>
        </div>

        {/* Snap to Grid */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-pink-300">Snap to Grid</h3>
          <div className="h-40 bg-white/5 rounded-lg relative overflow-hidden">
            {/* Grid dots */}
            {[...Array(5)].map((_, row) =>
              [...Array(7)].map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  style={{
                    left: col * 30 + 10,
                    top: row * 30 + 10,
                  }}
                />
              ))
            )}
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg cursor-grab active:cursor-grabbing absolute"
              drag
              dragConstraints={{ left: 0, right: 180, top: 0, bottom: 120 }}
              dragSnapToOrigin={false}
              onDragEnd={(_, info) => {
                const snapX = Math.round(info.point.x / 30) * 30;
                const snapY = Math.round(info.point.y / 30) * 30;
              }}
              whileDrag={{ scale: 1.1, zIndex: 10 }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">Snaps to grid points</p>
        </div>
      </div>

      {/* Drag and Drop */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-yellow-300">Drag and Drop</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Source Area */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Drag from here</h4>
            <div className="bg-white/5 rounded-lg p-4 min-h-32">
              <div className="grid grid-cols-3 gap-3">
                {['🎯', '⭐', '🚀', '💎', '🔥', '⚡'].map((icon, index) => (
                  <motion.div
                    key={`item-${index}`}
                    className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-xl"
                    drag
                    dragConstraints={false}
                    whileDrag={{ scale: 1.2, zIndex: 10 }}
                    onDragEnd={() => handleDragEnd(`item-${index}`)}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Drop Area */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Drop here</h4>
            <motion.div
              className="bg-white/5 rounded-lg p-4 min-h-32 border-2 border-dashed border-white/20"
              whileHover={{ borderColor: '#fbbf24' }}
            >
              {draggedItems.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Drop items here
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {draggedItems.map((itemId, index) => (
                    <motion.div
                      key={itemId}
                      className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      ✓
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Elastic Drag */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-cyan-300">Elastic Drag</h3>
        <div className="h-40 bg-white/5 rounded-lg relative overflow-hidden flex items-center justify-center">
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full cursor-grab active:cursor-grabbing"
            drag
            dragElastic={0.2}
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            whileDrag={{ scale: 1.3 }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Elastic resistance when dragging beyond constraints
        </p>
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
            <h4 className="text-sm font-medium text-gray-300 mb-2">Basic Drag</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-green-400">{`<motion.div
  drag
  dragConstraints={{ 
    left: -100, 
    right: 100, 
    top: -50, 
    bottom: 50 
  }}
  whileDrag={{ scale: 1.1 }}
>
  Drag me!
</motion.div>`}</code>
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Drag with Transform</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-blue-400">{`const x = useMotionValue(0);
const background = useTransform(
  x, [-100, 0, 100], 
  ["#ff008c", "#7700ff", "#0099ff"]
);

<motion.div
  drag="x"
  style={{ x, background }}
>
  Color changes!
</motion.div>`}</code>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
