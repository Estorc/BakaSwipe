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
  constructor(private session: SessionService) {}

  onConnectClick() {
    this.session.connect(); // doit compiler (connect existe dans le service)
  }
}
