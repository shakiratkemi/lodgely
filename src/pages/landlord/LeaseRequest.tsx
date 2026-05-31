import { useEffect, useState } from "react";
import {
  getPendingLeaseRequests,
  approveLeaseRequest,
  rejectLeaseRequest,
} from "../../services/landlord.service";
import { Check, X, Mail, Phone, MessageSquare, Building } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CreateLeaseModal } from "../../components";

const LandlordLeaseRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getPendingLeaseRequests();
      const actualRequests = res?.data?.data || res?.data || res || [];
      console.log("Inspecting Loaded Lease Requests Payload:", actualRequests);
      setRequests(Array.isArray(actualRequests) ? actualRequests : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    try {
      if (action === "approve") {
        await approveLeaseRequest(id);
      } else {
        const reason =
          prompt("Enter rejection reason:") || "Property already reserved.";
        await rejectLeaseRequest(id, reason);
      }
      fetchRequests();
    } catch (err) {
      alert("Action failed. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleApproveClick = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleReject = async (id: string) => {
    const reason =
      prompt("Enter rejection reason:") || "Property already reserved.";
    setProcessingId(id);
    try {
      await rejectLeaseRequest(id, reason);
      fetchRequests();
    } catch (err) {
      alert("Rejection failed.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <AiOutlineLoading3Quarters className="animate-spin text-brand-secondary w-8 h-8" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-dark">Lease Requests</h1>
        <p className="text-slate-500 text-sm">
          Review interested tenants for your properties.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-slate-100 shadow-sm">
          <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-500 font-medium">
            No pending lease requests at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((req: any) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-6 hover:border-brand-primary/30 transition-colors"
            >
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-wider">
                  <Building size={16} />
                  {req.propertyTitle || "Unknown Property"}
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                    {req.tenantName
                      ? req.tenantName.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-brand-dark">
                      {req.tenantName || "Unknown Tenant"}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail size={14} /> {req.tenantEmail || "N/A"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {req.tenantPhone || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 italic border-l-4 border-slate-200">
                  "{req.message || "No message provided."}"
                </div>
              </div>

              <div className="flex md:flex-col justify-center gap-3 shrink-0">
                <button
                  disabled={processingId === req.id}
                  onClick={() => handleApproveClick(req)}
                  className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50"
                >
                  <Check size={18} /> Approve
                </button>
                <button
                  disabled={processingId === req.id}
                  onClick={() => handleReject(req.id)}
                  className="bg-white text-red-600 border border-red-100 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-red-50 transition-all disabled:opacity-50"
                >
                  <X size={18} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <CreateLeaseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRequest(null);
        }}
        requestData={selectedRequest}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchRequests();
        }}
      />
    </div>
  );
};

export default LandlordLeaseRequests;
