import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglamentoPage } from './reglamento.page';

describe('ReglamentoPage', () => {
  let component: ReglamentoPage;
  let fixture: ComponentFixture<ReglamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglamentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
