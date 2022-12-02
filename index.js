const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Location = require('./Location');
const Sensor = require('./Sensor');
const Tablas = require('./Tablas');
const DataLuz = require('./DataSensorLuz');
const DataTemp = require('./DataSensorTemp');
const Admin = require('./Admin')
const Company = require('./Company')

const app = express();
// const db = new sqlite3.Database('database.db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/Aagregar/:username/:password', Admin)

app.post('/Cagregar/:id/:companyName/:companyApiKey', Company)

app.post('/Lagregar/:companyApiKey/:locationName/:locationCountry/:locationCity/:locationMeta', Location)
app.get('/LobtenerUno/:companyApiKey', Location)
app.get('/LobtenerTodos', Location)
app.delete('/LborrarUno/:companyApiKey', Location)
app.put('/LeditaUno/:valor/:companyApiKey', Location)

app.post('/Sagregar/:companyApiKey/:sensorName/:sensorCategory/:sensorMeta/:companyApiKey', Sensor)
app.get('/SobtenerUno/:companyApiKey', Sensor)
app.get('/SobtenerTodos', Sensor)
app.delete('/SborrarUno/:companyApiKey', Sensor)
app.put('/SeditaUno/:sensorName/:sensorCategory/:sensorMeta/:sensorApiKey/:adminId', Sensor)

app.post('/DLagregar/:sensorApiKey/:intensidadRojo/:intensidadVerde/:intensidadAzul', DataLuz)
app.get('/DLobtenerUno/:sensorApiKey', DataLuz)
app.get('/DLobtenerTodos', DataLuz)
app.delete('/DLborrarUno/:sensorApiKey', DataLuz)
app.put('/DLeditaUno/:intensidadRojo/:intensidadVerde/:intensidadAzul/:sensorApiKey/:adminId', DataLuz)

app.post('/api/v1/sensor_data/:sensorApiKey/:temperaturaK/:temperaturaF', DataTemp)
app.get('/api/v1/sensor_data/:sensorApiKey/:sensorId', DataTemp)
app.get('/api/v1/sensor_allData', DataTemp)
app.delete('/DTborrarUno/:sensorApiKey', DataTemp)
app.put('/DTeditaUno/:temperaturaK/:temperaturaF/:sensorApiKey/:sensorId', DataTemp)

app.post('/crearTablas', Tablas)

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
