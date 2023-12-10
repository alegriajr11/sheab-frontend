import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriosGrupoAtencionInmediataComponent } from './criterios-grupo-atencion-inmediata.component';

describe('CriteriosGrupoAtencionInmediataComponent', () => {
  let component: CriteriosGrupoAtencionInmediataComponent;
  let fixture: ComponentFixture<CriteriosGrupoAtencionInmediataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriosGrupoAtencionInmediataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriosGrupoAtencionInmediataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
