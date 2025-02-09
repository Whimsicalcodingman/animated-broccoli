import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { annotate } from 'rough-notation';
import { BackgroundAnimationThreeComponent } from '../../shared/layout/background-animation-three/background-animation-three.component';
import { animate, scroll, inView } from "motion";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    FontAwesomeModule,
    BackgroundAnimationThreeComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faInstagram = faInstagram;

  ngAfterViewInit() {
    // Handle underline annotations
    const underlineElements = document.querySelectorAll('.underline');
    underlineElements.forEach((element) => {
      inView(element, () => {
        const delay = parseInt(element.getAttribute('annotationDelay') || '0', 10); // Get delay from attribute or default to 0
        const padding = parseInt(element.getAttribute('annotationPadding') || '-10', 10); // Get padding or default to -10
        const annotation = annotate(element as HTMLElement, { 
          type: 'underline', 
          color: '#FFD54F', 
          padding: padding, 
        });
        setTimeout(() => {
          annotation.show();
        }, delay);
      },
        { margin: '0px 0px -100px 0px', amount: 0.2 }
      )
    });
    
    // Handle highlighting annotations
    const highlightElements = document.querySelectorAll('.highlight');
    highlightElements.forEach((element) => {
      const annotation = annotate(element as HTMLElement, { 
        type: 'highlight', 
        color: '#FFD54F', 
        animate: true,
        padding: [5, 10] // Adjust padding as needed
      });
  
        annotation.show(); // Show highlight on hover
    });

  }  

}
