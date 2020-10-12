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
  employeeId: number;
  customerId: number;
  jobId: number;
}
export interface MvNewTransaction{
  assignmentId: number;
}
