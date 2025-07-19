import {Component, OnInit} from '@angular/core';
import {SvgButton} from '../../shared/components/svg-button/svg-button';
import {ClientsTable} from '../../shared/components/clients-table/clients-table';
import {ClientsResponseType, ClientType} from '../../../types/client.type';
import {ClientsService} from '../../shared/services/clients.service';
import {HttpErrorResponse} from '@angular/common/http';

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
export class Clients implements OnInit{
  public clients: ClientType[] = [];

  constructor(private clientService: ClientsService) {
  }

  // ЯДРО
  ngOnInit() {
    this.getClientsData();
  }

  // ФЕТЧ ЮЗЕРОВ
  private getClientsData() {
    this.clientService.getClients().subscribe({
      next: (data: ClientsResponseType) => {
        this.clients = data.users;
      },
      error: (error: HttpErrorResponse) => {
        console.error('ОШИБКА:', error);
        return;
      }
    })
  }

}

