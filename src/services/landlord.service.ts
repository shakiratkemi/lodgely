import type { ILandlordProps } from "../interfaces";
import api from "../api/api";

export const getLandlordDashboard = async (): Promise<ILandlordProps> => {
  const res = await api.get("/Dashboard/landlord");
  return res.data;
};

export const getMyProperties = async () => {
  const res = await api.get("/Properties/my-properties");
  return res.data;
};

export const addNewProperty = async (formData: FormData) => {
  const res = await api.post("/Properties", formData);
  return res.data;
};
export const updateProperty = async (id: string, updateData: any) => {
  const res = await api.put(`/Properties/${id}`, updateData);
  return res.data;
};

export const deleteProperty = async (id: string) => {
  const res = await api.delete(`/Properties/${id}`);
  return res.data;
};

export const getPendingLeaseRequests = async () => {
  const res = await api.get("/lease-requests/pending");
  console.log("Pending Lease Requests Response:", res);
  return res.data;
};

export const approveLeaseRequest = async (id: string) => {
  const res = await api.post(`/lease-requests/${id}/approve`, {});
  return res.data;
};

export const rejectLeaseRequest = async (id: string, reason: string) => {
  const res = await api.post(`/lease-requests/${id}/reject`, { reason });
  return res.data;
};

export const createLease = async (leaseData: {
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
}) => {
  const res = await api.post("/Leases", leaseData);
  console.log("Create Lease Response:", res);
  return res.data;
};

export const getActiveLeases = async () => {
  const res = await api.get("/Leases/landlord-leases");
  return res.data;
};

// Get payments waiting for landlord approval
export const getPendingPayments = async () => {
  const res = await api.get("/Payments/pending-confirmation");
  return res.data;
};

// Confirm a specific payment
export const confirmPayment = async (id: string) => {
  const res = await api.post(`/Payments/${id}/confirm`);
  return res.data;
};

// Reject a payment
export const rejectPayment = async (id: string, reason: string) => {
  const res = await api.post(`/Payments/${id}/reject`, { reason });
  return res.data;
};

// View landlord's payment history
export const getPaymentHistory = async () => {
  const res = await api.get("/Payments/history/my");
  return res.data;
};

export const getMyNotifications = async () => {
  const res = await api.get("/Notifications");
  return res.data;
};

export const markNotificationAsRead = async (id: string) => {
  const res = await api.post(`/Notifications/${id}/read`);
  return res.data;
};
