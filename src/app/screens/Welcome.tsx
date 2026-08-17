import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5EFE8] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1
          className="text-6xl mb-6 text-[#3D1A0E]"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
        >
          NADI
        </h1>
        
        <p
          className="text-lg mb-12 text-[#8A7560] max-w-sm"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Feel your energy before it runs out
        </p>

        <div className="space-y-4 w-full max-w-xs mx-auto">
          <button
            onClick={() => navigate('/signin')}
            className="w-full py-4 px-6 bg-[#C0392B] text-white rounded-2xl shadow-lg hover:bg-[#A02D22] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Create Account
          </button>
          
          <button
            onClick={() => navigate('/signin')}
            className="w-full py-4 px-6 bg-[#FAF3EC] text-[#3D1A0E] rounded-2xl border-2 border-[#E8E0D5] hover:bg-[#F0E9E0] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
}