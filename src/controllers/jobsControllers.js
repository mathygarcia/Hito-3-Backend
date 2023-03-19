const { secretKey } = require("../middlewares/secretKey")
const jwt = require("jsonwebtoken");
const {
    obtenerDatosDeUsuario,
    registerUser,
    verificarCredenciales,
    actualizarUsuario,
    registrarTrabajo,
    registrarSolicitud,
    obtenerListaSolicitudes,
    obtenerTrabajos
} = require('../services/jobsServices')

const Controller = {
    handleError: function (res, error) {
        res.status(error.code || 500).send(error)
    },

    createUser: async (req, res) => {
        try {
            const usuario = req.body
            await registerUser(usuario)
            res.send("Usuario creado con éxito")
        } catch (error) {
            Controller.handleError(res, error)
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, contraseña } = req.body
            /* const token = jwt.sign({ email }, "az_AZ", { expiresIn: '1h' }) */
            await verificarCredenciales(email, contraseña)
            const token = jwt.sign({ email }, secretKey)
            const usuario = await obtenerDatosDeUsuario(email)
            res.send({ token, usuario })
        } catch (error) {
            console.log(error)
            Controller.handleError(res, error.message)
        }
    },

    updateUser: async (req, res) => {
        try {
            const Authorization = req.header('Authorization')
            const token = Authorization.split('Bearer ')[1]
            jwt.verify(token, 'az_AZ')
            const { email } = jwt.decode(token)
            const usuarios = await obtenerDatosDeUsuario(email)
            res.send(usuarios[0])

            const { id } = req.params
            const usuario = req.body
            await actualizarUsuario(usuario, id)
            res.status(201).send("Datos de Usuario actualizados con éxito")
        } catch (error) {
            Controller.handleError(res, error)
        }
    },

    showJobs: async (req, res) => {
        try {
            const trabajo = req.body
            const trabajos = await obtenerTrabajos(trabajo)
            res.status(200).send(trabajos)
        } catch (error) {
            console.log(error)
            Controller.handleError(res, error.message)
        }
    },

    showDetailJob: async (req, res) => {
        try {
            const solicitudtrabajo = req.body
            await registrarSolicitud(solicitudtrabajo)
            res.status(201).send("Solicitud de trabajo agregado con éxito")
        } catch (error) {
            console.log(error)
            Controller.handleError(res, error.message)
        }
    },
    showJobsRequested: async (req, res) => {
        try {
            const { usuario_id } = req.params
            const solicitudtrabajo = req.body
            const solicitudtrabajos = await obtenerListaSolicitudes(usuario_id)
            res.status(200).send(solicitudtrabajos)
        } catch (error) {
            console.log(error)
            Controller.handleError(res, error.message)
        }
    },

    createJob: async (req, res) => {
        try {
            const trabajo = req.body
            await registrarTrabajo(trabajo)
            res.status(201).send("Trabajo creado con éxito")
        } catch (error) {
            console.log(error)
            Controller.handleError(res, error.message)
        }
    }

    /* Profile: async (req, res) => {
        try {
            const Authorization = req.header('Authorization')
            const token = Authorization.split('Bearer ')[1]
            jwt.verify(token, 'az_AZ')
            const { email } = jwt.decode(token)
            const usuarios = await getUser(email)
            res.send(usuarios[0])
        } catch (error) {
            Controller.handleError(res, error)
        }
    }, */


}

module.exports = Controller;