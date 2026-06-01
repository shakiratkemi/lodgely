import React, { useState } from "react";
import { createLease } from "../services/landlord.service";
import { Calendar, X } from "lucide-react";

interface LeaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestData: any;
  onSuccess: () => void;
}

const CreateLeaseModal = ({
  isOpen,
  onClose,
  requestData,
  onSuccess,
}: LeaseModalProps) => {
  if (!isOpen || !requestData) return null;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    rentAmount: requestData.propertyRentAmount || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createLease({
        propertyId: requestData.propertyId,
        tenantId: requestData.tenantId,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        rentAmount: Number(form.rentAmount),
      });
      onSuccess();
      alert("Lease created and schedules generated!");
      onClose();
    } catch (err) {
      alert("Error creating lease. Check dates.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-black text-brand-dark">Finalize Lease</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 bg-slate-50 rounded-2xl mb-4 text-sm">
            <p className="text-slate-500">Tenant</p>
            <p className="font-bold text-brand-dark">
              {requestData.tenantName}
            </p>
            <p className="text-slate-500 mt-2">Property</p>
            <p className="font-bold text-brand-dark">
              {requestData.propertyTitle}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Start Date
            </label>
            <input
              type="date"
              required
              className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-brand-primary"
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              End Date
            </label>
            <input
              type="date"
              required
              className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-brand-primary"
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Agreed Rent (₦)
            </label>
            <input
              type="number"
              required
              value={form.rentAmount}
              className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-brand-primary"
              onChange={(e) => setForm({ ...form, rentAmount: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-brand-primary transition-all"
          >
            {loading ? "Generating Lease..." : "Create Official Lease"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateLeaseModal;
