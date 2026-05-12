import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  FileText,
  CreditCard,
  LogOut,
  User,
  Bell,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { getMyNotifications } from "../services/landlord.service";

const LandlordLayout = () => {
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

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

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
    {
      name: "Dashboard",
      path: "/landlord",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Properties",
      path: "/landlord/properties",
      icon: <Building2 size={20} />,
    },
    {
      name: "Lease Requests",
      path: "/landlord/leaserequest",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Active Leases",
      path: "/landlord/leases",
      icon: <FileText size={20} />,
    },
    {
      name: "Payment Confirmations",
      path: "/landlord/payments",
      icon: <CreditCard size={20} />,
    },
    {
      name: "Notifications",
      path: "/landlord/notifications",
      icon: <Bell size={20} />,
      isNotify: true,
    },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-brand-dark text-white p-6 ">
        <h2 className="text-2xl font-bold mb-10">Landlord</h2>
        <div className="flex flex-col justify-between gap-28">
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

      <main className="flex-1 p-8 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default LandlordLayout;
