import { useEffect, useRef } from 'react';

const useMagneticCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position relative to center of card
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate distance from center (normalized to -1 to 1)
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;

      // Apply transform with easing
      card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${-moveY * 0.5}deg) rotateY(${moveX * 0.5}deg)`;
      
      // Add glow effect
      const glow = card.querySelector('.card-glow') as HTMLElement;
      if (glow) {
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(6, 182, 212, 0.15), transparent 50%)`;
      }
    };

    const handleMouseLeave = () => {
      card.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
      const glow = card.querySelector('.card-glow') as HTMLElement;
      if (glow) {
        glow.style.background = 'transparent';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return cardRef;
};

export default useMagneticCard;
