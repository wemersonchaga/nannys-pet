import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilCuidadorComponent } from './editar-perfil-cuidador.component';

describe('EditarPerfilCuidadorComponent', () => {
  let component: EditarPerfilCuidadorComponent;
  let fixture: ComponentFixture<EditarPerfilCuidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPerfilCuidadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPerfilCuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
