import { Component, OnInit, Input } from '@angular/core';

/*
  Usage:
  <app-metric color="blue">
    <span metric-title>Total Users</span>
    <span>2900</span>
    <span>
      <i class="fas fa-caret-up"></i>
    </span>
  </app-metric>
*/

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit {
  @Input() color: string;

  get definedBorder() {
    return 'border-' + this.color + '-600';
  }
  get definedBg() {
    return 'bg-' + this.color + '-100';
  }
  get definedIcon() {
    return 'bg-' + this.color + '-600';
  }

  constructor() {}
  ngOnInit(): void {}
}
