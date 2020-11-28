import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { Order } from 'src/models/interfaces/order.interface';
import { User } from 'src/models/interfaces';


@binding()
export class AdministradorSteps8 {
  private validar_fecha: boolean = false;
  private actual_fecha: Date;
  private ingeniero_actual: User;


  @given(/la fecha y hora no es válida/)
  public validacion_fecha(status_date: boolean) {
    this.validar_fecha = status_date;
  }

  @when(/seleccione la fecha y hora./)
  public seleccion_fecha(edit_date: Date) {
    this.actual_fecha = edit_date;
  }

  @then(/se añade al nuevo ingeniero como el responsable de dicho servicio/)
  public añadir_ingeniero(nuevo_ingeniero: User) {
        this.ingeniero_actual = nuevo_ingeniero;
  }

}
