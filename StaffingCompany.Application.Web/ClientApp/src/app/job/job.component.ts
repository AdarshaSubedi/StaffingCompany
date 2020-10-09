import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/core/services/utility.service';
import { JobFormComponent } from './job-form/job-form.component';
import { MvJobDetail, MvNewJob } from './job.model';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvJobDetail>;
  errorMessage = '';
  selectedJob: MvNewJob = <MvNewJob>{};
  selection = new SelectionModel<MvJobDetail>(false, []);

  constructor(private jobService: JobService,
    private dialog: MatDialog,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.displayedColumns = ['jobId', 'jobTitle', 'organizationName', 'payPerHour'];
    this.getAllJob();
  }

  getAllJob(){
    this.jobService.getJobDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvJobDetail>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvJobDetail>();
        this.errorMessage = 'No data';
      }
    });
  }

  onAdd() {
    this.selection.clear();
    this.selectedJob = <MvJobDetail>{};
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
    dialogConfig.data = {data: this.selectedJob, action: action};
    const dialogRef = this.dialog.open(JobFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit') {
          this.jobService.updateJob(result).subscribe(res => {
            this.utilityService.openSnackBar('Job Edited', 'success');
            this.getAllJob();
          });

        } else {
          this.jobService.addJob(result).subscribe(res => {
            this.utilityService.openSnackBar('Job added successfully', 'success');
            this.getAllJob();
          });
        }
      }

    });
  }

  selectRow(e: any, row: MvJobDetail) {
    this.selectedJob = {...row};
    this.selection.toggle(row);
  }

}
