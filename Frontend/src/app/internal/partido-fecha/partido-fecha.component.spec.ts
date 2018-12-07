import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoFechaComponent } from './partido-fecha.component';

describe('PartidoFechaComponent', () => {
  let component: PartidoFechaComponent;
  let fixture: ComponentFixture<PartidoFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidoFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
