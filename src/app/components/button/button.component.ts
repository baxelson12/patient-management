import { Component, Input } from '@angular/core';

/*
  Usage:
  <app-button color="green" type="submit">
    Submit
  </app-button>
*/

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type = 'button';
  @Input() color = 'blue';

  // Create tailwind class names
  get bg() {
    const base = ['bg', this.color, '500'].join('-');
    const hover = ['hover:bg', this.color, '400'].join('-');
    return [base, hover].join(' ');
  }
  get border() {
    const base = ['border', this.color, '700'].join('-');
    const hover = ['hover:border', this.color, '500'].join('-');
    const active = ['active:border', this.color, '400'].join('-');
    return [base, hover, active].join(' ');
  }

  // Join classes together for use
  get styling() {
    return [this.bg, this.border].join(' ');
  }
}
