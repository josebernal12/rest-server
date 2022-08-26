const {Router} = require ('express')
const { 
    usuariosGet,
    usuarioPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete 
} = require('../controllers/user')
const router = Router()

router.get('/',usuariosGet)
router.post('/',usuarioPost)
router.put('/:id',usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/',usuariosDelete )







module.exports = router

