import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {


  //ACTAS
  id_evaluacion_sic: number;
  id_evaluacion_sp_ind: number;
  id_evaluacion_sp_ips: number;
  id_evaluacion_pamec: number;
  pre_cod_habilitacion: string;

  id_acta_sic: number
  id_acta_ips: number

  /**CUMPLIMIENTO ROL SIC */
  crie_id: number
  cumpl_asignado: string
  /**FIN ATRIBUTOS ROL SIC */

  /**ID_CRITERIO - CALIFICACION ROL SP-INDEPENDIENTES */
  cri_ind_id: number
  /**FIN ATRIBUTOS SP-INDEPENDIENTES */

  /**ID_CRITERIO - CALIFICACION ROL PAMEC */
  cri_pamec_id: number
  /**FIN ATRIBUTOS PAMEC */

  /**ID_CRITERIO - CALIFICACION ROL SP-IPS */
  cri_ips_id: number
  nombre_etapa: string
  /**FIN ATRIBUTOS SP-IPS */

  //ARRAY CRITERIOS SIC
  criteriosSicGuardados: any[] = [];

  //ARRAY CRITERIOS SP-IND
  criteriosIndGuardados: any[] = [];

  //ARRAY CRITERIOS SP-IPS
  criteriosIpsAjusteGuardados: any[] = [];
  criteriosIpsImplementacionGuardados: any[] = [];
  criteriosIpsPlaneacionGuardados: any[] = [];
  criteriosIpsVerificacionGuardados: any[] = [];

  //ARRAY CRITERIOS SP-IND
  criteriosPamecGuardados: any[] = [];

  //ARRAY CRITERIOS SP-IND
  condicionesHabilitacionGuardados: any[] = [];

  nombreUsuario: string;

  //CONDICIONES DE HABILITACIÓN
  nombre_condicion_habilitacion: string //Almacenar el nombre de la condicion de habilitacion para el modal
  id_condicion_hablitacion: number

  private firmaActaSic: string;
  private firmaActaSpIpsPrestador: string;
  private firmaActaSpIpsAcompanante: string;
  private firmaActaSpInd: string;
  private firmaActaPamec: string;
  private firmaActaVisitaVerificacion: string;
  private firmaActaVisitaIvc: string;
  private firmaUsuario: string;


  private cumplAsignadoSubject = new BehaviorSubject<string>(''); // Inicializado con un valor vacío
  cumplAsignado$: Observable<string> = this.cumplAsignadoSubject.asObservable();



  //NOMBRES PRESTADORES MODAL
  pres_nombre: string
  //NOMBRE FUNCIONARIO MODAL
  funcionario_nombre: string

  constructor() { }

  //METODOS SET ACTAS
  setFirmaActaSic(firmaActaSic: string) {
    this.firmaActaSic = firmaActaSic
  }

  setFirmaActaSpIpsPrestador(firmaActaSpIpsPrestador: string) {
    this.firmaActaSpIpsPrestador = firmaActaSpIpsPrestador
  }

  setFirmaActaSpIpsAcompanante(firmaActaSpIpsAcompanante: string) {
    this.firmaActaSpIpsAcompanante = firmaActaSpIpsAcompanante
  }

  setFirmaActaSpInd(firmaActaSpInd: string) {
    this.firmaActaSpInd = firmaActaSpInd
  }

  setFirmaActaPamec(firmaActaPamec: string) {
    this.firmaActaPamec = firmaActaPamec
  }


  setFirmaActaVisitaVerificacion(firmaVisitaVerificacion: string) {
    this.firmaActaVisitaVerificacion = firmaVisitaVerificacion
  }

  setFirmaActaVisitaIvc(firmaVisitaIvc: string) {
    this.firmaActaVisitaIvc = firmaVisitaIvc
  }

  setFirmaUsuario(firmaUsuario: string) {
    this.firmaUsuario = firmaUsuario
  }

  //Capturar Nombre de Usuario
  setNombreUsuario(usu_nombre: string) {
    this.nombreUsuario = usu_nombre
  }


  //METODOS GET
  getFirmaActaSic(): string {
    return this.firmaActaSic
  }

  getFirmaActaSpIpsPrestador(): string {
    return this.firmaActaSpIpsPrestador
  }

  getFirmaActaSpIpsAcompanante(): string {
    return this.firmaActaSpIpsAcompanante
  }

  getFirmaActaSpInd(): string {
    return this.firmaActaSpInd
  }

  getFirmaActaPamec(): string {
    return this.firmaActaPamec
  }

  getFirmaActaVisitaVerificacion(): string {
    return this.firmaActaVisitaVerificacion
  }

  getFirmaActaVisitaIvc(): string {
    return this.firmaActaVisitaIvc
  }

  getFirmaUsuario(): string {
    return this.firmaUsuario
  }



  //METODOS SET EVALUACIONES Y CRITERIOS
  setIdEvaluacionSic(id: number) {
    this.id_evaluacion_sic = id;
  }

  setIdActaSic(id: number) {
    this.id_acta_sic = id
  }

  setIdActaIps(id: number) {
    this.id_acta_ips = id
  }

  setIdCriterioSic(id: number) {
    this.crie_id = id;
  }

  setIdCriterioInd(id: number) {
    this.cri_ind_id = id;
  }

  setIdCriterioPamec(id: number) {
    this.cri_pamec_id = id;
  }

  setIdCriterioSpIps(id: number) {
    this.cri_ips_id = id;
  }


  setIdEvaluacionSpIps(id_eva: number) {
    this.id_evaluacion_sp_ips = id_eva;
  }

  setNameEtapaSpIps(nombre_etapa: string) {
    this.nombre_etapa = nombre_etapa;
  }

  setIdSpIndEvaluacion(id: number) {
    this.id_evaluacion_sp_ind = id;
  }

  setIdPamecEvaluacion(id: number) {
    this.id_evaluacion_pamec = id;
  }

  setNombrePrestador(name: string) {
    this.pres_nombre = name
  }

  setNombreFuncionario(name: string) {
    this.funcionario_nombre = name
  }


  setIdPrestador(id: string) {
    this.pre_cod_habilitacion = id
  }

  setCumpleAsignado(cumpleAsignado: string) {
    this.cumplAsignadoSubject.next(cumpleAsignado);
  }


  //CONDICIONES REQUISITOS DE HABILITACION:
  setNombreCondicionHabilitacion(nombre_condicion: string){
    this.nombre_condicion_habilitacion= nombre_condicion;
  }

  setIdCodicionHabilitacion(id: number){
    this.id_condicion_hablitacion= id;
  }

}
