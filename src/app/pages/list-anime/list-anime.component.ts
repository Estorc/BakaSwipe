import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { SessionService } from '../../services/session/session.service';


@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule],
  templateUrl: './list-anime.component.html',
  styleUrls: ['./list-anime.component.scss']
})
export class ListAnimeComponent implements OnInit {
  /* animes = [
    { title: 'Tokyo Ghoul', image: 'assets/img/anime1.jpg', status: 'Watching', themes: ['Action', 'Drame'], score: 7.8, episodes: 12 },
    { title: 'Naruto Shippuden', image: 'assets/img/anime2.jpg', status: 'Watching', themes: ['Shonen', 'Combat'], score: 8.5, episodes: 200 },
    { title: 'Zombieland Saga', image: 'assets/img/anime3.webp', status: 'Watching', themes: ['Idol', 'Humour'], score: 7.5, episodes: 12 },
    { title: 'One Piece', image: 'assets/img/anime4.jpg', status: 'Watching', themes: ['Aventure', 'Action'], score: 9.7, episodes: 1200 },
    { title: 'Dandadan', image: 'assets/img/anime5.webp', status: 'Plan to watch', themes: ['Surnaturel'], score: 9.1, episodes: 24 },
    { title: 'Konosuba', image: 'assets/img/anime6.webp', status: 'Plan to watch', themes: ['Isekai', 'Comedy'], score: 7.2, episodes: 13 },
    { title: 'L\'attaque des Titans', image: 'assets/img/anime7.jpg', status: 'En pause', themes: ['Guerre', 'Drame'], score: 9.1, episodes: 24 },
    { title: 'Your Name', image: 'assets/img/anime8.webp', status: 'On hold', themes: ['Film', 'Romance'], score: 9.6, episodes: 1 },
    { title: 'Tokyo Ghoul', image: 'assets/img/anime1.jpg', status: 'On hold', themes: ['Action', 'Drame'], score: 7.8, episodes: 12 },
    { title: 'Naruto Shippuden', image: 'assets/img/anime2.jpg', status: 'Dropped', themes: ['Shonen', 'Combat'], score: 8.5, episodes: 200 },
    { title: 'Zombieland Saga', image: 'assets/img/anime3.webp', status: 'Dropped', themes: ['Idol', 'Humour'], score: 7.5, episodes: 12 },
    { title: 'One Piece', image: 'assets/img/anime4.jpg', status: 'Completed', themes: ['Aventure', 'Action'], score: 9.7, episodes: 1200 },
    { title: 'Dandadan', image: 'assets/img/anime5.webp', status: 'Completed', themes: ['Surnaturel'], score: 9.1, episodes: 24 },
    { title: 'Konosuba', image: 'assets/img/anime6.webp', status: 'Watching', themes: ['Isekai', 'Comedy'], score: 7.2, episodes: 13 },
    { title: 'L\'attaque des Titans', image: 'assets/img/anime7.jpg', status: 'Completed', themes: ['Guerre', 'Drame'], score: 9.1, episodes: 24 },
    { title: 'Your Name', image: 'assets/img/anime8.webp', status: 'Watching', themes: ['Film', 'Romance'], score: 9.6, episodes: 1 }
  ]; */

  animes: any[] = [];
  filteredAnimes: any[] = [];

  // Listes pour les filtres
  categories = ['All', 'completed', 'watching', 'plan_to_watch', 'on_hold', 'dropped'];
  themesList: string[] = ['Tous les thèmes'];
  // États actuels
  selectedCategory = 'All';
  selectedTheme = 'Tous les thèmes';
  sortType: 'alpha' | 'score' | 'episodes' = 'alpha';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private sessionService: SessionService) { }

  async ngOnInit() {
    const valid = await this.sessionService.isSessionValid();
    if (!valid) {
      window.location.href = '/login';
      return;
    }

    this.loadUserAnimeList();
  }

  loadUserAnimeList() {
    this.sessionService.loadUserAnimeList()
      .then(response => {
        if (!response) {
          setTimeout(() => {
            this.loadUserAnimeList();
          }, 500)
          return;
        }
        // On cherche le tableau d'animes (soit dans response.data, soit response lui-même)
        const rawList = response?.details?.data || (Array.isArray(response) ? response : null);

        if (rawList) {
          this.animes = rawList.map((item: any) => {
            const genres = item.node?.genres?.map((g: any) => g.name) || [];
            return {
              title: item.node?.title || 'Sans titre',
              image: item.node?.main_picture?.large || item.node?.main_picture?.medium || '',
              status: item.node?.my_list_status?.status || 'watching',
              score: item.node?.my_list_status?.score || 0,
              episodes: item.node?.num_episodes || 0,
              themes: genres // MAL ne renvoie pas les thèmes ici
            };
          });
          this.generateThemesList();
          // On initialise filteredAnimes avant d'appliquer les filtres pour éviter une liste vide
          this.filteredAnimes = [...this.animes];
          this.applyFilters();
        } else {
          console.error('Aucune donnée trouvée dans la réponse:', response);
        }
      })
      .catch(error => {
        setTimeout(() => {
          this.loadUserAnimeList();
        }, 500)
        console.error('Erreur lors du chargement de la liste d\'animes :', error);
      });

  }

  generateThemesList() {
    // 1. On compte les occurrences de chaque thème
    const counts: { [key: string]: number } = {};

    this.animes.forEach(anime => {
      anime.themes.forEach((theme: string) => {
        counts[theme] = (counts[theme] || 0) + 1;
      });
    });

    // 2. On transforme l'objet en un tableau de noms de thèmes
    const sortedThemes = Object.keys(counts).sort((a, b) => {
      // On trie par nombre d'apparitions (du plus grand au plus petit)
      const diff = counts[b] - counts[a];

      // Si deux thèmes ont le même nombre, on trie par ordre alphabétique
      return diff !== 0 ? diff : a.localeCompare(b);
    });

    // 3. On met à jour la liste avec "Tous les thèmes" en premier
    this.themesList = ['Tous les thèmes', ...sortedThemes];

    console.log('Thèmes triés par popularité :', counts);
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
