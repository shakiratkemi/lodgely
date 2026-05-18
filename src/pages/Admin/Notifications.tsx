import { useEffect, useState } from "react";
import {
  Bell,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  Info,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { adminService } from "../../services/admin.service";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await adminService.getNotifications();
      // Adjust based on your API response structure
      const data = res.data || res;
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
      toast.error("Could not load system alerts");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await adminService.markAsRead(id);
      // Optimistic update: update local state so UI reacts instantly
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      toast.success("Marked as read");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "user":
        return <UserPlus className="text-blue-500" size={20} />;
      case "warning":
        return <AlertTriangle className="text-amber-500" size={20} />;
      case "success":
        return <CheckCircle2 className="text-emerald-500" size={20} />;
      default:
        return <Info className="text-slate-500" size={20} />;
    }
  };
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 mb-4" />
        <span className="font-black italic uppercase">
          Loading System Alerts...
        </span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">
            System Alerts
          </h1>
          <p className="text-slate-500 font-medium italic">
            Real-time platform updates.
          </p>
        </div>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={() => toast.success("Marking all as read...")}
            className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline"
          >
            Mark all as read
          </button>
        )}
      </header>

      <div className="space-y-4">
        {notifications.map((alert) => (
          <div
            key={alert.id}
            className={`group relative flex items-start gap-5 p-6 rounded-4xl border transition-all duration-300 ${
              alert.isRead
                ? "bg-white/50 border-slate-100 opacity-70"
                : "bg-white border-white shadow-xl shadow-slate-200/50 scale-[1.02]"
            }`}
          >
            {/* Unread Indicator */}
            {!alert.isRead && (
              <div className="absolute top-6 right-6 h-2 w-2 bg-brand-primary rounded-full animate-pulse" />
            )}

            <div
              className={`p-4 rounded-2xl ${alert.isRead ? "bg-slate-100" : "bg-slate-50 group-hover:bg-white"}`}
            >
              {getIcon(alert.type || "info")}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="font-black text-slate-900 uppercase italic tracking-tight text-sm">
                  {alert.title}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {new Date(alert.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {alert.message}
              </p>

              <div className="flex gap-4 pt-3">
                <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:gap-2 transition-all">
                  View Details <ExternalLink size={12} />
                </button>
                {!alert.isRead && (
                 <button 
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900"
                  >
                    Dismiss
                  </button>
                )}
              </div>
            </div>

            {/* Delete Button (Visible on Hover) */}
            <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <Bell className="mx-auto text-slate-300 mb-4 opacity-20" size={64} />
          <p className="text-slate-400 font-black italic uppercase">
            Your inbox is clear.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
