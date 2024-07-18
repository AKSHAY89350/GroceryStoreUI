import { Component, OnInit } from '@angular/core';
import { Product } from '../models/models';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ngOnInit(): void {
  }
  imageIndex: number = 1;

  query = '';

  searchResults: Product[] = [];

  constructor(private navigationService: NavigationService, private router: Router) { }

  onSearch(): void {

    if (this.query.trim() !== '') {

      this.navigationService.searchItems(this.query).subscribe(

        (results: any) => {

          this.searchResults = results;

        },

        (error: any) => {

          console.log('Error searching items:', error);

        }

      );

    }

  }

  redirectToProduct(productId: number) {

    this.router.navigate(['/product-details'], { queryParams: { id: productId } });
    
  }
  goToHome() {

    this.router.navigate(['/home']); 

  }


}
