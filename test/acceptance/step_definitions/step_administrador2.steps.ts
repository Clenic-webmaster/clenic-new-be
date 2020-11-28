import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { IPosition } from 'src/utils/types';
import { User } from 'src/models/interfaces';


@binding()
export class AdministradorSteps2 {
  private status_suscripcion: string = "A CADUCAR";
  private mensaje_plataforma: string = "SE DEBE REALIZAR PAGO ADICIONAL";
  private metodos_pago: string;


  @given(/la suscripción está a punto de caducar o se desea nuevos ingenieros/)
  public estado_suscripcion(suscription: string) {
    this.status_suscripcion = suscription;
  }

  @when(/la plataforma indica que se debe realizar el pago adicional/)
  public indicacion_plataforma(message: string) {
    this.mensaje_plataforma = message;
  }

  @then(/Se mostrará una ventana con el cual se mostrará distintos tipos de pago/)
  public pago_plataforma(pago: string) {
    this.metodos_pago = pago;
  }

}