import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
