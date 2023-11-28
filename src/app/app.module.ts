import { HttpClientModule } from '@angular/common/http';
import {  LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './home/home.component';

//external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MenuComponent } from './menu/menu.component';
import { PasswordModule } from "primeng/password";
import { DropdownComponent, DropdownModule} from '@coreui/angular';
import { PasswordcComponent } from './auth/passwordc.component';
import { interceptorProvider } from './interceptors/usuario.interceptor';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'; 


//USUARIOS
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario.component';

//SOGC
import { ActaSicComponent } from './roles/sic/acta/acta-sic.component';
import { HomeSicComponent } from './roles/sic/home-sic.component';
import { HomeSpComponent } from './roles/sp/home-sp.component';
import { HomePamecComponent } from './roles/pamec/home-pamec.component';
import { HomeResoComponent } from './roles/reso/home-reso.component';
import { EvaluacionesSicComponent } from './roles/sic/evaluaciones/evaluaciones-sic.component';
import { EvaluacionSicComponent } from './roles/sic/evaluacion/evaluacion-sic.component';
import { ActaPamecComponent } from './roles/pamec/acta/acta-pamec.component';
import { EvaluacionesSpProComponent } from './roles/sp/sp-profesionales/evaluaciones-pro/evaluaciones-sp-pro.component';
import { EvaluacionesSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/evaluaciones-sp-ips.component';
import { EvaluacionesPamecComponent } from './roles/pamec/evaluaciones/evaluaciones-pamec.component';
import { ListaPrestadorComponent } from './prestador/lista-prestador.component';
import { NuevoPrestadorComponent } from './prestador/nuevo-prestador.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NuevoUsuarioAdminComponent } from './usuario/admin/nuevo-usuario-admin.component';
import { ListPipe } from './list.pipe';
import { CriteriosicComponent } from './usuario/admin/criteriosic/criteriosic.component';
import { CriteriopamecComponent } from './usuario/admin/criteriopamec/criteriopamec.component';
import { AgregarcrisicComponent } from './usuario/admin/criteriosic/agregarcrisic/agregarcrisic.component';
import { CriterioSpIpsComponent } from './usuario/admin/criterio-sp-ips/criterio-sp-ips.component';
import { AgregarcriIpsComponent } from './usuario/admin/criterio-sp-ips/agregarcri-ips/agregarcri-ips.component';
import { CriterioSpIndComponent } from './usuario/admin/criterio-sp-ind/criterio-sp-ind.component';
import { AgregarIndComponent } from './usuario/admin/criterio-sp-ind/agregar-ind/agregar-ind.component';
import { AgregarcripamComponent } from './usuario/admin/criteriopamec/agregarcripam/agregarcripam.component';
import { EditarcritpamComponent } from './usuario/admin/criteriopamec/editarcritpam/editarcritpam.component';
import { EditarcriteindComponent } from './usuario/admin/criterio-sp-ind/editarcriteind/editarcriteind.component';
import { EditarcriteipsComponent } from './usuario/admin/criterio-sp-ips/editarcriteipsaju/editarcriteips.component';
import { EditarcriteipsverifComponent } from './usuario/admin/criterio-sp-ips/editarcriteipsverif/editarcriteipsverif.component';
import { EditarcriteipsimplComponent } from './usuario/admin/criterio-sp-ips/editarcriteipsimpl/editarcriteipsimpl.component';
import { EditarcriteipsplanComponent } from './usuario/admin/criterio-sp-ips/editarcriteipsplan/editarcriteipsplan.component';
import { ListaVerificacionComponent } from './roles/reso/lista-verificacion/lista-verificacion.component';
import { EvaluacionPamecComponent } from './roles/pamec/evaluacion-pamec/evaluacion-pamec.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { CriterioestandarComponent } from './usuario/admin/criteriosic/criterioestandar/criterioestandar.component';
import { AgregarcriterioestandarComponent } from './usuario/admin/criteriosic/agregarcriterioestandar/agregarcriterioestandar.component';
import { EditarcriteriosicComponent } from './usuario/admin/criteriosic/editarcriteriosic/editarcriteriosic.component';
import { ModalsicComponent } from './roles/sic/evaluacion/modalsic/modalsic.component';
import { Modalsic2Component } from './roles/sic/evaluacion/modalsic2/modalsic2.component';
import { CapacidadInstaladaComponent } from './roles/reso/capacidad-instalada/capacidad-instalada.component';
import { TodosServiciosComponent } from './roles/reso/lista-verificacion/home-estandar/todos-servicios/todos-servicios.component';
import { ConsultaExternaComponent } from './roles/reso/lista-verificacion/home-estandar/consulta-externa/consulta-externa.component';
import { ApoyoDiagnosticoComponent } from './roles/reso/lista-verificacion/home-estandar/apoyo-diagnostico/apoyo-diagnostico.component';
import { InternacionComponent } from './roles/reso/lista-verificacion/home-estandar/internacion/internacion.component';
import { QuirurgicoComponent } from './roles/reso/lista-verificacion/home-estandar/quirurgico/quirurgico.component';
import { AtencionInmediataComponent } from './roles/reso/lista-verificacion/home-estandar/atencion-inmediata/atencion-inmediata.component';
import { EditarPrestadorComponent } from './prestador/editar-prestador/editar-prestador.component';
import { ModalEvaluacionesComponent } from './roles/sic/evaluaciones/modal-evaluaciones/modal-evaluaciones.component';
import { HomeCriteriosComponent } from './usuario/admin/resolucion/home-criterios/home-criterios.component';
import { CriterioTodosServiciosComponent } from './usuario/admin/resolucion/criterio-todos-servicios/criterio-todos-servicios.component';
import { AuditoriaComponent } from './usuario/admin/auditoria/auditoria.component';
import { HomeEvaluacionIpsComponent } from './roles/sp/sp-ips/home-evaluacion-ips/home-evaluacion-ips.component';
import { ActaSpIpsComponent } from './roles/sp/sp-ips/acta-ips/acta-sp-ips.component';
import { ActaSpProComponent } from './roles/sp/sp-profesionales/acta-pro/acta-sp-pro.component';
import { EvaluacionSpProComponent } from './roles/sp/sp-profesionales/evaluacion-sp-pro/evaluacion-sp-pro.component';
import { HomeEstandarComponent } from './roles/reso/lista-verificacion/home-estandar/home-estandar.component';
import { ModalFirmaComponent } from './roles/sic/acta/modal-firma/modal-firma.component';
import { ActaModule } from './roles/sic/acta/acta.module';
import { EvaluacionSpIpsComponent } from './roles/sp/sp-ips/home-evaluacion-ips/evaluacion-sp-ips/evaluacion-sp-ips.component';
import { ActaVisitaVerificacionComponent } from './roles/reso/acta-visita-verificacion/acta-visita-verificacion.component';
import { ActaVisitaIvcComponent } from './roles/reso/acta-visita-ivc/acta-visita-ivc.component';
import { ModalFirmaVerificacionComponent } from './roles/reso/acta-visita-verificacion/modal-firma-verificacion/modal-firma-verificacion.component';
import { InformeResolucionComponent } from './roles/reso/informe-resolucion/informe-resolucion.component';
import { ModalInformeResolucionComponent } from './roles/reso/informe-resolucion/modal-informe-resolucion/modal-informe-resolucion.component';
import { AgregarSedesPrestadorComponent } from './prestador/modal-sedes-prestador/agregar-sedes-prestador/agregar-sedes-prestador.component';
import { ModalFirmaActaSpProComponent } from './roles/sp/sp-profesionales/acta-pro/modal-firma-acta-sp-pro/modal-firma-acta-sp-pro.component';
import { ModalFirmaActaPamecComponent } from './roles/pamec/acta/modal-firma-acta-pamec/modal-firma-acta-pamec.component';
import { EditarEvaluacionSicComponent } from './roles/sic/evaluaciones/editar-evaluacion-sic/editar-evaluacion-sic.component';
import { EditarActaSicComponent } from './roles/sic/evaluaciones/editar-acta-sic/editar-acta-sic.component';
import { EditarEvaluacionSpProComponent } from './roles/sp/sp-profesionales/evaluaciones-pro/editar-evaluacion-sp-pro/editar-evaluacion-sp-pro.component';
import { EditarActaSpProComponent } from './roles/sp/sp-profesionales/evaluaciones-pro/editar-acta-sp-pro/editar-acta-sp-pro.component';
import { EditarActaSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/editar-acta-sp-ips/editar-acta-sp-ips.component';
import { ModalEditarFirmaSicComponent } from './roles/sic/evaluaciones/editar-acta-sic/modal-editar-firma-sic/modal-editar-firma-sic.component';
import { ModalEvaluacionesSpProComponent } from './roles/sp/sp-profesionales/evaluaciones-pro/modal-evaluaciones-sp-pro/modal-evaluaciones-sp-pro.component';
import { ModalEvaluacionesSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/modal-evaluaciones-sp-ips/modal-evaluaciones-sp-ips.component';
import { ModalEvaluacionesPamecComponent } from './roles/pamec/evaluaciones/modal-evaluaciones-pamec/modal-evaluaciones-pamec.component';
import { ModalEditarFirmaSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/editar-acta-sp-ips/modal-editar-firma-sp-ips/modal-editar-firma-sp-ips.component';
import { ModalEditarFirmaSpIndComponent } from './roles/sp/sp-profesionales/evaluaciones-pro/editar-acta-sp-pro/modal-editar-firma-sp-ind/modal-editar-firma-sp-ind.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NuevoUsuarioRolComponent } from './usuario/nuevo-usuario-rol/nuevo-usuario-rol.component';
import { ModalFirmaRolComponent } from './usuario/nuevo-usuario-rol/modal-firma-rol/modal-firma-rol.component';
import { ModalSedesPrestadorComponent } from './prestador/modal-sedes-prestador/modal-sedes-prestador.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { EditarSedesPrestadorComponent } from './prestador/modal-sedes-prestador/editar-sedes-prestador/editar-sedes-prestador.component';
import { ModalEditarFirmaAcompananteSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/editar-acta-sp-ips/modal-editar-firma-acompanante-sp-ips/modal-editar-firma-acompanante-sp-ips.component';
import { ContadorComponent } from './roles/reso/contador/contador.component';
import { ModalCumplimientoSpIndComponent } from './roles/sp/sp-profesionales/evaluacion-sp-pro/modal-cumplimiento-sp-ind/modal-cumplimiento-sp-ind.component';
import { ModalEditarCumplimientoSpIndComponent } from './roles/sp/sp-profesionales/evaluaciones-pro/editar-evaluacion-sp-pro/modal-editar-cumplimiento-sp-ind/modal-editar-cumplimiento-sp-ind.component';
import { EditarEvaluacionSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/editar-evaluacion-sp-ips/editar-evaluacion-sp-ips.component';
import { ModalEditarCalificacionSpIpsComponent } from './roles/sp/sp-ips/evaluaciones-ips/editar-evaluacion-sp-ips/modal-editar-calificacion-sp-ips/modal-editar-calificacion-sp-ips.component';
import { CumplimientoRequisitosComponent } from './roles/reso/cumplimiento-requisitos/cumplimiento-requisitos.component';
import { ConclusionesRecomendacionesComponent } from './roles/reso/conclusiones-recomendaciones/conclusiones-recomendaciones.component';
import { EquipoVerificadoresComponent } from './roles/reso/equipo-verificadores/equipo-verificadores.component';
import { ModalCalificacionPamecComponent } from './roles/pamec/evaluacion-pamec/modal-calificacion-pamec/modal-calificacion-pamec.component';
import { EditarActaPamecComponent } from './roles/pamec/evaluaciones/editar-acta-pamec/editar-acta-pamec.component';
import { EditarEvaluacionPamecComponent } from './roles/pamec/evaluaciones/editar-evaluacion-pamec/editar-evaluacion-pamec.component';
import { ModalFirmaPamecPrestadorComponent } from './roles/pamec/evaluaciones/editar-acta-pamec/modal-firma-pamec-prestador/modal-firma-pamec-prestador.component';
import { ListaProcesosIvcComponent } from './roles/reso/lista-procesos-ivc/lista-procesos-ivc.component';
import { ModalCumplimientoRequisitosComponent } from './roles/reso/cumplimiento-requisitos/modal-cumplimiento-requisitos/modal-cumplimiento-requisitos.component';
import { ModalCalificacionIpsComponent } from './roles/sp/sp-ips/home-evaluacion-ips/evaluacion-sp-ips/modal-calificacion-ips/modal-calificacion-ips.component';



@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    AppComponent,
    PasswordcComponent,
    


    //USUARIOS
    ListaUsuarioComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,

    //SOGC
    HomeSicComponent,
    ActaSicComponent,
    HomeSpComponent,
    HomePamecComponent,
    HomeResoComponent,
    EvaluacionesSicComponent,
    EvaluacionSicComponent,
    ActaSpIpsComponent,
    ActaSpProComponent,
    ActaPamecComponent,
    EvaluacionesSpProComponent,
    EvaluacionesSpIpsComponent,
    EvaluacionesPamecComponent,
    ListaPrestadorComponent,
    NuevoPrestadorComponent,
    NuevoUsuarioAdminComponent,
    ListPipe,
    CriteriosicComponent,
    CriteriopamecComponent,
    AgregarcrisicComponent,
    CriterioSpIpsComponent,
    AgregarcriIpsComponent,
    CriterioSpIndComponent,
    AgregarIndComponent,
    AgregarcripamComponent,
    EditarcritpamComponent,
    EditarcriteindComponent,
    EditarcriteipsComponent,
    EditarcriteipsverifComponent,
    EditarcriteipsimplComponent,
    EditarcriteipsplanComponent,
    ListaVerificacionComponent,
    EvaluacionSpProComponent,
    EvaluacionPamecComponent,
    ResetpasswordComponent,
    CriterioestandarComponent,
    AgregarcriterioestandarComponent,
    EditarcriteriosicComponent,
    ModalsicComponent,
    Modalsic2Component,
    CapacidadInstaladaComponent,
    HomeEstandarComponent,
    TodosServiciosComponent,
    ConsultaExternaComponent,
    ApoyoDiagnosticoComponent,
    InternacionComponent,
    QuirurgicoComponent,
    AtencionInmediataComponent,
    EditarPrestadorComponent,
    ModalEvaluacionesComponent,
    HomeCriteriosComponent,
    CriterioTodosServiciosComponent,
    AuditoriaComponent,
    HomeEvaluacionIpsComponent,
    ModalFirmaComponent,
    EvaluacionSpIpsComponent,
    ActaVisitaVerificacionComponent,
    ActaVisitaIvcComponent,
    ModalFirmaVerificacionComponent,
    InformeResolucionComponent,
    ModalInformeResolucionComponent,
    AgregarSedesPrestadorComponent,
    ModalFirmaActaSpProComponent,
    ModalFirmaActaPamecComponent,
    EditarEvaluacionSicComponent,
    EditarActaSicComponent,
    EditarEvaluacionSpProComponent,
    EditarActaSpProComponent,
    EditarActaSpIpsComponent,
    ModalEditarFirmaSicComponent,
    ModalEvaluacionesSpProComponent,
    ModalEvaluacionesSpIpsComponent,
    ModalEvaluacionesPamecComponent,
    ModalEditarFirmaSpIpsComponent,
    ModalEditarFirmaSpIndComponent,
    NuevoUsuarioRolComponent,
    ModalFirmaRolComponent,
    ModalSedesPrestadorComponent,
    RichTextEditorComponent,
    EditarSedesPrestadorComponent,
    ModalEditarFirmaAcompananteSpIpsComponent,
    ContadorComponent,
    ModalCumplimientoSpIndComponent,
    ModalEditarCumplimientoSpIndComponent,
    EditarEvaluacionSpIpsComponent,
    ModalEditarCalificacionSpIpsComponent,
    CumplimientoRequisitosComponent,
    ConclusionesRecomendacionesComponent,
    EquipoVerificadoresComponent,
    ModalCalificacionPamecComponent,
    EditarActaPamecComponent,
    EditarEvaluacionPamecComponent,
    ModalFirmaPamecPrestadorComponent,
    ListaProcesosIvcComponent,
    ModalCumplimientoRequisitosComponent,
    ModalCalificacionIpsComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    PasswordModule,
    DropdownModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ModalModule,
    ActaModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
    

  ],
  providers: [interceptorProvider, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
