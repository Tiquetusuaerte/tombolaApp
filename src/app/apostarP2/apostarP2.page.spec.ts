import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostarP2Page } from './apostarP2.page';

describe('ApostarP2Page', () => {
  let component: ApostarP2Page;
  let fixture: ComponentFixture<ApostarP2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApostarP2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApostarP2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
