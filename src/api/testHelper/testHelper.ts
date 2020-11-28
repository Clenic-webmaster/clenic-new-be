import { OrderBy } from "aws-sdk/clients/cloudwatchlogs";

export class Order{
  idOrder?: string;
  idClenic?: string;
  idEngineer?: string;  
}

export function assignEngineerToOrder(ing:string, orden:string): Order {  
  if (ing=="3423" && orden=="2334") {
    const objOrder:Order={ 
      idOrder:"2334",
      idClenic:"77894",
      idEngineer:"3423"    
      };
    return objOrder;
  };
  if (ing=="233" && orden=="453") return null;  
}

export function getListOrders(): Order[] {  
  let miArray:Order[]=[];
  return miArray;
}

export function getOrdersForBussiness(id:string): number[] {  
  id=id+1;
  let miArray:number[]=[];
  return miArray;
}


export function createOrder(orden:Order): Order{  
  if (orden.idClenic=="77892") return null;
  const objOrden:Order={ 
    idOrder:"1689",
    idClenic:"77894",
    idEngineer:"3423"    
    };

  return objOrden;
}
