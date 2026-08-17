import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Watch, Activity, Heart, Waves } from 'lucide-react';
import { useState } from 'react';

export function ConnectCalendar() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2000);
  };

  const signals = [
    {
      icon: Heart,
      name: 'Heart Rate Variability',
      description: 'Tracks autonomic nervous system state',
    },
    {
      icon: Activity,
      name: 'Motion Patterns',
      description: 'Detects rest and activity cycles',
    },
    {
      icon: Waves,
      name: 'Stress Responses',
      description: 'Measures subtle physiological shifts',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5EFE8] px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-4xl mb-3 text-[#3D1A0E]"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
        >
          Connect Your Wristband
        </h1>
        
        <p
          className="text-base mb-8 text-[#8A7560] max-w-md"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          The NADI wristband senses subtle signals to help estimate your cognitive energy flows
        </p>

        {/* Wristband illustration */}
        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#FAF3EC] to-[#F0E9E0] border-2 border-[#E8E0D5] flex items-center justify-center shadow-xl">
              <Watch className="w-24 h-24 text-[#C4722A]" />
              {connected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-[#4A7C59] rounded-full flex items-center justify-center shadow-lg"
                >
                  <div className="w-3 h-3 bg-white rounded-full" />
                </motion.div>
              )}
            </div>
            {connecting && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-[#D4A847]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.div>
        </div>

        {/* What we sense */}
        <div className="mb-8">
          <h2
            className="text-lg text-[#3D1A0E] mb-4"
            style={{ fontFamily: 'Cormorant, serif', fontWeight: 500 }}
          >
            What the wristband senses
          </h2>
          
          <div className="space-y-3">
            {signals.map((signal, index) => {
              const Icon = signal.icon;
              return (
                <motion.div
                  key={signal.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-[#FAF3EC] rounded-xl p-4 border border-[#E8E0D5]"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#E8E0D5]">
                      <Icon className="w-5 h-5 text-[#C4722A]" />
                    </div>
                    <div>
                      <p
                        className="text-[#3D1A0E] mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {signal.name}
                      </p>
                      <p
                        className="text-sm text-[#8A7560]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {signal.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Energy flows explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#E8EEF4] to-[#C8D8E8] rounded-xl p-4 mb-8"
        >
          <p
            className="text-sm text-[#3D1A0E] mb-3"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            These signals help estimate three energy flows:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#A8BED4]" />
              <p className="text-sm text-[#3D1A0E]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <strong>Input energy</strong> (Prana) — Mental clarity
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C04A2A]" />
              <p className="text-sm text-[#3D1A0E]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <strong>Thinking fuel</strong> (Tejas) — Processing power
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#B8860B]" />
              <p className="text-sm text-[#3D1A0E]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <strong>Deep reserve</strong> (Ojas) — Core resilience
              </p>
            </div>
          </div>
        </motion.div>

        {!connected ? (
          <button
            onClick={handleConnect}
            disabled={connecting}
            className={`w-full max-w-md py-4 px-6 rounded-2xl shadow-lg transition-colors ${
              connecting
                ? 'bg-[#E8E0D5] text-[#8A7560] cursor-wait'
                : 'bg-[#C0392B] text-white hover:bg-[#A02D22]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {connecting ? 'Connecting...' : 'Connect Wristband'}
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="bg-[#4A7C59] text-white rounded-xl p-4 text-center">
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                ✓ Connected successfully
              </p>
            </div>
            <button
              onClick={() => navigate('/how-it-works')}
              className="w-full py-4 px-6 bg-[#C0392B] text-white rounded-2xl shadow-lg hover:bg-[#A02D22] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Continue
            </button>
          </motion.div>
        )}

        {!connected && (
          <button
            onClick={() => navigate('/how-it-works')}
            className="w-full max-w-md py-4 px-6 text-[#8A7560] hover:text-[#3D1A0E] transition-colors mt-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Skip for now
          </button>
        )}
      </motion.div>
    </div>
  );
}