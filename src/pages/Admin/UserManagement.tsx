import { useEffect, useState } from "react";
import { adminService } from "../../services/admin.service";
import {
  User,
  Search,
  Filter,
  MoreVertical,
  ShieldCheck,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminService.getAllUsers();
        const data = res.data || res;
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle Search and Filtering
  useEffect(() => {
    let result = users;

    if (searchTerm) {
      result = result.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (activeFilter !== "all") {
      const roleMap: any = { admin: 0, landlord: 1, tenant: 2 };
      result = result.filter((u) => u.role === roleMap[activeFilter]);
    }

    setFilteredUsers(result);
  }, [searchTerm, activeFilter, users]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 mb-4" />
        <span className="font-black italic">LOADING DIRECTORY...</span>
      </div>
    );

  return (
    <div className="space-y-8 animate-fade-up">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter">
            USER DIRECTORY
          </h1>
          <p className="text-slate-500 font-medium">
            Manage permissions and audit platform participants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2">
            <Users size={18} className="text-brand-primary" />
            <span className="font-black text-slate-900">
              {users.length} Total
            </span>
          </div>
        </div>
      </header>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-4xl  border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-primary/20 outline-none text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {["all", "admin", "landlord", "tenant"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === filter
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
            <tr>
              <th className="px-8 py-5">Full Name & Contact</th>
              <th className="px-8 py-5">Platform Role</th>
              <th className="px-8 py-5">Security Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50/30 transition-colors group"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                          <Mail size={12} /> {user.email}
                        </span>
                        {user.phoneNumber && (
                          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium border-l pl-3 border-slate-200">
                            <Phone size={12} /> {user.phoneNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span
                    className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter ${
                      user.role === 0
                        ? "bg-red-50 text-red-600"
                        : user.role === 1
                          ? "bg-purple-50 text-purple-600"
                          : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {user.role === 0
                      ? "System Admin"
                      : user.role === 1
                        ? "Landlord"
                        : "Tenant"}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50/50 w-fit px-3 py-1 rounded-lg">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-black uppercase">
                      Verified
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-bold italic">
              No users found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
