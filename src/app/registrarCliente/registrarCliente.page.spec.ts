import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarClientePage } from './registrarCliente.page';

describe('RegistrarClientePage', () => {
  let component: RegistrarClientePage;
  let fixture: ComponentFixture<RegistrarClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
