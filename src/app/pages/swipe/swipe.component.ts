import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';

interface Card {
  id: number;
  title: string;
  tags: Array<string>;
  episodes: string;
  rating: string;
  desc: string;
  image: string;
}


@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss'],
})
export class SwipeComponent {

  parsingDetails(card: Card): void {
    this.sessionService.getAnimeDetails(card.id).then(value => {
      console.log(value);
      card.tags = value.details.genres.map((genre: any) => genre.name).slice(0, 3);
      card.episodes = value.details.num_episodes ? `${value.details.num_episodes} épisodes` : "";
      card.rating = `⭐ ${value.details.mean}`;
      card.desc = `${value.details.synopsis}`;
    });
  }

  parsingCards(results: any[]): Card[] {
    return results.map(item => {

      let card: Card = {
        id: item.node.id,
        title: item.node.title,
        tags: [],
        episodes: ``,
        rating: ``,
        desc: "",
        image: item.node.main_picture.large
      }
      this.parsingDetails(card);
      return card;
    });
  }

  constructor(private sessionService: SessionService) {
    this.sessionService.suggest().then(results => {
      this.cards = this.parsingCards(results);
    });
  }

  @ViewChild('hero') heroRef!: ElementRef<HTMLElement>;

  animating = false;
  dragging = false;

  cards: Card[] = [
    {
      id: 0,
      title: 'L\'API à crash',
      tags: ['Victor est magnifique'],
      episodes: '67 épisodes',
      rating: '⭐ 6.9',
      desc: 'Skibidi skibidi hawk tuah hawk',
      image: 'https://cdn.pixabay.com/photo/2019/03/31/20/39/foal-4093986_1280.jpg'
    },
    {
      id: 0,
      title: 'L\'API à crash',
      tags: ['Allez stream deadline'],
      episodes: 'Cébastien épisodes',
      rating: '⭐ 8.4',
      desc: '4 goats qui chantent',
      image: 'https://www.rollingstone.fr/wp-content/uploads/2026/03/blackpink-deadline-review.jpg'
    },
    {
      id: 0,
      title: 'L\'API à crash',
      tags: ['Mario 64'],
      episodes: '∞ épisodes',
      rating: '⭐ 999999',
      desc: 'Kaze Emmanuar, le Dieu unique de ce monde oblitère l\'humanité',
      image: 'https://i.ytimg.com/vi/QbuoUH7TnvM/sddefault.jpg'
    }
  ];

  currentIndex = 0;

  x = 0;
  y = 0;
  rotation = 0;
  startX = 0;
  startY = 0;

  startDrag(event: PointerEvent) {
    this.dragging = true;
    this.startX = event.clientX - this.x;
    this.startY = event.clientY - this.y;
    this.heroRef.nativeElement.setPointerCapture(event.pointerId);
  }

  onDrag(event: PointerEvent) {
    if (!this.dragging) return;
    this.x = event.clientX - this.startX;
    this.y = event.clientY - this.startY;
    this.rotation = this.x / 12;
  }

  endDrag(event: PointerEvent) {
    if (!this.dragging) return;
    this.dragging = false;

    this.heroRef.nativeElement.releasePointerCapture(event.pointerId);

    if (this.x > 150 || this.x < -150 || this.y < -250) {
      this.currentIndex++;
      if (this.currentIndex >= this.cards.length) {
        this.currentIndex = 0;
      }
    }

    this.x = 0;
    this.y = 0;
    this.rotation = 0;
  }

  onClick() {
    console.log('Carte cliquée');
  }
}
