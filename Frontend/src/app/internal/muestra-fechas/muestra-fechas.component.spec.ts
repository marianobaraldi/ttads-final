import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestraFechasComponent } from './muestra-fechas.component';

describe('MuestraFechasComponent', () => {
  let component: MuestraFechasComponent;
  let fixture: ComponentFixture<MuestraFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuestraFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuestraFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
