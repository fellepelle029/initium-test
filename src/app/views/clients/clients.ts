import {Component, OnInit} from '@angular/core';
import {SvgButton} from '../../shared/components/svg-button/svg-button';
import {ClientsTable} from '../../shared/components/clients-table/clients-table';
import {ClientsResponseType, ClientType} from '../../../types/client.type';
import {ClientsService} from '../../shared/services/clients.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Modal} from '../../shared/components/modal/modal';

@Component({
  selector: 'app-clients',
  imports: [
    SvgButton,
    ClientsTable,
    Modal
  ],
  standalone: true,
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients implements OnInit{
  public clients: ClientType[] = [];
  public hasSelection: boolean = false;
  public modalShown: boolean = false;
  public modalTitle: string = '';

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
        this.clients = data.users as ClientType[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('ОШИБКА:', error);
        return;
      }
    })
  }

  // МОДАЛКИ
  onButtonClick(buttonType: 'add' | 'remove'| 'edit') {
    if (buttonType === 'add') {
      this.modalTitle = 'Новый клиент';
    }
    if (buttonType === 'remove') {
      this.modalTitle = 'Удаление строк';
    }
    if (buttonType === 'edit') {
      this.modalTitle = 'Редактирование'
    }

    this.modalShown = true;
  }
}

