import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
     primary:"hsl(39, 100%, 47%)",
     error:"hsl(11, 80%, 60%)"
    },
  },
  plugins: [],
}
export default config
