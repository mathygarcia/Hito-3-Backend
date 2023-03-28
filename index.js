const indexRoutes = require('./src/routes/indexRoutes')

const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const port = 3001;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use('/', indexRoutes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));