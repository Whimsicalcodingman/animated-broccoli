import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/buttons/button.component';
import { CardLayoutComponent } from '../../shared/cards/card-layout-2x2/card-layout-2x2.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    CardLayoutComponent
  ]
})
export class HomeComponent {}
