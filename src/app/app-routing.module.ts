import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth/garuds/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },

  // Wildcard route for handling undefined routes (404)
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
