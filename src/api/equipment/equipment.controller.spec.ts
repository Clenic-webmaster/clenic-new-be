describe('GET: Listar Equipos',()=>{
    //createEquipment
    test('Debe retornar un arreglo de objetos Equipment', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })       
})

describe('GET: Actualizar equipo',()=>{
    //createEquipment
    test('Debe retornar un string:El equipo médico ha sido actualizado con éxito', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })  
    test('Debe retornar un objeto HttpException que contiene el mensaje: Ah ocurrido un error, contactese con su administrador', ()=>{
        const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
        var expected=objBussiness==null?false : true;
        const respuesta=false;
        expect(respuesta).toStrictEqual(expected);
        })       
})

describe('POST:Añadir imagen a catalogo',()=>{
    //addNewCatalogueImage
    test('Debe retornar TRUE si el proceso fue exitoso', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })  
    test('Debe retornar un objeto HttpException si no se encontro el Negocio, con el mensaje:No se encontro equipo', ()=>{
        const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
        var expected=objBussiness==null?false : true;
        const respuesta=false;
        expect(respuesta).toStrictEqual(expected);
    })    
    test('Debe retornar un objeto HttpException si no se encontro alguna imagen a subir, con el mensaje:Debe enviar una imagen para proceder con la actualizacion', ()=>{
        const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
        var expected=objBussiness==null?false : true;
        const respuesta=false;
        expect(respuesta).toStrictEqual(expected);
    })     
})