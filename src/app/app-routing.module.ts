import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { PasswordcComponent } from './auth/passwordc.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { ButtonGuard } from './guards/button.guard';
import { LoginGuard } from './guards/login.guard';
import { UsuarioGuard } from './guards/usuario.guard';
import { HomeComponent } from './home/home.component';
import { ListaPrestadorComponent } from './prestador/lista-prestador.component';
import { NuevoPrestadorComponent } from './prestador/nuevo-prestador.component';

//COMPONENTES ROL PAMEC
import { ActaPamecComponent } from './roles/pamec/acta/acta-pamec.component';
import { EvaluacionPamecComponent } from './roles/pamec/evaluacion-pamec/evaluacion-pamec.component';
import { EvaluacionesPamecComponent } from './roles/pamec/evaluaciones/evaluaciones-pamec.component';
import { HomePamecComponent } from './roles/pamec/home-pamec.component';
import { CapacidadInstaladaComponent } from './roles/reso/capacidad-instalada/capacidad-instalada.component';
import { HomeResoComponent } from './roles/reso/home-reso.component';
import { ListaVerificacionComponent } from './roles/reso/lista-verificacion/lista-verificacion.component';
import { ActaSicComponent } from './roles/sic/acta/acta-sic.component';
import { EvaluacionSicComponent } from './roles/sic/evaluacion/evaluacion-sic.component';
import { ModalsicComponent } from './roles/sic/evaluacion/modalsic/modalsic.component';
import { EvaluacionesSicComponent } from './roles/sic/evaluaciones/evaluaciones-sic.component';
import { HomeSicComponent } from './roles/sic/home-sic.component';

