import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { MetricComponent } from './metric/metric.component';
import { NavComponent } from './nav/nav.component';
import { NotificationComponent } from './notification/notification.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PatientsRoutingModule } from '../pages/patients/patients-routing.module';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    CardComponent,
    MetricComponent,
    NavComponent,
    NotificationComponent,
    SidebarComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule
  ],
  exports: [
    CardComponent,
    MetricComponent,
    NavComponent,
    NotificationComponent,
    SidebarComponent,
    InputComponent
  ]
})
export class ComponentsModule {}
