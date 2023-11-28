import { ActaPamecDto } from "../Actas/actaPamePdf.dto";

export class EvaluacionPamecDto {
    eva_id?: number;
    eva_creado: string;

    eval_acta_pamec: ActaPamecDto
}