export class COrder {

    public _id: string="5f5040982b61d94c1c8c9dc8";
    public correlative: string="OT-01"; //SOME CORRELATIVE FOR TESTING
    public descripton: string = "Order Description"; //ORDER STARTS ACTIVE MODE OFF
    public active: boolean = false; 
    public equipment: string=''; //EQUIPMENT STARTS WITH NO VALUE
    public engineeer: string = "asd"; //ENGINEER STARTS NO VALUE
    public state: string = "SOLICITADO"; //STATE STARTS ON PENDING


    COrder() {
    }

    public assignEngineer(engineerId: string) {
        this.state = "PENDIENTE";
        this.engineeer = engineerId;
    }

    public assignEquipment(equipmentId: string) {
        this.equipment = equipmentId;
    }

    public startService() {
        this.state = "EN PROGRESO";
    }

    public activeOrder() {
        this.active = true;
    }
}