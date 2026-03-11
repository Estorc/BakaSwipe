import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-slider',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule
  ],
  templateUrl: './note-slider.component.html',
  styleUrls: ['./note-slider.component.scss'] 
})
export class NoteSliderComponent {
  ratingValue = 1;

  noteSlider() {
    console.log(this.ratingValue);
  }
}