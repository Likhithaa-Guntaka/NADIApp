import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { ChevronRight, User, Bell, HelpCircle, Shield, FileText, LogOut } from 'lucide-react';

export function Profile() {
  const menuItems = [
    { icon: User, label: 'Account Settings', sublabel: 'Personal information' },
    { icon: Bell, label: 'Notifications', sublabel: 'Manage your alerts' },
    { icon: HelpCircle, label: 'Help & Support', sublabel: 'FAQ and contact' },
    { icon: Shield, label: 'Privacy & Safety', sublabel: '72-hour protocol' },
    { icon: FileText, label: 'About NADI', sublabel: 'How the system works' },
  ];

  return (
    <div className="min-h-screen bg-[#F5EFE8] px-6 py-8 pb-28">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <h1
          className="text-3xl text-[#3D1A0E] mb-8"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
        >
          Profile
        </h1>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#FAF3EC] rounded-2xl p-6 mb-6 border border-[#E8E0D5]"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A847] to-[#C0392B] flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2
                className="text-xl text-[#3D1A0E] mb-1"
                style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
              >
                Welcome
              </h2>
              <p
                className="text-sm text-[#8A7560]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                user@example.com
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E8E0D5]">
            <div>
              <p
                className="text-2xl text-[#3D1A0E] mb-1"
                style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
              >
                28
              </p>
              <p
                className="text-xs text-[#8A7560]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Days Active
              </p>
            </div>
            <div>
              <p
                className="text-2xl text-[#3D1A0E] mb-1"
                style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
              >
                142
              </p>
              <p
                className="text-xs text-[#8A7560]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Captures
              </p>
            </div>
            <div>
              <p
                className="text-2xl text-[#3D1A0E] mb-1"
                style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
              >
                18
              </p>
              <p
                className="text-xs text-[#8A7560]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Restores
              </p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="w-full bg-[#FAF3EC] rounded-xl p-4 border border-[#E8E0D5] flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C0392B]" />
                </div>
                <div className="flex-1 text-left">
                  <p
                    className="text-[#3D1A0E] mb-0.5"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-xs text-[#8A7560]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.sublabel}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#8A7560]" />
              </motion.button>
            );
          })}
        </div>

        {/* Sign Out */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full py-4 px-6 bg-white text-[#C0392B] rounded-2xl border border-[#C0392B] flex items-center justify-center gap-2 hover:bg-[#FFF5F5] transition-colors"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
