import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { IPosition } from 'src/utils/types';
import { User } from 'src/models/interfaces';


@binding()
export class AdministradorSteps4 {
  private validar_delete: boolean = false;
  private opcion_eliminar: boolean = false;


  @given(/Dado que se eliminará un ingeniero/)
  public validacion_eliminacion(status_validation: boolean) {
    this.validar_delete = status_validation;
  }

  @when(/Seleccione eliminar cuenta ingeniero/)
  public seleccionar_eliminar(option_delete: boolean) {
    this.opcion_eliminar = option_delete;
  }

  @then(/Se eliminará cuenta del ingeniero/)
  public eliminar_ingeniero(engineer: User) {
    delete engineer._id;
  }

}