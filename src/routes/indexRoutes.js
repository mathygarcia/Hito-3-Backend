const express = require('express')
const Controller = require('../controllers/jobsControllers')
const { checkCredentialsExists, tokenVerification } = require("../middlewares/middlewares")
const router = express.Router()

//Registrar datos de usuario
router.post('/Register', checkCredentialsExists, Controller.createUser)

//loggear usuario
router.post('/Login', Controller.loginUser)

//actualizar datos usuario
router.put('/Profile', tokenVerification, checkCredentialsExists, Controller.updateUser)

//mostrar trabajos disponibles en tabla trabajos
router.get('/Jobs', tokenVerification, Controller.showJobs)

//mostrar detalles de trabajo en especifico y agregar a la tabla solicitudTrabajo
router.get('/WorkDetail/:id', tokenVerification, Controller.showDetailJob)

//mostrar trabajos solicitados
router.get('/JobsRequested', tokenVerification, Controller.showJobsRequested)

//agregar trabajo a tabla trabajos
router.post('/PostJob', tokenVerification, Controller.createJob)

module.exports = router