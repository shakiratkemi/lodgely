export interface ILandlordProps {
  totalProperties: number;
  occupiedProperties: number;
  vacantProperties: number;
  pendingApprovalProperties: number;
  totalRentCollected: number;
  overduePaymentsCount: number;
  overdueAmount: number;
}
