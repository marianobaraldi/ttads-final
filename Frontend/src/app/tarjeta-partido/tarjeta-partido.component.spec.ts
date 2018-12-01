import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaPartidoComponent } from './tarjeta-partido.component';

describe('TarjetaPartidoComponent', () => {
  let component: TarjetaPartidoComponent;
  let fixture: ComponentFixture<TarjetaPartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaPartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
