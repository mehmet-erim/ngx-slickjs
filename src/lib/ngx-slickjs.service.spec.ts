import { TestBed } from '@angular/core/testing';

import { NgxSlickjsService } from './ngx-slickjs.service';

describe('NgxSlickjsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSlickjsService = TestBed.get(NgxSlickjsService);
    expect(service).toBeTruthy();
  });
});
