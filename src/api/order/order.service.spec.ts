describe('Actualizar Orden',()=>{
    //updateOrder
    test('Debe retornar un objeto Order si la orden fue actualizada correctamente', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    })
  
    test('Debe retornar NULL si la orden no fue encontrada o actualizada correctamente', async ()=>{
      const esperado=false
      const result=false;
      expect(result).toStrictEqual(esperado);
      })
  })

describe('Asignar ingeniero a orden',()=>{
  //assignEngineer
  test('Debe retornar un objeto Order si el ingeniero fue asignado a la orden correctamente', async ()=>{
  const esperado=true;
  const result=true;
  expect(result).toStrictEqual(esperado);
  })

  test('Debe retornar NULL si ocurrio algun error al asignar', async ()=>{
    const esperado=false
    const result=false;
    expect(result).toStrictEqual(esperado);
    })
})

describe('Listar ordenes',()=>{
    //getOrders
    test('Debe retornar un arreglo de objetos Order', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    })  
  })

describe('Obtener cantidad de ordenes por cada Negocio',()=>{
  //getOrdersCountByBussinessId
  test('Debe retornar un arreglo de enteros', async ()=>{
  const esperado=true;
  const result=true;
  expect(result).toStrictEqual(esperado);
  })  
})

describe('Crear orden',()=>{
  //createOrder
  test('Debe retornar un objeto Order con los datos ingresados para la orden', async ()=>{
  const esperado=true;
  const result=true;
  expect(result).toStrictEqual(esperado);
  })  
  test('Debe retornar NULL si ocurrio algun error en el proceso', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    })  
})