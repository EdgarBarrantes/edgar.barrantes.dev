export const animations = {
  fadeIn: "animate-[fade-in_0.3s_ease-in-out]",
  slideUp: "animate-[slide-up_0.3s_ease-in-out]",
  scaleUp: "animate-[scale-up_0.3s_ease-in-out]",
};

// Add to tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
}; 