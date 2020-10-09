export interface MvAssignmentDetail {
  assignmentId: number;
  employeeId: number;
  jobId: number;
  jobTitle: string;
  status: boolean;
  employeeName: string;
  organizationName: string;
  workHours: number;
  activeStatus: string;
}
export interface MvNewAssignment {
  assignmentId: number;
  employeeId: number;
  jobId: number;
  workHours: number;
}
