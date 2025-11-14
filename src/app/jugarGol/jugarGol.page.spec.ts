import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugarGolPage } from './jugarGol.page';

describe('MeterGolPage', () => {
  let component: JugarGolPage;
  let fixture: ComponentFixture<JugarGolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugarGolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugarGolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
