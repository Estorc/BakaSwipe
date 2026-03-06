import { Component } from '@angular/core';
import { SessionService } from '../../services/session/session.service'; // <- chemin CORRECT

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private session: SessionService) {
    if (this.session.isConnected()) {
      // Redirect to /swipe
      window.location.href = '/swipe';
    }
  }



  async onConnectClick() {
    await this.session.connect(); // doit compiler (connect existe dans le service)
    if (await this.session.checkSession(this.session.getSessionId())) {
      // L'utilisateur est maintenant connecté, vous pouvez rediriger
      window.location.href = '/swipe';
    }
  }
}
