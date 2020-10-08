import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/core/services/utility.service';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { MvEmployeeDetail, MvNewEmployee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvEmployeeDetail>;
  errorMessage = '';
  selectedEmployee: MvNewEmployee = <MvNewEmployee>{};
  selection = new SelectionModel<MvEmployeeDetail>(false, []);

  constructor(private employeeService: EmployeeService,
    private dialog: MatDialog,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.displayedColumns = ['employeeId', 'firstName', 'middleName', 'lastName', 'fullAddress', 'email', 'phone'];
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getEmployeeDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvEmployeeDetail>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvEmployeeDetail>();
        this.errorMessage = 'No data';
      }
    });
  }

  onAdd() {
    this.selection.clear();
    this.selectedEmployee = <MvEmployeeDetail>{};
    this.openDialog('Add');
  }
  onEdit() {
    this.openDialog('Edit');
  }

  openDialog(action: string){
    if (action === 'Edit' && !this.selection.hasValue()){
      this.utilityService.openSnackBar('Please Select Row first', 'warn');
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = {data: this.selectedEmployee, action: action};
    const dialogRef = this.dialog.open(EmployeeFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit'){
          this.employeeService.updateEmployee(result).subscribe(res => {
            this.utilityService.openSnackBar('Employee Edited', 'success');
            this.getAllEmployee();
          });

        } else {
          this.employeeService.addEmployee(result).subscribe(res => {
            this.utilityService.openSnackBar('Employee added successfully', 'success');
            this.getAllEmployee();
          });
        }
      }

    });
  }

  selectRow(e: any, row: MvEmployeeDetail){
    this.selectedEmployee = {...row};
    this.selection.toggle(row);
  }

}
