import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [],
  standalone: true,
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {

  public errorMessage: string = '';
  @Output() close = new EventEmitter<void>();


  closeModal(event: Event) {
    event.preventDefault();
    this.close.emit()
  }
}
