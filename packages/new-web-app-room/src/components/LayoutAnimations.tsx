'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const items = [
  { id: 1, title: 'Task 1', color: 'from-red-500 to-pink-500', icon: '📝' },
  { id: 2, title: 'Task 2', color: 'from-blue-500 to-cyan-500', icon: '🎯' },
  { id: 3, title: 'Task 3', color: 'from-green-500 to-teal-500', icon: '⚡' },
  { id: 4, title: 'Task 4', color: 'from-purple-500 to-indigo-500', icon: '🚀' },
  { id: 5, title: 'Task 5', color: 'from-yellow-500 to-orange-500', icon: '⭐' },
  { id: 6, title: 'Task 6', color: 'from-pink-500 to-rose-500', icon: '💎' },
];

export default function LayoutAnimations() {
  const [selectedItems, setSelectedItems] = useState<number[]>([1, 2, 3]);
  const [isGrid, setIsGrid] = useState(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const shuffleItems = () => {
    setSelectedItems(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const selectedItemsData = items.filter(item => selectedItems.includes(item.id));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Layout Animations
        </h2>
        <p className="text-gray-300 mb-8">
          Smooth animations when elements change position, size, or layout using the layout prop.
        </p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        <motion.button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium"
          onClick={shuffleItems}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔀 Shuffle
        </motion.button>
        
        <motion.button
          className={`px-4 py-2 rounded-lg font-medium ${
            isGrid ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'
          }`}
          onClick={() => setIsGrid(!isGrid)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGrid ? '📊 Grid' : '📋 List'}
        </motion.button>

        <div className="flex gap-2">
          {items.map(item => (
            <motion.button
              key={item.id}
              className={`w-8 h-8 rounded-full text-sm ${
                selectedItems.includes(item.id)
                  ? `bg-gradient-to-r ${item.color} text-white`
                  : 'bg-white/10 text-gray-400'
              }`}
              onClick={() => toggleItem(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              layout
            >
              {item.id}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Layout Animation Demo */}
      <motion.div
        className={`${
          isGrid 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-4'
        }`}
        layout
      >
        <AnimatePresence>
          {selectedItemsData.map((item) => (
            <motion.div
              key={item.id}
              className={`bg-gradient-to-r ${item.color} p-6 rounded-xl text-white cursor-pointer ${
                isGrid ? '' : 'flex items-center space-x-4'
              }`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setExpandedCard(expandedCard === item.id ? null : item.id)}
            >
              <div className={`text-2xl ${isGrid ? 'mb-2' : ''}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <AnimatePresence>
                  {expandedCard === item.id && (
                    <motion.p
                      className="text-sm opacity-90 mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      layout
                    >
                      This is expanded content for {item.title}. 
                      The layout animates smoothly when this content appears or disappears.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Shared Layout Animation */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold mb-4 text-indigo-300">Shared Layout Animation</h3>
        <SharedLayoutDemo />
      </div>

      {/* Reorder Animation */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold mb-4 text-purple-300">Drag to Reorder</h3>
        <ReorderDemo />
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
            <h4 className="text-sm font-medium text-gray-300 mb-2">Layout Animation</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-green-400">{`<motion.div
  layout
  className="card"
>
  Content that animates 
  when layout changes
</motion.div>

// Automatically animates when:
// - Position changes
// - Size changes  
// - Parent layout changes`}</code>
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Shared Layout</h4>
            <pre className="text-xs bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-blue-400">{`<motion.div
  layoutId="shared-element"
  className="element"
>
  Shared element
</motion.div>

// Elements with same layoutId
// animate between each other
// when one unmounts and 
// another mounts`}</code>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SharedLayoutDemo() {
  const [selectedTab, setSelectedTab] = useState('tab1');
  
  const tabs = [
    { id: 'tab1', label: 'Photos', icon: '📸' },
    { id: 'tab2', label: 'Videos', icon: '🎥' },
    { id: 'tab3', label: 'Music', icon: '🎵' },
  ];

  return (
    <div>
      <div className="flex space-x-1 bg-white/5 p-1 rounded-lg mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {selectedTab === tab.id && (
              <motion.div
                className="absolute inset-0 bg-purple-600 rounded-md"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative flex items-center space-x-2">
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </span>
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          className="bg-white/5 p-4 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-gray-300">
            Content for {tabs.find(t => t.id === selectedTab)?.label} tab
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ReorderDemo() {
  const [items, setItems] = useState([
    { id: 1, text: 'First item', color: 'bg-red-500' },
    { id: 2, text: 'Second item', color: 'bg-blue-500' },
    { id: 3, text: 'Third item', color: 'bg-green-500' },
    { id: 4, text: 'Fourth item', color: 'bg-purple-500' },
  ]);

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={`${item.color} p-3 rounded-lg text-white cursor-move flex items-center space-x-3`}
          layout
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          whileDrag={{ scale: 1.05, zIndex: 10 }}
          onDragEnd={(_, info) => {
            const threshold = 50;
            if (Math.abs(info.offset.y) > threshold) {
              const direction = info.offset.y > 0 ? 1 : -1;
              const currentIndex = items.findIndex(i => i.id === item.id);
              const newIndex = Math.max(0, Math.min(items.length - 1, currentIndex + direction));
              
              if (newIndex !== currentIndex) {
                const newItems = [...items];
                const [removed] = newItems.splice(currentIndex, 1);
                newItems.splice(newIndex, 0, removed);
                setItems(newItems);
              }
            }
          }}
        >
          <div className="text-xl">⋮⋮</div>
          <div>{item.text}</div>
        </motion.div>
      ))}
      <p className="text-sm text-gray-400 mt-4">
        Drag items vertically to reorder them
      </p>
    </div>
  );
}
