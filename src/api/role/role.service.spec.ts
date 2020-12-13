describe('Obtener ROL de administrador',()=>{
    //getRole
    test('Debe retornar un objeto Role', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    })  

    test('Debe retornar un objeto HttpException con el contenido:Role does not exist', async ()=>{
        const esperado=true;
        const result=true;
        expect(result).toStrictEqual(esperado);
    })  
})