//COMPONENTES ROL SP IPS Y PROFESIONALES
import { EvaluacionesSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/evaluaciones-sp-ips.component';
import { EvaluacionesSpProComponent } from './roles/sp/sp-profesionales/evaluaciones-pro/evaluaciones-sp-pro.component';
import { HomeEvaluacionIpsComponent } from './roles/sp/sp-ips/home-evaluacion-ips/home-evaluacion-ips.component';
import { ActaSpIpsComponent } from './roles/sp/sp-ips/acta-ips/acta-sp-ips.component';
import { ActaSpProComponent } from './roles/sp/sp-profesionales/acta-pro/acta-sp-pro.component';
import { EvaluacionSpProComponent } from './roles/sp/sp-profesionales/evaluacion-sp-pro/evaluacion-sp-pro.component';

import { HomeSpComponent } from './roles/sp/home-sp.component';

import { AgregarIndComponent } from './usuario/admin/criterio-sp-ind/agregar-ind/agregar-ind.component';
import { CriterioSpIndComponent } from './usuario/admin/criterio-sp-ind/criterio-sp-ind.component';
import { EditarcriteindComponent } from './usuario/admin/criterio-sp-ind/editarcriteind/editarcriteind.component';
import { AgregarcriIpsComponent } from './usuario/admin/criterio-sp-ips/agregarcri-ips/agregarcri-ips.component';
import { CriterioSpIpsComponent } from './usuario/admin/criterio-sp-ips/criterio-sp-ips.component';
import { EditarcriteipsComponent } from './usuario/admin/criterio-sp-ips/editarcriteipsaju/editarcriteips.component';
import { EditarcriteipsimplComponent } from './usuario/admin/criterio-sp-ips/editarcriteipsimpl/editarcriteipsimpl.component';
import { EditarcriteipsplanComponent } from './usuario/admin/criterio-sp-ips/editarcriteipsplan/editarcriteipsplan.component';
import { EditarcriteipsverifComponent } from './usuario/admin/criterio-sp-ips/editarcriteipsverif/editarcriteipsverif.component';
import { AgregarcripamComponent } from './usuario/admin/criteriopamec/agregarcripam/agregarcripam.component';
import { CriteriopamecComponent } from './usuario/admin/criteriopamec/criteriopamec.component';
import { EditarcritpamComponent } from './usuario/admin/criteriopamec/editarcritpam/editarcritpam.component';
import { AgregarcrisicComponent } from './usuario/admin/criteriosic/agregarcrisic/agregarcrisic.component';
import { AgregarcriterioestandarComponent } from './usuario/admin/criteriosic/agregarcriterioestandar/agregarcriterioestandar.component';
import { CriterioestandarComponent } from './usuario/admin/criteriosic/criterioestandar/criterioestandar.component';
import { CriteriosicComponent } from './usuario/admin/criteriosic/criteriosic.component';
import { EditarcriteriosicComponent } from './usuario/admin/criteriosic/editarcriteriosic/editarcriteriosic.component';
import { NuevoUsuarioAdminComponent } from './usuario/admin/nuevo-usuario-admin.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario.component';
import { TodosServiciosComponent } from './roles/reso/lista-verificacion/home-estandar/todos-servicios/todos-servicios.component';
import { AtencionInmediataComponent } from './roles/reso/lista-verificacion/home-estandar/atencion-inmediata/atencion-inmediata.component';
import { ConsultaExternaComponent } from './roles/reso/lista-verificacion/home-estandar/consulta-externa/consulta-externa.component';
import { ApoyoDiagnosticoComponent } from './roles/reso/lista-verificacion/home-estandar/apoyo-diagnostico/apoyo-diagnostico.component';
import { InternacionComponent } from './roles/reso/lista-verificacion/home-estandar/internacion/internacion.component';
import { QuirurgicoComponent } from './roles/reso/lista-verificacion/home-estandar/quirurgico/quirurgico.component';
import { EditarPrestadorComponent } from './prestador/editar-prestador/editar-prestador.component';
import { HomeCriteriosComponent } from './usuario/admin/resolucion/home-criterios/home-criterios.component';
import { CriterioTodosServiciosComponent } from './usuario/admin/resolucion/criterio-todos-servicios/criterio-todos-servicios.component';
import { AuditoriaComponent } from './usuario/admin/auditoria/auditoria.component';
import { HomeEstandarComponent } from './roles/reso/lista-verificacion/home-estandar/home-estandar.component';
import { EvaluacionSpIpsComponent } from './roles/sp/sp-ips/home-evaluacion-ips/evaluacion-sp-ips/evaluacion-sp-ips.component';
import { ActaVisitaVerificacionComponent } from './roles/reso/acta-visita-verificacion/acta-visita-verificacion.component';
import { ActaVisitaIvcComponent } from './roles/reso/acta-visita-ivc/acta-visita-ivc.component';
import { InformeResolucionComponent } from './roles/reso/informe-resolucion/informe-resolucion.component';
import { AgregarSedesPrestadorComponent } from './prestador/modal-sedes-prestador/agregar-sedes-prestador/agregar-sedes-prestador.component';
import { EditarActaSicComponent } from './roles/sic/evaluaciones/editar-acta-sic/editar-acta-sic.component';
import { EditarEvaluacionSicComponent } from './roles/sic/evaluaciones/editar-evaluacion-sic/editar-evaluacion-sic.component';
import { EditarActaSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/editar-acta-sp-ips/editar-acta-sp-ips.component';
import { EditarActaSpIpsGuard } from './guards/editar-acta-sp-ips.guard';
import { EditarActaSicGuard } from './guards/editar-acta-sic.guard';
import { EditarActaSpProComponent } from './roles/sp/sp-profesionales/evaluaciones-pro/editar-acta-sp-pro/editar-acta-sp-pro.component';
import { EditarActaSpIndGuard } from './guards/editar-acta-sp-ind.guard';
import { NuevoUsuarioRolComponent } from './usuario/nuevo-usuario-rol/nuevo-usuario-rol.component';
import { ModalSedesPrestadorComponent } from './prestador/modal-sedes-prestador/modal-sedes-prestador.component';
import { EditarSedesPrestadorComponent } from './prestador/modal-sedes-prestador/editar-sedes-prestador/editar-sedes-prestador.component';
import { ContadorComponent } from './roles/reso/contador/contador.component';
import { EditarEvaluacionSpProComponent } from './roles/sp/sp-profesionales/evaluaciones-pro/editar-evaluacion-sp-pro/editar-evaluacion-sp-pro.component';
import { EditarEvaluacionSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/editar-evaluacion-sp-ips/editar-evaluacion-sp-ips.component';
import { CumplimientoRequisitosComponent } from './roles/reso/cumplimiento-requisitos/cumplimiento-requisitos.component';
import { ConclusionesRecomendacionesComponent } from './roles/reso/conclusiones-recomendaciones/conclusiones-recomendaciones.component';
import { EquipoVerificadoresComponent } from './roles/reso/equipo-verificadores/equipo-verificadores.component';
import { EditarActaPamecComponent } from './roles/pamec/evaluaciones/editar-acta-pamec/editar-acta-pamec.component';
import { EditarActaPamecGuard } from './guards/editar-acta-pamec.guard';
import { EditarEvaluacionPamecComponent } from './roles/pamec/evaluaciones/editar-evaluacion-pamec/editar-evaluacion-pamec.component';


const routes: Routes = [
  { path: '', component: HomeComponent },

  //ADMIN AUDITORIA
  { path: 'auditoria', component: AuditoriaComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },

  //Rutas ADMIN - SIC
  { path: 'criteriosic', component: CriteriosicComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sic'] } },
  { path: 'criteriosic/estandar', component: CriterioestandarComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sic'] } },
  { path: 'criteriosic/estandar/agregar', component: AgregarcriterioestandarComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sic'] } },
  { path: 'criteriosic/agregar', component: AgregarcrisicComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sic'] } },
  { path: 'criteriosic/editarsic/:id', component: EditarcriteriosicComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sic'] } },

  //Rutas ADMIN - PAM
  { path: 'criteriopam', component: CriteriopamecComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'pamec'] } },
  { path: 'criteriopam/agregar', component: AgregarcripamComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'pamec'] } },
  { path: 'criteriopam/editar/:id', component: EditarcritpamComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'pamec'] } },

  //Rutas ADMIN -SP - IPS
  { path: 'criterioips', component: CriterioSpIpsComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'criterioips/agregar', component: AgregarcriIpsComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'criterioips/editarajuste/:id', component: EditarcriteipsComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'criterioips/editarimp/:id', component: EditarcriteipsimplComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'criterioips/editarverf/:id', component: EditarcriteipsverifComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'criterioips/editarplan/:id', component: EditarcriteipsplanComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },

  //Rutas ADMIN & SP- PROFESIONALES INDEPENDIENTES
  { path: 'criterioind', component: CriterioSpIndComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'criterioind/agregar', component: AgregarIndComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'criterioind/editar/:id', component: EditarcriteindComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },


  //Rutas Usuario
  { path: 'usuarios', component: ListaUsuarioComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },
  { path: 'usuarios/nuevo', component: NuevoUsuarioComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },
  { path: 'usuarios/nuevo/admin', component: NuevoUsuarioAdminComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },
  { path: 'usuarios/nuevo/rol', component: NuevoUsuarioRolComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },
  { path: 'usuarios/editar', component: EditarUsuarioComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },

  { path: 'usuarios/restablecer', component: ResetpasswordComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },

  { path: 'usuario/cambiar-contraseña', component: PasswordcComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sic', 'sp', 'pamec', 'res'] } },

  //Rutas SIC
  { path: 'sic', component: HomeSicComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sic'] } },
  { path: 'sic/acta', component: ActaSicComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sic'] } },
  { path: 'sic/acta/editar/:id', component: EditarActaSicComponent, canActivate: [UsuarioGuard, EditarActaSicGuard, ButtonGuard], data: { expectedRol: ['admin', 'sic'] } },
  { path: 'sic/evaluaciones', component: EvaluacionesSicComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sic'] } },
  { path: 'sic/evaluacion', component: EvaluacionSicComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'sic'] } },
  { path: 'sic/evaluacion/editar', component: EditarEvaluacionSicComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'sic'] } },

  //Rutas SP - IPS
  { path: 'sp', component: HomeSpComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'sp/acta-ips', component: ActaSpIpsComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'sp/evaluaciones-ips', component: EvaluacionesSpIpsComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  //{ path: 'sp/evaluacion-ips', component: EvaluacionSpIpsComponent, canActivate: [UsuarioGuard,], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'sp/home-evaluacion-ips', component: HomeEvaluacionIpsComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'sp/evaluacion-ips', component: EvaluacionSpIpsComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'sp/evaluacion-ips/editar', component: EditarEvaluacionSpIpsComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'sp'] } },

  //RUTAS SP-IPS EDITAR-ACTA
  { path: 'sp-ips/acta/editar/:id', component: EditarActaSpIpsComponent, canActivate: [UsuarioGuard, EditarActaSpIpsGuard, ButtonGuard], data: { expectedRol: ['admin', 'sp'] } },

  //RUTAS SP-IND EDITAR-ACTA
  { path: 'sp-ind/acta/editar/:id', component: EditarActaSpProComponent, canActivate: [UsuarioGuard, EditarActaSpIndGuard, ButtonGuard], data: { expectedRol: ['admin', 'sp'] } },
  //Rutas SP - PROFESIONALES
  { path: 'sp/acta-pro', component: ActaSpProComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'sp/evaluaciones-pro', component: EvaluacionesSpProComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'sp/evaluacion-pro', component: EvaluacionSpProComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'sp'] } },
  { path: 'sp/evaluacion-pro/editar/:id', component: EditarEvaluacionSpProComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'sp'] } },

  //Rutas PAMEC
  { path: 'pamec', component: HomePamecComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'pamec'] } },
  { path: 'pamec/acta', component: ActaPamecComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'pamec'] } },
  { path: 'pamec/evaluaciones', component: EvaluacionesPamecComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'pamec'] } },
  { path: 'pamec/evaluacion', component: EvaluacionPamecComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'pamec'] } },
  //RUTAS PAMEC EDITAR-ACTA
  { path: 'pamec/acta/editar/:id', component: EditarActaPamecComponent, canActivate: [UsuarioGuard, EditarActaPamecGuard, ButtonGuard], data: { expectedRol: ['admin', 'pamec'] } },
  { path: 'pamec/evaluacion/editar/:id', component: EditarEvaluacionPamecComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'pamec'] } },


  //Rutas RESOLUCIÓN
  { path: 'reso', component: HomeResoComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res', 'contador'] } },
  { path: 'reso/lista-verificacion', component: ListaVerificacionComponent, canActivate: [UsuarioGuard, ButtonGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'servicios-capacidad', component: CapacidadInstaladaComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },

  //RUTA CUMPLIMIENTO DE REQUISITOS DE LAS CONDICIONES DE HABILITACIÓN
  { path: 'cumplimiento-requisitos', component: CumplimientoRequisitosComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },

  //RUTA CONCLUSIONES Y RECOMENDACIONES
  { path: 'conclusiones-recomendaciones', component: ConclusionesRecomendacionesComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },

  //RUTA EQUIPO DE VERIFICADORES
  { path: 'equipo-verificadores', component: EquipoVerificadoresComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },


  //RUTA CONTADOR - RESOLUION 3100
  { path: 'resolucion/contador', component: ContadorComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },

  //RUTAS ACTA - RESOLUCIÓN 3100
  { path: 'reso/visita-verificacion', component: ActaVisitaVerificacionComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'coordinador'] } },
  { path: 'reso/visita-ivc', component: ActaVisitaIvcComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'coordinador'] } },

  //ESTANDARES - RESOLUCION
  { path: 'home-estandar', component: HomeEstandarComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'todos-servicios', component: TodosServiciosComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'atencion-inmediata', component: AtencionInmediataComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'consulta-externa', component: ConsultaExternaComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'apoyo-diagnostico', component: ApoyoDiagnosticoComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'internacion', component: InternacionComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'quirurgico', component: QuirurgicoComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },

  //HOME CRITERIOS RESOLUCIÓN 3100
  { path: 'home-res-criterios', component: HomeCriteriosComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'criterio-todos-servicios', component: CriterioTodosServiciosComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },

  { path: 'atencion-inmediata', component: AtencionInmediataComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'consulta-externa', component: ConsultaExternaComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'apoyo-diagnostico', component: ApoyoDiagnosticoComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'internacion', component: InternacionComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },
  { path: 'quirurgico', component: QuirurgicoComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res'] } },


  //INFORME RESOLUCION - 3100 2019
  { path: 'reso/informe', component: InformeResolucionComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin', 'res', 'contador'] } },


  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },

  //PRESTADORES
  { path: 'prestadores', component: ListaPrestadorComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },
  { path: 'prestadores/editar', component: EditarPrestadorComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },
  { path: 'prestadores/nuevo', component: NuevoPrestadorComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },
  //SEDES - PRESTADORES
  { path: 'prestadores/sede', component: ModalSedesPrestadorComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },
  { path: 'prestadores/sede/nueva', component: AgregarSedesPrestadorComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },
  { path: 'prestadores/sede/editar/:id', component: EditarSedesPrestadorComponent, canActivate: [UsuarioGuard], data: { expectedRol: ['admin'] } },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
