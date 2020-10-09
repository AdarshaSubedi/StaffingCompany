import { MvNewEmployee } from './../employee.model';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/core/services/utility.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, AfterViewInit {

  employeeForm: FormGroup;
  action: string;
  selectedEmployee: MvNewEmployee = <MvNewEmployee>{};

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService) {
      this.action = data.action;
      this.selectedEmployee = data.data || {};
    }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: '',
      lastName: ['', Validators.required],
      fullAddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',
       [Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(8), Validators.maxLength(15)]]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.selectedEmployee);
  }
  onClose() {
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }

  ngAfterViewInit() {
    this.employeeForm.updateValueAndValidity();
  }

}
