import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SwipeComponent } from './pages/swipe/swipe.component';
import { ListAnimeComponent } from './pages/list-anime/list-anime.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'swipe', component: SwipeComponent },
  { path: 'list', component: ListAnimeComponent },
  { path: 'error404', component: Error404Component },
  { path: '**', redirectTo: '/error404' }
];
