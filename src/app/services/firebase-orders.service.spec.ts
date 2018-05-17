import { TestBed, inject } from '@angular/core/testing';

import { FirebaseOrdersService } from './firebase-orders.service';

describe('FirebaseOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseOrdersService]
    });
  });

  it('should be created', inject([FirebaseOrdersService], (service: FirebaseOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
