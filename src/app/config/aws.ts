
export const start = {
    endpoint: process.env.AWS_ENDPOINT,
    s3ForcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT,
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
}

export const bucket = process.env.AWS_BUCKET || "mycamp"