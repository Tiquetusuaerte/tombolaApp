import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisClientesPage } from './misClientes.page';

describe('MisClientesPage', () => {
  let component: MisClientesPage;
  let fixture: ComponentFixture<MisClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisClientesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
