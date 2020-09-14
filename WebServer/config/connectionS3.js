const aws = require('aws-sdk')
const s3 = new aws.S3({                     //credenciales de mi usuario administrador con accesos a servicios de s3
    apiVersion: '2006-03-01',
    region: 'us-east-2',
    accessKeyId: process.env.ACCESSKEYID_S3,
    secretAccessKey: process.env.SECRETACCESSKEY_S3});

module.exports = {
    return:{
        s3
    }
}
