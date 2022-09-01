const { Router } = require('express')
const { check } = require('express-validator')
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias')
const { existeCategoria } = require('../helpers/db-validator')
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares')

const router = Router()

//obtener todas las categorias - publicos
router.get('/', obtenerCategorias)
//obtener todas las categorias por id - publicos
router.get('/:id', [
    check('id', 'el id no existe').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoriaPorId)
//crear categoria - privado -cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
],
    crearCategoria)
//actualizar - privado -cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    check('id', 'el id no existe').isMongoId(),
    validarCampos
], actualizarCategoria)
//borrar una categoria -admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria)


module.exports = router