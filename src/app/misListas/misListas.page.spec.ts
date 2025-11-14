import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisListasPage } from './misListas.page';

describe('MisListasPage', () => {
  let component: MisListasPage;
  let fixture: ComponentFixture<MisListasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisListasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisListasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
