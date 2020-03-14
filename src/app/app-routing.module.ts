import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';
import { LoginComponent } from './pages/login/login.component';

const redirectLoggedInToPatients = () =>
  redirectLoggedInTo(['patients']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToPatients)
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./pages/patients/patients.module').then(
        m => m.PatientsModule
      )
  },
  { path: '', redirectTo: '/patients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
