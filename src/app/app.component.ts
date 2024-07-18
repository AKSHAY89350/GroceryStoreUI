import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECommerceUI';
  sideNavStatus = false;
  handleSearch(result: any): void {

    // Process the search results here

    console.log('Search results:', result);

  }
}
