import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { Zap, Clock } from 'lucide-react';

export function TasksCalendar() {
  const timeSlots = [
    { time: '9:00 AM', event: 'Team standup', type: 'meeting', duration: '30 min' },
    { time: '9:30 AM', type: 'gap', duration: '30 min', energy: 'high' },
    { time: '10:00 AM', event: 'Design review', type: 'meeting', duration: '60 min' },
    { time: '11:00 AM', type: 'gap', duration: '60 min', energy: 'high' },
    { time: '12:00 PM', event: 'Lunch', type: 'personal', duration: '60 min' },
    { time: '1:00 PM', type: 'gap', duration: '90 min', energy: 'medium' },
    { time: '2:30 PM', type: 'gap', duration: '45 min', energy: 'high', highlighted: true },
    { time: '3:15 PM', event: 'Client call', type: 'meeting', duration: '45 min' },
    { time: '4:00 PM', type: 'gap', duration: '60 min', energy: 'medium' },
  ];

  const suggestedTasks = [
    {
      id: 1,
      text: 'Explore breath-based interface',
      fit: 'Perfect fit for 2:30 PM gap',
      duration: '45 min',
      energy: 'Ekagra',
    },
    {
      id: 2,
      text: 'Review wellness metrics report',
      fit: 'Fits in 9:30 AM gap',
      duration: '15 min',
      energy: 'Any state',
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
          Today's Flow
        </h1>
        
        <p
          className="text-base mb-2 text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Sunday, March 8
        </p>

        {/* Suggested tasks */}
        <div className="mb-6">
          <h2
            className="text-sm text-[#C4722A] mb-3"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Suggested for you
          </h2>
          <div className="space-y-3">
            {suggestedTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#F0C84A] to-[#D4A847] rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-[#3D1A0E] mt-0.5" />
                  <div className="flex-1">
                    <p
                      className="text-[#3D1A0E] mb-1"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {task.text}
                    </p>
                    <p
                      className="text-sm text-[#3D1A0E] opacity-90"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {task.fit} · {task.duration} · {task.energy}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <h2
            className="text-sm text-[#C4722A] mb-3"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Schedule
          </h2>
          {timeSlots.map((slot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-stretch gap-3 ${
                slot.highlighted ? 'relative' : ''
              }`}
            >
              {slot.highlighted && (
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-[#F0C84A] to-[#D4A847] rounded-2xl opacity-20"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
              <div className="w-20 pt-2 relative z-10">
                <p
                  className="text-sm text-[#8A7560]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {slot.time}
                </p>
              </div>
              <div className="flex-1 relative z-10">
                {slot.type === 'gap' ? (
                  <div
                    className={`rounded-xl border-2 border-dashed p-3 ${
                      slot.energy === 'high'
                        ? 'border-[#D4A847] bg-[#FAF3EC]'
                        : 'border-[#E8E0D5] bg-[#FAF3EC]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${
                        slot.energy === 'high' ? 'text-[#D4A847]' : 'text-[#8A7560]'
                      }`} />
                      <p
                        className={`text-sm ${
                          slot.energy === 'high' ? 'text-[#D4A847]' : 'text-[#8A7560]'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        Open · {slot.duration} · {slot.energy} energy
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FAF3EC] rounded-xl border border-[#E8E0D5] p-3">
                    <p
                      className="text-[#3D1A0E] mb-1"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {slot.event}
                    </p>
                    <p
                      className="text-sm text-[#8A7560]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {slot.duration}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
