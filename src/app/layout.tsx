import type { Metadata } from "next";
import { Inter, Raleway, Sen } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "./components/SmoothScrolling";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Marc-André Deschamps - Web Developer",
  description: "Discover the dynamic web portfolio of Marc-André Deschamps, showcasing his expertise in web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <SmoothScrolling>
        <body className={raleway.className}>{children}</body>
      </SmoothScrolling>
    </html>
  );
}
