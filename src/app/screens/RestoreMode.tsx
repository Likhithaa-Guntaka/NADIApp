import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { Flower2, Wind, Footprints, Moon, Palette, Headphones } from 'lucide-react';

export function RestoreMode() {
  const restoreOptions = [
    {
      id: 1,
      icon: Wind,
      title: '3-Minute Reset',
      subtitle: 'Guided breath practice',
      duration: '3 min',
      color: '#A8BED4',
      featured: true,
    },
    {
      id: 2,
      icon: Footprints,
      title: 'Walking Outside',
      subtitle: 'Gentle movement in nature',
      duration: '15 min',
      color: '#4A7C59',
      featured: false,
    },
    {
      id: 3,
      icon: Palette,
      title: 'Sketching',
      subtitle: 'Free-form creative expression',
      duration: '20 min',
      color: '#D4A847',
      featured: false,
    },
    {
      id: 4,
      icon: Headphones,
      title: 'Listening to Music',
      subtitle: 'Ambient soundscapes',
      duration: '10 min',
      color: '#C4722A',
      featured: false,
    },
    {
      id: 5,
      icon: Moon,
      title: 'Yoga Nidra',
      subtitle: 'Deep restoration practice',
      duration: '30 min',
      color: '#6A8AA0',
      featured: false,
    },
  ];

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
          Restore
        </h1>
        
        <p
          className="text-base mb-8 text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Replenish your Ojas and return to balance
        </p>

        {/* Current state alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#C8D8E8] to-[#E8EEF4] rounded-2xl p-5 mb-6"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/50">
              <Flower2 className="w-5 h-5 text-[#6A8AA0]" />
            </div>
            <div>
              <p
                className="text-[#3D1A0E] mb-1"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Your Ojas is at 68%
              </p>
              <p
                className="text-sm text-[#6A8AA0]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                A short restoration practice will help you maintain balance
              </p>
            </div>
          </div>
        </motion.div>

        {/* Restore options */}
        <div className="space-y-4">
          {restoreOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {option.featured ? (
                  <div className="bg-gradient-to-br from-[#E8EEF4] to-[#C8D8E8] rounded-2xl p-6 border-2 border-[#A8BED4] shadow-lg">
                    <div className="flex items-start gap-4">
                      <div
                        className="p-4 rounded-xl bg-white/60 backdrop-blur-sm"
                      >
                        <Icon className="w-7 h-7" style={{ color: option.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p
                              className="text-sm text-[#6A8AA0] mb-1"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                            >
                              Recommended for you
                            </p>
                            <h3
                              className="text-xl text-[#3D1A0E] mb-1"
                              style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
                            >
                              {option.title}
                            </h3>
                            <p
                              className="text-sm text-[#6A8AA0]"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {option.subtitle}
                            </p>
                          </div>
                          <span
                            className="text-sm text-[#6A8AA0] bg-white/50 px-3 py-1 rounded-full"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            {option.duration}
                          </span>
                        </div>
                        <button
                          className="w-full mt-4 py-3 px-6 bg-[#C0392B] text-white rounded-xl shadow-lg hover:bg-[#A02D22] transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          Start now
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FAF3EC] rounded-2xl p-5 border border-[#E8E0D5] hover:border-[#D4A847] transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${option.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: option.color }} />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-[#3D1A0E] mb-1"
                          style={{ fontFamily: 'Cormorant, serif', fontWeight: 500 }}
                        >
                          {option.title}
                        </h3>
                        <p
                          className="text-sm text-[#8A7560]"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {option.subtitle}
                        </p>
                      </div>
                      <span
                        className="text-sm text-[#8A7560]"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {option.duration}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Personalized tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 bg-[#FAF3EC] rounded-2xl p-5 border border-[#E8E0D5]"
        >
          <p
            className="text-sm text-[#C4722A] mb-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Personalized for you
          </p>
          <p
            className="text-sm text-[#3D1A0E]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Based on your patterns, Saturday mornings are ideal for longer restoration practices. These suggestions become more personalized over time.
          </p>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
}