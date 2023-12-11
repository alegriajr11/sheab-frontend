import { ApartadoDto } from "../SeccionApartadoDto/apartado.dto";
import { SeccionDto } from "../SeccionApartadoDto/seccion.dto";

export class CriteriosConsultaExternaDto {
    criext_id?: number;
    criext_modalidad: string;
    criext_articulo: string;
    criext_seccion: string;
    criext_apartado: string;
    criext_nombre_criterio: string;

    servi_seccion: SeccionDto
    servi_aparto: ApartadoDto

    constructor(criext_modalidad: string, criext_articulo: string, criext_seccion: string,
        criext_apartado: string, criext_nombre_criterio: string){
        this.criext_modalidad = criext_modalidad;
        this.criext_articulo = criext_articulo;
        this.criext_seccion = criext_seccion;
        this.criext_apartado = criext_apartado;
        this.criext_nombre_criterio = criext_nombre_criterio;
    }
}