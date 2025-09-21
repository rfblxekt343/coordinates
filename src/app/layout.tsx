
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "../components/PageTransitions";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ReduxProvider from "../components/ReduxProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "לומדת מדקו",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReduxProvider>
          <PageTransition>{children}</PageTransition>
        </ReduxProvider>
      </body>
    </html>
  );
}
