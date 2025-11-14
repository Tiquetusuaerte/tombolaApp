import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasGolPage } from './categoriasGol.page';

describe('CategoriasGolPage', () => {
  let component: CategoriasGolPage;
  let fixture: ComponentFixture<CategoriasGolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasGolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasGolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
