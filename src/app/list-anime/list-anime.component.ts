import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule],
  templateUrl: './list-anime.component.html',
  styleUrls: ['./list-anime.component.scss']
})
export class ListAnimeComponent {
  // Simulation de la base de données d'animes
  animes = [
    { title: 'Tokyo Ghoul', image: 'assets/img/anime1.jpg' },
    { title: 'Naruto Shippuden', image: 'assets/img/anime2.jpg' },
    { title: 'Zombieland Saga', image: 'assets/img/anime3.webp' },
    { title: 'One piece', image: 'assets/img/anime4.jpg' },
    { title: 'Dandadan', image: 'assets/img/anime5.webp' },
    { title: 'Konosuba', image: 'assets/img/anime6.webp' },
    { title: 'L attaque des Titans', image: 'assets/img/anime7.jpg' },
    { title: 'Your Name', image: 'assets/img/anime8.webp' },
    { title: 'Tokyo Ghoul', image: 'assets/img/anime1.jpg' },
    { title: 'Naruto Shippuden', image: 'assets/img/anime2.jpg' },
    { title: 'Zombieland Saga', image: 'assets/img/anime3.webp' },
    { title: 'One piece', image: 'assets/img/anime4.jpg' },
    { title: 'Dandadan', image: 'assets/img/anime5.webp' },
    { title: 'Konosuba', image: 'assets/img/anime6.webp' },
    { title: 'L attaque des Titans', image: 'assets/img/anime7.jpg' },
    { title: 'Your Name', image: 'assets/img/anime8.webp' }
  ];

  categories = ['Vue', 'À regarder plus tard', 'En pause', 'Abandonné'];
}