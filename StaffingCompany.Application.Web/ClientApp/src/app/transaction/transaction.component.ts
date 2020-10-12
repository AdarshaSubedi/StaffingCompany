import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/core/services/utility.service';
import { MvTransactionDetail } from './transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvTransactionDetail>;
  errorMessage = '';
  selectedTransaction: MvTransactionDetail = <MvTransactionDetail>{};
  selection = new SelectionModel<MvTransactionDetail>(false, []);

  constructor(
    private transactionService: TransactionService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.displayedColumns = ['transactionId', 'employeeName', 'jobTitle', 'organizationName', 'workHours', 'payPerHour', 'amount', 'insertDate'];
    this.getAllTransaction();
  }

  getAllTransaction(){
    this.transactionService.getTransactionDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvTransactionDetail>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvTransactionDetail>();
        this.errorMessage = 'No Data';
      }
    });
  }

  onGenerate(){
    console.log(this.selection.selected);
  }

  selectRow(e: any, row: MvTransactionDetail) {
    this.selectedTransaction = {...row};
    this.selection.toggle(row);
  }
}
