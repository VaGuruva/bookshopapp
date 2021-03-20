import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  books: any = [
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'EWRFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'URFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'YRFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'GRFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'ZRFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'ARFS211565'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
