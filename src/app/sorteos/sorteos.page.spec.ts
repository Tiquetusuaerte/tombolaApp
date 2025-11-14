import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteosPage } from './sorteos.page';

describe('SorteosPage', () => {
  let component: SorteosPage;
  let fixture: ComponentFixture<SorteosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorteosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
