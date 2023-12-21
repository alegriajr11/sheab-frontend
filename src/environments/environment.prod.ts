export const environment = {
  production: true,
  API_URL: 'https://backend-sehab-84c88c9662e1.herokuapp.com',

  //USUARIOS
  usuarioURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/usuario/',
  authURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/auth/',
  restablecerContraseña: 'https://backend-sehab-84c88c9662e1.herokuapp.com/auth/request-reset-password/',
  prestadorURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/prestador/',
  prestadorMunicipioURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/prestador/mun/',
  prestadorPamecMunicipioURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/prestador/mun/pamec/',
  
  prestadorIpsMunicipioURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/prestador/mun/sp/ips/',
  prestadorIndMunicipioURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/prestador/mun/sp/pro/ind/',
  rolURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/rol/',
  claseURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/clase/',
  generarPdfURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/generarpdf/usuarios/',

  //SEDES - PRESTAOR
  sedeURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/sede/',


  //SIC
  criterioSicURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criteriosic/',
  indicadorURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/indicador/',
  criterios_URL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterio/',
  criterioURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criteriosic/criterio/',
  cumplimientoEstandarURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criteriosic-cumplimiento/',
  divCreadoURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/divs-creados-sic/',


  //EVALUACION-SIC
  evaluacionSicUrl: 'https://backend-sehab-84c88c9662e1.herokuapp.com/evaluacion-sic/',
  
  //SIC-PDF
  actaSic_pdf_URL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/sic-acta/',


  //PAMEC
  actividadURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/actividad/',
  criteriopamURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criteriopam/',
  criteriopam1URL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criteriopam/criterio/',
  calificacionPamecURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/calificacionpamec/',

  //PAMEC-PDF
  actaPamec_pdf_url: 'https://backend-sehab-84c88c9662e1.herokuapp.com/pamec-acta/',

  //SEGURIDAD DEL PACIENTE - PROFESIONALES INDEPENDIENTE
  etapaURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/sp-ind/',
  criterioindURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterioind/',
  criteindURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterioind/criterio/',
  calificacionIndURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/calificacionind/',
  
  //EVALUACION-SP - INDEPENDIENTES
  evaluacionIndUrl: 'https://backend-sehab-84c88c9662e1.herokuapp.com/evaluacion-ind/',


  //SEGURIDAD DEL PACIENTE - IPS
  evaluacionipsURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/evaluacionips/',
  generarEvaluacionUrl: 'https://backend-sehab-84c88c9662e1.herokuapp.com/sp-ips/',
  itemipsURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/itemips/',
  planeacionURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/planeacion/',
  planeacionOneURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/planeacion/criterio/',
  implementacionURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterioimple/',
  implementacionOneURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterioimple/implementacion/',
  ajusteURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterioajuste/',
  ajusteDetailURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterioajuste/ajuste/',
  verificacionURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterioverif/',
  verificacionOneURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterioverif/verificacion/',

  //URL DE CALIFICACION POR ETAPA
  calificacionIpsAjuste: 'https://backend-sehab-84c88c9662e1.herokuapp.com/calificacionips-ajuste/',
  calificacionIpsImplementacion: 'https://backend-sehab-84c88c9662e1.herokuapp.com/calificacionips-implementacion/',
  calificacionIpsPlaneacion: 'https://backend-sehab-84c88c9662e1.herokuapp.com/calificacionips-planeacion/',
  calificacionIpsVerificacion: 'https://backend-sehab-84c88c9662e1.herokuapp.com/calificacionips-verificacion/',

  //SP-PDF
  actaSpIps_pdf_URL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/sp-ips/',
  actaSpInd_pdf_URL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/sp-independientes/',



  //RESOLUCIÓN 3100/2019
  //ACTA-VERIFICACION
  actaVerificacion: 'https://backend-sehab-84c88c9662e1.herokuapp.com/verificacion/',

  //CONDICIONES DE CAPACIDAD TECNOLOGICA Y CIENTIFICA 
  todos_serviciosURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/criterio-servicios/',
  cumplimiento_todos_serviciosUrl: 'https://backend-sehab-84c88c9662e1.herokuapp.com/cumplimiento-todos-servicios/',


  //CUMPLIMIENTO DE REQUISITOS DE LAS CONDICIONES DE HABILITACIÓN 
  condiciones_habilitacion: 'https://backend-sehab-84c88c9662e1.herokuapp.com/requisitos-condiciones-habilitacion/',

  //SERVICIOS VERIFICADOS - PRESTADOR RESOLUCION 3100
  servicios_verificados: 'https://backend-sehab-84c88c9662e1.herokuapp.com/servicios-verificados/',


  //PRESTADOR
  municipioURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/municipio/',
  clasificacionURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/clasificacion/',
  tipoURL: 'https://backend-sehab-84c88c9662e1.herokuapp.com/tipo/',


  //AUDITORIA
  auditoriaUrl: 'https://backend-sehab-84c88c9662e1.herokuapp.com/auditoria-registro/',

  //BACKUP BASE DE DATOS
  backupUrl: 'https://backend-sehab-84c88c9662e1.herokuapp.com/'
};
