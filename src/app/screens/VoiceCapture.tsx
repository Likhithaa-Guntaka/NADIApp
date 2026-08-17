import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function VoiceCapture() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordingToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        navigate('/voice-captured');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE8] px-6 py-8 pb-28 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <h1
          className="text-3xl mb-3 text-[#3D1A0E]"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
        >
          {isRecording ? 'Listening...' : 'Speak freely'}
        </h1>
        
        <p
          className="text-base mb-16 text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {isRecording
            ? 'NADI is capturing your thought'
            : 'Share tasks, worries, ideas, or questions'}
        </p>

        {/* Recording button with ripple animation */}
        <div className="relative flex items-center justify-center mb-16">
          {isRecording && (
            <>
              <motion.div
                className="absolute w-48 h-48 rounded-full bg-[#C0392B]"
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
              <motion.div
                className="absolute w-48 h-48 rounded-full bg-[#C0392B]"
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.5,
                }}
              />
            </>
          )}
          
          <motion.button
            onClick={handleRecordingToggle}
            className="relative w-40 h-40 rounded-full shadow-2xl"
            style={{
              background: isRecording
                ? 'linear-gradient(135deg, #E85A2A, #C0392B)'
                : 'linear-gradient(135deg, #C0392B, #A02D22)',
            }}
            whileTap={{ scale: 0.95 }}
            animate={
              isRecording
                ? {
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isRecording ? Infinity : 0,
              ease: 'easeInOut',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {isRecording ? (
                <motion.div
                  className="grid grid-cols-3 gap-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-white rounded-full"
                      animate={{
                        scaleY: [1, 2, 1],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z"
                    fill="white"
                  />
                  <path
                    d="M17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11H5C5 14.53 7.61 17.43 11 17.92V21H13V17.92C16.39 17.43 19 14.53 19 11H17Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>
          </motion.button>
        </div>

        <p
          className="text-sm text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {isRecording
            ? 'Tap again to stop'
            : 'NADI will resurface this when you have the right energy and time'}
        </p>
      </motion.div>

      <BottomNav />
    </div>
  );
}
