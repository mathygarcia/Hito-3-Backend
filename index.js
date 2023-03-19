const indexRoutes = require('./src/routes/indexRoutes')
/* require('dotenv').config() */
const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const port = 3000;
const app = express();

/* app.use(express.static('public')) */
/* app.use(express.json()); */
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use('/', indexRoutes)
app.use("*", (req, res) => {
    res.status(404).send({ message: "this route does not exist search again with another route" })
})
app.listen(port, () /* , (err) */ => /* console.error(err) */ console.log(`Example app listening on port ${port}!`));