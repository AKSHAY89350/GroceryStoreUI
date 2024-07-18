import { Component, OnInit } from '@angular/core';
import { Cart, Payment } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  usersPreviousCarts: Cart[] = [];

  constructor(
    public utilityService: UtilityService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    // Get Cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;

        // Calculate Payment
        this.utilityService.calculatePayment(
          this.usersCart,
          this.usersPaymentInfo
        );
      });

    // Get Previous Carts
    this.navigationService
      .getAllPreviousCarts(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersPreviousCarts = res;
      });
  }
  removeCartItem(index: number) {
    if (index >= 0 && index < this.usersCart.cartItems.length) {
      const cartItem = this.usersCart.cartItems[index];
  
      this.navigationService.removeCartItem(cartItem.id).subscribe(
        () => {
          // Successful update
          this.usersCart.cartItems.splice(index, 1);
          this.utilityService.calculatePayment(
            this.usersCart,
            this.usersPaymentInfo
            
          );
          location.reload();
        },
        (error: any) => {
          console.error('Error removing cart item:', error);
          const errorMessage = 'Failed to remove the cart item.';
          alert(errorMessage);
        }
      );
    }
  }
}
