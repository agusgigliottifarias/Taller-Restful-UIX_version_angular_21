import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaysComponent } from './plays/plays.components';
import { PlaysDetailComponent } from './plays/plays-detail.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'plays', component: PlaysComponent},
    {path: 'plays/:id', component: PlaysDetailComponent}

];
