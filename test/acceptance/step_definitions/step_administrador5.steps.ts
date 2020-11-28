import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { IPosition } from 'src/utils/types';
import { User } from 'src/models/interfaces';


@binding()
export class AdministradorSteps5 {
  private validar_datos: boolean = false;
  private mostrar_ingeniero: boolean = false;
  private lista_ingenieros: User;

  @given(/Se cuenta con más de un ingeniero/)
  public validacion_datos(status_datos: boolean) {
    this.validar_datos = status_datos;
  }

  @when(/Se desee mostrar a los ingenieros/)
  public mostrar_ingenieros(show_engineer: boolean) {
    this.mostrar_ingeniero = show_engineer;
  }

  @then(/Se mostrará a los ingenieros disponibles/)
  public lista_ingeniero(list_engineer: User) {
    this.lista_ingenieros = list_engineer;
  }

}