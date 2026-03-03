import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TabBarComponent } from '../tab-bar/tab-bar.component';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule,TabBarComponent],
  templateUrl: './list-anime.component.html',
  styleUrls: ['./list-anime.component.scss']
})
export class ListAnimeComponent {
  animes = [
    { title: 'Tokyo Ghoul', image: 'assets/img/anime1.jpg', status: 'Vue', themes: ['Action', 'Drame'] },
    { title: 'Naruto Shippuden', image: 'assets/img/anime2.jpg', status: 'Vue', themes: ['Shonen', 'Combat'] },
    { title: 'Zombieland Saga', image: 'assets/img/anime3.webp', status: 'Vue', themes: ['Idol', 'Humour'] },
    { title: 'One Piece', image: 'assets/img/anime4.jpg', status: 'Vue', themes: ['Aventure', 'Action'] },
    { title: 'Dandadan', image: 'assets/img/anime5.webp', status: 'À regarder plus tard', themes: ['Surnaturel'] },
    { title: 'Konosuba', image: 'assets/img/anime6.webp', status: 'À regarder plus tard', themes: ['Isekai', 'Comedy'] },
    { title: 'L\'attaque des Titans', image: 'assets/img/anime7.jpg', status: 'En pause', themes: ['Guerre', 'Drame'] },
    { title: 'Your Name', image: 'assets/img/anime8.webp', status: 'En pause', themes: ['Film', 'Romance'] },
    { title: 'Tokyo Ghoul', image: 'assets/img/anime1.jpg', status: 'En pause', themes: ['Action', 'Drame'] },
    { title: 'Naruto Shippuden', image: 'assets/img/anime2.jpg', status: 'Abandonné', themes: ['Shonen', 'Combat'] },
    { title: 'Zombieland Saga', image: 'assets/img/anime3.webp', status: 'Abandonné', themes: ['Idol', 'Humour'] },
    { title: 'One Piece', image: 'assets/img/anime4.jpg', status: 'En train de regarder', themes: ['Aventure', 'Action'] },
    { title: 'Dandadan', image: 'assets/img/anime5.webp', status: 'En train de regarder', themes: ['Surnaturel'] },
    { title: 'Konosuba', image: 'assets/img/anime6.webp', status: 'Vue', themes: ['Isekai', 'Comedy'] },
    { title: 'L\'attaque des Titans', image: 'assets/img/anime7.jpg', status: 'En train de regarder', themes: ['Guerre', 'Drame'] },
    { title: 'Your Name', image: 'assets/img/anime8.webp', status: 'Vue', themes: ['Film', 'Romance'] }
  ];

categories = ['Tout', 'Vue', 'En train de regarder', 'À regarder plus tard', 'En pause', 'Abandonné'];
  
  // On génère la liste des thèmes dynamiquement à partir des données
  themesList = ['Tous les thèmes', 'Action', 'Aventure', 'Comédie', 'Drame', 'Romance', 'Surnaturel', 'Isekai'];

  selectedCategory = 'Tout';
  selectedTheme = 'Tous les thèmes';
  sortOrder: 'asc' | 'desc' = 'asc';
  filteredAnimes = [...this.animes];

  constructor() {
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.animes];

    // 1. Filtre par Statut (Vue, En pause...)
    if (this.selectedCategory !== 'Tout') {
      result = result.filter(a => a.status === this.selectedCategory);
    }

    // 2. Filtre par Thème (Action, Drame...)
    if (this.selectedTheme !== 'Tous les thèmes') {
      result = result.filter(a => a.themes.includes(this.selectedTheme));
    }

    this.filteredAnimes = result;
    this.applySort();
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  filterByTheme(theme: string) {
    this.selectedTheme = theme;
    this.applyFilters();
  }

  toggleSort() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applySort();
  }

  applySort() {
    this.filteredAnimes.sort((a, b) => {
      const tA = a.title.toLowerCase();
      const tB = b.title.toLowerCase();
      return this.sortOrder === 'asc' ? tA.localeCompare(tB) : tB.localeCompare(tA);
    });
  }
}