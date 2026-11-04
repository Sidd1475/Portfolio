import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import CommandPalette from "@/components/navigation/CommandPalette";

export const metadata = {
  metadataBase: new URL('https://siddharth-mishra.dev'),
  title: siteConfig.title,
  description: siteConfig.subheadline,
  keywords: [
    "Siddharth Mishra",
    "AI Engineer",
    "Generative AI",
    "Agentic AI",
    "LangGraph",
    "LangChain",
    "RAG",
    "FastAPI",
    "Machine Learning",
    "MAIT Delhi"
  ],
  authors: [{ name: "Siddharth Mishra", url: siteConfig.github }],
  creator: "Siddharth Mishra",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.subheadline,
    url: "https://siddharth-mishra.dev",
    siteName: "Siddharth Mishra Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.subheadline,
    creator: "@Sidd1475",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-zinc-100 min-h-screen selection:bg-indigo-500/30 selection:text-cyan-200">
        {/* Subtle architectural ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-radial from-indigo-900/20 via-purple-900/10 to-transparent blur-[120px] opacity-70" />
          <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-gradient-radial from-cyan-900/15 via-blue-900/5 to-transparent blur-[140px] opacity-50" />
          <div className="absolute bottom-[10%] right-[5%] w-[700px] h-[700px] bg-gradient-radial from-violet-900/15 via-indigo-950/10 to-transparent blur-[160px] opacity-60" />
          <div className="absolute inset-0 bg-grain opacity-25" />
        </div>

        <Navbar />
        <CommandPalette />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
