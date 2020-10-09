import { JobService } from './../../job/job.service';
import { EmployeeService } from './../../employee/employee.service';
import { MvNewAssignment } from './../assignment.model';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/core/services/utility.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit, AfterViewInit {

  assignmentForm: FormGroup;
  action: string;
  selectedAssignment: MvNewAssignment = <MvNewAssignment>{};
  employeeList = [];
  jobList = [];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService,
    private employeeService: EmployeeService,
    private jobService: JobService) {
      this.action = data.action;
      this.selectedAssignment = data.data || {};
    }

  ngOnInit(): void {
    this.assignmentForm = this.fb.group({
      employeeId: [this.selectedAssignment.employeeId, Validators.required],
      jobId: [this.selectedAssignment.jobId, Validators.required],
      workHours: [this.selectedAssignment.workHours, [Validators.required, Validators.pattern('[0-9]*')]]
    });
    this.getEmployees();
    this.getJobs();
  }

  getJobs() {
    this.jobService.getJobDetail().subscribe(jobs => {
      if (jobs && jobs.data){
        jobs.data.forEach(job => {
          if (job.jobId){
            this.jobList.push({
              id: job.jobId,
              name: `${job.jobTitle}, ${job.organizationName} Company`
            });
          }
        });
      }
    });
  }
  getEmployees(){
    this.employeeService.getEmployeeDetail().subscribe(employees => {
      if (employees && employees.data){
        employees.data.forEach(employee => {
          if (employee.employeeId){
            this.employeeList.push({
              id: employee.employeeId,
              name: `${employee.lastName}, ${employee.firstName}`
            });
          }
        });
      }
    });
  }

  onSubmit() {
    this.dialogRef.close(this.selectedAssignment);
  }
  onClose() {
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }

  ngAfterViewInit() {
    this.assignmentForm.updateValueAndValidity();
  }
}
