const { response, request } = require('express')


const usuariosGet = (req = request, res = response) => {

    const { q, nombre } = req.query
    res.json({
        msg: 'get API - controlador',
        q,
        nombre
    })
}

const usuarioPost = (req, res = response) => {
    const { nombre, edad } = req.body

    res.json({
        msg: 'Post API - controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res) => {
    const { id } = req.params

    res.json({
        msg: 'Put API - controlador',
        id
    })
}
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API - controlador'
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Delete API - controlador'
    })
}


module.exports = {

    usuariosGet,
    usuarioPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}