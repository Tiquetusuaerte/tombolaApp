import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosPalePage } from './movimientosPale.page';

describe('MovimientosPalePage', () => {
  let component: MovimientosPalePage;
  let fixture: ComponentFixture<MovimientosPalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosPalePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosPalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
