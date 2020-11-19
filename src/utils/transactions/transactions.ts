import { ClientSession } from "mongoose";
import { HttpStatus, HttpException } from "@nestjs/common";

export class TransactionHandler {
    static async abortTransaction(session: ClientSession) {
        await session.abortTransaction()
            .catch((error) => {
                throw new HttpException({
                    message: 'An error has occurred, please contact your administrator.',
                    error
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    static async commitTransaction(session: ClientSession) {
        await session.commitTransaction()
            .catch((error) => {
                throw new HttpException({
                    message: 'An error has occurred, please contact your administrator.',
                    error
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}