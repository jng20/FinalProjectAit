/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        'lofi': {
          'primary' : '#00e2e6',
           'primary-focus' : '#737373',
           'primary-content' : '#f2f2f3',

           "secondary": "#fff3d6",
          
 "accent": "#00e1b8",
          
 "neutral": "#000604",
          
 "base-100": 'white',
          
 "info":  "#e5fff2",
          
 "success": "#00ffd0",
          
 "warning": "#ff8f00",
          
 "error": "#db2846",

          '--rounded-box': '0',          
          '--rounded-btn': '0',        
          '--rounded-badge': '0',      

          '--animation-btn': '0',       
          '--animation-input': '0',       

          '--btn-text-case': 'uppercase',   
          '--navbar-padding': '.5rem',      
          '--border-btn': '1px',            
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
