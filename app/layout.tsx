import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "দৈনন্দিন বাজারের সব পণ্যের হালনাগাদ দর জানুন এক ক্লিকেই।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body className="min-h-screen bg-[#fafcfa] text-[#1d271f] font-hind antialiased flex flex-col">
        <AuthProvider>
          <Toaster position="top-right" />
          <Navbar />
          <div className="flex-1">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
