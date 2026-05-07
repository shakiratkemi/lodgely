import { useEffect, useState } from "react";
import { Check, X, Clock } from "lucide-react";
import {
  getPendingPayments,
  confirmPayment,
  rejectPayment,
} from "../../services/landlord.service";
import { MdReceiptLong } from "react-icons/md";

const LandlordPaymentConfirmation = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPending = async () => {
    try {
      const res = await getPendingPayments();
      setPayments(res.data || []);
    } catch (err) {
      console.error("Error fetching pending payments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (id: string, action: "confirm" | "reject") => {
    const message =
      action === "confirm"
        ? "Confirm receipt of these funds?"
        : "Are you sure you want to reject this payment record?";

    if (!window.confirm(message)) return;

    setProcessingId(id);
    try {
      if (action === "confirm") {
        await confirmPayment(id);
      } else {
        const reason = window.prompt("Reason for rejection:");
        if (reason === null) return; // User cancelled prompt
        await rejectPayment(id, reason || "No reason provided");
      }
      alert(`Payment ${action}ed successfully`);
      fetchPending();
    } catch (err) {
      alert(`Failed to ${action} payment`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-dark">
          Pending Confirmations
        </h1>
        <p className="text-slate-500 text-sm">
          Verify bank transfers and manual payments from tenants.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-5 text-xs font-bold uppercase text-slate-500">
                Transaction Details
              </th>
              <th className="p-5 text-xs font-bold uppercase text-slate-500">
                Amount
              </th>
              <th className="p-5 text-xs font-bold uppercase text-slate-500">
                Reference
              </th>
              <th className="p-5 text-xs font-bold uppercase text-slate-500 text-right">
                Verification
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payments.length === 0 && !loading ? (
              <tr>
                <td colSpan={4} className="p-20 text-center text-slate-400">
                  <MdReceiptLong
                    className="mx-auto mb-2 opacity-20"
                    size={40}
                  />
                  No payments currently awaiting confirmation.
                </td>
              </tr>
            ) : (
              payments.map((p: any) => (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-brand-dark">
                        {p.tenantName || "Tenant"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {p.propertyTitle || "Property"}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 font-bold text-brand-dark text-lg">
                    ₦{p.amount?.toLocaleString()}
                  </td>
                  <td className="p-5 text-sm font-mono text-slate-500">
                    {p.reference || p.id.split("-")[0]}
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={!!processingId}
                        onClick={() => handleAction(p.id, "reject")}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        title="Reject Payment"
                      >
                        <X size={20} />
                      </button>
                      <button
                        disabled={!!processingId}
                        onClick={() => handleAction(p.id, "confirm")}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-all disabled:opacity-50"
                      >
                        {processingId === p.id ? (
                          "..."
                        ) : (
                          <>
                            <Check size={18} /> Confirm
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandlordPaymentConfirmation;
