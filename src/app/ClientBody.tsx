"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}
