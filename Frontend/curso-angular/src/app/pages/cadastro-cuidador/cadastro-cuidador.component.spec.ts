import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCuidadorComponent } from './cadastro-cuidador.component';

describe('CadastroCuidador1Component', () => {
  let component: CadastroCuidadorComponent;
  let fixture: ComponentFixture<CadastroCuidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroCuidadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroCuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
