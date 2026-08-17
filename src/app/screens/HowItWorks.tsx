import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function HowItWorks() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: 'Energy Channels',
      subtitle: 'Ida, Pingala, Sushumna',
      intro: 'Three flows of energy that shape your experience',
      content: [
        { name: 'Ida', label: 'Rest Channel', description: 'Cooling, receptive, restorative energy. When active, you feel calm and reflective.', color: '#A8BED4' },
        { name: 'Pingala', label: 'Drive Channel', description: 'Warming, active, propulsive energy. When active, you feel focused and ready to push forward.', color: '#C0392B' },
        { name: 'Sushumna', label: 'Balance Channel', description: 'Central channel of harmony and flow. When active, you feel effortlessly present.', color: '#D4A847' },
      ],
    },
    {
      title: 'Mental Energy System',
      subtitle: 'Prana, Tejas, Ojas',
      intro: 'Three types of energy that fuel your thinking',
      content: [
        { name: 'Prana', label: 'Vital Force', description: 'Mental clarity and alertness. When high, ideas flow easily and you grasp concepts quickly.', color: '#A8BED4' },
        { name: 'Tejas', label: 'Inner Fire', description: 'Digestive and transformative power. When high, you can process complex information and make decisions.', color: '#C04A2A' },
        { name: 'Ojas', label: 'Core Reserve', description: 'Deep resilience and immunity. When low, rest becomes essential. NADI protects this carefully.', color: '#B8860B' },
      ],
    },
    {
      title: 'Cognitive States',
      subtitle: 'Five patterns of mind',
      intro: 'Understanding how your attention moves throughout the day',
      content: [
        { name: 'Kshipta', label: 'Scattered', description: 'Mind jumping rapidly between stimuli. Common during overwhelm.', color: '#8A7560' },
        { name: 'Mudha', label: 'Dull', description: 'Low clarity and heaviness. Often signals need for rest.', color: '#8A7560' },
        { name: 'Vikshipta', label: 'Distracted', description: 'Occasional focus, often pulled away. The most common daily state.', color: '#8A7560' },
        { name: 'Ekagra', label: 'Focused', description: 'Steady one-pointed attention. Ideal for deep work.', color: '#D4A847' },
        { name: 'Niruddha', label: 'Absorbed', description: 'Complete flow and presence. Rare and precious.', color: '#D4A847' },
      ],
    },
  ];

  const currentPageData = pages[currentPage];

  return (
    <div className="min-h-screen bg-[#F5EFE8] px-6 py-8 flex flex-col">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <h1
          className="text-4xl mb-2 text-[#3D1A0E]"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
        >
          {currentPageData.title}
        </h1>
        
        <p
          className="text-base mb-2 text-[#C4722A]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          {currentPageData.subtitle}
        </p>

        <p
          className="text-sm mb-8 text-[#8A7560]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {currentPageData.intro}
        </p>

        <div className="space-y-6 max-w-md">
          {currentPageData.content.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#FAF3EC] rounded-2xl p-5 border border-[#E8E0D5]"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3
                      className="text-lg text-[#C4722A]"
                      style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="text-sm text-[#8A7560]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p
                    className="text-sm text-[#3D1A0E] leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 space-y-4 max-w-md">
        {/* Page indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentPage
                  ? 'w-8 bg-[#D4A847]'
                  : 'w-2 bg-[#E8E0D5]'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="flex-1 py-4 px-6 bg-[#FAF3EC] text-[#3D1A0E] rounded-2xl border-2 border-[#E8E0D5] hover:bg-[#F0E9E0] transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
          )}
          
          {currentPage < pages.length - 1 ? (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex-1 py-4 px-6 bg-[#C0392B] text-white rounded-2xl shadow-lg hover:bg-[#A02D22] transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/home')}
              className="flex-1 py-4 px-6 bg-[#C0392B] text-white rounded-2xl shadow-lg hover:bg-[#A02D22] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Begin Your Journey
            </button>
          )}
        </div>

        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 px-6 text-[#8A7560] hover:text-[#3D1A0E] transition-colors"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          Skip tutorial
        </button>
      </div>
    </div>
  );
}