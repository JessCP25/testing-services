import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { generateManyProducts } from '../../models/product.mock';
import { of } from 'rxjs';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const spyProductService = jasmine.createSpyObj('ProductsService', ['getAll'])

    spyProductService.getAll.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ProductComponent],
      providers: [{
        provide: ProductsService, useValue: spyProductService
      }]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock.map((item) => ({
      ...item,
      taxes: item.taxes ?? (item.price > 0 ? 0.19 * item.price : 0), // Garantiza que siempre sea number
      images: item.images ?? [] // Garantiza que siempre sea un array
    }))));

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled()
  });
});
