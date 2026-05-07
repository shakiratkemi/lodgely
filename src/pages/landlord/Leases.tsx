import { useEffect, useState } from "react";
import { getActiveLeases } from "../../services/landlord.service";
import { FileText, Calendar, User, ArrowRight } from "lucide-react";

const LandlordLeases = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const res = await getActiveLeases();
        setLeases(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeases();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-dark">Active Leases</h1>
        <p className="text-slate-500 text-sm">
          Managing your current rental agreements.
        </p>
      </div>

      <div className="grid gap-4">
        {leases.map((lease: any) => (
          <div
            key={lease.id}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-brand-dark">
                  {lease.propertyTitle}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {lease.tenantName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(lease.startDate).toLocaleDateString()} -{" "}
                    {new Date(lease.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-400 font-medium">Monthly Rent</p>
              <p className="font-black text-brand-dark text-lg">
                ₦{lease.rentAmount.toLocaleString()}
              </p>
            </div>

            <button className="ml-4 p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-brand-primary transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandlordLeases;
