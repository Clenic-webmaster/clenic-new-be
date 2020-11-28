import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';


@binding()
export class AdministradorSteps3 {
  private estado_actual: String = "DISPONIBLE";
  private dias_inhabilitar: Number = 0;
  private cuenta_activa: Boolean = false;

  @given(/El administrador desea suspender al ingeniero, RRHH autoriza su salida, o cuenta con descanso medico/)
  public status_labor_ingeniero(state: String) {
    this.estado_actual = state;
  }

  @when(/Selecciona la opción inhabilitar cuenta/)
  public inhabilitar_cuenta(state: String = "INACTIVO") {
    this.estado_actual = String(state);
  }

  @then(/Se inhabilitará la cuenta del ingeniero por una cantidad de días hábiles/)
  public dias_cuenta_inhabilitada(days: Number, active: Boolean) {
    while (assert.equal(this.dias_inhabilitar, days)) {
        assert.equal(this.cuenta_activa, active)
    }
  }
}
