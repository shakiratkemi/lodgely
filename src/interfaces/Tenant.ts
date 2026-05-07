export interface IRentSchedule {
  id: string;
  dueDate: string;
  amountDue: number;
  balanceDue: number;
  status: "Pending" | "PartiallyPaid" | "Paid" | "Overdue";
}
