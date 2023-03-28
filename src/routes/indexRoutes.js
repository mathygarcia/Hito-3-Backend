const express = require('express')
const Controller = require('../controllers/jobsControllers')
//const { checkCredentialsExists, tokenVerification } = require("../middlewares/middlewares")
const router = express.Router()

//Registrar datos de usuario LISTO
router.post('/Register', /* checkCredentialsExists, */ Controller.createUser)

//mostrar tipos de usuarios LISTO
router.get('/tipo-usuarios', Controller.showUsersType)

//mostrar tipos de usuarios LISTO
//router.get('/datos-usuario', Controller.showDateUser)

//loggear usuario LISTO
router.post('/Login', Controller.loginUser)

//actualizar datos usuario PENDIENTE
router.put('/Profile', /* tokenVerification,  checkCredentialsExists, */ Controller.updateUser)

//mostrar trabajos disponibles en tabla trabajos LISTO
router.get('/Jobs', /* tokenVerification, */ Controller.showJobs)

//mostrar detalles de trabajo LISTO
router.get('/WorkDetail/:id', /* tokenVerification, */ Controller.showDetailJob)

//agregar solicitud de trabajo LISTO
router.post('/takeJob', /* tokenVerification, */ Controller.postRequestedJob)

//mostrar trabajos solicitados LISTO
router.get('/JobsRequested/:id', /* tokenVerification, */ Controller.showJobsRequested)

//agregar trabajo a tabla trabajos LISTO
router.post('/PostJob', /* tokenVerification, */ Controller.createJob)

module.exports = router