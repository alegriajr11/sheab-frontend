import { ApartadoDto } from "../SeccionApartadoDto/apartado.dto";
import { SeccionDto } from "../SeccionApartadoDto/seccion.dto";

export class CriterioTodosServiciosDto {
    cris_id?: number;
    cris_modalidad: string;
    cris_articulo: string;
    cris_seccion: string;
    cris_apartado: string;
    cris_nombre_criterio: string;

    todos_servi_seccion: SeccionDto
    todos_servi_aparto: ApartadoDto

    constructor(cris_modalidad: string, cris_articulo: string, cris_seccion: string,
        cris_apartado: string, cris_nombre_criterio: string){
        this.cris_modalidad = cris_modalidad;
        this.cris_articulo = cris_articulo;
        this.cris_seccion = cris_seccion;
        this.cris_apartado = cris_apartado;
        this.cris_nombre_criterio = cris_nombre_criterio;
    }
}