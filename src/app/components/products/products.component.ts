import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
      this.getProduct();
  }

  getProduct(){
    this.productService.getAllSimple().subscribe({
      next: (res)=> {
        if(res){
          this.products = res;
        }
      },
      error: (err) => {}
    })
  }
}
