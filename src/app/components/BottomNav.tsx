import { Home, Mic, FileText, User, Flower2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: 'Home', icon: Home, path: '/home' },
    { label: 'Speak', icon: Mic, path: '/voice-capture' },
    { label: 'Revisit', icon: FileText, path: '/thoughts' },
    { label: 'Restore', icon: Flower2, path: '/restore' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FAF3EC] border-t border-[#E8E0D5] safe-area-pb">
      <div className="max-w-md mx-auto flex justify-around items-center px-4 py-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 min-w-[60px]"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-[#C0392B]' : 'text-[#8A7560]'
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-[#C0392B]' : 'text-[#8A7560]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}