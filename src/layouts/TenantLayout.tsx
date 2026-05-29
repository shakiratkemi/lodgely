import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Search,
  Send,
  FileText,
  Wallet,
  Bell,
  LogOut,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { getMyNotifications } from "../services/tenant.service";
const TenantLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const checkUnreadNotifications = async () => {
    try {
      const res = await getMyNotifications();
      const list = res.data || res;
      const unreadOnly = list.filter((note: any) => note.isRead === false);

      setUnreadCount(unreadOnly.length);
    } catch (err) {
      console.error("Could not fetch notification count", err);
    }
  };

  useEffect(() => {
    checkUnreadNotifications();
  }, [pathname]);

  const getUser = ()=> {
    try {
      const userString = localStorage.getItem("user");
      if (!userString || userString === "undefined" || userString === "null") {
        return null;
      }
      return JSON.parse(userString);
    } catch (err) {
      console.error("Could not parse user data", err);
      return null;
    }

  };
  const user = getUser();

  const getInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/tenant", icon: <LayoutDashboard size={20} /> },
    {
      name: "Browse Properties",
      path: "/tenant/properties",
      icon: <Search size={20} />,
    },
    { name: "My Requests", path: "/tenant/requests", icon: <Send size={20} /> },
    { name: "My Lease", path: "/tenant/leases", icon: <FileText size={20} /> },
    {
      name: "Rent & Payments",
      path: "/tenant/payments",
      icon: <Wallet size={20} />,
    },
    {
      name: "Notifications",
      path: "/tenant/notifications",
      icon: <Bell size={20} />,
      isNotify: true,
    },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-brand-dark text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-10">Tenant</h2>

        <div className="flex flex-col justify-between gap-28 h-full">
          <nav className="space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const isNotify = item.name === "Notifications";
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3.5 rounded-xl font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span
                    className={`${isActive ? "text-white" : "group-hover:text-brand-primary"} transition-colors`}
                  >
                    {item.icon}

                    {isNotify && unreadCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-brand-dark">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-primary font-bold">
                {getInitials()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 bg-slate-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default TenantLayout;
