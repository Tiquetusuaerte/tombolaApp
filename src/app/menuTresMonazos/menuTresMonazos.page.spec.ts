import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTresMonazosPage } from './menuTresMonazos.page';

describe('MenuTresMonazosPage', () => {
  let component: MenuTresMonazosPage;
  let fixture: ComponentFixture<MenuTresMonazosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTresMonazosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTresMonazosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
