import { Router } from '@angular/router';
import { TransactionService } from './../transaction/transaction.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/core/services/utility.service';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { MvAssignmentDetail, MvNewAssignment } from './assignment.model';
import { AssignmentService } from './assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvAssignmentDetail>;
  errorMessage = '';
  selectedAssignment: MvNewAssignment = <MvNewAssignment>{};
  selection = new SelectionModel<MvAssignmentDetail>(false, []);

  constructor(private assignmentService: AssignmentService,
    private dialog: MatDialog,
    private utilityService: UtilityService,
    private transactionService: TransactionService,
    private router: Router ) { }

  ngOnInit(): void {
    this.displayedColumns = ['assignmentId', 'employeeName', 'organizationName', 'jobTitle', 'workHours', 'activeStatus'];
    this.getAllAssignment();
  }

  getAllAssignment(){
    this.assignmentService.getAssignmentDetail().subscribe((response: any) => {
      if (response && response.data) {
        const data: any = this.checkStatus(response.data);
        this.dataSource = new MatTableDataSource<MvAssignmentDetail>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvAssignmentDetail>();
        this.errorMessage = 'No data';
      }
    });
  }

  checkStatus(data) {
    data.forEach(d => {
      if (d.status === false){
        d.activeStatus = 'Active';
      } else {
        d.activeStatus = 'Completed';
      }
    });
    return data;
  }

  onAdd() {
    this.selection.clear();
    this.selectedAssignment = <MvAssignmentDetail>{};
    this.openDialog('Add');
  }
  onEdit(){
    this.openDialog('Edit');
  }

  openDialog(action: string){
    if (action === 'Edit' && !this.selection.hasValue()){
      this.utilityService.openSnackBar('Please Select Row first', 'warn');
      return;
    }
    if (this.selection.selected[0].status) {
      this.utilityService.openSnackBar('Cannot edit completed task', 'warn');
      return;
    }
    console.log(this.selection.selected[0].status);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = {data: this.selectedAssignment, action: action};
    const dialogRef = this.dialog.open(AssignmentFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit'){
          this.assignmentService.updateAssignment(result).subscribe(res => {
            this.utilityService.openSnackBar('Assignment Edited', 'success');
            this.getAllAssignment();
          });

        } else {
          this.assignmentService.addAssignment(result).subscribe(res => {
            this.utilityService.openSnackBar('Assignment added successfully', 'success');
            this.getAllAssignment();
          });
        }
      }

    });
  }

  onGenerate() {
    if (!this.selection.hasValue()){
      this.utilityService.openSnackBar('Please select an Assignment', 'warn');
      return;
    }
    if (this.selection.selected[0].status){
      this.utilityService.openSnackBar('Cannot generate transaction multiple times', 'warn');
      return;
    }
    this.transactionService.addTransaction(this.selectedAssignment.assignmentId).subscribe(response => {
      this.utilityService.openSnackBar('Transaction Created', 'success');
      this.router.navigate(['/transaction']);
    });
  }

  selectRow(e: any, row: MvAssignmentDetail) {
    this.selectedAssignment = {...row};
    this.selection.toggle(row);
  }

}
