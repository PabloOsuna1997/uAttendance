const { s3 } = require('../config/connectionS3')
module.exports = function(body, res, type__) {
    let type =  body.tipo
    let nombre = body.nombre
    let picture = body.foto
    //picture insertions
    //decodificacion de imagen
    let decode = Buffer.from(picture, 'base64')
    let Name = nombre+'.'+type

    //creacion de objeto para carga de s3
    let bucket = ''
    if(type__ === "user"){
        bucket = process.env.BUCKETUSER
    }else {
        bucket = process.env.BUCKETSTUDENTS
    }

    console.log(bucket)
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

    return Name
}

