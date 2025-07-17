import { Component } from '@angular/core';
import {SvgButton} from '../../shared/components/svg-button/svg-button';

@Component({
  selector: 'app-clients',
  imports: [
    SvgButton
  ],
  standalone: true,
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients {

}
