import { ApartadoDto } from "../SeccionApartadoDto/apartado.dto";
import { SeccionDto } from "../SeccionApartadoDto/seccion.dto";

export class CriteriosAtencionInmediataDto {
    cri_atencion_id?: number;
    cri_atencion_modalidad: string;
    cri_atencion_articulo: string;
    cri_atencion_seccion: string;
    cri_atencion_apartado: string;
    cri_atencion_nombre_criterio: string;

    servi_seccion: SeccionDto
    servi_aparto: ApartadoDto

    constructor(cri_atencion_modalidad: string, cri_atencion_articulo: string, cri_atencion_seccion: string,
        cri_atencion_apartado: string, cri_atencion_nombre_criterio: string){
        this.cri_atencion_modalidad = cri_atencion_modalidad;
        this.cri_atencion_articulo = cri_atencion_articulo;
        this.cri_atencion_seccion = cri_atencion_seccion;
        this.cri_atencion_apartado = cri_atencion_apartado;
        this.cri_atencion_nombre_criterio = cri_atencion_nombre_criterio;
    }
}