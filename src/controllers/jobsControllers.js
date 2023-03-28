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
    obtenerTrabajos,
    obtenerDetallesTrabajo,
    obtenerTipoUsuarios/* ,
    obtenerDatosUsuario */
} = require('../services/jobsServices')

const handleError = (res, error) => {
    res.status(error.code || 500).send({ error })
};
const Controller = {

    //controlador LISTO para loggear usuario
    loginUser: async (req, res) => {
        try {
            console.log("loginUser", req.body)
            const { email, pass } = req.body
            const isValid = await verificarCredenciales(email, pass)
            if (isValid) {
                const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' })
                const usuario = await obtenerDatosDeUsuario(email)
                res.send({ token, usuario })
            }
        } catch (error) {
            console.log(error)
            handleError(res, error.message)
        }
    },

    //controlador en desarrollo actualizar usuario
    updateUser: async (req, res) => {
        try {
            // const Authorization = req.header('Authorization')
            // const token = Authorization.split('Bearer ')[1]
            // jwt.verify(token, 'az_AZ')
            // const { email } = jwt.decode(token)
            const usuario = req.body;
            console.log('updateUserController => ', usuario)
            await actualizarUsuario( usuario , usuario.id);
            res.send(usuario)
        } catch (error) {
            console.log(error)
            handleError(res, error.message)
        }
    },

    //controlador LISTO crea usuario
    createUser: async (req, res) => {
        try {
            console.log("createUser", req.body)
            const usuario = req.body;
            await registerUser(usuario)
            res.send({
                status: 'OK',
                message: 'Usuario creado correctamente'
            })
        } catch (error) {
            console.log("createUser", error)
            handleError(res, error)
        }
    },

    //controlador LISTO para mostrar tipos de usuarios
    showUsersType: async (req, res) => {
        try {
            const typeUsers = await obtenerTipoUsuarios()
            res.send(typeUsers)
        } catch (error) {
            console.log(error)
            handleError(res, error.message)
        }
    },

    //controlador LISTO para crear trabajo
    createJob: async (req, res) => {
        try {
            console.log("createJob", req.body)
            const trabajo = req.body
            await registrarTrabajo(trabajo)
            res.send({
                status: 'OK',
                message: 'trabajo creado y publicado correctamente'
            })
        } catch (error) {
            console.log(error)
            handleError(res, error.message)
        }
    },

    //controlador LISTO muestra trabajos
    showJobs: async (req, res) => {
        try {
            //console.log("showJobsController", showJobs)
            const trabajos = await obtenerTrabajos()
            res.send(trabajos)
        } catch (error) {
            console.log(error)
            handleError(res, error.message)
        }
    },

    //controlador LISTO para mostrar detalle de trabajo
    showDetailJob: async (req, res) => {
        try {
            const { id } = req.params
            /* const { id } = req.query */
            console.log("ID show detail =>", id)
            const detailJob = await obtenerDetallesTrabajo(id)
            res.send(detailJob)
        } catch (error) {
            console.log(error)
            handleError(res, error.message)
        }
    },

    //controlador LISTO para agregar solicitud de trabajo
    postRequestedJob: async (req, res) => {
        try {
            const { usuarios_id, id } = req.body
            await registrarSolicitud(usuarios_id, id)
            res.send({
                status: 'OK',
                message: 'trabajo solicitado correctamente'
            })
        } catch (error) {
            console.log(error)
            handleError(res, error.message)
        }
    },

    //controlador LISTO para mostrar lista de solicitudes
    showJobsRequested: async (req, res) => {
        try {
            console.log("showJobsRequested")
            const { id } = req.params
            console.log('id =>' , id)
            const solicitudtrabajos = await obtenerListaSolicitudes(id)
            res.send(solicitudtrabajos)
        } catch (error) {
            console.log(error)
            handleError(res, error.message)
        }
    }
}

module.exports = Controller;