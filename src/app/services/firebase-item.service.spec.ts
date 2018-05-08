import { TestBed, inject } from '@angular/core/testing';

import { FirebaseItemService } from './firebase-item.service';

describe('FirebaseItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseItemService]
    });
  });

  it('should be created', inject([FirebaseItemService], (service: FirebaseItemService) => {
    expect(service).toBeTruthy();
  }));
});
