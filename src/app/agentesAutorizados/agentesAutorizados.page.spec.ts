import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentesAutorizadosPage } from './agentesAutorizados.page';

describe('AgentesAutorizadosPage', () => {
  let component: AgentesAutorizadosPage;
  let fixture: ComponentFixture<AgentesAutorizadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentesAutorizadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentesAutorizadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
