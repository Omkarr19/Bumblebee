import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BlindSpot AI — Decision Reasoning Assistant',
  description: 'Uncover assumptions, overlooked factors, and internal conflicts in your reasoning — without deciding for you.',
  keywords: ['decision making', 'critical thinking', 'blind spots', 'reasoning audit', 'AI thinking partner'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-full bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
