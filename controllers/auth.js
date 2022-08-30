const { response, json } = require('express')
const Usuario = require('../models/users')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res = response) => {

    const { correo, password } = req.body
    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }
        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }

        // generar el jwt
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}

const googleSingIn = async (req, res) => {
    const { id_token } = req.body

    try {

        const { correo, nombre, img } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            //tengo que crearlo

            const data = {
                nombre,
                correo,
                password: ':P',
                rol: "USER_ROLE",
                img,
                google: true
            }
            usuario = new Usuario(data)
            await usuario.save()
        }

        // si el usuario en DB  tiene el estado en false
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'hable con el administrador-usuario bloqueado'
            })
        }
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({

            msg: ' el token no se pudo verificar'
        })
    }


}

module.exports = {
    login,
    googleSingIn
}