const getJobsDB = require('../database/conexion');
const bcrypt = require('bcryptjs');

const obtenerDatosDeUsuario = async (email) => {
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
};

const registerUser = async (usuario) => {
    const { nombre, apellido, edad, sexo, email, contraseña } = usuario;
    const passwordEncriptada = bcrypt.hashSync(contraseña);
    contraseña = passwordEncriptada;
    const values = [nombre, apellido, edad, sexo, email, passwordEncriptada];
    //const consulta = 'INSERT INTO usuarios (nombre, apellido, edad, sexo, email, contraseña ) VALUES ($1, $2, $3, $4, $5, $6)';
    const consulta = 'INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4, $5, $6)';
    await getJobsDB.query(consulta, values);
};

const actualizarUsuario = async (usuario, id) => {
    let { imagen, contacto, links, descripcion } = usuario;
    const valores = [imagen, contacto, links, descripcion, id];
    const consulta =
        "UPDATE usuarios SET imagen = $1, contacto = $2, links = $3, descripcion = $4 WHERE id = $5";
    await getJobsDB.query(consulta, valores);
};

const registrarTrabajo = async (trabajo) => {
    const { titulo, contacto, email, descripcion, usuario_id } = trabajo;
    const values = [titulo, contacto, email, descripcion, usuario_id];
    const consulta = "INSERT INTO trabajos values (DEFAULT, $1, $2, $3, $4, $5)";
    await getJobsDB.query(consulta, values);
};

//puede que sea la tabla solicitudtrabajos
const registrarSolicitud = async (trabajo) => {
    const { usuario_id, trabajo_id } = trabajo;
    const values = [usuario_id, trabajo_id];
    const consulta = "INSERT INTO solicitudtrabajos values ($1, $2)";
    await getJobsDB.query(consulta, values);
};

const obtenerListaSolicitudes = async (usuario_id) => {
    const consulta = `
    SELECT id, titulo, contacto, email, descripcion from 
    (SELECT usuario_id FROM solicitudtrabajos WHERE usuario_id = $1) AS solicitudtrabajos 
    INNER JOIN trabajos on solicitudtrabajos.usuario_id = trabajos.id;`;
    const { rows: solicitudtrabajos } = await getJobsDB.query(consulta, [usuario_id]);
    return solicitudtrabajos;
};

const obtenerTrabajos = async () => {
    const consulta = "SELECT * FROM trabajos";
    const { rows: trabajos } = await getJobsDB.query(consulta);
    return trabajos;
};

const verificarCredenciales = async (email, contraseña) => {
    const valor = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const { rows: [usuario], rowCount } = await getJobsDB.query(consulta, valor);
    if (!rowCount)
        throw {
            code: 404,
            message: "No se encontró ningún usuario con estas credenciales",
        };
    const passwordEncriptada = usuario?.contraseña;
    const passwordEsCorrecta = bcrypt.compareSync(contraseña, passwordEncriptada);
    if (!passwordEsCorrecta)
        throw { code: 401, message: "Contraseña incorrecta" };
    /* if (!usuario) {
        throw { code: 401, message: "Email o contraseña incorrecta" };
    }
    const passwordEsCorrecta = bcrypt.compareSync(contraseña, usuario.contraseña);
    if (!passwordEsCorrecta) {
        throw { code: 401, message: "Email o contraseña incorrecta" };
    } */
};

module.exports = {
    obtenerDatosDeUsuario,
    registerUser,
    verificarCredenciales,
    actualizarUsuario,
    registrarTrabajo,
    registrarSolicitud,
    obtenerListaSolicitudes,
    obtenerTrabajos
};