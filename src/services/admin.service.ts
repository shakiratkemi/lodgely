const BASE_URL = "https://propms-api.fly.dev/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const adminService = {
  // Dashboard Stats
  getDashboard: async () => {
    const res = await fetch(`${BASE_URL}/Dashboard/admin`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Property Management
  getPendingProperties: async () => {
    const res = await fetch(`${BASE_URL}/Properties/pending`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  approveProperty: async (id: string) => {
    const res = await fetch(`${BASE_URL}/Properties/${id}/approve`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  rejectProperty: async (id: string, reason: string) => {
    const res = await fetch(`${BASE_URL}/Properties/${id}/reject`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason }),
    });
    return res.json();
  },

  // User Management
  getAllUsers: async () => {
    const res = await fetch(`${BASE_URL}/Admin/users`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  toggleUserStatus: async (id: string, action: "suspend" | "activate") => {
    const res = await fetch(`${BASE_URL}/Admin/users/${id}/${action}`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    return res.json();
  },
  getNotifications: async () => {
    const res = await fetch(`${BASE_URL}/Notifications`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
    return res.json();
  },

  markAsRead: async (id: string) => {
    const res = await fetch(`${BASE_URL}/Notifications/${id}/read`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    return res.json();
  },
};
