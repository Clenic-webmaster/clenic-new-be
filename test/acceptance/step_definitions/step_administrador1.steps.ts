import { binding, given, then, when} from 'cucumber-tsflow';
import { IPosition } from 'src/utils/types';
import { User } from 'src/models/interfaces';


@binding()
export class AdministradorSteps1 {
  private validar_datos: boolean = false;
  private crear_ingeniero: boolean = false;
  private nuevo_ingeniero: User;


  @given(/Los datos registrados son validos/)
  public validacion_datos(status_datos: boolean) {
    this.validar_datos = status_datos;
  }

  @when(/Seleccione crear cuenta ingeniero/)
  public creacion_ingeniero(option_create: boolean) {
    this.crear_ingeniero = option_create;
  }

  @then(/se añade al nuevo ingeniero como el responsable de dicho servicio/)
  public añadir_ingeniero(new_engineer: User) {
    this.nuevo_ingeniero = new_engineer;
  }
}

