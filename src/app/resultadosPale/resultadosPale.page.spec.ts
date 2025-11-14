import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosPalePage } from './resultadosPale.page';

describe('ResultadosPalePage', () => {
  let component: ResultadosPalePage;
  let fixture: ComponentFixture<ResultadosPalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosPalePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosPalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
