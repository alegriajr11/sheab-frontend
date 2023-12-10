import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriosGrupoQuirurgicoComponent } from './criterios-grupo-quirurgico.component';

describe('CriteriosGrupoQuirurgicoComponent', () => {
  let component: CriteriosGrupoQuirurgicoComponent;
  let fixture: ComponentFixture<CriteriosGrupoQuirurgicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriosGrupoQuirurgicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriosGrupoQuirurgicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
