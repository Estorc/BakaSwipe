import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router'; 
import { TabBarComponent } from '../app/tab-bar/tab-bar.component';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    TabBarComponent
  ],
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent {
  constructor(public router: Router) {} 

  x = 0;
  y = 0;
  startX = 0;
  startY = 0;
  rotation = 0;
  dragging = false;

  startDrag(event: PointerEvent) {
    this.dragging = true;
    this.startX = event.clientX - this.x;
    this.startY = event.clientY - this.y;
  }

  onDrag(event: PointerEvent) {
    if (!this.dragging) return;
    this.x = event.clientX - this.startX;
    this.y = event.clientY - this.startY;
    this.rotation = this.x / 10; // rotation selon déplacement horizontal
  }

  endDrag(event: PointerEvent) {
    if (!this.dragging) return;
    this.dragging = false;

    if (this.x > 150){
      console.log('Swiped right');
      this.x = 0;
      this.y = 0;
    }
    else if (this.x < -150) console.log('Swiped left');
    else if (this.y < -250) console.log('Swiped up');
    else console.log('Swipe canceled');

    this.x = 0;
    this.y = 0;
    this.rotation = 0;
  }
}
