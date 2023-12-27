import { ApartadoDto } from "../SeccionApartadoDto/apartado.dto";
import { SeccionDto } from "../SeccionApartadoDto/seccion.dto";

export class CriteriosQuirurgiucosDto {
    criqui_id?: number;
    criqui_modalidad: string;
    criqui_articulo: string;
    criqui_seccion: string;
    criqui_apartado: string;
    criqui_nombre_criterio: string;

    servi_seccion: SeccionDto
    servi_aparto: ApartadoDto

    constructor(criqui_modalidad: string, criqui_articulo: string, criqui_seccion: string,
        criqui_apartado: string, criqui_nombre_criterio: string){
        this.criqui_modalidad = criqui_modalidad;
        this.criqui_articulo = criqui_articulo;
        this.criqui_seccion = criqui_seccion;
        this.criqui_apartado = criqui_apartado;
        this.criqui_nombre_criterio = criqui_nombre_criterio;
    }
}