const aws = require('aws-sdk')
const connection = require('../../../config/connectionDB')
const s3 = require('../../../config/connectionS3')

aws.config.update(connection.aws_remote_comfig)
const client = new aws.DynamoDB.DocumentClient();
const uploadImage = require('../../../src/insertPicture')

const user = {}

user.registrer = async (req, res) => {
    let contrasena = req.body.contrasena
    let nombre = req.body.nombre

    if(req.body.foto != '') {
        nameImage = uploadImage(req.body, res, "user")
    }

    let params = {
        TableName: 'tabla-usuario-semi1-pro1',
        Item: {
            "nombre": nombre,
            "contrasena": contrasena,
            "foto": nameImage
        }
    }
    await client.put(params, function (err, data){
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {
            res.status(200).send({
                success: true,
                message: 'Added user',
                user: data
            });
        }
    })
}


module.exports = user
