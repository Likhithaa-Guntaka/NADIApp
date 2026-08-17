import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router';
import { Lightbulb, Sparkles, TrendingUp, Clock } from 'lucide-react';

export function ResurfacedThought() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5EFE8] px-6 py-8 pb-28">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-3xl mb-2 text-[#3D1A0E]"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
        >
          Ready to explore
        </h1>
        
        <p
          className="text-base mb-8 text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Your energy is aligned with this thought
        </p>

        {/* Current energy state */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#F0C84A] to-[#D4A847] rounded-2xl p-5 mb-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[#3D1A0E]" />
            <div>
              <p
                className="text-sm text-[#3D1A0E] mb-1"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Current State: Ekagra (Focused)
              </p>
              <p
                className="text-sm text-[#3D1A0E] opacity-90"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                High Prana, balanced Sushumna
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
              <p
                className="text-xs text-[#3D1A0E] mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Prana
              </p>
              <p
                className="text-lg text-[#3D1A0E]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                82%
              </p>
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
              <p
                className="text-xs text-[#3D1A0E] mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Tejas
              </p>
              <p
                className="text-lg text-[#3D1A0E]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                75%
              </p>
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
              <p
                className="text-xs text-[#3D1A0E] mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Ojas
              </p>
              <p
                className="text-lg text-[#3D1A0E]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                68%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Resurfaced thought */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#FAF3EC] rounded-2xl p-6 border-2 border-[#D4A847] shadow-lg mb-6"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-[#F0C84A]">
              <Lightbulb className="w-6 h-6 text-[#3D1A0E]" />
            </div>
            <div className="flex-1">
              <span
                className="text-xs text-[#C4722A] mb-1 block"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Idea · Captured 3 days ago
              </span>
              <p
                className="text-lg text-[#3D1A0E]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Explore breath-based interface for next prototype
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-[#4A7C59] mt-0.5" />
              <p
                className="text-sm text-[#3D1A0E]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Your Prana is high enough for creative exploration
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#4A7C59] mt-0.5" />
              <p
                className="text-sm text-[#3D1A0E]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                You have a 45-minute open window at 2:30 PM today
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 px-6 bg-[#C0392B] text-white rounded-2xl shadow-lg hover:bg-[#A02D22] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Develop now
          </button>
          
          <button
            onClick={() => navigate('/thoughts')}
            className="w-full py-4 px-6 bg-[#FAF3EC] text-[#3D1A0E] rounded-2xl border-2 border-[#E8E0D5] hover:bg-[#F0E9E0] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Park for later
          </button>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
