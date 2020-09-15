var express = require('express');
var router = express.Router();

const userRegistrer = require('./controllers/user/registrer')
const userLoginCreds = require('./controllers/user/loginCreds')
const userLoginPhoto = require('./controllers/user/loginPhoto')
const studentRegistrer = require('./controllers/student/registrer')
const studentGet = require('./controllers/student/get')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("home of the page")
});

/* POST registrer users. */
router.post('/user/registrer', userRegistrer.registrer)


  /*GET login*/
router.post('/loginCreds', userLoginCreds.loginCreds)

/*POST registrer students*/
router.post('/student/registrer', studentRegistrer.registrer)

/* GET students*/
router.get('/users', studentGet.get)



module.exports = router;
