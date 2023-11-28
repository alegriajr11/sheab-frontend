import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEvaluacionPamecComponent } from './editar-evaluacion-pamec.component';

describe('EditarEvaluacionPamecComponent', () => {
  let component: EditarEvaluacionPamecComponent;
  let fixture: ComponentFixture<EditarEvaluacionPamecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEvaluacionPamecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEvaluacionPamecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
