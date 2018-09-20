const express = require('express'); //IMPORTA  EL EXPRESS
const path = require('path'); // SE ENCARGA DE UNIR DIRECTORIOS
const  morgan = require('morgan') // REQUERIMOS MORGAN  PARA VER LAS PETICIONES
const  mysql = require('mysql'); // REQUERIMOS MYSQL PARA ESTABLECER LA CONEXION
const myConnection = require('express-myconnection'); //REQUERIMOS EXPRESS-MYCONECTION PARA HACER CONSULTAS MYSQL POR NODEJS
const app = express();


//IMPORTAR RUTAS
const customerRoutes =require('./routes/customer'); //IMPORTAR EL MODULO CUSTOMER.JS

//SETTINGS
app.set('port',process.env.PORT || 3000); //IDENTIFICA SI HAY PUERTO DISPONIBLE, SINO USA EL PUERTO 3000
app.set('view engine', 'ejs'); //INDICAMOS QUE MOTOR DE PLANTILLA UTILIZAREMOS
 app.set('views', path.join(__dirname,'views')); // ASIGNA LA RUTA PARA ACCEDES A LAS VISTAS POR MEDIO DE PATH

//MIDDLEWARES
app.use(morgan('dev')); // MOSTRARA LAS PETICIONES SOLICITADAS POR CONSOLA
app.use(myConnection(mysql, { //CONEXION CON BASE DE DATOS
   host: 'localhost',
    user: 'root',
    password: '',
    port:3306,
    database: 'crudnodejsmysql'
},'single'));
app.use(express.urlencoded({extended: false})); //ENCRIPTAR LA URL
// ROUTES
app.use('/',customerRoutes) //ASIGNAMOS QUE CUANDO ESTE EN ESA RUTA, EJECUTARA ESE CODIGO

//ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname,'public'))); //EN PUBLIC SE ENCUENTRAN LIBRERIAS Y FRAMEWORKS, LOS DEJAMOS PREPARADOS CON EL PATH

//  INICIANDO EL SERVIDOR
app.listen(app.get('port'),() =>{
   console.log("SERVEN ON PORT 3000");
});