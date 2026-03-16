import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SessionService } from '../../services/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  pseudo: string = "Chargement...";
  //Rosé
  //profileImageUrl: string = "https://vstatic.vietnam.vn/vietnam/resource/IMAGE/2026/02/06/1770336382885_faa27f8d3f84b1dae895-17703071868811077607901.jpeg";
  //Caca
  //profileImageUrl: string = "https://cdn.pixabay.com/photo/2019/04/06/21/29/poop-4108423_1280.jpg";
  profileImageUrl: string = "https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png";
  constructor(
    private session: SessionService,
    private router: Router
  ){}
  async ngOnInit() {
    // 1. On vérifie si la session est toujours valide
    const valid = await this.session.isSessionValid();
    
    if (!valid) {
      this.router.navigate(['/login']);
      return;
    }

    // 2. On récupère les infos de l'utilisateur stockées dans le service
    // Supposons que ton service stocke l'utilisateur après login/check
    const user = await this.session.getUserInfo(); // Ajuste selon le nom de ta méthode

      this.pseudo = user.details.name || "Utilisateur";
      this.profileImageUrl = user.details.picture || this.profileImageUrl;
    //affiche les infos de l'utilisateur
    console.log(`User info:`, user);
  }

  async onDisconnectClick() {
    await this.session.disconnect();
    window.location.href = '/login';

  }
}
