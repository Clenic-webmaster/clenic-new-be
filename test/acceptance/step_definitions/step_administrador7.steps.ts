import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { IPosition } from 'src/utils/types';
import { User } from 'src/models/interfaces';


@binding()
export class AdministradorSteps7 {
  private validar_fecha: boolean = false;
  private edicion_fecha: boolean = false;
  private fecha_servicio: Date;


  @given(/la fecha y hora es válida/)
  public validacion_fecha(status_date: boolean) {
    this.validar_fecha = status_date;
  }

  @when(/seleccione la fecha y hora/)
  public seleccion_fecha(select_date: boolean) {
    this.edicion_fecha = select_date;
  }

  @then(/se agrega una nueva fecha y hora, o se notifica que no esta disponible/)
  public añadir_fecha(new_date: Date) {
    if (this.validar_fecha = true){
        this.fecha_servicio = new_date;
    }
  }

}