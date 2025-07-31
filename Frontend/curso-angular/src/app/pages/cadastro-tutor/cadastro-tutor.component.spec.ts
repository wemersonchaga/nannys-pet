import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTutorComponent } from './cadastro-tutor.component';

describe('CadastroTutor1Component', () => {
  let component: CadastroTutorComponent;
  let fixture: ComponentFixture<CadastroTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroTutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
