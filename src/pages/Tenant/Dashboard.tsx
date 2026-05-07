import { useEffect, useState } from "react";
import { Wallet, Home, Calendar } from "lucide-react";
import { getMyLeases, getMySchedules } from "../../services/tenant.service";
import { useNavigate } from "react-router";
import type { IRentSchedule } from "../../interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TenantDashboard = () => {
  const navigate = useNavigate();
  const [lease, setLease] = useState<any>(null);

  const [schedules, setSchedules] = useState<IRentSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(num);
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [leaseRes, scheduleRes] = await Promise.all([
          getMyLeases(),
          getMySchedules(),
        ]);

        setLease(leaseRes.data[0]);
        setSchedules(scheduleRes.data || []);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const totalBalance = schedules
    .filter((s) => s.status !== "Paid")
    .reduce((acc, curr) => acc + curr.balanceDue, 0);

  const nextSchedule = schedules.find(
    (s) => s.status === "Pending" || s.status === "Overdue",
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 h-[60vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 mb-4" />
        <span className="font-bold">Loading your dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-black text-brand-dark">Welcome back!</h1>
        <p className="text-slate-500">
          Manage your rent and track your lease status.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Home size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Current Property
              </p>
              <p className="font-bold text-brand-dark truncate w-40">
                {lease ? lease.propertyTitle : "No Active Lease"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-amber-400">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Outstanding Balance
              </p>
              <p className="font-bold text-brand-dark text-xl">
                {formatCurrency(totalBalance)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Next Due Date
              </p>
              <p className="font-bold text-brand-dark">
                {nextSchedule
                  ? new Date(nextSchedule.dueDate).toLocaleDateString()
                  : "No Pending Dues"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lease Summary */}
        <section className="bg-white rounded-3xl p-6 border border-slate-100">
          <h2 className="font-black text-brand-dark mb-4">Lease Details</h2>
          {lease ? (
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Duration</span>
                <span className="font-medium">
                  {new Date(lease.startDate).toLocaleDateString()} -{" "}
                  {new Date(lease.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Monthly Rent</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(lease.rentAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                    lease.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {lease.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-400 italic mb-4">
                You don't have an active lease yet.
              </p>
              <button
                onClick={() => navigate("/tenant/properties")}
                className="text-brand-primary font-bold hover:underline"
              >
                Browse available properties →
              </button>
            </div>
          )}
        </section>

        {/* Quick Payment Link */}
        <section className="bg-brand-dark rounded-3xl p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-black mb-2">Ready to pay rent?</h2>
            <p className="text-slate-300 text-sm">
              Pay your monthly dues quickly via Paystack or bank transfer.
            </p>
          </div>
          <button
            onClick={() => navigate("/tenant/payments")}
            className="mt-6 w-full bg-brand-primary text-white font-black py-4 rounded-2xl hover:bg-white hover:text-brand-dark transition-all"
          >
            Go to Payments
          </button>
        </section>
      </div>
    </div>
  );
};

export default TenantDashboard;
