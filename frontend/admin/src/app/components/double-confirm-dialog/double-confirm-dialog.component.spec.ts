import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleConfirmDialogComponent } from './double-confirm-dialog.component';

describe('DoubleConfirmDialogComponent', () => {
  let component: DoubleConfirmDialogComponent;
  let fixture: ComponentFixture<DoubleConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
