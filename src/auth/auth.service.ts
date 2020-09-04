import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RoleService } from 'src/api/role/role.service';
import { IUserSession } from 'src/utils/types';
import { RegisterUserAdminDto, UserDto, UserBussinessInformationDto, RegisterUserClenicDto, JWTPayloadDto, RegisterUserEngineerDto } from 'src/models/dto';
import { TransactionHandler } from 'src/utils/transactions';
import { User, Bussiness } from 'src/models/interfaces';
import { ErrorHandler } from 'src/utils/errors';
import { BussinessService } from 'src/api/bussiness/bussiness.service';
import { ClientSession } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _bussinessService: BussinessService,
    private _jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> { //USERNAME IS ONLY EMAIL
    let myUser = await this._userService.getUserByEmail(username);
    if (myUser) {
      if (await compare(pass, myUser.password)) {
        const { ...result } = myUser;
        return myUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async login(user: any) {

    //PREPARAMOS EL PAYLOAD QUE TENDRA NUESTRO JWT
    const payload = {
      userId: user._id,
      bussinessId: user.bussiness._id,
      identifier: user.identifier,
      companyIdentifier: user.companyIdentifier,
      role: user.role
    };

    //OBTENEMOS EL USUARIO QUE DESEA INICIAR SESION
    var relatedUser = await this._userService.getUserById(user._id)
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      })

    if (relatedUser) {
      let access_token = this._jwtService.sign(payload);
      //SI EL USUARIO ES ENCONTRADO, SE AÑADE UN OBJETO DE SESION A SUS SESIONES CON EL JWT OBTENIDO
      relatedUser.sessions.push({
        jwt: access_token,
        identifierDevice: `DEFAULT_DEVICE_${access_token.substr(access_token.length - 5, access_token.length)}`,
        lastActive: new Date(),
        location: `DEFAULT_DEVICE_${access_token.substr(access_token.length - 5, access_token.length)}`
      })
      //GUARDAR EL USUARIO CON EL NUEVO OBJETO DE SESION
      await relatedUser.save()
        .catch((error) => {
          throw ErrorHandler.throwDefaultInternalServerError(error);
        })

      return {
        access_token: access_token,
        user: relatedUser,
      };
    }
  }

  async logout(sessionToken: any, userId: string) {
    //OBTENEMOS EL USUARIO AL QUE CERRAREMOS UNA SESION
    var relatedUser = await this._userService.getUserById(userId)
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      })

    if (relatedUser) {
      //OBTENEMOS EL INDEX DE SESION AL QUE HACE REFERENCIA EL JWT
      let indexOfSession = relatedUser.sessions.findIndex((value: IUserSession) => {
        return value.jwt == sessionToken;
      })
      if (indexOfSession >= 0) {
        //SI LA SESION SE ENCUENTRA, LO ELIMINAMOS DEL ARREGLO DE SESIONES
        relatedUser.sessions.splice(indexOfSession, 1);
        //SE GUARDA EL USUARIO CON EL NUEVO ARREGLO DE SESIONES
        await relatedUser.save()
          .catch((error) => {
            throw ErrorHandler.throwDefaultInternalServerError(error);
          })
        return {
          message: 'The session has been closed successfully',
        };
      } else {
        throw new HttpException({
          message: 'There is no active sessions with the requested token.',
        }, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException({
        message: 'User does not exist.'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async checkJWtInSession(jwt: string, userId: string) {
    var relatedUser = await this._userService.getUserById(userId)
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      })

    if (relatedUser) {
      let indexOfSession = relatedUser.sessions.findIndex((value: IUserSession) => {
        return value.jwt == jwt;
      })
      if (indexOfSession >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new UnauthorizedException('The token sended is not valid')
    }
  }

  async registerAdmin(user: RegisterUserAdminDto) {

    //OBTENER EL ROL ADMIN
    let roleAdmin = await this._roleService.getRoleAdmin()
      .catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error); });

    //ENCONTRAR UN USUARIO DE ROL ADMIN CON EL EMAIL QUE SE DESEA REGISTRAR
    let findUser = await this._userService.getUserByEmailAndRole(user.email, roleAdmin._id)
      .catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error); });

    //VALIDA SI ES QUE SE ENCUENTRA DICHO USUARIO Y MANDA UNA EXCEPCION
    if (findUser) {
      throw ErrorHandler.throwCustomError('Email already taken.', HttpStatus.BAD_REQUEST);
    } else {

      //SE REALIZA LA VALIDACION DEL IDENTIFICADOR UNICO DE LA EMPRESA
      let checkIdentifier = await this._userService.checkValidUserBussinessIdentifier(this.getIdentifier(user.bussiness.name), roleAdmin._id)
        .catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error); });

      if (!checkIdentifier) {
        throw ErrorHandler.throwCustomError('The bussiness identfier is already taken.', HttpStatus.BAD_REQUEST);
      }

      //OBTENCION DE SESIONES PARA LAS POSTERIORES TRANSACCIONES
      const userSession: ClientSession = await this._userService.getUserModelSession()
        .catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error); });
      const bussinessSession: ClientSession = await this._bussinessService.getBussinessModelSession()
        .catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error); });

      //INICIAR LAS TRANSACCIONES
      userSession.startTransaction();
      bussinessSession.startTransaction();

      //CONSTRUCCION DE LA DATA DEL USUARIO QUE SE INGRESARA
      let storedUser: UserDto | User = {
        email: user.email,
        password: user.password,
        personalInformation: user.personalInformation,
        identifier: this.getIdentifier(user.bussiness.name),
        companyIdentifier: this.getIdentifier(user.bussiness.name),
        role: roleAdmin._id,
        state: "DISPONIBLE",
      }

      //GUARDAR EN LA BASE DE DATOS EL NUEVO USUARIO (SE EFECTUARA CUANDO SE REALICE LA TRANSACCION)
      storedUser = await this._userService.createUser(storedUser, userSession)
        .catch(async (error: any) => {
          //ABORTAR TRANSACCION (INVALIDA CUALQUIER OPERACION REALIZADA A LA BASE DE DATOS DURANTE LA TRANSACCION)
          await TransactionHandler.abortTransaction(userSession);
          await TransactionHandler.abortTransaction(bussinessSession);
          throw ErrorHandler.throwDefaultInternalServerError(error);
        });

      //CONSTRUCCION DEL CUERPO DE LA INFORMACION DEL NEGOCIO
      let storedBussiness: UserBussinessInformationDto | Bussiness = {
        user: storedUser._id,
        serviceEntity: storedUser._id,
        type: 'EMPRESA_MANTENIMIENTO',
        name: user.bussiness.name,
        address: user.bussiness.address,
        engineers: [],
        clenics: [],
        orders: [],
        equipments: []
      }

      //GUARDAR EN LA BASE DE DATOS DE LA NUEVA INFORMACION (SE EFECTUARA CUANDO SE REALICE LA TRANSACCION)
      storedBussiness = await this._bussinessService.createBussiness(storedBussiness, bussinessSession)
        .catch(async (error: any) => {
          await TransactionHandler.abortTransaction(userSession);
          await TransactionHandler.abortTransaction(bussinessSession);
          throw ErrorHandler.throwDefaultInternalServerError(error);
        });

      //ACTUALIZAR EL USUARIO GUARDADO ANTERIORMENTE CON EL ID DE INFORMACION DE NEGOCIO
      storedUser.bussiness = storedBussiness._id;

      //GUARDAR EN LA BASE DE DATOS EL USUARIO ACTUALIZADO
      storedUser = await storedUser.save({ session: userSession }).catch(async (error: any) => {
        await TransactionHandler.abortTransaction(userSession);
        await TransactionHandler.abortTransaction(bussinessSession);
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

      //EFECTUAR LA TRANSACCION
      await TransactionHandler.commitTransaction(userSession);
      await TransactionHandler.commitTransaction(bussinessSession);

      return {
        message: 'Su registro ha sido exitoso. Por favor, inicie sesión para poder continuar'
      }
    }
  }

  async registerClenic(user: RegisterUserClenicDto, jwtPayload: JWTPayloadDto) {

    //OBTENER ROL CLENIC
    let roleClenic = await this._roleService.getRoleClenic()
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    //OBTENER ROL ADMIN
    let roleAdmin = await this._roleService.getRoleAdmin()
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    //OBTENER LA INFORMACION DEL NEGOCIO PARA HACER LA POSTERIOR ACTUALIZACION DE LA LISTA DE CLENICS
    let bussinessCompany = await this._bussinessService.getBussinessById(jwtPayload.bussinessId)
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    //VALIDAR QUE EL ROL DEL USUARIO QUE REALIZA LA ACCION SEA UN ADMINISTRADOR
    if (jwtPayload.role._id != roleAdmin._id) {
      throw ErrorHandler.throwCustomError('Su usuario no se encuentra permitido para realizar esta acción.', HttpStatus.UNAUTHORIZED);
    }

    //VALIDACION DE IDENTIFICADOR Y EMAIL UNICOS DENTRO DE LAS CLENICS EN UNA EMPRESA DE MANTENIMIENTO
    /* let validClenicData = await this._bussinessService.validClenicEmailAndIdentifierByBussines(user.email, this.getIdentifier(user.bussiness.name), jwtPayload.bussinessId) */

    //VALIDACIONES DE USUARIO
    await this._userService.checkValidLowUserCredentials(user.email, jwtPayload.companyIdentifier);
    await this._userService.checkValidClenicIdentifier(this.getIdentifier(user.bussiness.name), jwtPayload.companyIdentifier);


    //OBTENER LAS SESIONES DE LAS COLECCIONES PARA LA TRANSACCION
    //EL MANEJO DE LAS TRANSACCIONES NOS PERMITEN REALIZAR OPERACIONES EN LA BASE DE DATOS
    //Y REVERTIRLAS CUANDO UNA PARTE DEL FLUJO FALLA
    let userSession = await this._userService.getUserModelSession()
      .catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error) })
    let bussinessSession = await this._bussinessService.getBussinessModelSession()
      .catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error) })

    //INICIAR LAS TRANSACCIONES
    userSession.startTransaction();
    bussinessSession.startTransaction();

    //CONSTRUCCION DE LA DATA PARA LA COLECCION USER
    let storedUser: UserDto | User = {
      email: user.email,
      password: user.password,
      personalInformation: user.personalInformation,
      identifier: this.getIdentifier(user.bussiness.name),
      companyIdentifier: jwtPayload.identifier,
      role: roleClenic._id,
      state: "DISPONIBLE",
    }

    //AGREGAR AL USUARIO A LA BASE DE DATOS (UNA VEZ FINALIZADA LA TRANSACCION)
    storedUser = await this._userService.createUser(storedUser, userSession)
      .catch(async (error: any) => {
        //ABORTAR TODAS LAS TRANSACCIONES
        await TransactionHandler.abortTransaction(userSession);
        await TransactionHandler.abortTransaction(bussinessSession);
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    //CONSTRUCCION DE LA DATA PARA LA INFORMACION DE NEGOCIO
    let storedBussiness: UserBussinessInformationDto | Bussiness = {
      user: storedUser._id,
      serviceEntity: jwtPayload.userId,
      type: 'CLENIC',
      name: user.bussiness.name,
      address: user.bussiness.address,
      engineers: [],
      clenics: [],
      orders: [],
      equipments: []
    }

    //AGREGAR LA INFORMACION DEL NEGOCIO A LA BASE DE DATOS
    storedBussiness = await this._bussinessService.createBussiness(storedBussiness, bussinessSession)
      .catch(async (error: any) => {
        //ABORTAR TRANSACCIONES
        await TransactionHandler.abortTransaction(userSession);
        await TransactionHandler.abortTransaction(bussinessSession);
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    //ACTUALIZAR EL USUARIO CON EL ID DE LA INFORMACION DEL NEGOCIO
    storedUser.bussiness = storedBussiness._id;

    //ACTUALIZAR EL USUARIO A LA BASE DE DATOS
    storedUser = await storedUser.save({ session: userSession }).catch(async (error: any) => {
      await TransactionHandler.abortTransaction(userSession);
      await TransactionHandler.abortTransaction(bussinessSession);
      throw ErrorHandler.throwDefaultInternalServerError(error);
    });

    //AGREGAR LA CLENIC A LA LISTA DE CLENICS DE LA EMPRESA DE MANTENIMIENTO
    bussinessCompany.clenics.push(storedBussiness)
    bussinessCompany.save({ session: bussinessSession })
      .catch(async (error) => {
        await TransactionHandler.abortTransaction(userSession);
        await TransactionHandler.abortTransaction(bussinessSession);
        throw ErrorHandler.throwDefaultInternalServerError(error);
      })

    //REALIZAR LA TRANSACCION (INGRESAR A LA BASE DE DATOS TODAS LAS TRANSACCIONES REALIZADAS)
    await TransactionHandler.commitTransaction(userSession);
    await TransactionHandler.commitTransaction(bussinessSession);

    return {
      message: 'El registro de la Clenic ha sido exitoso.'
    }
  }

  async registerEngineer(user: RegisterUserEngineerDto, jwtPayload: JWTPayloadDto) {

    //OBTENER ROL ENGINEER
    let roleEngineer = await this._roleService.getRoleEngineer()
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    //OBTENER ROL ADMIN
    let roleAdmin = await this._roleService.getRoleAdmin()
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    //OBTENER LA INFORMACION DEL NEGOCIO PARA HACER LA POSTERIOR ACTUALIZACION DE LA LISTA DE ENGINEERS
    let bussinessCompany = await this._bussinessService.getBussinessById(jwtPayload.bussinessId)
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    //VALIDAR QUE EL ROL DEL USUARIO QUE REALIZA LA ACCION SEA UN ADMINISTRADOR
    if (jwtPayload.role._id != roleAdmin._id) {
      throw ErrorHandler.throwCustomError('Su usuario no se encuentra permitido para realizar esta acción.', HttpStatus.UNAUTHORIZED);
    }

    //VALIDACIONES DE USUARIO
    await this._userService.checkValidLowUserCredentials(user.email, jwtPayload.companyIdentifier);

    //OBTENER LAS SESIONES DE LAS COLECCIONES PARA LA TRANSACCION
    //EL MANEJO DE LAS TRANSACCIONES NOS PERMITEN REALIZAR OPERACIONES EN LA BASE DE DATOS
    //Y REVERTIRLAS CUANDO UNA PARTE DEL FLUJO FALLA
    let userSession = await this._userService.getUserModelSession()
      .catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error) })
    let bussinessSession = await this._bussinessService.getBussinessModelSession()
      .catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error) })

    //INICIAR LAS TRANSACCIONES
    userSession.startTransaction();
    bussinessSession.startTransaction();

    //CONSTRUCCION DE LA DATA PARA LA COLECCION USER
    let storedUser: UserDto | User = {
      email: user.email,
      password: user.password,
      personalInformation: user.personalInformation,
      identifier: jwtPayload.companyIdentifier,
      companyIdentifier: jwtPayload.companyIdentifier,
      role: roleEngineer._id,
      state: "DISPONIBLE",
    }

    //AGREGAR AL USUARIO A LA BASE DE DATOS (UNA VEZ FINALIZADA LA TRANSACCION)
    storedUser = await this._userService.createUser(storedUser, userSession)
      .catch(async (error: any) => {
        //ABORTAR TODAS LAS TRANSACCIONES
        await TransactionHandler.abortTransaction(userSession);
        await TransactionHandler.abortTransaction(bussinessSession);
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });


    //AGREGAR AL INGENIERO A LA LISTA DE INGENIEROS DE LA EMPRESA DE MANTENIMIENTO
    bussinessCompany.engineers.push(storedUser)
    bussinessCompany.save({ session: bussinessSession })
      .catch(async (error) => {
        await TransactionHandler.abortTransaction(userSession);
        await TransactionHandler.abortTransaction(bussinessSession);
        throw ErrorHandler.throwDefaultInternalServerError(error);
      })

    //REALIZAR LA TRANSACCION (INGRESAR A LA BASE DE DATOS TODAS LAS TRANSACCIONES REALIZADAS)
    await TransactionHandler.commitTransaction(userSession);
    await TransactionHandler.commitTransaction(bussinessSession);

    return {
      message: 'El registro del Ingeniero ha sido exitoso.'
    }
  }

  private getIdentifier(value?: string) {
    let identifier: string = value.toLowerCase().replace(/\s+/g, '_');
    return identifier;
  }
}
