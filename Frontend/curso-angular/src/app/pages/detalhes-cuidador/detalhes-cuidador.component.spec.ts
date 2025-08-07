import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCuidadorComponent } from './detalhes-cuidador.component';

describe('DetalhesCuidadorComponent', () => {
  let component: DetalhesCuidadorComponent;
  let fixture: ComponentFixture<DetalhesCuidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesCuidadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesCuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
