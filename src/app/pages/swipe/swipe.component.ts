import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../../services/session/session.service';
import { FormsModule } from '@angular/forms'
import { NoteSliderComponent } from "../../components/note-slider/note-slider.component";


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
    FormsModule,
    NoteSliderComponent
],
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss'],
})
export class SwipeComponent {

  constructor(private sessionService: SessionService) {
    this.sessionService.isSessionValid().then(valid => {
      if (!valid) {
        // Rediriger vers la page de connexion
        window.location.href = '/login';
      }
    });
    this.sessionService.suggest(0).then(results => {
      this.cards = this.parsingCards(results);
    });
  }

  parsingCards(results: any[]): Card[] {
    this.parsing = false;
    return results.map(item => {

      let card: Card = {
        id: item.node.id,
        title: item.node.title,
        tags: item.node.genres.map((genre: any) => genre.name).slice(0, 3),
        episodes: item.node.num_episodes ? `${item.node.num_episodes} épisodes` : "",
        rating: `⭐ ${item.node.mean}`,
        desc: `${item.node.synopsis}`,
        image: item.node.main_picture.large
      }
      return card;
    });
  }

  @ViewChild('hero') heroRef!: ElementRef<HTMLElement>;

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

  animating = false;
  dragging = false;
  currentIndex = 0;
  showDescription = false;
  selectedStatus?: "watching" | "completed" | "plan_to_watch" | "on_hold" | "dropped" = "plan_to_watch";
  parsing = false;
  x = 0;
  y = 0;
  rotation = 0;
  startX = 0;
  startY = 0;
  showRating = false;


  selectNext() {
    this.currentIndex++;
    if (this.currentIndex >= this.cards.length - 5 && this.parsing == false) {
      this.parsing = true;
      //this.currentIndex = 0;
      console.log('Chargement de nouvelles cartes...');
      setTimeout(()=>{this.sessionService.suggest(this.cards.length)
        .then(results => {
          this.cards = this.cards.concat(this.parsingCards(results));
        })
        .catch(error => {
          console.error('Erreur lors du chargement des cartes :', error);
          this.parsing = false;
        });} ,1500);
      
    }
    this.showDescription = false;
    this.selectedStatus = 'plan_to_watch';
  }
  statusList = [
    { label: 'Watching', value: 'watching' },
    { label: 'Completed', value: 'completed' },
    { label: 'Plan to watch', value: 'plan_to_watch' },
    { label: 'On hold', value: 'on_hold' },
    { label: 'Dropped', value: 'dropped' }
  ] as const;

  selectStatus(status: typeof this.statusList[number]) {
    this.selectedStatus = status.value;
    console.log('Statut sélectionné :', this.selectedStatus);
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
    if (this.y < -100 && Math.abs(this.x) < 80) {
      this.showDescription = true;
    }

    // SWIPE DROITE
    else if (this.x > 150 && this.showDescription == false) {
      this.showRating = true;
    }
    
    // SWIPE GAUCHE
    else if (this.x < -150 && this.showDescription == false) {
      this.selectNext();
    }

    this.x = 0;
    this.y = 0;
    this.rotation = 0;
  }

  handleRatingRight(rating: number) {
    console.log("Note choisie :", rating); // 1..10
    
    this.sessionService.updateStatus(
      this.cards[this.currentIndex].id,
      {
        status: "completed",
        score: rating,
      }
    ).then(() => {

      this.showRating = false;

      this.selectNext();

    });
  }

  handleRatingUp(rating: number) {
    console.log("Note choisie :", rating); // 1..10
    
    this.sessionService.updateStatus(
      this.cards[this.currentIndex].id,
      {
        status: this.selectedStatus,
        score: rating,
      }
    ).then(() => {

      this.showRating = false;

      this.selectNext();

    });
  }

  cross() {
    this.selectNext();
  }

  heart() {
    this.showRating = true;
  }

  onClick() {
    console.log('Carte cliquée');
  }
}
