const { Router } = require('express')
const { check } = require('express-validator')
const { cargarArchivo, ActualizarImagen, mostrarImagen } = require('../controllers/uploads')
const { coleccionesPermitidas } = require('../helpers')
const { validarArchivo } = require('../middlewares')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()


router.post('/',[validarArchivo], cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id', 'el id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
],ActualizarImagen)    

router.get('/:coleccion/:id',[
    check('id', 'el id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)



module.exports = router