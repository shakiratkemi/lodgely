import { useEffect, useState } from "react";
import { adminService } from "../../services/admin.service";
import { Home, MapPin, CheckCircle, XCircle, Eye, Clock } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast"; 

const PropertyQueue = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from your service
  const fetchQueue = async () => {
    try {
      setLoading(true);
      const res = await adminService.getPendingProperties();
      // Handle different API response shapes (some return .data, some return the array)
      const data = res.data || res;
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load property queue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  // 2. Handle Approve/Reject
  const handleAction = async (id: string, action: "approve" | "reject") => {
    try {
      if (action === "approve") {
        await adminService.approveProperty(id);
        toast.success("Property approved and published!");
      } else {
        const reason = prompt("Enter reason for rejection:"); // Simple beginner way to get input
        if (!reason) return;
        await adminService.rejectProperty(id, reason);
        toast.error("Property rejected");
      }

      // Refresh the list to remove the processed property
      fetchQueue();
    } catch (err) {
      toast.error("Action failed. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-brand-primary">
        <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 mb-4" />
        <span className="font-black italic uppercase">
          Fetching Pending Listings...
        </span>
      </div>
    );

  return (
    <div className="space-y-8 animate-fade-up">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">
            Property Queue
          </h1>
          <p className="text-slate-500 font-medium italic">
            Verify submissions before they go live.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-100 px-6 py-3 rounded-2xl flex items-center gap-3">
          <Clock className="text-amber-500" size={20} />
          <span className="text-amber-700 font-black text-sm uppercase">
            {properties.length} Pending
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            {/* Image section using property data */}
            <div className="relative h-48 bg-slate-100">
              <img
                src={
                  prop.images?.[0] ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                className="w-full h-full object-cover"
                alt="property"
              />
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 truncate uppercase italic">
                  {prop.title}
                </h3>
                <div className="flex items-center gap-1 text-slate-400">
                  <MapPin size={14} />
                  <span className="text-xs font-bold truncate">
                    {prop.address}
                  </span>
                </div>
              </div>

              {/* Action Buttons connected to your service */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleAction(prop.id, "approve")}
                  className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                >
                  <CheckCircle size={14} /> Approve
                </button>
                <button
                  onClick={() => handleAction(prop.id, "reject")}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-500 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                >
                  <XCircle size={14} /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <Home className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="text-slate-400 font-black italic uppercase">
            No pending properties to review
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyQueue;
