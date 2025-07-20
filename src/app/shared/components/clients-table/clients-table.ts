import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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
import {NgClass} from '@angular/common';

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
    OverlayscrollbarsModule,
    NgClass
  ],
  standalone: true,
  templateUrl: './clients-table.html',
  styleUrl: './clients-table.scss',
})
export class ClientsTable implements OnChanges{
  public displayedColumns: string[] = ['select', 'name', 'surname', 'email', 'phone', 'spacer'];         // колонки таблички materials
  public selection: SelectionModel<ClientType> = new SelectionModel<ClientType>(true, []);               // массив чекнутых (чекбоксами) клиентов из таблицы

  @Input() clearTableSelection: boolean = false
  @Input() clients!: ClientType[];                                                                       // массив клиентов взятый из родителя и раскиданный по ячейкам таблицы
  @Output() selectionChanged = new EventEmitter<ClientType[]>();                   // проброс выбранных (чекнутых) клиентов
  @Output() onEditClient = new EventEmitter<ClientType>();                          // проброс редактирумеого клиента

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clearTableSelection']) {         // отслеживаем изменение флага clearTableSelection
      this.clearSelection();
    }
  }

  // ---------
  // ЧЕКБОКСЫ
  // ---------
  isAllSelected(): boolean {                                                                   // проверяем все ли чекбоксы были выбраны. смотрим что бы был выбран хотя бы один клиент...
    return this.clients.length > 0 && this.selection.selected.length === this.clients.length;  // ... после чего смотрим что были выбраны все из доступных клиентов
  }

  masterToggle(): void {                                     // этим методом контролируем родительский чекбокс.
    this.isAllSelected()                                     // смотрим результат true\false
      ? this.selection.clear()                               // если true - снимаем выбор со всех
      : this.selection.select(...this.clients);              // если false - выбираем всех клиентов
  }

  public onSelectionChange(): void {
    this.selectionChanged.emit(this.selection.selected);     // передаем массив выбранных клиентов наружу
    console.log(this.selection.selected)                     // тут просто консолькой смотрим сколько и каких клиентов выбрали. это я для себя делал, решил оставить для наглядности.
  }

  private clearSelection(): void {
    this.selection.clear();                                  // чистим выбранные элементы, иначе остаются в памяти
  }


  // НАЖАТИЕ НА ИМЯ/ФАМИЛИЮ/ПОЧТУ/ТЕЛЕФОН
  public editClient(client: ClientType): void {
    this.onEditClient.emit(client);                       // пробрасываем наружу клиента, которого выбрали в табличке
  }
}
