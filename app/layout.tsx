import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import localFont from "next/font/local"
// import { ReduxProvider } from "@/Providers/reduxProvider";
// import { ToastProvider } from "@/Providers/ToastProvider";
// import octarine from "../public/assets/fonts/Octarine-Light.ttf"

const font = localFont({src: "../public/assets/fonts/Octarine-Light.ttf"})

const josefin_Sans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-Josefin_Sans",
  weight: ["300", "400"],
});

export const metadata = {
  title: "Izesan!",
  description: "Learn African Languages",
  keywords: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="modal-root" className={font.className}>
        {/* <ToastProvider> */}
          {/* <ReduxProvider> */}
          {children} 
            {/*
            </ReduxProvider> */}
        {/* </ToastProvider> */}
      </body>
    </html>
  );
}
