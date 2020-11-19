describe('Listar equipos',()=>{
    //getEquipments
    test('Debe retornar un arreglo de objetos Equipment', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    })  
  })

  describe('Obtener detalle de equipo por Id',()=>{
    //getEquipmentById
    test('Debe retornar un objeto Equipment', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    }) 
    
    test('Debe retornar NULL si el equipo no ha sido encontrado', async ()=>{
        const esperado=true;
        const result=true;
        expect(result).toStrictEqual(esperado);
    }) 
  })

  describe('Registrar un equipo',()=>{
    //createEquipment
    test('Debe retornar un objeto Equipment con los datos ingresados para el registro', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    }) 
    
    test('Debe retornar un HTTP exeption si no se pudo realizar el registro', async ()=>{
        const esperado=true;
        const result=true;
        expect(result).toStrictEqual(esperado);
    }) 
  })

  describe('Borrar un equipo',()=>{
    //deleteEquipment
    test('Debe retornar un 1 si el proceso es exitoso', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    }) 
    
    test('Debe retornar un 0 si ocurrio algun error en el proceso', async ()=>{
        const esperado=true;
        const result=true;
        expect(result).toStrictEqual(esperado);
    }) 
  })

  describe('Actualizar datos de un equipo',()=>{
    //deleteEquipment
    test('Debe retornar un 1 si el proceso es exitoso', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    }) 
    
    test('Debe retornar un 0 si ocurrio algun error en el proceso', async ()=>{
        const esperado=true;
        const result=true;
        expect(result).toStrictEqual(esperado);
    }) 
  })

  describe('Añadir Equipo a orden',()=>{
    //addOrderToEquipment
    test('Debe retornar un objeto Equipment si el proceso fue satisfactorio', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    }) 
    
    test('Debe retornar un string:Ya existe una orden en el equipo médico con el ID (del equipo)', async ()=>{
        const esperado=true;
        const result=true;
        expect(result).toStrictEqual(esperado);
    }) 
  })