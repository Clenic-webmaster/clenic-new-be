import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import {COrder} from "../classes/order.class"
@binding()
export class BankAccountSteps {
  private accountBalance: number=0;//COrder  = new COrder();

  @given(/el servicio ha sido completado y aprobado por el encargado/)
  public givenAnAccountWithStartingBalance() {
    //this.accountBalance = amount;
  }

  @when(/solicite realizar un reporte/)
  public deposit() {
    //this.accountBalance = Number(this.accountBalance) + Number(amount);
  }

  @then(/se muestra la información faltante del reporte final a completar/)
  public accountBalanceShouldEqual() {
    assert.equal(this.accountBalance, 0);
  }
}