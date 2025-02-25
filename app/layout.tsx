import type { Metadata } from "next";
import { Playwrite_DE_Grund } from "next/font/google"; // Ensure this font is available
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const playwrite = Playwrite_DE_Grund({
  variable: "--font-playwrite-de-grund",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${playwrite.variable}`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
