import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getLeaseById, initializePayment } from "../services/tenant.service";
import {
  ArrowLeft,
  CreditCard,
  Calendar,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LeaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lease, setLease] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLease = async () => {
      try {
        const res: any = await getLeaseById(id!);
        const actualLease = res?.data?.data || res?.data || res;
        console.log("Inspecting Full Loaded Lease Object:", actualLease);
        setLease(actualLease);
      } catch (err) {
        console.error("Error loading lease details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLease();
  }, [id]);

  const handlePayment = async (scheduleId: string) => {
    try {
      setPayingId(scheduleId);
      const res = await initializePayment(scheduleId);
      if (res.data?.authorization_url) {
        window.location.href = res.data.authorization_url;
      } else if (res.authorization_url) {
        window.location.href = res.authorization_url;
      }
    } catch (err) {
      console.error("Payment initialization failed", err);
      alert("Failed to start payment. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center gap-2 h-[60vh] text-brand-secondary">
        <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 mb-4" />
        <span className="font-bold">Loading Lease Details...</span>
      </div>
    );
  if (!lease) return <div className="p-20 text-center">Lease not found.</div>;
  const schedulesList = lease.schedules || lease.Schedules || [];
  const displayRent = lease.rentAmount ?? lease.RentAmount ?? 0;
  const displayStatus = lease.status ?? lease.Status ?? "Unknown";
  const displayTitle =
    lease.propertyTitle ??
    lease.property?.title ??
    lease.PropertyTitle ??
    "Property Lease";
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 font-bold mb-8"
      >
        <ArrowLeft size={18} /> Back to My Leases
      </button>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-brand-dark p-8 text-white">
          <h1 className="text-2xl font-black">{displayTitle}</h1>
          <p className="text-slate-400 text-sm mt-1">Lease Reference: {id}</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400">
                Monthly Rent
              </p>
              <p className="font-bold text-brand-dark">
                ₦{displayRent?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400">
                Status
              </p>
              <span className="text-green-600 font-bold text-sm">
                {displayStatus}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-black text-brand-dark mb-4 flex items-center gap-2">
              <Calendar size={18} /> Payment Schedule
            </h3>
            <div className="border rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b">
                  <tr className="text-[10px] uppercase font-black text-slate-400">
                    <th className="px-6 py-4">Installment</th>
                    <th className="px-6 py-4">Due Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {schedulesList.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-10 text-slate-400 font-medium"
                      >
                        No payment installments scheduled for this lease
                        agreement.
                      </td>
                    </tr>
                  ) : (
                    schedulesList.map((item: any, idx: number) => {
                      const itemStatus = item.status ?? item.Status ?? "Unpaid";
                      const isPaid = itemStatus.toLowerCase() === "paid";
                      const itemAmount =
                        item.amountDue ?? item.amount ?? item.AmountDue ?? 0;
                      const itemDueDate = item.dueDate ?? item.DueDate;
                      return (
                        <tr key={item.id} className="text-sm">
                          <td className="px-6 py-4 font-bold text-slate-500">
                            #{idx + 1}
                          </td>
                          <td className="px-6 py-4">
                            {itemDueDate
                              ? new Date(itemDueDate).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 font-bold">
                            ₦{itemAmount?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                                isPaid
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {itemStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {item.status !== "Paid" && (
                              <button
                                disabled={payingId === item.id}
                                onClick={() => handlePayment(item.id)}
                                className="bg-brand-primary text-white text-[10px] font-black px-4 py-2 rounded-xl"
                              >
                                {payingId === item.id ? (
                                  <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                  <CreditCard size={14} />
                                )}
                                PAY NOW
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseDetails;
