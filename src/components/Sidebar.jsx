import { LayoutDashboard, Users, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'customers', label: 'Customers', icon: Users },
];

function Sidebar({ currentPage, setCurrentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
          OQ
        </div>
        <span className="text-white font-semibold text-lg tracking-tight">
          Oquilix CRM
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = currentPage === id;
          return (
            <button
              key={id}
              onClick={() => {
                setCurrentPage(id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-slate-700">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <Settings size={18} />
          Settings
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-slate-900 flex items-center px-4 py-3 border-b border-slate-700">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-slate-300 hover:text-white"
        >
          <Menu size={22} />
        </button>
        <span className="ml-3 text-white font-semibold text-base">Oquilix CRM</span>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 z-50 bg-slate-900 transform transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-slate-900 shrink-0">
        <NavContent />
      </aside>
    </>
  );
}

export default Sidebar;
