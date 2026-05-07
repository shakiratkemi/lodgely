import { useEffect, useState } from "react";
import { getMyLeases } from "../../services/tenant.service";
import { FileText, MapPin, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TenantLeases = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const res = await getMyLeases();
        setLeases(res.data || res || []);
      } catch (err) {
        console.error("Error fetching leases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeases();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 h-[60vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 mb-4" />
        <span className="font-bold">Loading your leases...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-black text-brand-dark">My Leases</h1>
        <p className="text-slate-500">
          View and manage your active and past lease agreements.
        </p>
      </header>

      {leases.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-slate-200">
          <FileText className="mx-auto mb-4 text-slate-300" size={48} />
          <p className="text-slate-500 font-medium">
            You don't have any lease records yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {leases.map((lease: any) => (
            <div
              key={lease.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">
                    {lease.propertyTitle || "Property Lease"}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <Calendar size={12} />
                      {new Date(lease.startDate).toLocaleDateString()} -{" "}
                      {new Date(lease.endDate).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        lease.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {lease.status}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to={`/tenant/lease/${lease.id}`}
                className="flex items-center gap-2 text-sm font-bold text-brand-primary hover:gap-3 transition-all"
              >
                View Payments & Terms <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantLeases;
