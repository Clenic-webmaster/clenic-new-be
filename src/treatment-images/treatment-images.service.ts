import { HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { storage } from 'src/utils/constants/storage';
import { ErrorHandler } from 'src/utils/errors';

const s3 = new S3({
    endpoint: storage.STORAGE_ENDPOINT,
    accessKeyId: storage.STORAGE_KEY_ID,
    secretAccessKey: storage.STORAGE_SECRET_KEY,
});

@Injectable()
export class TreatmentImagesService {

    async uploadImage(file: any, fullFileName: string) {
        let validMimeType = storage.VALID_MIME_TYPES.filter((value) => { return value == file.mimetype });
        if (validMimeType.length > 0) {
            return await s3.upload({
                Bucket: storage.STORAGE_BUCKET_NAME,
                Body: file.buffer,
                Key: fullFileName,
                ContentType: file.mimetype,
                ACL: storage.STORAGE_ACL,
            }).promise();
        } else {
            throw ErrorHandler.throwCustomError('Formato de imagen inválido', HttpStatus.BAD_REQUEST);
        }
    }

    async updateImage(file: any, fullFileName: string) {
        let validMimeType = storage.VALID_MIME_TYPES.filter((value) => { return value == file.mimetype });
        if (validMimeType.length > 0) {
            return await s3.putObject({
                Bucket: storage.STORAGE_BUCKET_NAME,
                Body: file.buffer,
                Key: fullFileName,
                ContentType: file.mimetype,
                ACL: storage.STORAGE_ACL,
            }).promise();
        } else {
            throw ErrorHandler.throwCustomError('Formato de imagen inválido', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteImage(fullFileName: string) {
        s3.deleteObject({
            Bucket: storage.STORAGE_BUCKET_NAME,
            Key: fullFileName,
        }).promise()
            .then((result) => {
                return {
                    message: 'Imagen eliminada con éxito',
                }
            }).catch((error) => {
                throw ErrorHandler.throwDefaultInternalServerError(error)
            })
    }
}