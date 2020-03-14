import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ComponentsModule } from '../../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { StandardComponent } from './standard/standard.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsState } from 'src/app/state/patients/patients.state';

@NgModule({
  declarations: [
    DashboardComponent,
    EditorComponent,
    StandardComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    ComponentsModule,
    NgxsModule.forFeature([PatientsState])
  ]
})
export class PatientsModule {}
