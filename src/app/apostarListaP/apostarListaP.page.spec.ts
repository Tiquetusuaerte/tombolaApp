import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostarListaPPage } from './apostarListaP.page';

describe('ApostarListaPPage', () => {
  let component: ApostarListaPPage;
  let fixture: ComponentFixture<ApostarListaPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApostarListaPPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApostarListaPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
