import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditorComponent } from './pages/editor/editor.component';
import { LoginComponent } from './pages/login/login.component';
import { StandardComponent } from './layout/standard/standard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'patients',
    component: StandardComponent,
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
