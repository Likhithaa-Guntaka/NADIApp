import { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8E0D5]">
      <div className="w-full max-w-md min-h-screen bg-[#F5EFE8] relative shadow-2xl">
        {children}
      </div>
    </div>
  );
}
