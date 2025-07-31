import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilTutorComponent } from './editar-perfil-tutor.component';

describe('EditarPerfilTutorComponent', () => {
  let component: EditarPerfilTutorComponent;
  let fixture: ComponentFixture<EditarPerfilTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPerfilTutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPerfilTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
