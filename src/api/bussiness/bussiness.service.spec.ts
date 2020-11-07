import {BussinessService} from "./bussiness.service";

describe('Obtener detalle de negocio mediante su Id',()=>{
    //getBussinessById
    test('Debe retornar un objeto Bussiness si el Id existe', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })
    
    test('Debe retornar NULL si el Id no es valido', ()=>{
        const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
        var expected=objBussiness==null?false : true;
        const respuesta=false;
        expect(respuesta).toStrictEqual(expected);
    })
})

describe('Obtener las ordenes generadas por un negocio',()=>{
    //getBussinessById
    test('Debe retornar un arreglo de objetos Order', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })  
})

describe('Borrar equipo',()=>{
    //deleteEquipment
    test('Debe retornar el string: El equipo médico ha sido eliminado con éxito', ()=>{
    const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
    var expected=objBussiness==null?false : true;
    const respuesta=false;
    expect(respuesta).toStrictEqual(expected);
    })  

    test('Debe retornar un objeto HttpException si no se encontro al equipo médico', ()=>{
        const objBussiness=null;//=bussinessService.getBussinessById("5f5060342e858d4afcedece5");
        var expected=objBussiness==null?false : true;
        const respuesta=false;
        expect(respuesta).toStrictEqual(expected);
    })
})
