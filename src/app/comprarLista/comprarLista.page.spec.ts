import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarListaPage } from './comprarLista.page';

describe('ComprarListaPage', () => {
  let component: ComprarListaPage;
  let fixture: ComponentFixture<ComprarListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprarListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
