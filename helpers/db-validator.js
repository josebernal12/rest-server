const { Categoria, Producto } = require('../models')
const Role = require('../models/rol')
const usuario = require('../models/users')


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`el rol ${rol} no esta registrado en la BD`)
    }
}

const emailValido = async (correo = '') => {
    const existeEmail = await usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`el email ${correo} ya esta registrado`)
    }

}
const ExisteUsuarioPorId = async (id) => {
    const existeId = await usuario.findById(id)
    if (!existeId) {
        throw new Error(`el id ${id} no existe`)
    }

}

const existeCategoria = async (id) => {

    const existeId = await Categoria.findById(id)
    if (!existeId) {
        throw new Error(`el id ${id} no existe`)
    }
}
const existeProducto = async (id) => {

    const existeId = await Producto.findById(id)
    if (!existeId) {
        throw new Error(`el id ${id} no existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion)

    if (!incluida) {
        throw new Error(`la coleccion ${coleccion} no es permitida - ${colecciones}`)
    }
    return true
}





module.exports = {
    esRoleValido,
    emailValido,
    ExisteUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas


}

