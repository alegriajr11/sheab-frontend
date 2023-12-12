import { ApartadoDto } from "../SeccionApartadoDto/apartado.dto";
import { SeccionDto } from "../SeccionApartadoDto/seccion.dto";

export class CriteriosApoyoDiagnosticoDto {
    cri_apoyo_id?: number;
    cri_apoyo_modalidad: string;
    cri_apoyo_articulo: string;
    cri_apoyo_seccion: string;
    cri_apoyo_apartado: string;
    cri_apoyo_nombre_criterio: string;

    servi_seccion: SeccionDto
    servi_aparto: ApartadoDto

    constructor(cri_apoyo_modalidad: string, cri_apoyo_articulo: string, cri_apoyo_seccion: string,
        cri_apoyo_apartado: string, cri_apoyo_nombre_criterio: string){
        this.cri_apoyo_modalidad = cri_apoyo_modalidad;
        this.cri_apoyo_articulo = cri_apoyo_articulo;
        this.cri_apoyo_seccion = cri_apoyo_seccion;
        this.cri_apoyo_apartado = cri_apoyo_apartado;
        this.cri_apoyo_nombre_criterio = cri_apoyo_nombre_criterio;
    }
}