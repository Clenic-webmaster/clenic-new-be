import { createOrder, getOrdersForBussiness, Order } from "../testHelper/testHelper";
import "../testHelper/testHelper"
import { assignEngineerToOrder, getListOrders } from "../testHelper/testHelper";

describe('Asignar ingeniero a orden',()=>{

  test('Debe retornar un objeto Order si el ingeniero fue asignado a la orden correctamente', async ()=>{
  const esperado=await assignEngineerToOrder("3423","2334");  //ingeniero,orden
  const result:Order={ 
    idOrder:"2334",
    idClenic:"77894",
    idEngineer:"3423"    
    };
  expect(result).toMatchObject(esperado);
  })

  test('Debe retornar NULL si ocurrio algun error al asignar', async ()=>{
    const esperado=await assignEngineerToOrder("233","453");    
    const result=null;    
    expect(result).toStrictEqual(esperado);
    })
})

describe('Listar ordenes',()=>{

    test('Debe retornar un arreglo de objetos Order', async ()=>{
    const esperado=await getListOrders(); 
    const result:Order[]=[];
    expect(typeof(result)).toStrictEqual(typeof(esperado));
    })  
  })

describe('Obtener cantidad de ordenes por cada Negocio',()=>{
 
  test('Debe retornar un arreglo de enteros', async ()=>{
  const esperado=await getOrdersForBussiness("556");
  const result:number[]=[];
  expect(result).toStrictEqual(esperado);
  })  
})

describe('Crear orden',()=>{
  
  test('Debe retornar un objeto Order con los datos ingresados para la orden', async ()=>{
    const objSend:Order={ 
      idClenic:"77894",
      idEngineer:"3423"    
      };

    const esperado=createOrder(objSend);

    const result:Order={ 
      idOrder:"1689",
      idClenic:"77894",
      idEngineer:"3423"    
      };

    expect(result).toMatchObject(esperado);
  })  
  
  test('Debe retornar NULL si ocurrio algun error en el proceso', async ()=>{
    const objSend:Order={ 
      idClenic:"77892",
      idEngineer:"3423"    
      };

    const esperado=createOrder(objSend);

    const result=null;
      
    expect(result).toBe(esperado);
    })  
})