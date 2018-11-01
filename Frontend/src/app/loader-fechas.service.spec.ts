import { TestBed, inject } from '@angular/core/testing';

import { LoaderFechas } from './loader-fechas.service';

describe('LoaderFechasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderFechas]
    });
  });

  it('should be created', inject([LoaderFechas], (service: LoaderFechas) => {
    expect(service).toBeTruthy();
  }));
});
