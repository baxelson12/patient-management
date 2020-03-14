import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card/card.component';
import { MetricComponent } from './metric/metric.component';
import { NavComponent } from './nav/nav.component';
import { NotificationComponent } from './notification/notification.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    CardComponent,
    MetricComponent,
    NavComponent,
    NotificationComponent,
    SidebarComponent
  ],
  imports: [CommonModule]
})
export class ComponentsModule {}
