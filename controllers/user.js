const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/users')


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    // const usuarios = await Usuario.find({estado:true})
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments({estado:true})

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ])


    res.json({
        total,
        usuarios
    })
}

const usuarioPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })


    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en BD
    await usuario.save()

    res.json({
        usuario
    })
}

const usuariosPut = async (req, res) => {
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    // validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)

    }
    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuarioDB)
}
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API - controlador'
    })
}
const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    //fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id)


    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })


    res.json({
        usuario
    })
}


module.exports = {

    usuariosGet,
    usuarioPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}