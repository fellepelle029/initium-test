import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatMiniFabButton} from '@angular/material/button';

@Component({
  selector: 'app-svg-button',
  imports: [
    MatMiniFabButton,
  ],
  standalone: true,
  templateUrl: './svg-button.html',
  styleUrl: './svg-button.scss'
})
export class SvgButton {
  @Input() type: 'add' | 'remove' = 'add';                                                   // принимаем с родителя тип кнопки для рендера нужной СВГ
  @Input() disabled: boolean = false;                                                        // контролируем доступность корзины, на случай если не были чекенуты клиенты
  @Output() buttonClick = new EventEmitter<'add' | 'remove'>();       // пробрасываем наружу нажатие на кнопки "создать"/"удалить"

  // НАЖАТИЕ НА КНОПКУ
  onClick() {
    this.buttonClick.emit(this.type);
  }
}
