import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Route } from '@angular/router';
import { AddProduct, Addproduct } from '../models/models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: NavigationService
  ) { }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
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
    if (this.productForm.invalid) {
      return;
    }
    const product: AddProduct = this.productForm.value;
    this.productService.addProduct(product)
      .subscribe(
        () => {
          // Product added successfully
          this.productForm.reset();
          // Add any additional logic or notifications here
        },
        (error) => {
          // Handle error
          console.log(error);
          // Add error handling or notifications here
        }
      );
  }

}
