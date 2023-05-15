import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStateComponent } from './request-state.component';

describe('RequestStateComponent', () => {
  let component: RequestStateComponent;
  let fixture: ComponentFixture<RequestStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestStateComponent]
    });
    fixture = TestBed.createComponent(RequestStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
