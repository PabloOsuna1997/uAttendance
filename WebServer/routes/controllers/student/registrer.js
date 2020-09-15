const aws = require('aws-sdk')
const connection = require('../../../config/connectionDB')
var uploadImagenStudent = require('../../../src/insertPicture')

aws.config.update(connection.aws_remote_comfig)
const client = new aws.DynamoDB.DocumentClient();

const student = {}

/*POST registrer students*/
student.registrer = async (req, res) => {

    //carga de imagen a s3
    nameImage = uploadImagenStudent(req.body, res, "student")

    let params = {
        TableName: 'tabla-estudiante-semi1-pro1',
        Item: {
            "nombre": req.body.nombre,
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
            res.status(200).send(data);
        }
    })
}


module.exports = student
