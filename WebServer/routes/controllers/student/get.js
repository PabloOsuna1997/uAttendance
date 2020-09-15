const aws = require('aws-sdk')

//keys updates
const connection = require('../../../config/connectionDB')
aws.config.update(connection.aws_remote_comfig)
const client = new aws.DynamoDB.DocumentClient();

const student = {}

student.get = async (req, res) => {
    let params = {
        TableName : "tabla-estudiante-semi1-pro1"
    }

    await client.scan(params, function (err, data ){
        if(!err){
            res.status(200).send(data)
        }else{
            res.status(500).send({
                success: false,
                message: err
            });
        }
    })
}
module.exports = student
