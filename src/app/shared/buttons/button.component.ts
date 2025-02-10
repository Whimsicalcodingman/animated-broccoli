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
  @Input() link?: string;
  @Input() label!: string;
  @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
  @Input() disabled: boolean = false;
  @Input() withIcon: boolean = false;
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' = 'md'; // Controls icon size
  @Input() target: '_self' | '_blank' | '_parent' | '_top' = '_self';
  @Input() customClasses: string = '';

  faChevronRight: IconDefinition = faChevronRight;
}
