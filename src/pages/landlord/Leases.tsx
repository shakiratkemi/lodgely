import { useEffect, useState } from "react";
import { getActiveLeases } from "../../services/landlord.service";
import {
  FileText,
  Calendar,
  User,
  ArrowRight,
  MessageSquareDashed,
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router";

const LandlordLeases = () => {
  const navigate = useNavigate();
  const [leases, setLeases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const res = await getActiveLeases();
        const actualLeases = res?.data?.data || res?.data || res || [];
        setLeases(Array.isArray(actualLeases) ? actualLeases : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeases();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center gap-2 h-[50vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 mb-4" />
        <span className="font-bold">Loading active leases...</span>
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-dark">Active Leases</h1>
        <p className="text-slate-500 text-sm">
          Managing your current rental agreements.
        </p>
      </div>
      {leases.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-slate-100 shadow-sm">
          <MessageSquareDashed
            size={48}
            className="mx-auto text-slate-200 mb-4"
          />
          <p className="text-slate-500 font-medium">
            No active leases found in your portfolio.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {leases.map((lease: any) => {
            const displayTitle =
              lease.propertyTitle || lease.PropertyTitle || "Unknown Property";
            const displayTenant =
              lease.tenantName || lease.TenantName || "Unknown Tenant";
            const displayRent = lease.rentAmount ?? lease.RentAmount ?? 0;
            const leaseId =
              lease.id ||
              lease._id ||
              lease.leaseId ||
              lease.LeaseId ||
              "unknown-id";

            return (
              <div
                key={leaseId}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark">
                      {displayTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {displayTenant}
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
                  <p className="text-sm text-slate-400 font-medium">
                    Monthly Rent
                  </p>
                  <p className="font-black text-brand-dark text-lg">
                    ₦{displayRent.toLocaleString()}
                  </p>
                </div>

                <Link
                  to={`/landlord/leases/${leaseId}`}
                  className="ml-4 p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-brand-primary transition-all"
                >
                  <ArrowRight size={20} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LandlordLeases;
