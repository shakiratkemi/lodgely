import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  Bell,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/admin", icon: <LayoutDashboard size={20} /> },
    {
      name: "Property Queue",
      path: "/admin/properties",
      icon: <ShieldCheck size={20} />,
    },
    {
      name: "User Management",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
    {
      name: "System Alerts",
      path: "/admin/notifications",
      icon: <Bell size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:flex w-72 bg-slate-900 flex-col sticky top-0 h-screen transition-all">
        <div className="p-8">
          <div className="flex items-center gap-3 text-white mb-10">
            <div className="bg-brand-primary p-2 rounded-lg">
              <Settings size={24} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter italic">
              ADMIN
            </span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                    isActive
                      ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span
                    className={`${isActive ? "text-white" : "group-hover:text-white"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-bold text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors font-bold text-sm w-full"
          >
            <LogOut size={20} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-900 uppercase">
                System Administrator
              </p>
              <p className="text-[10px] text-brand-primary font-bold">
                Root Access
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs border-2 border-slate-200">
              AD
            </div>
          </div>
        </header>

        <main className="p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay (Optional implementation) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full bg-slate-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile nav links go here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
