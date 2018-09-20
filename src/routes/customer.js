const express = require ('express');
const router = express.Router(); //DEVUELVE UN OBJETO CON RUTAS

const customerController =  require ('../controllers/customerController'); // REQUERIR EL ARCHIVO CONTROLADOR;

router.get('/',customerController.list);
router.post('/add',customerController.save);
router.get('/delete/:id',customerController.delete);
router.get('/update/:id',customerController.edit);
router.post('/update/:id',customerController.update);

module.exports = router; // EXPORTAMOS EL MODULO ROUTER