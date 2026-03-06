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
  animes = [
    { title: 'Tokyo Ghoul', image: 'assets/img/anime1.jpg', status: 'Watching', themes: ['Action', 'Drame'], score: 7.8, episodes: 12 },
    { title: 'Naruto Shippuden', image: 'assets/img/anime2.jpg', status: 'Watching', themes: ['Shonen', 'Combat'], score: 8.5, episodes: 200 },
    { title: 'Zombieland Saga', image: 'assets/img/anime3.webp', status: 'Watching', themes: ['Idol', 'Humour'], score: 7.5, episodes: 12 },
    { title: 'One Piece', image: 'assets/img/anime4.jpg', status: 'Watching', themes: ['Aventure', 'Action'], score: 9.7, episodes: 1200 },
    { title: 'Dandadan', image: 'assets/img/anime5.webp', status: 'Plan to watch', themes: ['Surnaturel'], score: 9.1, episodes: 24 },
    { title: 'Konosuba', image: 'assets/img/anime6.webp', status: 'Plan to watch', themes: ['Isekai', 'Comedy'], score: 7.2, episodes: 13 },
    { title: 'L\'attaque des Titans', image: 'assets/img/anime7.jpg', status: 'En pause', themes: ['Guerre', 'Drame'] , score: 9.1, episodes: 24},
    { title: 'Your Name', image: 'assets/img/anime8.webp', status: 'On hold', themes: ['Film', 'Romance'] , score: 9.6, episodes: 1},
    { title: 'Tokyo Ghoul', image: 'assets/img/anime1.jpg', status: 'On hold', themes: ['Action', 'Drame'] , score: 7.8, episodes: 12},
    { title: 'Naruto Shippuden', image: 'assets/img/anime2.jpg', status: 'Dropped', themes: ['Shonen', 'Combat'] , score: 8.5, episodes: 200 },
    { title: 'Zombieland Saga', image: 'assets/img/anime3.webp', status: 'Dropped', themes: ['Idol', 'Humour'],score: 7.5, episodes: 12  },
    { title: 'One Piece', image: 'assets/img/anime4.jpg', status: 'Completed', themes: ['Aventure', 'Action'],score: 9.7, episodes: 1200 },
    { title: 'Dandadan', image: 'assets/img/anime5.webp', status: 'Completed', themes: ['Surnaturel'], score: 9.1, episodes: 24  },
    { title: 'Konosuba', image: 'assets/img/anime6.webp', status: 'Watching', themes: ['Isekai', 'Comedy'],score: 7.2, episodes: 13 },
    { title: 'L\'attaque des Titans', image: 'assets/img/anime7.jpg', status: 'Completed', themes: ['Guerre', 'Drame'],score: 9.1, episodes: 24 },
    { title: 'Your Name', image: 'assets/img/anime8.webp', status: 'Watching', themes: ['Film', 'Romance'], score: 9.6, episodes: 1 }
  ];

 // Listes pour les filtres
  categories = ['All', 'Completed', 'Watching', 'Plan to watch', 'On hold', 'Dropped'];
  themesList = ['Tous les thèmes', 'Action', 'Aventure', 'Comédie', 'Drame', 'Romance', 'Surnaturel', 'Isekai', 'Shonen'];

  // États actuels
  selectedCategory = 'All';
  selectedTheme = 'Tous les thèmes';
  sortType: 'alpha' | 'score' | 'episodes' = 'alpha';
  sortOrder: 'asc' | 'desc' = 'asc';

  filteredAnimes = [...this.animes];

  constructor() {
    this.applyFilters();
  }

  // Gère le filtrage Statut + Thème
  applyFilters() {
    let result = [...this.animes];

    if (this.selectedCategory !== 'All') {
      result = result.filter(a => a.status === this.selectedCategory);
    }

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

  // Gère le changement de type de tri
  setSortType(type: 'alpha' | 'score' | 'episodes') {
    if (this.sortType === type) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortType = type;
      this.sortOrder = (type === 'alpha') ? 'asc' : 'desc';
    }
    this.applySort();
  }

  applySort() {
    this.filteredAnimes.sort((a, b) => {
      let comp = 0;
      if (this.sortType === 'alpha') comp = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      else if (this.sortType === 'score') comp = a.score - b.score;
      else if (this.sortType === 'episodes') comp = a.episodes - b.episodes;

      return this.sortOrder === 'asc' ? comp : -comp;
    });
  }
}
