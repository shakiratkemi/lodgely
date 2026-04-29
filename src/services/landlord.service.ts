import axios from "axios";
import type { ILandlordProps } from "../interfaces";

export const getLandlordDashboard = async (): Promise<ILandlordProps> => {
  const res = await axios.get(
    "https://propms-api.fly.dev/api/v1/Dashboard/landlord",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return res.data;
};
