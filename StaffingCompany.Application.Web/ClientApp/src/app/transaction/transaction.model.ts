export interface MvTransactionDetail {
  transactionId: number;
  assignmentId: number;
  employeeName: string;
  jobTitle: string;
  organizationName: string;
  workHours: number;
  payPerHour: number;
  amount: number;
  insertDate: Date;
}
export interface MvNewTransaction{
  assignmentId: number;
}
