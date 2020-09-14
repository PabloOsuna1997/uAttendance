var express = require('express');
var router = express.Router();
const aws = require('aws-sdk')
const connection = require('../config/connectionDB')


aws.config.update(connection.aws_remote_comfig)
const client = new aws.DynamoDB.DocumentClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("home of the page")
});

/* POST registrer users. */
router.post('/user/registrer', async (req, res) => {
  let contrasena = req.body.contrasena
  let nombre = req.body.nombre
  let foto = req.body.foto

  let params = {
    TableName: 'tabla-usuario-semi1-pro1',
    Item: {
      "nombre": nombre,
      "contrasena": contrasena,
      "foto": foto
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
})


  /*GET login*/
router.post('/login', async (req, res) => {
  let nombre = req.body.nombre
  let contrasena = req.body.contrasena

  let params = {
        Key: {
          "nombre": nombre,
          "contasena": contrasena
        },
        TableName: "tabla-usuario-semi1-pro1"
  }

  await client.get(params, function (err, data){
    if(!err){
      res.status(200).send(data)
    }else{
      res.status(404).send('no existe')
    }
  })
})

/*POST registrer students*/
router.post('/student/registrer', async (req, res) => {
  let nombre = req.body.nombre
  let foto = req.body.foto

  let params = {
    TableName: 'tabla-estudiante-semi1-pro1',
    Item: {
      "nombre": nombre,
      "foto": foto
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
        message: 'Added student',
        user: data
      });
    }
  })
})

/* GET students*/

router.get('/users', async (req, res) => {

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
})



module.exports = router;
