import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Category,
  Order,
  Payment,
  PaymentMethod,
  Product,
  User,
  Addproduct,
  AddProduct,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  baseurl = 'https://localhost:7250/api/';

  constructor(private http: HttpClient) {}

  getCategoryList() {
    let url = this.baseurl + 'Shopping/GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        })
      )
    );
  }

  getProducts(category: string, subcategory: string, count: number) {
    return this.http.get<any[]>(this.baseurl + 'Shopping/GetProducts', {
      params: new HttpParams()
        .set('category', category)
        .set('subcategory', subcategory)
        .set('count', count),
    });
  }

  getProduct(id: number) {
    let url = this.baseurl + 'Shopping/GetProduct/' + id;
    return this.http.get(url);
  }

  registerUser(user: User) {
    let url = this.baseurl + 'Login/RegisterUser';
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseurl + 'Login/LoginUser';
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

  submitReview(userid: number, productid: number, review: string) {
    let obj: any = {
      User: {
        Id: userid,
      },
      Product: {
        Id: productid,
      },
      Value: review,
    };

    let url = this.baseurl + 'Review/InsertReview';
    return this.http.post(url, obj, { responseType: 'text' });
  }

  getAllReviewsOfProduct(productId: number) {
    let url = this.baseurl + 'Review/GetProductReviews/' + productId;
    return this.http.get(url);
  }

  addToCart(userid: number, productid: number) {
    let url = this.baseurl + 'Cart/InsertCartItem/' + userid + '/' + productid;
    return this.http.post(url, null, { responseType: 'text' });
  }

  getActiveCartOfUser(userid: number) {
    let url = this.baseurl + 'Cart/GetActiveCartOfUser/' + userid;
    return this.http.get(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = this.baseurl + 'Shopping/GetAllPreviousCartsOfUser/' + userid;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = this.baseurl + 'Shopping/GetPaymentMethods';
    return this.http.get<PaymentMethod[]>(url);
  }

  insertPayment(payment: Payment) {
    return this.http.post(this.baseurl + 'Shopping/InsertPayment', payment, {
      responseType: 'text',
    });
  }

  insertOrder(order: Order) {
    return this.http.post(this.baseurl + 'Shopping/InsertOrder', order);
  }
  
 /* addProduct(addproduct: addproduct) {
    let url = this.baseurl + 'Admin/InsertProduct';
    return this.http.post(url, addproduct, { responseType: 'text' });
  }
  private apiUrl = 'https://localhost:7250/api/Admin/InsertProduct';
  addProduct(product: Addproduct): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }*/
  private apiUrl = 'https://localhost:7250/api/Admin/AddProduct'; // Replace with your API endpoint

  

  addProduct(product: AddProduct): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
  updateCart(cartItemId: number, quantity: number): Observable<any> {
    const url = this.baseurl + 'Cart/UpdateCart/' + cartItemId + '/' + quantity;
    return this.http.put(url, null, { responseType: 'text' });
  }
  
  removeCartItem(cartItemId: number): Observable<any> {
    const url = this.baseurl + 'Cart/RemoveCartItem/' + cartItemId;
    return this.http.delete(url);
  }


  private apiUrl1 = 'https://localhost:7250/api/Search/'
  searchItems(query: string): Observable<Product[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Product[]>(this.apiUrl1, { params });
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.baseurl}Admin/${id}`;
    return this.http.delete(url);
  }
  editProduct(productId: number, updatedProduct: AddProduct): Observable<boolean> {
    const url = `${this.baseurl}Edit/${productId}`;
    return this.http.put<boolean>(url, updatedProduct);
  }
  updateProduct(id: number, product: AddProduct): Observable<any> {
    const url = `${this.baseurl}edit/${id}`;
    return this.http.post(url, product);
  }
}
