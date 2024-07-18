import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/models';
import { UtilityService } from '../services/utility.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  constructor(
    public utilityService: UtilityService,
    private navigationService: NavigationService) { }
    usersPreviousCarts: Cart[] = [];
    usersCart: Cart = {
      id: 0,
      user: this.utilityService.getUser(),
      cartItems: [],
      ordered: false,
      orderedOn: '',
    };
  ngOnInit(): void {
    this.navigationService
    .getAllPreviousCarts(this.utilityService.getUser().id)
    .subscribe((res: any) => {
      this.usersPreviousCarts = res;
    });
  }
  

    

}
