import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type = 'button';
  @Input() color = 'blue';

  get bg() {
    const base = ['bg', this.color, '500'].join('-');
    const hover = ['hover:bg', this.color, '400'].join('-');
    return [base, hover].join(' ');
  }
  get border() {
    const base = ['border', this.color, '700'].join('-');
    const hover = ['hover:border', this.color, '500'].join('-');
    const active = ['active:border', this.color, '400'].join('-');
    console.log('Base', base);
    return [base, hover, active].join(' ');
  }

  get styling() {
    return [this.bg, this.border].join(' ');
  }
  constructor() {}
  ngOnInit(): void {}
}
