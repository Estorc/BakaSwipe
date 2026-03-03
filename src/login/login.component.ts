import { Component } from '@angular/core';
import { SessionService } from '../session/session.service'; // <- chemin CORRECT
import { TabBarComponent } from '../app/tab-bar/tab-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TabBarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private session: SessionService) {}

  onConnectClick() {
    this.session.connect(); // doit compiler (connect existe dans le service)
  }
}
