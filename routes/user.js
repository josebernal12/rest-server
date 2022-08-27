const { Router } = require('express')
const { check } = require('express-validator')
const { esRoleValido, emailValido, ExisteUsuarioPorId } = require('../helpers/db-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
    usuariosGet,
    usuarioPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/user')
const router = Router()

router.get('/', usuariosGet)
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio y deben ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailValido),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE0', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPost)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(ExisteUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(ExisteUsuarioPorId),
    validarCampos
], usuariosDelete)







module.exports = router

