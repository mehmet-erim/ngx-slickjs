import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSlickjsComponent } from './ngx-slickjs.component';

describe('NgxSlickjsComponent', () => {
  let component: NgxSlickjsComponent;
  let fixture: ComponentFixture<NgxSlickjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSlickjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSlickjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
