import { useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../../services/landlord.service";
import {
  Bell,
  CheckCircle2,
  Info,
  MailOpen,
  Inbox,
  Circle,
  CreditCard,
  FileText,
  UserPlus,
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LandlordNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await getMyNotifications();
      // Ensure we target the correct data array from your API envelope
      setNotifications(res.data || res);
    } catch (err) {
      console.error("Error loading landlord notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleRead = async (id: string) => {
    try {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      await markNotificationAsRead(id);
    } catch (err) {
      console.error("Failed to mark as read", err);
      fetchNotes();
    }
  };

  // Helper to render icons based on Landlord-specific event types
  const getIcon = (type: string, isRead: boolean) => {
    const iconClass = isRead ? "text-slate-400" : "text-brand-primary";
    switch (type?.toLowerCase()) {
      case "payment":
        return <CreditCard size={20} className={iconClass} />;
      case "leaserequest":
        return <UserPlus size={20} className={iconClass} />;
      case "propertyapproval":
        return <CheckCircle2 size={20} className={iconClass} />;
      default:
        return <FileText size={20} className={iconClass} />;
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 mb-4" />
        <span className="font-bold tracking-tighter">
          Loading all Notifications...
        </span>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-brand-dark italic tracking-tight">
            Activity Logs
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Monitor your property performance and tenant actions.
          </p>
        </div>
        <div className="bg-brand-primary/10 px-4 py-2 rounded-full hidden sm:block">
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">
            {notifications.filter((n) => !n.isRead).length} New Actions
          </span>
        </div>
      </header>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div
              key={note.id}
              className={`relative p-6 rounded-[2.5rem] border transition-all flex gap-5 items-start ${
                note.isRead
                  ? "bg-slate-50/50 border-slate-100 opacity-60"
                  : "bg-white border-brand-primary/20 shadow-xl shadow-brand-primary/5"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`p-4 rounded-2xl ${
                  note.isRead ? "bg-slate-100" : "bg-brand-primary/10"
                }`}
              >
                {getIcon(note.type, note.isRead)}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`font-black text-brand-dark ${
                        !note.isRead ? "text-base" : "text-sm"
                      }`}
                    >
                      {note.title}
                    </h3>
                    {/* Badge for specific types */}
                    {!note.isRead && note.type === "Payment" && (
                      <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Revenue
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed pr-8">
                  {note.message}
                </p>

                {!note.isRead && (
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => handleRead(note.id)}
                      className="text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center gap-2 hover:text-brand-dark transition-colors"
                    >
                      <MailOpen size={14} /> Mark as Processed
                    </button>
                    <Circle
                      className="text-brand-primary fill-brand-primary animate-pulse"
                      size={6}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Inbox className="text-slate-200" size={32} />
            </div>
            <p className="text-slate-400 font-bold italic text-sm">
              No recent activity found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandlordNotifications;
