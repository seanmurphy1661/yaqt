import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QformComponent } from './qform.component';

describe('QformComponent', () => {
  let component: QformComponent;
  let fixture: ComponentFixture<QformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QformComponent]
    });
    fixture = TestBed.createComponent(QformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
