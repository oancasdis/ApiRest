const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Location = require('./Location');
const Sensor = require('./Sensor');
const Tablas = require('./Tablas');
const DataLuz = require('./DataSensorLuz');
const DataTemp = require('./DataSensorTemp');

const app = express();
// const db = new sqlite3.Database('database.db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/Lagregar', Location)
app.get('/LobtenerUno/:company', Location)
app.get('/LobtenerTodos', Location)
app.delete('/LborrarUno/:company', Location)
app.put('/LeditaUno/:valor/:company', Location)

app.post('/Sagregar', Sensor)
app.get('/SobtenerUno/:location', Sensor)
app.get('/SobtenerTodos', Sensor)
app.delete('/SborrarUno/:location', Sensor)
app.put('/SeditaUno/:valor/:location', Sensor)

app.post('/DLagregar', DataLuz)
app.get('/DLobtenerUno/:id', DataLuz)
app.get('/DLobtenerTodos', DataLuz)
app.delete('/DLborrarUno/:id', DataLuz)
app.put('/DLeditaUno/:valor/:id', DataLuz)

app.post('/DTagregar', DataTemp)
app.get('/DTobtenerUno/:id', DataTemp)
app.get('/DTobtenerTodos', DataTemp)
app.delete('/DTborrarUno/:id', DataTemp)
app.put('/DTeditaUno/:valor/:id', DataTemp)

app.post('/crearTablas', Tablas)

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
