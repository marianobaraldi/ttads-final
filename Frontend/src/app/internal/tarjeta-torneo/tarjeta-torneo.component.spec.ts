import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaTorneoComponent } from './tarjeta-torneo.component';

describe('TarjetaTorneoComponent', () => {
  let component: TarjetaTorneoComponent;
  let fixture: ComponentFixture<TarjetaTorneoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaTorneoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
