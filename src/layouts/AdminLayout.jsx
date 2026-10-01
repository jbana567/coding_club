import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminTopbar from '../components/AdminTopbar';
import AdminSidebar from '../components/AdminSidebar';
import SystemChatbot from '../components/SystemChatbot';

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-bg text-text font-sans">
      <AdminTopbar onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)} />
      <AdminSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <main className="pt-16 md:pl-64 min-h-screen transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      <SystemChatbot />
    </div>
  );
}
