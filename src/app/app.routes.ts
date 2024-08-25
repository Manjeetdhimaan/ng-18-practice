import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home - Angular 18',
        component: HomeComponent
    },
    {
        path: "users",
        title: 'Users - Angular 18',
        loadComponent: () => import('./pages/users/users.component').then(component => component.UsersComponent)
    },
    {
        path: "new-user",
        title: 'Add new user - Angular 18',
        loadComponent: () => import('./components/new-user/new-user.component').then(component => component.NewUserComponent),
    
    },
    {
        path: 'new-user/:userId',
        title: 'Edit user - Angular 18',
        loadComponent: () => import('./components/new-user/new-user.component').then(component => component.NewUserComponent),
    }
];
