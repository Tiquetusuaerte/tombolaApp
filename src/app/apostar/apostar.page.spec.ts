import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostarPage } from './apostar.page';

describe('ApostarPage', () => {
  let component: ApostarPage;
  let fixture: ComponentFixture<ApostarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApostarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApostarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
