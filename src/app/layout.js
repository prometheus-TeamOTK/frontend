import { Inter } from "next/font/google";
import "./globals.css";
import styles from './page.module.css'
import useMediaQuery from "react-responsive";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.main_container}>{children}</body>
    </html>
  );
}


