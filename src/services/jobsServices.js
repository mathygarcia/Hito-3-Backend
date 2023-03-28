const getJobsDB = require('../database/conexion');
const bcrypt = require('bcryptjs');

//servicio LISTO registra USUARIO
const registerUser = async (usuario) => {
    try {
        console.log("registerUser", usuario)
        let { nombre, apellido, id_type_user, edad, sexo, email, pass } = usuario;
        pass = bcrypt.hashSync(pass);
        const values = [nombre, apellido, id_type_user, edad, sexo, email, pass];
        const consulta = 'INSERT INTO usuarios (nombre, apellido, id_type_user, edad, sexo, email, pass ) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        await getJobsDB.query(consulta, values);
    } catch (error) {
        console.log("registerUser", error)
        throw error
    }
};

//servicio LISTO registra TRABAJO
const registrarTrabajo = async (trabajo) => {
    try {
        console.log("registrarTrabajo", trabajo)
        let { titulo, contacto, email, descripcion, usuarios_id } = trabajo;
        const values = [titulo, contacto, email, descripcion, usuarios_id];
        const consulta = 'INSERT INTO trabajos (titulo, contacto, email, descripcion, usuarios_id ) VALUES ($1, $2, $3, $4, $5)';
        await getJobsDB.query(consulta, values);
    } catch (error) {
        console.log("registrarTrabajo", error)
        throw error
    }
};

//servicio LISTO MOSTRAR de TRABAJOS
const obtenerTrabajos = async () => {
    try {
        const consulta = "SELECT * FROM trabajos";
        const { rows } = await getJobsDB.query(consulta)
        console.log("typeof", typeof rows)
        return rows;
    } catch (error) {
        console.log("obtenerTrabajos", error)
        throw error
    }
};

//servicio LISTO muestra los TIPOS de USUARIOS
const obtenerTipoUsuarios = async () => {
    try {
        const consulta = "SELECT * FROM typeusers";
        const { rows } = await getJobsDB.query(consulta)
        return rows;
    } catch (error) {
        console.log("obtenerTipoUsuarios", error)
        throw error
    }
}

//servicio LISTO mostrar de detalle de trabajo
const obtenerDetallesTrabajo = async (id) => {
    try {
        const consulta = "SELECT * FROM trabajos WHERE id = $1";
        const { rows } = await getJobsDB.query(consulta, [id])
        console.log("typeof", typeof rows)
        return rows;
    } catch (error) {
        console.log("obtenerDetallesTrabajo", error)
        throw error
    }
};

//servicio LISTO registrar solicitud de trabajo
const registrarSolicitud = async (usuarioId, trabajoId) => {
    try {
        const values = [usuarioId, trabajoId];
        const consulta = "INSERT INTO solicitudtrabajos (usuarios_id, trabajos_id) values ($1, $2)";
        await getJobsDB.query(consulta, values);
    } catch (error) {
        console.log("registrarSolicitud", error)
        throw error
    }
};

//servicio DEsarrollo para mostrar lista de solicitudes 
const obtenerListaSolicitudes = async (usuarios_id) => {
    try {
        const consulta = `
        SELECT trabajos.id, trabajos.titulo, trabajos.contacto, trabajos.email, st.date_take_job from 
        solicitudtrabajos st
        INNER JOIN trabajos on st.trabajos_id = trabajos.id
        WHERE st.usuarios_id = $1`;
        const { rows: solicitudtrabajos } = await getJobsDB.query(consulta, [usuarios_id]);
        return solicitudtrabajos;
    } catch (error) {
        console.log("obtenerListaSolicitudes", error)
        throw error
    }
};

//servicio en desarrollo actualiza dato de usuario
const actualizarUsuario = async (usuario, id) => {
    try {
        let { email, edad, contacto, descripcion } = usuario;
        const valores = [email, edad, contacto, descripcion, id];
        const consulta =
            "UPDATE usuarios SET email = $1, edad = $2, contacto = $3, descripcion = $4 WHERE id = $5";
        await getJobsDB.query(consulta, valores);
    } catch (error) {
        console.log("actualizarUsuario", error)
        throw error
    }
};

//servicio LISTO para obtiener datos usuario
const obtenerDatosDeUsuario = async (email) => {
    try {
        const values = [email];
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        const {
            rows: [usuario],
            rowCount,
        } = await getJobsDB.query(consulta, values);
        if (!rowCount) {
            throw {
                code: 404,
                message: "No se encontró ningún usuario con este email",
            };
        }
        delete usuario.contraseña;
        return usuario;
    } catch (error) {
        console.log("obtenerDatosDeUsuario", error)
        throw error
    }
};

//servicio LISTO muestra los TIPOS de USUARIOS
/* const obtenerDatosUsuario = async () => {
    try {
        const consulta = "SELECT * FROM usuarios";
        const { rows } = await getJobsDB.query(consulta)
        return rows;
    } catch (error) {
        console.log("obtenerDatosUsuario", error)
        throw error
    }
} */

//servicio LISTO credenciales de usuario
const verificarCredenciales = async (email, pass) => {
    try {
        const valor = [email];
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        const { rows: [usuario], rowCount } = await getJobsDB.query(consulta, valor);
        console.log("verificar Credenciales", usuario)
        if (!rowCount)
            throw {
                code: 404,
                message: "No se encontró ningún usuario con estas credenciales",
            };
        const passwordEncrypt = usuario?.pass;
        console.log("passwordEncrypt", passwordEncrypt)
        const isValidPass = bcrypt.compareSync(pass, passwordEncrypt);
        if (!isValidPass)
            throw { code: 401, message: "pass incorrecta" };
        return isValidPass;
    } catch (error) {
        console.log("verificarCredenciales", error)
        throw error
    }
};

module.exports = {
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
};