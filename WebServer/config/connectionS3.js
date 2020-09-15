const aws = require('aws-sdk')
module.exports = {
    s3 : new aws.S3({                     //credenciales de mi usuario administrador con accesos a servicios de s3
        apiVersion: '2006-03-01',
        region: process.env.REGION,
        accessKeyId: process.env.ACCESSKEYID_S3,
        secretAccessKey: process.env.SECRETACCESSKEY_S3})
}
