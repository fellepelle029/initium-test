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
  @Input() type: 'add' | 'remove' = 'add';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<'add' | 'remove'>();


  onClick(event: Event) {
    event.preventDefault();
    this.buttonClick.emit(this.type);
  }


}
