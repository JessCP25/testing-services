import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from '../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import { HttpStatusCode } from '@angular/common/http';

fdescribe('Product Service', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpController.verify();
  })

  it('should be create', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should be return list product', (doneFn) => {
      const mockData: Product[] = generateManyProducts(2);
      productService.getAllSimple().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });

  describe('test for getAll', () => {
    it('should be return list product', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);
      productService.getAll().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
    it('should send limit 10 and offset 3', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      productService.getAll(limit, offset).subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
    it('should be return list product with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 0
        },
        {
          ...generateOneProduct(),
          price: -100, // 0
        },
      ];
      productService.getAll().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);

        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });

  describe('test for getOne', ()=>{
    it('should return a error 404', (doneFn) =>{
      const productId = '1';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      }

      productService.getOne(productId).subscribe({error: (error)=>{
        expect(error).toEqual('El producto no existe');
        doneFn();
      }})

      const url =`${environment.API_URL}/api/v1/products/${productId}`;;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
      expect(req.request.url).toContain(productId);
    })
  })

  describe('test for create', () => {
    it('should return a new product', (doneFn) => {
      const mockData: Product = generateOneProduct();
      const newProduct: CreateProductDTO = {
        title: 'new product',
        price: 100,
        description: 'bla bla',
        categoryId: 1,
        images: ['img', 'img'],
      };

      productService.create(newProduct).subscribe((data)=>{
        expect(data).toEqual(mockData);
        doneFn()
      });

      const url =`${environment.API_URL}/api/v1/products`;;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(newProduct);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('test for update', ()=>{
    it('should return a product edit', (doneFn) =>{
      const mockData: Product = {
        ...generateOneProduct(),
      };
      const editProduct: UpdateProductDTO = {
        title: 'new product',
        price: 100,
        description: 'bla bla',
      };

      productService.update(mockData.id, editProduct).subscribe((data)=>{
        expect(data).toEqual(mockData);
        expect(data.id).toEqual(mockData.id);
        doneFn();
      })

      const url =`${environment.API_URL}/api/v1/products/${mockData.id}`;;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(editProduct);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.url).toContain(mockData.id);
    })
  })

  describe('test for delete', ()=> {
    it('should be return a boolean true', (doneFn)=>{
      const mockData = generateOneProduct();
      productService.delete(mockData.id).subscribe((data)=>{
        expect(data).toBeTruthy();
        doneFn();
      })

      const url =`${environment.API_URL}/api/v1/products/${mockData.id}`;;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.url).toContain(mockData.id);
    })
  })
});
