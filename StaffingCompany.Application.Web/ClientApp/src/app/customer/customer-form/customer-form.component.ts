import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/core/services/utility.service';
import { MvNewCustomer } from '../customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, AfterViewInit {

  customerForm: FormGroup;
  action: string;
  selectedCustomer: MvNewCustomer = <MvNewCustomer>{};

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService) {
      this.action = data.action;
      this.selectedCustomer = data.data || {};
    }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      organizationName: ['', Validators.required],
      organizationCategory: ['', Validators.required],
      organizationDescription: ['', Validators.required],
      fullAddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',
       [Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(8), Validators.maxLength(15)]]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.selectedCustomer);
  }
  onClose() {
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }

  ngAfterViewInit() {
    this.customerForm.updateValueAndValidity();
  }

}
