import {Component} from '@angular/core';
import {SvgButton} from '../../shared/components/svg-button/svg-button';
import {ClientsTable} from '../../shared/components/clients-table/clients-table';

@Component({
  selector: 'app-clients',
  imports: [
    SvgButton,
    ClientsTable
  ],
  standalone: true,
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients {
  public clients: any[] = [];
}
