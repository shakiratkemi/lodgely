import api from "../api/api";

// Fetch tenant's current leases
export const getMyLeases = async () => {
  const res = await api.get("/Leases/my-leases");
  return res.data;
};

// Fetch all rent payment schedules
export const getMySchedules = async () => {
  const res = await api.get("/Payments/schedules/my");
  return res.data;
};

// Fetch notification history
export const getMyNotifications = async () => {
  const res = await api.get("/Notifications");
  return res.data;
};

// Fetch all approved properties with optional filters
export const getAllProperties = async (params: any) => {
  const res = await api.get("/properties", { params });
  return res.data;
};

// Fetch details for a single property
export const getPropertyDetails = async (id: string) => {
  const res = await api.get(`/properties/${id}`);
  return res.data;
};

export const submitLeaseRequest = async (data: {
  propertyId: string;
  message: string;
}) => {
  const res = await api.post("/lease-requests", data);
  return res.data;
};

export const getMyRequests = async () => {
  const res = await api.get("lease-requests/my");
  return res.data;
};

export const getLeaseById = async (id: string) => {
  const res = await api.get(`/Leases/${id}`);
  return res.data;
};

export const initializePayment = async (scheduleId: string) => {
  const res = await api.post(`/Payments/paystack/initialize`, { scheduleId });
  return res.data;
};

export const verifyPaystackPayment = async (reference: string) => {
  const res = await api.post(`/Payments/paystack/verify`, { reference });
  return res.data;
};

export const getMyPaymentHistory = async () => {
  const res = await api.get(`/Payments/history/my`);
  return res.data;
};

export const markNotificationAsRead = async (id: string) => {
  const res = await api.post(`/Notifications/${id}/read`);
  return res.data;
};
