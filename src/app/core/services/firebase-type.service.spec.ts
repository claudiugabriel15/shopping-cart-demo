import { TestBed, inject } from '@angular/core/testing';

import { FirebaseTypeService } from './firebase-type.service';

describe('FirebaseTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseTypeService]
    });
  });

  it('should be created', inject([FirebaseTypeService], (service: FirebaseTypeService) => {
    expect(service).toBeTruthy();
  }));
});
