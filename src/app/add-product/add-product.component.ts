import { Component, OnInit } from '@angular/core';
import { AddProduct } from '../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent  {

 
  AddProduct!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService
  ) { }
  ngOnInit(): void {
    this.AddProduct = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required],
      offer: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      imageName: ['']
    });
  }
  onSubmit(): void {
    if (this.AddProduct.invalid) {
      return;
    }
    const product: AddProduct = this.AddProduct.value;
    this.navigationService.addProduct(product)
      .subscribe(
        () => {
          // Product added successfully
          this.AddProduct.reset();
        },
        (error) => {
          
          console.log(error);
          
        }
      );
  }

}
