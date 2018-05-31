import { TestBed, inject } from '@angular/core/testing';

import { FirebaseShoppingCartService } from './firebase-shopping-cart.service';

describe('ShoppingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseShoppingCartService]
    });
  });

  it('should be created', inject([FirebaseShoppingCartService], (service: FirebaseShoppingCartService) => {
    expect(service).toBeTruthy();
  }));
});
