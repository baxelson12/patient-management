import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { MetricComponent } from './metric/metric.component';
import { NavComponent } from './nav/nav.component';
import { NotificationComponent } from './notification/notification.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PatientsRoutingModule } from '../pages/patients/patients-routing.module';

@NgModule({
  declarations: [
    CardComponent,
    MetricComponent,
    NavComponent,
    NotificationComponent,
    SidebarComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, PatientsRoutingModule],
  exports: [
    CardComponent,
    MetricComponent,
    NavComponent,
    NotificationComponent,
    SidebarComponent
  ]
})
export class ComponentsModule {}
