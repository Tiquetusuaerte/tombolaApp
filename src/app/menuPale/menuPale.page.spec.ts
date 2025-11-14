import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPalePage } from './menuPale.page';

describe('MenuPalePage', () => {
  let component: MenuPalePage;
  let fixture: ComponentFixture<MenuPalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPalePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
