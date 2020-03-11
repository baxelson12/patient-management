import { Component, OnInit } from '@angular/core';

/*
  Usage:
  <app-card>
    <span card-title>Graph</span>
    <p>This is a standard card.</p>
  </app-card>
*/

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
