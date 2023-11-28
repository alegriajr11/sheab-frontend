// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //USUARIOS
  usuarioURL: 'http://localhost:8080/usuario/',
  authURL: 'http://localhost:8080/auth/',
  restablecerContraseña: 'http://localhost:8080/auth/request-reset-password/',
  prestadorURL: 'http://localhost:8080/prestador/',
  prestadorMunicipioURL: 'http://localhost:8080/prestador/mun/',
  prestadorPamecMunicipioURL: 'http://localhost:8080/prestador/mun/pamec/',
  
  prestadorIpsMunicipioURL: 'http://localhost:8080/prestador/mun/sp/ips/',
  prestadorIndMunicipioURL: 'http://localhost:8080/prestador/mun/sp/pro/ind/',
  rolURL: 'http://localhost:8080/rol/',
  claseURL: 'http://localhost:8080/clase/',
  generarPdfURL: 'http://localhost:8080/generarpdf/usuarios/',

  //SEDES - PRESTAOR
  sedeURL: 'http://localhost:8080/sede/',


  //SIC
  criterioSicURL: 'http://localhost:8080/criteriosic/',
  indicadorURL: 'http://localhost:8080/indicador/',
  criterios_URL: 'http://localhost:8080/criterio/',
  criterioURL: 'http://localhost:8080/criteriosic/criterio/',
  cumplimientoEstandarURL: 'http://localhost:8080/criteriosic-cumplimiento/',

  //EVALUACION-SIC
  evaluacionSicUrl: 'http://localhost:8080/evaluacion-sic/',
  
  //SIC-PDF
  actaSic_pdf_URL: 'http://localhost:8080/sic-acta/',


  //PAMEC
  actividadURL: 'http://localhost:8080/actividad/',
  criteriopamURL: 'http://localhost:8080/criteriopam/',
  criteriopam1URL: 'http://localhost:8080/criteriopam/criterio/',

  //PAMEC-PDF
  actaPamec_pdf_url: 'http://localhost:8080/pamec-acta/',

  //SEGURIDAD DEL PACIENTE - PROFESIONALES INDEPENDIENTE
  etapaURL: 'http://localhost:8080/sp-ind/',
  criterioindURL: 'http://localhost:8080/criterioind/',
  criteindURL: 'http://localhost:8080/criterioind/criterio/',
  calificacionIndURL: 'http://localhost:8080/calificacionind/',
  
  //EVALUACION-SP - INDEPENDIENTES
  evaluacionIndUrl: 'http://localhost:8080/evaluacion-ind/',


  //SEGURIDAD DEL PACIENTE - IPS
  evaluacionipsURL: 'http://localhost:8080/evaluacionips/',
  generarEvaluacionUrl: 'http://localhost:8080/sp-ips/',
  itemipsURL: 'http://localhost:8080/itemips/',
  planeacionURL: 'http://localhost:8080/planeacion/',
  planeacionOneURL: 'http://localhost:8080/planeacion/criterio/',
  implementacionURL: 'http://localhost:8080/criterioimple/',
  implementacionOneURL: 'http://localhost:8080/criterioimple/implementacion/',
  ajusteURL: 'http://localhost:8080/criterioajuste/',
  ajusteDetailURL: 'http://localhost:8080/criterioajuste/ajuste/',
  verificacionURL: 'http://localhost:8080/criterioverif/',
  verificacionOneURL: 'http://localhost:8080/criterioverif/verificacion/',

  //URL DE CALIFICACION POR ETAPA
  calificacionIpsAjuste: 'http://localhost:8080/calificacionips-ajuste/',
  calificacionIpsImplementacion: 'http://localhost:8080/calificacionips-implementacion/',
  calificacionIpsPlaneacion: 'http://localhost:8080/calificacionips-planeacion/',
  calificacionIpsVerificacion: 'http://localhost:8080/calificacionips-verificacion/',

  //SP-PDF
  actaSpIps_pdf_URL: 'http://localhost:8080/sp-ips/',
  actaSpInd_pdf_URL: 'http://localhost:8080/sp-independientes/',



  //RESOLUCIÓN 3100/2019
  //ACTA-VERIFICACION
  actaVerificacion: 'http://localhost:8080/verificacion/',

  //CONDICIONES DE CAPACIDAD TECNOLOGICA Y CIENTIFICA 
  todos_serviciosURL: 'http://localhost:8080/criterio-servicios/',


  //CUMPLIMIENTO DE REQUISITOS DE LAS CONDICIONES DE HABILITACIÓN 
  condiciones_habilitacion: 'http://localhost:8080/requisitos-condiciones-habilitacion/',

  //SERVICIOS VERIFICADOS - PRESTADOR RESOLUCION 3100
  servicios_verificados: 'http://localhost:8080/servicios-verificados/',


  //PRESTADOR
  municipioURL: 'http://localhost:8080/municipio/',
  clasificacionURL: 'http://localhost:8080/clasificacion/',
  tipoURL: 'http://localhost:8080/tipo/',


  //AUDITORIA
  auditoriaUrl: 'http://localhost:8080/auditoria-registro/',

  //BACKUP BASE DE DATOS
  backupUrl: 'http://localhost:8080/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
