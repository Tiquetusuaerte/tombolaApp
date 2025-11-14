import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterGolPage } from './meterGol.page';

describe('MeterGolPage', () => {
  let component: MeterGolPage;
  let fixture: ComponentFixture<MeterGolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterGolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterGolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
