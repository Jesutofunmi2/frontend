import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: 'hsl(39, 100%, 47%)',
      error: 'hsl(11, 80%, 60%)',
      white: '#ffff',
      black: '#2C2C2C',
      secondary: '#FFBA19',
      brown: '#88361E',
      'brown-500': 'hsl(13.2deg 50% 19.61%)',
      'gray-100': '#F9F8F4',
      'gray-200': '#9E9E9E',
      'gray-300': '#f5f5f5',
      yellow: 'hsl(38, 94%, 49%);',
    },
    screens: {
      sm: '360px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },

  plugins: [],
}
export default config
