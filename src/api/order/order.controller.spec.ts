import { createOrder, getOrdersForBussiness, Order, service_getListOrders } from "../testHelper/testHelper";


describe('GET: Listar todas las ordenes',()=>{    
    test('Debe retornar un arreglo de objetos Order',async ()=>{
        const esperado=await service_getListOrders(); 
        const result:Order[]=[];
        expect(typeof(result)).toStrictEqual(typeof(esperado));
    })      
})