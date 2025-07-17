import {Component, Input} from '@angular/core';
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

}
