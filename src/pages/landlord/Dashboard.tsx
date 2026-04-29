import type { ILandlordProps } from "../../interfaces";
import { useEffect, useState } from "react";
import { getLandlordDashboard } from "../../services/landlord.service";
import { ValueCard } from "../../components";

const LandlordDashboard = () => {
  const [data, setData] = useState<ILandlordProps | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getLandlordDashboard();
      setData(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-3 gap-6">
        <ValueCard
          title="Total Properties"
          value={data?.totalProperties ?? 0}
        />
        <ValueCard title="Occupied" value={data?.occupiedProperties ?? 0} />
        <ValueCard title="Vacant" value={data?.vacantProperties ?? 0} />
        <ValueCard
          title="Pending Approval"
          value={data?.pendingApprovalProperties ?? 0}
        />
        <ValueCard title="Total Rent" value={data?.totalRentCollected ?? 0} />
        <ValueCard
          title="Overdue Payments"
          value={data?.overduePaymentsCount ?? 0}
        />
      </div>
    </div>
  );
};

export default LandlordDashboard;
