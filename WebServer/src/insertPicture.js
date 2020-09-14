const aws = require('aws-sdk')
const s3 = new aws.S3({                     //credenciales de mi usuario administrador con accesos a servicios de s3
    apiVersion: '2006-03-01',
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEYID_S3,
    secretAccessKey: process.env.SECRETACCESSKEY_S3});

module.exports = function(body, res) {
    let type =  body.tipo
    let nombre = body.nombre
    let picture = body.foto
    //picture insertions
    //decodificacion de imagen
    let decode = Buffer.from(picture, 'base64')
    let Name = nombre+'.'+type

    //creacion de objeto para carga de s3
    let bucket = process.env.BUCKETSTUDENTS
    let upload = {
        Bucket: bucket,
        Key: Name,
        Body: decode,
        ACL: 'public-read'
    }

    //carga de imagen
    s3.upload(upload, function (err, data) {
        if (err) {
            res.status(402).send({
                "message": "No se pudo guardar la imagen."
            })
        }
    })
}

