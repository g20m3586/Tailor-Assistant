import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TailorPro - Digital Measurement System',
  description: 'Digital solution for tailoring measurements',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Load Tailwind from Play CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <div className="min-h-screen flex">
          <aside className="sidebar hidden md:block">
            <Sidebar />
          </aside>

          <div className="flex-1 flex flex-col">
            <header className="header w-full bg-white/60 backdrop-blur-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-xl font-semibold">TailorPro</div>
                  <div className="text-sm text-slate-500">Digital Measurement System</div>
                </div>
                <div className="flex items-center gap-3">
                  <input aria-label="Search" className="hidden sm:inline-block px-3 py-2 rounded-md border bg-white" placeholder="Search..." />
                  <button className="px-3 py-2 rounded-md bg-white border">Profile</button>
                </div>
              </div>
            </header>

            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                <div className="app-card p-6">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}