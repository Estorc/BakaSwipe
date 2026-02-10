import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router'; 

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterLink 
  ],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.scss'
})
export class SwipeComponent {
  constructor(public router: Router) {} 
}