import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import {COrder} from "../classes/order.class"

@binding()
export class AddEngineerSteps {
  private order: COrder= new COrder();

  @given(/la orden es activada/)
  public activarOrden() {
    this.order.activeOrder();
  }

  @when(/se asigna un ingeniero a la orden/)
  public asignarIngeniero() {
    this.order.assignEngineer("2154");
  }

  @then(/la orden cambia de estado a PENDIENTE/)
  public cambiarOrdenAPendiente() {
    assert.equal(this.order.state, "PENDIENTE");
  }
}