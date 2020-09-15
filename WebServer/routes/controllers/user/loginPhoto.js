const aws = require('aws-sdk')
const uploadImage = require('../../../src/insertPicture')

//keys updates
const connection = require('../../../config/connectionRekognition')
aws.config.update(connection.aws_remote_comfig)
const client = new aws.Rekognition();

const user  = {}

user.loginPhoto = async (req, res) => {
    //subir la foto nueva a s3
    let nameImageSource = uploadImage(req.body, res, "login")

    //objeto de rekognition
    let params = {
        SimilarityThreshold: 75,
        SourceImage: {
            S3Object:{
                Bucket: 'uattendance-photos',
                Name: 'login/'+ nameImageSource
            }
        },
        TargetImage: {
            S3Object: {
                Bucket: 'uattendance-photos',
                Name: 'usuarios/'+nameImageSource
            }
        }
    }

    client.compareFaces(params, function(err, data){
        if (err){
            res.status(500).send({
                err: err,
                message: "Error al comparar las imagenes"
            })
        }else{
            res.status(200).send(data)
        }
    })

}

module.exports = user
