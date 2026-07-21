import Sidebar from '@/components/Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-moon-glow">
      <Sidebar />
      <main className="flex-1 min-w-0 px-4 py-6 md:px-10 md:py-10 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
