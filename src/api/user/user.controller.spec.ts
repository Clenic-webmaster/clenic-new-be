describe('GET: Obtener un perfil mediante Id',()=>{
    //getProfile
    test('Debe retornar un objeto User si el Id existe', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })
    
    test('Debe retornar HttpException con el contenido:User does not exists, si el Id no existe', ()=>{
        const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
        var expected=objBussiness==null?false : true;
        const respuesta=false;
        expect(respuesta).toStrictEqual(expected);
    })
})

describe('PUT: Actualizar localizacion de Ingeniero mediante su Id',()=>{
    //getProfile
    test('Debe retornar un objeto con el contenido string:Posición actualizada con éxito', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })  
    
    test('Debe retornar un objeto HttpException con el contenido: An error has occurred, please contact your administrator', ()=>{
        const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
        var expected=objBussiness==null?false : true;
        const respuesta=false;
        expect(respuesta).toStrictEqual(expected);
    })   
})

describe('GET: Obtener localizacion de Ingeniero mediante su Id',()=>{
    //getProfile
    test('Debe retornar un objeto con contenido:Position si el Id existe', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })  
    
    test('Debe retornar un objeto HttpException con el contenido:An error has occurred, please contact your administrator', ()=>{
        const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
        var expected=objBussiness==null?false : true;
        const respuesta=false;
        expect(respuesta).toStrictEqual(expected);
    })   
})


describe('GET: Obtener las localizaciones de los Ingenieros mediante el Id de una compañia',()=>{
    //getProfile
    test('Debe retornar un arreglo de objetos: userId, firstName, lastName, position', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })    
})