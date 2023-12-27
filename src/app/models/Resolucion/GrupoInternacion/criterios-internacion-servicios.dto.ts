import { ApartadoDto } from "../SeccionApartadoDto/apartado.dto";
import { SeccionDto } from "../SeccionApartadoDto/seccion.dto";

export class CriteriosInternacionDto {
    cri_int_id?: number;
    cri_int_modalidad: string;
    cri_int_articulo: string;
    cri_int_seccion: string;
    cri_int_apartado: string;
    cri_int_nombre_criterio: string;

    servi_seccion: SeccionDto
    servi_aparto: ApartadoDto

    constructor(cri_int_modalidad: string, cri_int_articulo: string, cri_int_seccion: string,
        cri_int_apartado: string, cri_int_nombre_criterio: string){
        this.cri_int_modalidad = cri_int_modalidad;
        this.cri_int_articulo = cri_int_articulo;
        this.cri_int_seccion = cri_int_seccion;
        this.cri_int_apartado = cri_int_apartado;
        this.cri_int_nombre_criterio = cri_int_nombre_criterio;
    }
}