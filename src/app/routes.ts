import { Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { TrainComponent } from './train/train.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'train', component: TrainComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];