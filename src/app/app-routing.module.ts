import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditorComponent } from './pages/editor/editor.component';
import { LoginComponent } from './pages/login/login.component';
import { StandardComponent } from './layout/standard/standard.component';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['login']);
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
    component: StandardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'edit', component: EditorComponent },
      { path: 'edit/:id', component: EditorComponent }
    ]
  },
  { path: '', redirectTo: '/patients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
