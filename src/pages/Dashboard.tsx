import {
  LayoutDashboard,
  Home,
  MessageSquare,
  CreditCard,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import SidebarItem from "../components/SideBarItem";
import { ActivityItem, StatCard } from "../components";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-body">
      <aside className="w-64 bg-brand-dark hidden lg:flex flex-col text-white fixed h-full z-30">
        <div className="p-8">
          <h2 className="text-2xl font-heading font-black tracking-tighter">
            LODGELY<span className="text-brand-primary">.</span>
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            active
          />
          <SidebarItem icon={<Home size={20} />} label="Properties" />
          <SidebarItem
            icon={<MessageSquare size={20} />}
            label="Messages"
            badge="3"
          />
          <SidebarItem icon={<CreditCard size={20} />} label="Payments" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-xs text-white/50 mb-2">Logged in as</p>
            <p className="text-sm font-bold">Shakirat Adeyemi</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64">
        {/* TOP NAVIGATION */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="relative w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search listings, agents, or invoices..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-brand-primary/20 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">
              SA
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-extrabold text-brand-dark">
              Executive Overview
            </h1>
            <p className="text-brand-light">
              Welcome back, here is what's happening with your properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Active Listings"
              value="12"
              icon={<Home className="text-blue-600" />}
              trend="+2 this month"
            />
            <StatCard
              title="Total Earnings"
              value="₦2.4M"
              icon={<CreditCard className="text-emerald-600" />}
              trend="+15% vs last month"
            />
            <StatCard
              title="Pending Verifications"
              value="4"
              icon={<Clock className="text-amber-600" />}
              trend="High Priority"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-4xl shadow-sm border border-slate-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-brand-dark">
                  Recent Inquiries
                </h3>
                <button className="text-brand-primary font-bold text-sm hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-6">
                <ActivityItem
                  user="John Doe"
                  action="Inquired about"
                  target="Lekki 3-Bedroom Duplex"
                  time="2 mins ago"
                  status="New"
                />
                <ActivityItem
                  user="Amaka Obi"
                  action="Scheduled a tour for"
                  target="Victoria Island Studio"
                  time="1 hour ago"
                  status="Scheduled"
                />
                <ActivityItem
                  user="Musa Chen"
                  action="Paid deposit for"
                  target="Ikeja Executive Suite"
                  time="5 hours ago"
                  status="Paid"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-brand-primary rounded-4xl p-8 text-white shadow-xl shadow-brand-primary/20">
                <h3 className="text-xl font-bold mb-2">Post New Listing</h3>
                <p className="text-white/80 text-sm mb-6">
                  Our verification team is ready to review your property.
                </p>
                <button className="w-full bg-white text-brand-primary py-3 rounded-xl font-bold hover:bg-brand-dark hover:text-white transition-all flex items-center justify-center gap-2">
                  Get Started <ArrowUpRight size={18} />
                </button>
              </div>

              <div className="bg-white rounded-4xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-lg font-bold text-brand-dark mb-4">
                  Verification Score
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-black text-emerald-500">
                    94%
                  </div>
                  <div>
                    <p className="text-sm font-bold">Excellent Standing</p>
                    <p className="text-xs text-brand-light">
                      Your profile is highly trusted by tenants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
