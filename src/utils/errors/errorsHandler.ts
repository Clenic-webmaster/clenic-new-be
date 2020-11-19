import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorHandler {
    static throwDefaultInternalServerError(error?: any): HttpException {
        throw new HttpException({
            message: 'An error has occurred, please contact your administrator.',
            error
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    static throwNotFoundError(entity?: 'User' | 'Role' | 'Bussiness' | 'Order' | 'Equipment', error?: any): HttpException{
        throw new HttpException({
            message: `${entity} does not exist.`,
            error
        }, HttpStatus.BAD_REQUEST);
    }

    static throwCustomError(message: string, statusCode?: HttpStatus, error?: any): HttpException {
        throw new HttpException({
            message,
            error,
            statusCode
        }, statusCode);
    }
}