const { Pool } = require("pg");

const getJobsDB = new Pool({
    host: "postgresql-mathiasdb.alwaysdata.net",
    user: "mathiasdb_admin",
    password: "18282323",
    database: "mathiasdb_getjobs",
    port: 5432,
    allowExitOnIdle: true
})
module.exports = getJobsDB;