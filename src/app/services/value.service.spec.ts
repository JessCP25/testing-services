import { firstValueFrom } from 'rxjs';
import { ValueService } from './value.service';
import { TestBed } from '@angular/core/testing';

describe('ValueService', () => {
  let service: ValueService;

  // beforeEach(() => {
  //   service = new ValueService();
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    })
    service = TestBed.inject(ValueService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for  getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Test for setValue', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('Test for getPromiseValue', () => {
    it('should return "promise value" from promise with then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        doneFn();
      });
    });

    it('should return "promise value" from promise using async', async() => {
      const result = await service.getPromiseValue();
      expect(result).toBe('promise value')
    })
  });

  describe('Test for getObservableValue', () => {
    it('should return "observable value" from subscribe', (doneFn) => {
      service.getObservableValue().subscribe({
        next: (res) => {
          expect(res).toBe('observable value');
          doneFn();
        }
      })
    })

    it('should return "observable value" from async', async() => {
      const value = await firstValueFrom(service.getObservableValue());
      expect(value).toBe('observable value')
    })
  })
});
