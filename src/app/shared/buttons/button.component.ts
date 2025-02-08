import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
  @Input() disabled: boolean = false;
  @Input() withIcon: boolean = false;
  @Input() iconSize: 'sm' | 'md' | 'lg' = 'md';

  // Default icon for the button
  faChevronRight: IconDefinition = faChevronRight;

  // Pass any additional classes from the parent to the inner button
  @Input() customClasses: string = '';
}
