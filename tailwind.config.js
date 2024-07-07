/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': {
        'main': '#3A4874',
        'brighter': '#667299'
      },
      'secondary': '#91CA62',
      'accent': '#478077',
      'neutral': {
        1: '#FAFFF5',
        2: '#d4d9d0',
        3: '#AEB3AB',
        4: '#898C87',
        5: '#dfe6dc',
        '2-brighter': '#dae0d7'
      },
      'success': '#7bc93c',
      'failure': '#c93c3c'
    },
    animation: {
      'open-nav-drawer': 'openNavDrawer 0.3s ease-out 0s 1 normal forwards',
      'close-nav-drawer': 'closeNavDrawer 0.3s ease-out 0s 1 normal forwards',
      'show-darkening-area': 'showDarkeningArea 0.3s ease-out 0s 1 normal forwards',
      'hide-darkening-area': 'hideDarkeningArea 0.3s ease-out 0s 1 normal forwards',
      'slide-down': 'slideDown 0.5s ease-out 0s 1 normal forwards',
      'open-select': 'openSelect 0.3s ease-out 0s 1 normal forwards',
      'close-select': 'closeSelect 0.3s ease-out 0s 1 normal forwards',
      'flip-select-arrow': 'flipSelectArrow 0.2s ease-out 0s 1 normal forwards',
      'flip-select-arrow-back': 'flipSelectArrowBack 0.2s ease-out 0s 1 normal forwards',
      'show-completion-menu': 'showCompletionMenu 0.3s ease-out 0s 1 normal forwards',
    },
    extend: {
      keyframes: {
        'openNavDrawer': {
          '0%': {
            transform: 'translate(-100%)'
          },
          '100%': {
            transform: 'translate(0%)'
          }
        },
        'closeNavDrawer': {
          '100%': {
            transform: 'translate(-100%)',
            display: 'none'
          }
        },
        'showDarkeningArea': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'hideDarkeningArea': {
          '100%': {
            opacity: '0',
            display: 'none'
          }
        },
        'slideDown': {
          '0%': {
            transform: 'translateY(-5rem)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        'openSelect': {
          '0%': {
            transform: 'scaleY(0%)'
          },
          '100%': {
            transform: 'scaleY(100%)'
          }
        },
        'closeSelect': {
          '100%': {
            transform: 'scaleY(0%)'
          }
        },
        'flipSelectArrow': {
          '100%': {
            transform: 'rotate(180deg)'
          }
        },
        'flipSelectArrowBack': {
          '0%': {
            transform: 'rotate(180deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        },
        'showCompletionMenu': {
          '0%': {
            transform: 'scale(0%)'
          },
          '100%': {
            transform: 'scale(100%)'
          }
        }
      }
    },
  },
  plugins: [],
}

