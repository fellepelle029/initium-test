import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Form} from '../form/form';
import {ClientType} from '../../../../types/client.type';

@Component({
  selector: 'app-modal',
  imports: [
    Form,
  ],
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {

  @Input() title!: string;                                                            // заголовок модалки
  @Input() client: ClientType | null = null;                                          // принимаем клиента, если редактируем
  @Input() selectedClientsCount: number = 0;                                          // принимаем количество чекнутых клиентов из таблицы

  @Output() close = new EventEmitter<void>();                         // пробрасывыаем наружу закрытие модалки
  @Output() submitClient= new EventEmitter<ClientType>();        // пробрасываем наружу сохранение/редактирование клиента
  @Output() deleteClients = new EventEmitter<void>();                 // пробрасываем наружу нажатие на кнопку "удалить"

  // НАЖАТИЕ НА "СОХРАНИТЬ"
  onFormSubmit(client: ClientType) {   //
    this.submitClient.emit(client);
    this.onCloseModal(); // закроем после сабмита
  }

  // НАЖАТИЕ НА "УДАЛИТЬ"
  onDeleteClients() {
    this.deleteClients.emit();
  }

  // НАЖАТИЕ НА "ОТМЕНА"
  onCloseModal() {
    this.close.emit();
  }

}
