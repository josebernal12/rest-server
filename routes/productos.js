const { Router } = require('express')
const { check } = require('express-validator')

const { 
    ObtenerProducto, 
    CrearProducto, 
    actualizarProducto, 
    borrarProducto, 
    ObtenerProductoPorID 
} = require('../controllers/productos')
const { existeCategoria, existeProducto } = require('../helpers/db-validator')
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares')

const router = Router()

//obtener todas las categorias - publicos
router.get('/', ObtenerProducto)
//obtener todas las categorias por id - publicos
router.get('/:id', [
    check('id', 'el id no existe').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], ObtenerProductoPorID)
//crear categoria - privado -cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('categoria', 'el id no es de mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],
    CrearProducto)
//actualizar - privado -cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'el id no existe').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto)
//borrar una categoria -admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto)


module.exports = router