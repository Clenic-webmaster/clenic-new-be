import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { IPosition } from 'src/utils/types';
import { Order, User } from 'src/models/interfaces';


@binding()
export class AdministradorSteps9 {
  private validar_servicio: boolean = false;
  private servicio_actual: boolean = false;
  private detalles_servicio: Order;


  @given(/el administrador ha ingresado la información de los servicios previamente/)
  public validacion_servicio(status_service: boolean) {
    this.validar_servicio = status_service;
  }

  @when(/seleccione visualizar el cronograma de servicio/)
  public visualizar_servicio(details_service: boolean) {
    this.servicio_actual = details_service;
  }

  @then(/se muestra el ingeniero a cargo, la fecha y hora, y los detalles del servicio/)
  public datos_servicio(service: Order) {
    this.detalles_servicio = service;
  }

}