import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/customer/customer.service';
import { UtilityService } from 'src/core/services/utility.service';
import { MvNewJob } from '../job.model';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, AfterViewInit {
  jobForm: FormGroup;
  action: string;
  selectedJob: MvNewJob = <MvNewJob>{};
  customerList = [];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService,
    private customerService: CustomerService) {
      this.action = data.action;
      this.selectedJob = data.data || {};
    }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      payPerHour: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      customerId: [this.selectedJob.customerId, Validators.required]
    });
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomerDetail().subscribe(customers => {
      if (customers && customers.data){
        customers.data.forEach(customer => {
          if (customer.customerId){
            this.customerList.push({
              id: customer.customerId,
              name: customer.organizationName
            });
          }
        });
      }
    });
  }

  onSubmit() {
    this.dialogRef.close(this.selectedJob);
  }
  onClose() {
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }

  ngAfterViewInit() {
    this.jobForm.updateValueAndValidity();
  }

}
