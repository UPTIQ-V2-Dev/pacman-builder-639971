import { useEffect, useRef } from 'react';
import type { Direction } from '../types/game';

interface UseKeyboardProps {
  onDirectionChange: (direction: Direction) => void;
  onPause: () => void;
  isGameActive: boolean;
}

export const useKeyboard = ({ onDirectionChange, onPause, isGameActive }: UseKeyboardProps) => {
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGameActive) return;

      const key = event.code;
      keysPressed.current.add(key);

      switch (key) {
        case 'ArrowUp':
        case 'KeyW':
          event.preventDefault();
          onDirectionChange('UP');
          break;
        case 'ArrowDown':
        case 'KeyS':
          event.preventDefault();
          onDirectionChange('DOWN');
          break;
        case 'ArrowLeft':
        case 'KeyA':
          event.preventDefault();
          onDirectionChange('LEFT');
          break;
        case 'ArrowRight':
        case 'KeyD':
          event.preventDefault();
          onDirectionChange('RIGHT');
          break;
        case 'Space':
          event.preventDefault();
          onPause();
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      keysPressed.current.clear();
    };
  }, [onDirectionChange, onPause, isGameActive]);

  return keysPressed.current;
};