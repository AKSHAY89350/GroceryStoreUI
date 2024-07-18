import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject, window } from 'rxjs';
import { Cart, Payment, Product, User } from '../models/models';
import { NavigationService } from './navigation.service';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  changeCart = new Subject();

  constructor(
    private navigationService: NavigationService,
    private jwt: JwtHelperService,
    private location: Location
  ) {}

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

  // JWT Helper Service : npm install @auth0/angular-jwt

  getUser(): User {
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdAt: token.createdAt,
      modifiedAt: token.modifiedAt,
    };
    return user;
  }

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
    
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.location.go('/');
    location.reload();
  }

  addToCart(product: Product) {
    let productid = product.id;
    let userid = this.getUser().id;

    this.navigationService.addToCart(userid, productid).subscribe((res) => {
      if (res.toString() === 'inserted') this.changeCart.next(1);
    });
  }

  calculatePayment(cart: Cart, payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartitem of cart.cartItems) {
      payment.totalAmount += cartitem.product.price;

      payment.amountReduced +=
        cartitem.product.price -
        this.applyDiscount(
          cartitem.product.price,
          cartitem.product.offer.discount
        );

      payment.amountPaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.offer.discount
      );
    }

    if (payment.amountPaid > 5000) payment.shipingCharges = 200;
    else if (payment.amountPaid > 2000) payment.shipingCharges = 100;
    else if (payment.amountPaid > 500) payment.shipingCharges = 50;
    else payment.shipingCharges = 0;
  }

  calculatePricePaid(cart: Cart) {
    let pricepaid = 0;
    for (let cartitem of cart.cartItems) {
      pricepaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.offer.discount
      );
    }
    return pricepaid;
  }
  
  orderTheCart() {
    
  }
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartItemCount$: Observable<number> = this.cartItemCountSubject.asObservable();
  
  updateCartItemCount(count: number) {
    this.cartItemCountSubject.next(count);
  }

  extractEmailDomain(email: string): string {
    const domain = email.split('@')[1];
    return domain;
  }
  isEmailDomainAdmin(): boolean {
    const user = this.getUser();
    const emailDomain = this.extractEmailDomain(user.email);
    return emailDomain === 'admin.com';
  }
  
}
