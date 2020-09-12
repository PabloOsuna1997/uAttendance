var express = require('express');
var router = express.Router();
const aws = require('aws-sdk')
const connection = require('../config/connectionDB')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(connection)
  res.send("home of the page")
});

/* GET home page. */
router.get('/registrer', async (req, res) => {
  aws.config.update(connection.aws_remote_comfig)
  const client = new aws.DynamoDB.DocumentClient();
  let params = {
    TableName: 'tabla-usuario-semi1-pro1',
    Item: {
      "nombre": "test 5",
      "contasena": "password",
      "foto": "url de la foto de s3"
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

module.exports = router;
