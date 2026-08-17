import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { Lightbulb, ListTodo, AlertCircle, HelpCircle, Clock, Zap, Archive, Calendar, BookOpen, TrendingUp, Sparkles } from 'lucide-react';

export function ThoughtsInbox() {
  const thoughts = [
    {
      id: 1,
      type: 'idea',
      icon: Lightbulb,
      iconColor: '#D4A847',
      text: 'Business idea: wellness app for creative professionals',
      status: 'ready',
      statusText: 'High capacity',
      statusColor: '#4A7C59',
    },
    {
      id: 2,
      type: 'reflection',
      icon: Sparkles,
      iconColor: '#A8BED4',
      text: 'Thoughts about my future career path and long-term goals',
      status: 'ready',
      statusText: 'Fits 20 min gap',
      statusColor: '#4A7C59',
    },
    {
      id: 3,
      type: 'skill',
      icon: TrendingUp,
      iconColor: '#C0392B',
      text: 'Skills I want to improve: public speaking and design thinking',
      status: 'waiting',
      statusText: 'Waiting for high capacity',
      statusColor: '#8A7560',
    },
    {
      id: 4,
      type: 'reading',
      icon: BookOpen,
      iconColor: '#8A7560',
      text: 'Read article: The science of cognitive energy management',
      status: 'ready',
      statusText: 'Fits 15 min gap',
      statusColor: '#4A7C59',
    },
    {
      id: 5,
      type: 'task',
      icon: ListTodo,
      iconColor: '#C0392B',
      text: 'Schedule design review for Q2',
      status: 'parked',
      statusText: 'Parked',
      statusColor: '#8A7560',
    },
    {
      id: 6,
      type: 'idea',
      icon: Lightbulb,
      iconColor: '#D4A847',
      text: 'Startup idea: meditation platform with AI-guided sessions',
      status: 'waiting',
      statusText: 'Needs 30+ min window',
      statusColor: '#8A7560',
    },
  ];

  const filters = [
    { label: 'All', count: 6 },
    { label: 'Ready', count: 3 },
    { label: 'Waiting', count: 2 },
    { label: 'Parked', count: 1 },
  ];

  const calendarSlots = [
    { time: '2:00 PM', type: 'meeting', label: 'Team Sync' },
    { time: '3:15 PM', type: 'free', label: '45 min free' },
    { time: '4:00 PM', type: 'focus', label: 'High focus window' },
    { time: '5:30 PM', type: 'free', label: '30 min free' },
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
          Revisit
        </h1>
        
        <p
          className="text-base mb-6 text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Ideas and tasks waiting for the right moment
        </p>

        {/* Calendar Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#FAF3EC] rounded-2xl p-5 border border-[#E8E0D5] mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#C0392B]" />
            <h2
              className="text-lg text-[#3D1A0E]"
              style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
            >
              Today's Windows
            </h2>
          </div>
          <div className="space-y-3">
            {calendarSlots.map((slot, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  slot.type === 'focus'
                    ? 'bg-gradient-to-r from-[#F0C84A]/20 to-[#D4A847]/20 border border-[#D4A847]/30'
                    : slot.type === 'free'
                    ? 'bg-[#E8EEF4]/50'
                    : 'bg-[#F5EFE8]'
                }`}
              >
                <span
                  className="text-sm text-[#8A7560] min-w-[70px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {slot.time}
                </span>
                <div className="flex-1">
                  <p
                    className="text-sm text-[#3D1A0E]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {slot.label}
                  </p>
                </div>
                {slot.type === 'focus' && (
                  <Zap className="w-4 h-4 text-[#D4A847]" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <button
              key={filter.label}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                index === 0
                  ? 'bg-[#C0392B] text-white'
                  : 'bg-[#FAF3EC] text-[#8A7560] border border-[#E8E0D5]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Thoughts list */}
        <div className="space-y-4">
          {thoughts.map((thought, index) => {
            const Icon = thought.icon;
            return (
              <motion.div
                key={thought.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#FAF3EC] rounded-2xl p-5 border border-[#E8E0D5]"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-2 rounded-xl"
                    style={{ backgroundColor: `${thought.iconColor}20` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: thought.iconColor }}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-[#3D1A0E] mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {thought.text}
                    </p>
                    <div className="flex items-center gap-2">
                      {thought.status === 'ready' ? (
                        <Zap className="w-4 h-4" style={{ color: thought.statusColor }} />
                      ) : thought.status === 'waiting' ? (
                        <Clock className="w-4 h-4" style={{ color: thought.statusColor }} />
                      ) : (
                        <Archive className="w-4 h-4" style={{ color: thought.statusColor }} />
                      )}
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          color: thought.statusColor,
                        }}
                      >
                        {thought.statusText}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}