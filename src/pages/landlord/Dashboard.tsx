import type { ILandlordProps } from "../../interfaces";
import { useEffect, useState } from "react";
import { getLandlordDashboard } from "../../services/landlord.service";
import { ValueCard } from "../../components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Building2,
  Users,
  Home,
  Clock,
  Wallet,
  AlertCircle,
} from "lucide-react";

const LandlordDashboard = () => {
  const [data, setData] = useState<ILandlordProps | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getLandlordDashboard();
      setData(res);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center gap-2 items-center h-[60vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 mb-4" />
        <span className="font-bold">Loading your dashboard...</span>
      </div>
    );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-brand-dark">
          Dashboard Overview
        </h1>
        <p className="text-slate-500">
          Welcome back! Here is what's happening with your properties.
        </p>
      </div>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand-secondary mb-4">
          Property Portfolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueCard
            title="Total Properties"
            value={data?.totalProperties ?? 0}
            icon={<Building2 size={20} className="text-blue-600" />}
          />
          <ValueCard
            title="Occupied"
            value={data?.occupiedProperties ?? 0}
            icon={<Users size={20} className="text-green-600" />}
          />
          <ValueCard
            title="Vacant"
            value={data?.vacantProperties ?? 0}
            icon={<Home size={20} className="text-amber-600" />}
          />
          <ValueCard
            title="Pending Approval"
            value={data?.pendingApprovalProperties ?? 0}
            icon={<Clock size={20} className="text-purple-600" />}
          />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand-secondary mb-4">
          Financial Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-slate-500">
              <Wallet size={18} />
              <span className="text-sm font-medium">Total Rent Collected</span>
            </div>
            <p className="text-2xl font-black text-brand-dark">
              {formatCurrency(data?.totalRentCollected ?? 0)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-slate-500">
              <AlertCircle size={18} className="text-red-500" />
              <span className="text-sm font-medium">Overdue Payments</span>
            </div>
            <p className="text-2xl font-black text-red-600">
              {data?.overduePaymentsCount ?? 0}
            </p>
          </div>

          <div className="bg-brand-white p-6 rounded-2xl border border-red-100 shadow-sm ">
            <div className="flex items-center gap-3 mb-2 text-red-600">
              <span className="text-sm font-bold">Total Overdue Amount</span>
            </div>
            <p className="text-2xl font-black text-red-700">
              {formatCurrency(data?.overdueAmount ?? 0)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandlordDashboard;
