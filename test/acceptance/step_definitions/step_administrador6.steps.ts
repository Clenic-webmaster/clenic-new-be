import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { User } from 'src/models/interfaces';


@binding()
export class AdministradorSteps6 {
  private status_ingeniero: boolean = true;
  private detalles_ingeniero: User;

  @given(/el administrador desee analizar los datos del ingeniero/)
  public revision_ingeniero(status: boolean) {
    this.status_ingeniero = status;
  }

  @when(/selecciona más detalles sobre el perfil del ingeniero/)
  public seleccion_detalles_ingeniero(engineer: User) {
    this.detalles_ingeniero = engineer
  }

  @then(/se mostrará una ventana con más información detallada del ingeniero/)
  public show_engineer(option: boolean) {
  }
}
