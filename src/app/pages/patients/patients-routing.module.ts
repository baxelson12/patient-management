import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import { StandardComponent } from './standard/standard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    component: StandardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'edit', component: EditorComponent },
      { path: 'edit/:id', component: EditorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
