import { useEffect, useState } from "react";
import { getMyPaymentHistory } from "../../services/tenant.service";
import {
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard,
  Receipt,
  Search,
  Wallet,
  AlertCircle,
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TenantPayments = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState("");

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const res = await getMyPaymentHistory();
        const actualHistory = res?.data?.data || res?.data || res || [];
        setHistory(Array.isArray(actualHistory) ? actualHistory : []);
      } catch (err) {
        console.error("Error loading payment history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentData();
  }, []);
  // Total Spent: Sum of all Confirmed payments in the history
  const totalSpent = history
    .filter((trx) => trx.status === "Confirmed")
    .reduce((sum, trx) => sum + (trx.amount || 0), 0);

  //  Awaiting Confirmation: Sum of all Pending payments
  const awaitingConfirmation = history
    .filter((trx) => trx.status === "Pending")
    .reduce((sum, trx) => sum + (trx.amount || 0), 0);

  //  Last Payment: The amount of the newest transaction in the array
  const lastPaymentAmount = history.length > 0 ? history[0].amount || 0 : 0;

  // Search Filter Logic
  const filteredHistory = history.filter((trx) =>
    trx.paymentReference?.toLowerCase().includes(searchHistory.toLowerCase()),
  );

  const getStatus = (status: string) => {
    const styles = {
      Confirmed: "bg-green-50 text-green-600 border-green-100",
      Pending: "bg-amber-50 text-amber-600 border-amber-100 animate-pulse",
      Rejected: "bg-red-50 text-red-600 border-red-100",
    };

    const icons = {
      Confirmed: <CheckCircle2 size={12} />,
      Pending: <Clock size={12} />,
      Rejected: <XCircle size={12} />,
    };

    return (
      <span
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${styles[status as keyof typeof styles] || styles.Pending}`}
      >
        {icons[status as keyof typeof icons] || icons.Pending}
        {status || "Processing"}
      </span>
    );
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center gap-2 h-[60vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 mb-4" />
        <span className="font-bold">Loading your payments...</span>
      </div>
    );

  return (
    <div className="space-y-8 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-brand-dark italic">
            Financial History
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your rent payments and track landlord verifications.
          </p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase">
              Total Spent
            </p>
            <p className="text-xl font-black text-brand-dark">
              ₦{totalSpent.toLocaleString()}
            </p>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-dark p-8 rounded-[2.5rem] text-white flex justify-between items-start">
          <div>
            <Wallet className="mb-4 opacity-50" />
            <p className="text-slate-400 text-xs font-bold uppercase">
              Total Spent
            </p>
            <h3 className="text-3xl font-black mt-1">
              ₦{totalSpent.toLocaleString()}
            </h3>
          </div>
          <span className="bg-green-500/20 text-green-400 text-[10px] font-black px-2 py-1 rounded">
            LIVE
          </span>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <Clock className="mb-4 text-amber-500" />
          <p className="text-slate-400 text-xs font-bold uppercase">
            Awaiting Confirmation
          </p>
          <h3 className="text-3xl font-black mt-1 text-brand-dark">
            ₦{awaitingConfirmation.toLocaleString()}
          </h3>
        </div>

        <div className="bg-brand-primary p-8 rounded-[2.5rem] text-white">
          <CreditCard className="mb-4 opacity-50" />
          <p className="text-white/60 text-xs font-bold uppercase">
            Last Payment
          </p>
          <h3 className="text-3xl font-black mt-1 text-white">
            ₦{lastPaymentAmount.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h3 className="font-black text-brand-dark">Transaction Log</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <input
                type="text"
                value={searchHistory}
                onChange={(e) => setSearchHistory(e.target.value)}
                placeholder="Search ref..."
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 ring-brand-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Reference</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((trx: any) => (
                  <tr
                    key={trx.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6 text-sm text-slate-600 font-medium">
                      {trx.createdAt
                        ? new Date(trx.createdAt).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                    <td className="px-8 py-6 font-mono text-[10px] text-slate-400">
                      {trx.paymentReference || trx.reference || "N/A"}
                    </td>
                    <td className="px-8 py-6 font-black text-brand-dark">
                      ₦{trx.amount?.toLocaleString()}
                    </td>
                    <td className="px-8 py-6">{getStatus(trx.status)}</td>
                    <td className="px-8 py-6 text-right">
                      {trx.status === "Confirmed" ? (
                        <button className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all">
                          <Receipt size={18} />
                        </button>
                      ) : (
                        <AlertCircle
                          size={18}
                          className="ml-auto text-slate-200"
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-20 text-center text-slate-400 font-bold italic"
                  >
                    No transactions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantPayments;
