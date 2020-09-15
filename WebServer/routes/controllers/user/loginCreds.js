const aws = require('aws-sdk')

//keys updates
const connection = require('../../../config/connectionDB')
aws.config.update(connection.aws_remote_comfig)
const client = new aws.DynamoDB.DocumentClient();

const user = {}

user.loginCreds = async (req, res) => {
    let nom = req.body.nombre
    let contra = req.body.contrasena
    let params = {
        TableName: "tabla-usuario-semi1-pro1",
        KeyConditionExpression: "nombre = :n",
        ExpressionAttributeValues: {
            ":n": "test 1"
        }
    }

    await client.query(params, function (err, data) {
        console.log(data)
        if (!err) {
            if (data.Items[0].contrasena === contra){
                res.status(200).send(data.Items[0])
            }else{
                res.status(406).send({message: "Contraseña Incorrecta"})
            }
        } else {
            console.log(err)
            res.status(404).send({message:'Usuario No Existe'})
        }
    })
}

module.exports = user
