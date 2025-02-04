import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./product.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Product } from "../models/product.model";
import { environment } from "../../environments/environment";


fdescribe('Product Service', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    })
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be create', () => {
    expect(productService).toBeTruthy();
  })

  describe('test for getAllSimple', () => {
    it('should be return list product', (doneFn)=>{
      const mockData: Product[] = [];
      productService.getAllSimple().subscribe((res)=> {
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify()
    })
  })
})
