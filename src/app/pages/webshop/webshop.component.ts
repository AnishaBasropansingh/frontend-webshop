import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-webshop',
  standalone: true,
  templateUrl: './webshop.component.html',
  styleUrls: ['./webshop.component.css'],
  imports: [CommonModule, ProductCardComponent]
})

export class WebshopComponent implements OnInit {
  products: Product[] = [];
  testProduct = {
    name: 'Test Product',
    description: 'Test beschrijving',
    price: 19.99,
    stock: 10,
    category: { name: 'Test' }
  };


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log('Start loading products...');
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Products received:', products);
        this.products = products;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }
}