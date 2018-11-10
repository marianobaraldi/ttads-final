import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraEquiposComponent } from './barra-equipos.component';

describe('BarraEquiposComponent', () => {
  let component: BarraEquiposComponent;
  let fixture: ComponentFixture<BarraEquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraEquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
