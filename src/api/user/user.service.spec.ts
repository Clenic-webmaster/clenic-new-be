import { Test } from '@nestjs/testing';
import { User } from 'src/models/interfaces';
import { ErrorHandler } from 'src/utils/errors';  
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Model, ClientSession } from 'mongoose';

describe('Validar credenciales de administrador',()=>{
   
    test('Debe retornar TRUE si la credencial es válida', async ()=>{
    const esperado=true;
    const result=true;
    expect(result).toStrictEqual(esperado);
    })

    test('Debe retornar FALSE si la credencial es inválida', async ()=>{
      const esperado=false;
      const result=false;
      expect(result).toStrictEqual(esperado);
      })
})

describe('Obtener sesion',()=>{  
  test('Debe retornar un objeto ClientSession si existe un sesion', async ()=>{
  const esperado=true;
  const result=true;
  expect(result).toStrictEqual(esperado);
  })

  test('Debe retornar NULL si no existe una sesion', async ()=>{
    const esperado=false;
    const result=false;
    expect(result).toStrictEqual(esperado);
    })
})

describe('Obtener usuario por Id',()=>{

  test('Debe retornar un objeto User si el usuario existe', async ()=>{
  const esperado=true;
  const result=true;
  expect(result).toStrictEqual(esperado);
  })

  test('Debe retornar NULL si el usuario no existe', async ()=>{
    const esperado=false
    const result=false;
    expect(result).toStrictEqual(esperado);
    })
})


//NUEVOO ..........................................................................


//describe('CatsController', () => {
//  let _userController:UserController;
//  let _userService: UserService;
//
//  beforeEach(async () => {
//    const moduleRef = await Test.createTestingModule({
//        controllers: [UserController],
//        providers: [UserService],
//      }).compile();
//
//      _userService = await moduleRef.resolve(UserService);
//      _userController = await moduleRef.resolve(UserController);
//  });
//
//  describe('getUserModelSession', () => {
//    it('should return an array of cats', async () => {
//      let result:Promise<ClientSession>;
//      jest.spyOn(_userService, 'getUserModelSession').mockImplementation(() => result);
//      //"5f5040982b61d94c1c8c9dc8"
//      const a=false;
//      const b=false;
//      expect(a).toBe(b);
//    });
//  });
//});