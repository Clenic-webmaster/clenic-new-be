import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { IPosition } from 'src/utils/types';
import { Order, User } from 'src/models/interfaces';


@binding()
export class AdministradorSteps10 {
  private validar_estado:  string = "TERMINADO";
  private crear_reporte: string;
  private detalles_servicio: Order;


  @given(/el servicio ha sido completado y aprobado por el encargado/)
  public validacion_estado(status_service: string) {
    this.validar_estado = status_service;
  }

  @when(/solicite realizar un reporte/)
  public reporte_servicio(option_create_report: string) {
    this.crear_reporte = option_create_report;
  }

  @then(/se muestra la información faltante del reporte final a completar/)
  public datos_servicio(service: Order) {
    this.detalles_servicio = service;
  }

}