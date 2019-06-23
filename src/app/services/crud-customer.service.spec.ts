import { TestBed } from '@angular/core/testing';

import { CustomersService } from './crud-customer.service';

describe('CrudCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomersService = TestBed.get(CustomersService);
    expect(service).toBeTruthy();
  });
});
