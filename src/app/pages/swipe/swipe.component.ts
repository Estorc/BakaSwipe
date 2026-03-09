import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { FormsModule} from '@angular/forms'

interface Card {
  title: string;
  tag: string;
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
    FormsModule,
  ],
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss'],
})
export class SwipeComponent {

  parsingDetails(card: Card): void {
    card.tag = card.tag || "";
    card.episodes = `${card.tag} épisodes`;
    card.rating = `⭐ ${card.rating}`;
    card.desc = `${card.desc}`;
  }

  parsingCards(results: any[]): Card[] {
    return results.map(item => {

      let card: Card = {
        title: item.node.title,
        tag: "",
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

  cards: Card[] = [
    {
      title: 'L\'API à crash',
      tag: 'Victor est magnifique',
      episodes: '67 épisodes',
      rating: '⭐ 6.9',
      desc: 'Skibidi skibidi hawk tuah hawk',
      image: 'https://cdn.pixabay.com/photo/2019/03/31/20/39/foal-4093986_1280.jpg'
    },
    {
      title: 'L\'API à crash',
      tag: 'Allez stream deadline',
      episodes: 'Cébastien épisodes',
      rating: '⭐ 8.4',
      desc: '4 goats qui chantent',
      image: 'https://www.rollingstone.fr/wp-content/uploads/2026/03/blackpink-deadline-review.jpg'
    },
    {
      title: 'L\'API à crash',
      tag: 'Mario 64',
      episodes: '∞ épisodes',
      rating: '⭐ 999999',
      desc: 'Kaze Emmanuar, le Dieu unique de ce monde oblitère l\'humanité',
      image: 'https://i.ytimg.com/vi/QbuoUH7TnvM/sddefault.jpg'
    }
  ];

  animating = false;
  dragging = false;
  currentIndex = 0;
  showDescription = false;
  ratingValue = 8;
  selectedStatus: string = '';
  x = 0;
  y = 0;
  rotation = 0;
  startX = 0;
  startY = 0;
  
  statusList = ['Watching', 'Completed', 'Plan to watch', 'On hold', 'Dropped'];
  selectStatus(status: string) {
    this.selectedStatus = status;
    console.log('Statut sélectionné :', status);
  }
  startDrag(event: PointerEvent) {
    if (this.showDescription) return;
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
    //DETECTION SWIPE HAUT
    if (this.y < -100 && Math.abs(this.x) < 80){
      this.showDescription = true;
    }
    //DETECTION SWIPE BAS
    else if (this.y > 100 && this.showDescription) {
      this.showDescription = false;
    }
    else if ((this.x > 150 || this.x < -150) && this.showDescription == false) {
      this.currentIndex++;
      if (this.currentIndex >= this.cards.length) {
        this.currentIndex = 0;
      }
    }

    this.x = 0;
    this.y = 0;
    this.rotation = 0;
  }


  cross() {
      this.currentIndex++;
      if (this.currentIndex >= this.cards.length) {
        this.currentIndex = 0;
      }
  }

  heart() {
      this.currentIndex++;
      if (this.currentIndex >= this.cards.length) {
        this.currentIndex = 0;
      }
  }

  onClick() {
    console.log('Carte cliquée');
  }
}
