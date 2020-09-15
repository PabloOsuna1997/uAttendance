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
        SimilarityThreshold: 50,
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
            console.log(data)
            if (data.FaceMatches.length > 0) {          //validamos que si haya hecho una comparacion de lo contrario no son imagenes nada parecidas con la minima similitud de 50%
                if (data.FaceMatches[0].Similarity > 75) {
                    res.status(200).send({message: "true"})
                } else {
                    res.status(401).send({message: "false"})
                }
            }else{
                res.status(401).send({message: "false"})
            }
        }
    })

}

module.exports = user
