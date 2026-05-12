const BASE_URL = "https://propms-api.fly.dev/api/v1/Auth";

export const createUser = async (payload: any) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Backend error:", data);
    throw new Error(
      data?.message || data?.errors?.[0] || "Registration failed",
    );
  }
  return data;
};

export const loginUser = async (payload: any) => {
  console.log("Payload being sent to API:", payload);
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Server Response:", data);
    throw new Error(data.message || "Login failed");
  }

  return data;
};
