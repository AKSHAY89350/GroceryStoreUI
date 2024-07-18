import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  suggestedProducts: SuggestedProduct[] = [
    {
      banerimage: 'Baner/Big_Mart.png',
      category: {
        id: 0,
        category: 'kitchen',
        subCategory: 'Kitchen-Appliances',
      },
    },
    {
      banerimage: 'Baner/Sale_Banner.png',
      category: {
        id: 1,
        category: 'foodgrains',
        subCategory: 'Wheat & Wheat-Product',
      },
    },
    {
      banerimage: 'Baner/Cookies.png',
      category: {
        id: 1,
        category: 'Biscuits',
        subCategory: 'Cookies',
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
