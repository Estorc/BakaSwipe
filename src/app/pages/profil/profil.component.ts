import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  constructor(private session: SessionService) {
    if (this.session.isConnected()) {
      
    }
  }
  pseudo: string = "Pseudo";
  profileImageUrl: string = "https://vstatic.vietnam.vn/vietnam/resource/IMAGE/2026/02/06/1770336382885_faa27f8d3f84b1dae895-17703071868811077607901.jpeg";

  async onDisconnectClick() {
    await this.session.disconnect();
    window.location.href = '/login';

  }
}
