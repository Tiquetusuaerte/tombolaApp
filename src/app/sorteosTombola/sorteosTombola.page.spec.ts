import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteosTombolaPage } from './sorteos.page';

describe('SorteosTombolaPage', () => {
  let component: SorteosTombolaPage;
  let fixture: ComponentFixture<SorteosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorteosTombolaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteosTombolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
