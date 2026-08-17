import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Bluetooth, Mic, Activity } from 'lucide-react';
import { useState } from 'react';

export function Permissions() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    connection: false,
    reflection: false,
    baseline: false,
  });
  const [anonymousData, setAnonymousData] = useState(false);

  const permissionsList = [
    {
      id: 'connection',
      icon: Bluetooth,
      title: 'Connection',
      description: 'Bluetooth connection to the NADI wristband',
      detail: 'Helps estimate resilience (Ojas) through continuous biometric sensing',
    },
    {
      id: 'reflection',
      icon: Mic,
      title: 'Reflection',
      description: 'Microphone access for voice capture',
      detail: 'Capture thoughts when overwhelmed, revisit when you have capacity',
    },
    {
      id: 'baseline',
      icon: Activity,
      title: 'Baseline',
      description: 'Health data for heart rate and motion patterns',
      detail: 'Establishes your unique energy signature and cognitive rhythms',
    },
  ];

  const allEnabled = Object.values(permissions).every(Boolean);

  return (
    <div className="min-h-screen bg-[#F5EFE8] px-6 py-8 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-4xl mb-3 text-[#3D1A0E]"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
        >
          Establishing Your Rhythm
        </h1>
        
        <p
          className="text-base mb-10 text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          This is an initiation, not a checklist. Each permission helps NADI sense your energy.
        </p>

        <div className="space-y-4 max-w-md mb-8">
          {permissionsList.map((item, index) => {
            const Icon = item.icon;
            const isEnabled = permissions[item.id as keyof typeof permissions];
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-[#FAF3EC] rounded-2xl p-5 border-2 transition-all ${
                  isEnabled ? 'border-[#D4A847]' : 'border-[#E8E0D5]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${
                      isEnabled ? 'bg-[#F0C84A]' : 'bg-[#E8E0D5]'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isEnabled ? 'text-[#3D1A0E]' : 'text-[#8A7560]'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-[#3D1A0E] mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm text-[#8A7560] mb-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.description}
                      </p>
                      <p
                        className="text-xs text-[#C4722A]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setPermissions((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id as keyof typeof prev],
                      }))
                    }
                    className={`ml-3 w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${
                      isEnabled ? 'bg-[#D4A847]' : 'bg-[#E8E0D5]'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        isEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Privacy disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#FAF3EC] rounded-xl p-4 border border-[#E8E0D5] mb-6 max-w-md"
        >
          <p
            className="text-sm text-[#3D1A0E] mb-3 leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Your data is stored locally and is never shared with institutions, schools, or employers. 
            Voice captures are deleted once they are resolved.
          </p>
          
          {/* Anonymous data toggle */}
          <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#E8E0D5]">
            <p
              className="text-sm text-[#8A7560] flex-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Allow anonymized data to improve personalized suggestions
            </p>
            <button
              onClick={() => setAnonymousData(!anonymousData)}
              className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${
                anonymousData ? 'bg-[#D4A847]' : 'bg-[#E8E0D5]'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  anonymousData ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </motion.div>

        {/* One-Signal Principle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#E8EEF4] to-[#C8D8E8] rounded-xl p-4 mb-8 max-w-md"
        >
          <h3
            className="text-[#3D1A0E] mb-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            One-Signal Principle
          </h3>
          <p
            className="text-sm text-[#3D1A0E] leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            NADI will only notify you in emergencies when Core Reserve (Ojas) becomes critically low.
          </p>
        </motion.div>

        <button
          onClick={() => navigate('/connect-calendar')}
          disabled={!allEnabled}
          className={`w-full max-w-md py-4 px-6 rounded-2xl shadow-lg transition-colors ${
            allEnabled
              ? 'bg-[#C0392B] text-white hover:bg-[#A02D22]'
              : 'bg-[#E8E0D5] text-[#8A7560] cursor-not-allowed'
          }`}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}