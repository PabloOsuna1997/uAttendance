var express = require('express');
var router = express.Router();
const aws = require('aws-sdk')
const connection = require('../config/connectionDB')


aws.config.update(connection.aws_remote_comfig)
const client = new aws.DynamoDB.DocumentClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(connection)
  res.send("home of the page")
});

/* POST registrer. */
router.post('/registrer', async (req, res) => {
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
      res.send({
        success: false,
        message: err
      });
    } else {
      console.log(data)
      res.send({
        success: true,
        message: 'Added user',
        user: data
      });
    }
  })
})


  /*GET login de usuario*/
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
      res.send(data)
    }else{
      res.send('no existe')
    }
  })
})


module.exports = router;
