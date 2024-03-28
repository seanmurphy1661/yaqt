import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QviewComponent } from './qview.component';

describe('QviewComponent', () => {
  let component: QviewComponent;
  let fixture: ComponentFixture<QviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QviewComponent]
    });
    fixture = TestBed.createComponent(QviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
