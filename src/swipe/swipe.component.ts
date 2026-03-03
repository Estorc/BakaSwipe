import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router'; 
import { TabBarComponent } from '../app/tab-bar/tab-bar.component';
import { SessionService } from '../session/session.service';

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
    TabBarComponent
  ],
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss'],
})
export class SwipeComponent {

  parsingCards(results: any[]): Card[] {
    return results.map(item => ({
      title: item.node.title,
      tag: "UF",
      episodes: `${"UF"} épisodes`,
      rating: `⭐ ${"UF"}`,
      desc: "UF",
      image: item.node.main_picture.large
    }));
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
      title: 'Attack on Titan',
      tag: 'Action',
      episodes: '67 épisodes',
      rating: '⭐ 8.9',
      desc: 'Des humains luttent contre des titans et les titans mangent les humains.',
      image: 'https://fr.web.img6.acsta.net/pictures/20/12/28/10/24/5603983.jpg'
    },
    {
      title: 'Boku no Hero Academia',
      tag: 'Shonen',
      episodes: '138 épisodes',
      rating: '⭐ 8.4',
      desc: 'Des élèves apprennent à devenir des héros.',
      image: 'https://static.wikia.nocookie.net/bokunoheroacademia/images/e/e9/Heroes_Rising_Promotional_Poster_2.png/revision/latest?cb=20200314090705&path-prefix=fr'
    },
    {
      title: 'One Piece',
      tag: 'Aventure',
      episodes: '1000+ épisodes',
      rating: '⭐ 10.0',
      desc: 'Luffy cherche le One Piece.',
      image: 'https://i.redd.it/tkvidtjd4tj61.jpg'
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