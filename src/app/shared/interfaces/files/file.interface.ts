export interface IUploadFile {
    fieldname: String
    originalname: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer,
    size: Number
}