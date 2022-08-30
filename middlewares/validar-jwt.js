const jwt = require('jsonwebtoken')
const Usuario = require('../models/users')

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token')
    if (!token) {
        return res.status(400).json({
            msg: 'no hay token en la petición'
        })
    }
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findById(uid)

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }

        //verificar si el uid tiene estado en true

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }



        req.usuario = usuario
        next()
    } catch (error) {
        
        res.status(401).json({
            msg: 'token no valido'
        })
    }
}

module.exports = {
    validarJWT
}