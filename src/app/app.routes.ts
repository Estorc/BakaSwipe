import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SwipeComponent } from '../swipe/swipe.component';
import { ListAnimeComponent } from './list-anime/list-anime.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'swipe', component: SwipeComponent },
  { path: 'list', component: ListAnimeComponent},
  { path: '**', redirectTo: '/login' }
];