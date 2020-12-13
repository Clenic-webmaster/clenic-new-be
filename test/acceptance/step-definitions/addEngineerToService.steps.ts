import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import {CEnginner} from "../classes/engineer.class"
@binding()
export class CreateEngineer {
  private ingeniero:CEnginner=new CEnginner();

  @given(/Los datos registrados son validos/)
  public validarDatos() {
    this.ingeniero.validateRegister();
  }

  @when(/Seleccione crear cuenta ingeniero/)
  public crearIngeniero() {
    this.ingeniero.createEngineer();
  }

  @then(/se añade al nuevo ingeniero como el responsable de dicho servicio/)
  public añadirNuevoIngenieroResponsableAServicio() {
    assert.equal(this.ingeniero.addEngineerToService(), 1);
  }
}