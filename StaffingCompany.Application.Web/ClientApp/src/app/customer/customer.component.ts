import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/core/services/utility.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MvCustomerDetail, MvNewCustomer } from './customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvCustomerDetail>;
  errorMessage = '';
  selectedCustomer: MvNewCustomer = <MvNewCustomer>{};
  selection = new SelectionModel<MvCustomerDetail>(false, []);

  constructor(private customerService: CustomerService,
    private dialog: MatDialog,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.displayedColumns = ['customerId', 'organizationName', 'organizationCategory', 'organizationDescription', 'fullAddress', 'email', 'phone'];
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getCustomerDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvCustomerDetail>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvCustomerDetail>();
        this.errorMessage = 'No data';
      }
    });
  }

  onAdd() {
    this.selection.clear();
    this.selectedCustomer = <MvCustomerDetail>{};
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
    dialogConfig.data = {data: this.selectedCustomer, action: action};
    const dialogRef = this.dialog.open(CustomerFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit') {
          this.customerService.updateCustomer(result).subscribe(res => {
            this.utilityService.openSnackBar('Customer Edited', 'success');
            this.getAllCustomer();
          });

        } else {
          this.customerService.addCustomer(result).subscribe(res => {
            this.utilityService.openSnackBar('Customer added successfully', 'success');
            this.getAllCustomer();
          });
        }
      }

    });
  }

  selectRow(e: any, row: MvCustomerDetail) {
    this.selectedCustomer = {...row};
    this.selection.toggle(row);
  }

}
