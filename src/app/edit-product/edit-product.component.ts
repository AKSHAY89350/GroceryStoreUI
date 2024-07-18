import { Component, OnInit } from '@angular/core';
import { AddProduct, Product } from '../models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product!: Product;
  UpdateProduct! : FormGroup 
  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router,
    private formBuilder: FormBuilder) { }
  searchResults: Product[] = [];
  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res;
        this.populateForm();
      });
    });
  }
  
  createForm() {
    this.UpdateProduct = this.formBuilder.group({
      id: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      categories: [null, Validators.required],
      offer: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      imageName: [null, Validators.required]
    });
  }
  populateForm() {
    this.UpdateProduct.patchValue({
      id: this.product.id,
      title: this.product.title,
      description: this.product.description,
      categories: this.product.productCategory.id,
      offer: this.product.offer.id,
      price: this.product.price,
      quantity: this.product.quantity,
      imageName: this.product.imageName
    });
  }
  onSubmit() {
    console.log(this.UpdateProduct)
    if (this.UpdateProduct.valid) {
      const id = this.product.id; // or retrieve the ID from your form
      const updatedProduct: AddProduct = this.UpdateProduct.value;
      this.navigationService.updateProduct(id, updatedProduct).subscribe(
        (response) => {
          // Handle successful response
          console.log(response);
        },
        (error) => {
          // Handle error
          console.error(error);
        }
      );
    } else {
      // Form is invalid, handle error or display validation messages
    }
  }
}
