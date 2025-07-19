import {Component, Input} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckbox} from '@angular/material/checkbox';
import {OverlayscrollbarsModule} from 'overlayscrollbars-ngx';
import 'overlayscrollbars/overlayscrollbars.css';
import {ClientType} from '../../../../types/client.type';

@Component({
  selector: 'app-clients-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCheckbox,
    OverlayscrollbarsModule
  ],
  standalone: true,
  templateUrl: './clients-table.html',
  styleUrl: './clients-table.scss',
})
export class ClientsTable {

  @Input() clients!: ClientType[];
  displayedColumns: string[] = ['select', 'name', 'surname', 'email', 'phone', 'spacer'];
  selection: SelectionModel<ClientType> = new SelectionModel<ClientType>(true, []);


  // ---------
  // ЧЕКБОКСЫ
  // ---------
  isAllSelected() {
    return this.clients.length > 0 && this.selection.selected.length === this.clients.length;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.selection.select(...this.clients);
  }

}
