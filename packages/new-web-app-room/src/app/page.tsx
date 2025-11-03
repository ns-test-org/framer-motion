'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasicAnimations from '../components/BasicAnimations';
import HoverEffects from '../components/HoverEffects';
import PageTransitions from '../components/PageTransitions';
import ScrollAnimations from '../components/ScrollAnimations';
import DragInteractions from '../components/DragInteractions';
import LayoutAnimations from '../components/LayoutAnimations';
import GestureAnimations from '../components/GestureAnimations';

const demos = [
  { id: 'basic', title: 'Basic Animations', component: BasicAnimations },
  { id: 'hover', title: 'Hover & Tap Effects', component: HoverEffects },
  { id: 'transitions', title: 'Page Transitions', component: PageTransitions },
  { id: 'scroll', title: 'Scroll Animations', component: ScrollAnimations },
  { id: 'drag', title: 'Drag Interactions', component: DragInteractions },
  { id: 'layout', title: 'Layout Animations', component: LayoutAnimations },
  { id: 'gestures', title: 'Gesture Recognition', component: GestureAnimations },
];

export default function FramerMotionDemo() {
  const [activeDemo, setActiveDemo] = useState('basic');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component || BasicAnimations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <motion.header 
        className="relative z-50 p-6 border-b border-white/10 backdrop-blur-sm bg-black/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Framer Motion Demo
          </motion.h1>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ☰
            </motion.div>
          </motion.button>
        </div>
      </motion.header>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-88px)]">
        {/* Sidebar Navigation */}
        <AnimatePresence>
          {(isMenuOpen || window.innerWidth >= 768) && (
            <motion.nav 
              className="w-full md:w-64 bg-black/30 backdrop-blur-sm border-r border-white/10 p-6"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold mb-6 text-gray-300">Demonstrations</h2>
              <div className="space-y-2">
                {demos.map((demo, index) => (
                  <motion.button
                    key={demo.id}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeDemo === demo.id 
                        ? 'bg-purple-600/50 text-white' 
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setActiveDemo(demo.id);
                      setIsMenuOpen(false);
                    }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {demo.title}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main 
          className="flex-1 p-6 overflow-auto"
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ActiveComponent />
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}

