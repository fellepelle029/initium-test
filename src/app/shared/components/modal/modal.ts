import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Form} from '../form/form';

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

  @Input() title!: string;
  @Output() close = new EventEmitter<void>();

  count: number = 1;



  closeModal() {
    this.close.emit();
  }

}
