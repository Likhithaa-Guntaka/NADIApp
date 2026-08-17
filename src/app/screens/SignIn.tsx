import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5EFE8] px-6 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-8 text-[#8A7560] hover:text-[#3D1A0E] transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-4xl mb-3 text-[#3D1A0E]"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
        >
          Welcome to NADI
        </h1>
        
        <p
          className="text-base mb-10 text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Sign in to continue
        </p>

        <div className="space-y-4 max-w-md">
          <div>
            <label
              className="block text-[#3D1A0E] mb-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-[#FAF3EC] border border-[#E8E0D5] rounded-xl text-[#3D1A0E] placeholder-[#8A7560] focus:outline-none focus:ring-2 focus:ring-[#D4A847]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          <div>
            <label
              className="block text-[#3D1A0E] mb-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#FAF3EC] border border-[#E8E0D5] rounded-xl text-[#3D1A0E] placeholder-[#8A7560] focus:outline-none focus:ring-2 focus:ring-[#D4A847]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          <button
            onClick={() => navigate('/permissions')}
            className="w-full py-4 px-6 bg-[#C0392B] text-white rounded-2xl shadow-lg hover:bg-[#A02D22] transition-colors mt-6"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Continue
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E0D5]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-4 bg-[#F5EFE8] text-[#8A7560]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                or continue with
              </span>
            </div>
          </div>

          <button
            className="w-full py-4 px-6 bg-[#FAF3EC] text-[#3D1A0E] rounded-2xl border-2 border-[#E8E0D5] hover:bg-[#F0E9E0] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Sign in with Apple
          </button>

          <button
            className="w-full py-4 px-6 bg-[#FAF3EC] text-[#3D1A0E] rounded-2xl border-2 border-[#E8E0D5] hover:bg-[#F0E9E0] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Sign in with Google
          </button>
        </div>
      </motion.div>
    </div>
  );
}
