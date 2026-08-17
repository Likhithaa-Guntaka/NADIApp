import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router';
import { Bluetooth, User } from 'lucide-react';

export function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5EFE8] px-6 py-8 pb-28">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-3xl text-[#C4722A]"
            style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
          >
            NADI
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#4A7C59]" />
            <Bluetooth className="w-5 h-5 text-[#8A7560]" />
            <User className="w-5 h-5 text-[#8A7560]" />
          </div>
        </div>

        {/* Nadi Energy Blob */}
        <div className="relative mb-8">
          <motion.div
            className="relative w-full aspect-square max-w-[280px] mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Outer glow halo */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(232, 90, 42, 0.2) 0%, rgba(212, 168, 71, 0.15) 40%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Main organic blob */}
            <motion.div
              className="absolute inset-8"
              style={{
                background: 'linear-gradient(135deg, #F0C84A 0%, #D4A847 40%, #C4722A 70%, #C0392B 100%)',
                borderRadius: '45% 55% 60% 40% / 50% 45% 55% 50%',
                boxShadow: '0 10px 40px rgba(192, 57, 43, 0.3), inset 0 2px 20px rgba(255, 255, 255, 0.2)',
              }}
              animate={{
                borderRadius: [
                  '45% 55% 60% 40% / 50% 45% 55% 50%',
                  '50% 50% 55% 45% / 45% 55% 45% 55%',
                  '55% 45% 50% 50% / 55% 50% 50% 50%',
                  '45% 55% 60% 40% / 50% 45% 55% 50%',
                ],
                scale: [1, 1.02, 0.98, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Central content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.p
                  className="text-sm text-white/80 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ENERGY
                </motion.p>
                <motion.div
                  className="text-6xl text-white"
                  style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                >
                  84
                </motion.div>
              </div>
            </motion.div>

            {/* Subtle rotating glow */}
            <motion.div
              className="absolute inset-12"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(240, 200, 74, 0.4), transparent 60%)',
                borderRadius: '50%',
                filter: 'blur(15px)',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        </div>

        {/* Current State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <p
            className="text-sm text-[#8A7560] mb-1"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Current State
          </p>
          <h2
            className="text-2xl text-[#3D1A0E] mb-1"
            style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
          >
            Ekagra
          </h2>
          <p
            className="text-sm text-[#C4722A]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Focused
          </p>
        </motion.div>

        {/* Energy cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#FAF3EC] rounded-xl p-4 border border-[#E8E0D5]"
          >
            <div className="w-3 h-3 rounded-full bg-[#A8BED4] mb-2" />
            <p
              className="text-xs text-[#8A7560] mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Input Flow
            </p>
            <p
              className="text-xl text-[#3D1A0E]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              82%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#FAF3EC] rounded-xl p-4 border border-[#E8E0D5]"
          >
            <div className="w-3 h-3 rounded-full bg-[#C04A2A] mb-2" />
            <p
              className="text-xs text-[#8A7560] mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Thinking Fuel
            </p>
            <p
              className="text-xl text-[#3D1A0E]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              75%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#FAF3EC] rounded-xl p-4 border border-[#E8E0D5]"
          >
            <div className="w-3 h-3 rounded-full bg-[#B8860B] mb-2" />
            <p
              className="text-xs text-[#8A7560] mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Reserve Energy
            </p>
            <p
              className="text-xl text-[#3D1A0E]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              68%
            </p>
          </motion.div>
        </div>

        {/* Restore button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={() => navigate('/restore')}
          className="w-full py-4 px-6 bg-[#4A7C59] text-white rounded-2xl shadow-lg hover:bg-[#3D6447] transition-colors"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          Restore Mode
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
}