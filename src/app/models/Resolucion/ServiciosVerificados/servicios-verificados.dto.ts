import { GrupoEvaluacionDto } from "../GrupoEvaluacion/grupo-evaluacion.dto";

export class ServiciosVerificadosDto {
    ser_id?: number;
    ser_codigo: string;
    ser_nombre: string;

    //VARIBALES PARA LA MODALIDAD
    ambulatorio: string;
    hospitalario: string;
    unidad_movil: string;
    domiciliario: string;
    otras_extramural: string;
    centro_referencia: string;
    institucion_remisora: string;
    //VARIABLES PARA ESPECIFICAR LA COMPLEJIDAD
    complejidad_baja: string;
    complejidad_media: string;
    complejidad_alta: string;
    grup_evaluacion: GrupoEvaluacionDto;
}