import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: { id: 0, name: '' }  
  };
  
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.productService.getProduct(id).subscribe(data => this.product = data);
    }
  }

  onSubmit(): void {
    if (this.product.id) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.productService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}


