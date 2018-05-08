import { TestBed, inject } from '@angular/core/testing';

import { ShoppingCartServiceService } from './shopping-cart-service.service';

describe('ShoppingCartServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartServiceService]
    });
  });

  it('should be created', inject([ShoppingCartServiceService], (service: ShoppingCartServiceService) => {
    expect(service).toBeTruthy();
  }));
});
