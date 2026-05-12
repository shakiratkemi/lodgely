import { useEffect, useState } from "react";
import { adminService } from "../../services/admin.service";
import {
  Users,
  Home,
  Wallet,
  Clock,
  UserCheck,
  TrendingUp,
  AlertCircle,
  Briefcase,
  MoreVertical,
  ShieldCheck,
  User,
  ExternalLink,
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getDashboard();
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-brand-primary">
        <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 mb-4" />
        <span className="font-black italic">FETCHING SYSTEM DATA...</span>
      </div>
    );

  const statCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers,
      icon: <Users />,
      color: "bg-blue-500",
      text: "text-blue-600",
    },
    {
      label: "Landlords",
      value: stats?.totalLandlords,
      icon: <Briefcase />,
      color: "bg-purple-500",
      text: "text-purple-600",
    },
    {
      label: "Tenants",
      value: stats?.totalTenants,
      icon: <UserCheck />,
      color: "bg-orange-500",
      text: "text-orange-600",
    },
    {
      label: "Total Revenue",
      value: `₦${stats?.totalRevenue?.toLocaleString()}`,
      icon: <Wallet />,
      color: "bg-emerald-500",
      text: "text-emerald-600",
    },
    {
      label: "Live Properties",
      value: stats?.totalProperties,
      icon: <Home />,
      color: "bg-indigo-500",
      text: "text-indigo-600",
    },
    {
      label: "Pending Approvals",
      value: stats?.pendingApprovals,
      icon: <Clock />,
      color: "bg-amber-500",
      text: "text-amber-600",
    },
    {
      label: "Active Leases",
      value: stats?.activeLeases,
      icon: <TrendingUp />,
      color: "bg-cyan-500",
      text: "text-cyan-600",
    },
    {
      label: "Overdue Payments",
      value: stats?.overduePayments,
      icon: <AlertCircle />,
      color: "bg-red-500",
      text: "text-red-600",
    },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter">
          SYSTEM OVERVIEW
        </h1>
        <p className="text-slate-500 font-medium">
          Real-time platform performance and management metrics.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 animate-fade-up opacity-0"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-2xl text-white`}>
                {card.icon}
              </div>
              <span className={`text-2xl font-black ${card.text}`}>
                {card.value}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 flex justify-between items-center border-b border-slate-50">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Recent Onboarding
            </h2>
            <button className="text-xs font-black text-brand-primary hover:underline flex items-center gap-1 uppercase">
              View All <ExternalLink size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Role</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-slate-400 italic">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                          user.role === 0
                            ? "bg-red-50 text-red-600"
                            : user.role === 1
                              ? "bg-purple-50 text-purple-600"
                              : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {user.role === 0
                          ? "Admin"
                          : user.role === 1
                            ? "Landlord"
                            : "Tenant"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5 text-emerald-500">
                        <ShieldCheck size={14} />
                        <span className="text-xs font-bold">Active</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:bg-white rounded-lg text-slate-400">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Critical Actions Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-2 italic">
              Attention Required
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              There are {stats?.pendingApprovals} properties waiting for your
              verification.
            </p>
            <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white hover:text-brand-primary transition-all">
              Review Property Queue
            </button>
          </div>
          <div className="absolute right-5 bottom-5 opacity-10">
            <Home size={200} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
            Platform Health
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">
                Active Leases Rate
              </span>
              <span className="text-sm font-black text-emerald-600">
                High Activity
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">
                System Uptime
              </span>
              <span className="text-sm font-black text-brand-primary">
                99.9%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
