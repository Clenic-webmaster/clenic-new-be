import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { IPosition } from 'src/utils/types';
import { Order } from 'src/models/interfaces/order.interface';


@binding()
export class AdministradorSteps11 {
  private state_ingeniero: string = "EN RUTA";
  private estado_ubicacion: boolean = false;
  private estado_position: IPosition = {lat: 0, long: 0};

  @given(/el ingeniero está en camino a brindar el servicio/)
  public state_ubicacion(status_engineer: string) {
    this.state_ingeniero = status_engineer;
  }

  @when(/la administradora solicita visualizar la ubicación del ingeniero/)
  public notificar_ubicacion(view_ubication: boolean) {
    this.estado_ubicacion = view_ubication;
  }

  @then(/se muestra la ubicación en tiempo real del ingeniero/)
  public mostrar_ubicacion(position: IPosition) {
    if (this.estado_ubicacion = true){
        this.estado_position = position;
    }
  }
  
}