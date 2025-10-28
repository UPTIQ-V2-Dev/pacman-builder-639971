import { Button } from './button';
import { cn } from '../../lib/utils';

interface MenuButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

export const MenuButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  disabled = false 
}: MenuButtonProps) => {
  const baseClasses = "w-full max-w-xs py-4 px-8 text-lg font-bold transition-all duration-200 transform hover:scale-105";
  
  const variantClasses = {
    primary: "bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-yellow-600 shadow-lg",
    secondary: "bg-blue-600 hover:bg-blue-500 text-white border-4 border-blue-800 shadow-lg"
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        className
      )}
    >
      {children}
    </Button>
  );
};