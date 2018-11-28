import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionTorneoComponent } from './creacion-torneo.component';

describe('CreacionTorneoComponent', () => {
  let component: CreacionTorneoComponent;
  let fixture: ComponentFixture<CreacionTorneoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacionTorneoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
