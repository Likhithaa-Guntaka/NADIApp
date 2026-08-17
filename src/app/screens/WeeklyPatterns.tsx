import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { TrendingUp, TrendingDown, Clock, Zap } from 'lucide-react';

export function WeeklyPatterns() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const energyData = [65, 72, 68, 80, 75, 45, 58];
  const maxEnergy = Math.max(...energyData);

  const cognitiveStates = [
    { name: 'Ekagra', label: 'Focused', percentage: 35, color: '#D4A847' },
    { name: 'Vikshipta', label: 'Distracted', percentage: 28, color: '#8A7560' },
    { name: 'Kshipta', label: 'Scattered', percentage: 20, color: '#C0392B' },
    { name: 'Niruddha', label: 'Absorbed', percentage: 12, color: '#4A7C59' },
    { name: 'Mudha', label: 'Dull', percentage: 5, color: '#8A7560' },
  ];

  const insights = [
    {
      icon: Zap,
      color: '#D4A847',
      title: 'Golden hours',
      value: '10 AM - 12 PM, Thu & Fri',
    },
    {
      icon: TrendingDown,
      color: '#C0392B',
      title: 'Ojas low points',
      value: 'Saturday mornings',
    },
    {
      icon: Clock,
      color: '#4A7C59',
      title: 'Peak Sushumna',
      value: 'Wednesday 11 AM',
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
          Weekly Patterns
        </h1>
        
        <p
          className="text-base mb-8 text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Your energy landscape this week
        </p>

        {/* Energy chart */}
        <div className="bg-[#FAF3EC] rounded-2xl p-5 border border-[#E8E0D5] mb-6">
          <h2
            className="text-sm text-[#C4722A] mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Average Ojas Levels
          </h2>
          <div className="flex items-end justify-between h-40 gap-2">
            {weekDays.map((day, index) => {
              const height = (energyData[index] / maxEnergy) * 100;
              const isHighest = energyData[index] === maxEnergy;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className={`w-full rounded-t-lg ${
                      isHighest
                        ? 'bg-gradient-to-t from-[#D4A847] to-[#F0C84A]'
                        : 'bg-gradient-to-t from-[#C8D8E8] to-[#E8EEF4]'
                    }`}
                  />
                  <p
                    className="text-xs text-[#8A7560]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {day}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key insights */}
        <div className="mb-6">
          <h2
            className="text-sm text-[#C4722A] mb-3"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Key Insights
          </h2>
          <div className="space-y-3">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-[#FAF3EC] rounded-xl p-4 border border-[#E8E0D5]"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${insight.color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: insight.color }} />
                    </div>
                    <div>
                      <p
                        className="text-sm text-[#8A7560] mb-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {insight.title}
                      </p>
                      <p
                        className="text-[#3D1A0E]"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {insight.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Cognitive states distribution */}
        <div className="bg-[#FAF3EC] rounded-2xl p-5 border border-[#E8E0D5]">
          <h2
            className="text-sm text-[#C4722A] mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Cognitive States Distribution
          </h2>
          <div className="space-y-3">
            {cognitiveStates.map((state, index) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.08 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: state.color }}
                    />
                    <span
                      className="text-sm text-[#3D1A0E]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {state.name} ({state.label})
                    </span>
                  </div>
                  <span
                    className="text-sm text-[#8A7560]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {state.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[#E8E0D5] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${state.percentage}%` }}
                    transition={{ delay: 1.2 + index * 0.08, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: state.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
