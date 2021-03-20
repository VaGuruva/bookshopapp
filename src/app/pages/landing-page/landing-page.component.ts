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
      isbn: 'TRFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'TRFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'TRFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'TRFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'TRFS211565'
    },
    {
      title: 'Falcon',
      price: 'R12,67',
      publisher: 'BookMart',
      authors: ['Smith', 'Cohen'],
      isbn: 'TRFS211565'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
