import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Check } from 'lucide-react';
import { useEffect } from 'react';

export function VoiceCaptured() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F5EFE8] px-6 py-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-32 h-32 mx-auto mb-8 rounded-full bg-[#4A7C59] flex items-center justify-center shadow-xl"
        >
          <Check className="w-16 h-16 text-white" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl mb-3 text-[#3D1A0E]"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
        >
          Thought captured
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base text-[#8A7560] max-w-xs mx-auto"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          NADI will surface this when you have the right energy and time to act on it
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-[#FAF3EC] rounded-xl p-4 border border-[#E8E0D5]"
        >
          <p
            className="text-sm text-[#8A7560]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Find all your captured thoughts in the{' '}
            <span
              className="text-[#C0392B]"
              style={{ fontWeight: 600 }}
            >
              Revisit
            </span>
            {' '}tab
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <button
            onClick={() => navigate('/home')}
            className="text-[#8A7560] hover:text-[#3D1A0E] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Return to home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}