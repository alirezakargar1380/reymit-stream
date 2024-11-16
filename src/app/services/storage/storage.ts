const S3 = require('aws-sdk/clients/s3')
import {IUploadFileStorage} from "../../shared/interfaces/files/storage.interface"
import {start, bucket} from "../../config/aws"

export class storageFileManager {
    private key: String
    private s3: typeof S3
    constructor(key: String) {
        this.key = key
        console.log(start)
        this.s3 = new S3(start)
    }

    async uploadFile(buffer: {}): Promise<IUploadFileStorage> {
        const result: any = await this.s3.upload(
            {
                Bucket: bucket,
                Key: this.key,
                Body: buffer
            }
        ).promise();

        return {
            location: result.Location,
            key: result.key,
        }
    }

    async deleteFile() {
        console.log("deleting file")
        return await this.s3.deleteObject(
            {
                Bucket: bucket,
                Key: this.key
            }
        ).promise();
    }

    async checkFile(): Promise<boolean> {
        const params = {
            Bucket: bucket,
            Key: this.key
        }

        try {
            await this.s3.headObject(params).promise();
            const signedUrl = this.s3.getSignedUrl('getObject', params);
        } catch (error: any) {
            if (error.name === 'NotFound') {
                return false;
            } else {
                throw error
            }
        }
        return true
    }
}
