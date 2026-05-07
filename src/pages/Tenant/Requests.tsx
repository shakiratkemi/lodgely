import { useEffect, useState } from "react";
import { getMyRequests } from "../../services/tenant.service";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Home,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TenantRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getMyRequests();
        setRequests(res.data || []);
      } catch (err) {
        console.error("Failed to load requests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 size={16} />;
      case "Rejected":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center gap-2 h-[60vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 mb-4" />
        <span className="font-bold">Loading your requests...</span>
      </div>
    );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-black text-brand-dark">
          My Lease Requests
        </h1>
        <p className="text-slate-500">
          Track the status of your property applications.
        </p>
      </header>

      {requests.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-slate-200">
          <Home className="mx-auto mb-4 text-slate-300" size={48} />
          <p className="text-slate-500 font-medium">
            You haven't applied for any properties yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {requests.map((req: any) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden hidden sm:block">
                  <img
                    src={req.propertyImageUrl || "https://placehold.co/100"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">
                    {req.propertyTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                    <MapPin size={14} />{" "}
                    {req.propertyLocation || "Location N/A"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-3">
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase flex items-center gap-2 border ${getStatusStyle(req.status)}`}
                >
                  {getStatusIcon(req.status)}
                  {req.status}
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                  <MessageSquare size={14} />"{req.message?.substring(0, 40)}
                  ..."
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantRequests;
