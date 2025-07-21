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
export class Clients implements OnInit {
  public clients: ClientType[] = [];
  public hasSelection: boolean = false;
  public selectedClient: ClientType | null = null;
  public selectedClients: ClientType[] = [];
  public modalShown: boolean = false;
  public modalTitle: string = '';

  public clearTableSelection: boolean = false;

  constructor(private clientService: ClientsService) {
  }

  // ЯДРО
  ngOnInit(): void {
    this.renderClients()
  }

  // РЕНДЕР КЛИЕНТОВ ИЗ ХРАНИЛИЩА ИЛИ ГЕТ-ЗАПРОСОМ
  private renderClients(): void {
    const storedClients: string | null = localStorage.getItem('clients');
    if (storedClients && this.isStorageNotEmpty(storedClients)) {
      try {
        this.clients = JSON.parse(storedClients)
      }
      catch (e) {
        console.error('Ошибка загрузки клиентов:', e)
      }
    } else {
      this.getClientsData();
    }
  }

  // ФЕТЧ ЮЗЕРОВ
  private getClientsData(): void {
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
  modalHandler(buttonType: 'add' | 'remove' | 'edit', client?: ClientType): void {  // сработает при нажатие на кнопки (внутри дочерних компонентов app-svg-button,
                                                                                    //  а так же на клик по span'у внутри таблички, все эмитим из дочерних компонентов.
    if (buttonType === 'add') {
      this.buttonHandler('Новый клиент')
    }
    if (buttonType === 'remove') {
      this.buttonHandler('Удаление строк')
    }
    if (buttonType === 'edit' && client) {                                         // тут баттонтайп это клик по имени/фамилии/имейлу/телефону с таблички.
      this.buttonHandler('Редактирование', client)
    }
    this.modalShown = true;
  }

  // СОЗДАНИЕ/РЕДАКТИРОВАНИЕ ЮЗЕРА
  handleFormSubmit(client: ClientType): void {                                    // метод отработает на нажатие кнопки "сохранить" в модалке
    if (this.selectedClient) {                                                    // если модалка была "Редактирование", то есть у нас был выбран клиент
      this.editUser(client)
    } else {                                                                      // если модалка была на создание нового.
      this.addNewClient(client)
    }
  }

  // УДАЛЕНИЕ ВЫБРАННЫХ КЛИЕНТОВ
  handleDeleteClients(): void {
    this.clients = this.filterSelectedClients()
    this.clearCheckboxesAndCloseModal();
    this.saveClientsToLocalStorage()
    console.log('выбранные пользователи удалены');
  }

  // ОБРАБОТКА ИЗМЕНЕНИЯ ВЫБРАННЫХ КЛИЕНТОВ
  onSelectionChanged(selectedClients: ClientType[]): void {
    this.selectedClients = selectedClients;
    this.hasSelection = selectedClients.length > 0;
  }

//--------------
// ХЕЛПЕРЫ
//--------------

  private addNewClient(client: ClientType): void {
    this.clients = [...this.clients, client];                                     // создаем массив, закидываем туда всех наших клиентов и следом добавляем новичка.
    console.log('новый пользователь добавлен')                                    // тут чисто проверить onChanges. бывает два раза, отрабатывает в иных сценариях.
    this.saveClientsToLocalStorage()
  }

  private editUser(client: ClientType): void {
    const index = this.clients.indexOf(this.selectedClient!);            // находим клиента которого будем редактировать. "!" потому что проверка в основном методе.
    this.clients = [                                                             // создаем новый массив (жизненные циклы не дружат с мутацией).
      ...this.clients.slice(0, index),                                           // срезаем всех клиентов до нашего - нужного.
      {...this.selectedClient, ...client},                                       // берем "старого" выбранного клиента и меняем на новые из client
      ...this.clients.slice(index + 1)                                           // докидываем остальных клиентов, которые были до изменяемого.
    ];
    this.saveClientsToLocalStorage()
  }

  private buttonHandler(title: string, client: ClientType | null = null): void {  // прокидываем в модалку нужный заголовок и юзера, если есть. по-умолчанию - null
    this.modalTitle = title;
    this.selectedClient = client;
  }

  private clearCheckboxesAndCloseModal(): void {
    this.selectedClients = [];                                               // очищаем список выбранных
    this.hasSelection = false;                                               // убираем флаг наличия выбора
    this.modalShown = false;                                                 // закрываем модалку
    this.clearTableSelection = !this.clearTableSelection;                    // меняем флаг, чтобы таблица отреагировала
  }

  private saveClientsToLocalStorage(): void {
    localStorage.setItem('clients', JSON.stringify(this.clients));           // сохраняем массив клиентов в хранилище
  }

  private filterSelectedClients(): ClientType[] {
    return this.clients.filter(client =>                                       // тут фильтруем/пересоздаем (оставляем только тех для кого true) массив клиентов
      !this.selectedClients.some(selectedClient => selectedClient === client)  // тут проверяем есть ли у нас selectedClients (ченутых клиентах) клиент равный клиенту по которому проходим.
    );
  }

  private isStorageNotEmpty(array: string): boolean {
    return JSON.parse(array).length > 0
  }
}



