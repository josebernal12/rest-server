const { Usuario, Categoria, Producto } = require('../models')

const { ObjectId } = require('mongoose').Types
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res) => {

    const esMongoID = ObjectId.isValid(termino); //true

    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

}

const buscarCategorias = async (termino = '', res) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const categoria = await Categoria.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const categoriaDB = await Categoria.find({ nombre: regex, estado: true }).populate('categoria','nombre');


    res.json({
        results: categoriaDB
    });

}
const buscarProductos = async (termino = '', res) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const Producto = await Producto.findById(termino);
        return res.json({
            results: (Producto) ? [Producto] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const ProductoDB = await Producto.find({ nombre: regex, estado: true });

    res.json({
        results: ProductoDB
    });

}

const buscar = (req, res) => {

    const { coleccion, termino } = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;

        case 'categorias':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;

        default:
            res.status(500).json({
                msg: ' se me olvido hacer esta busqueda'
            })
    }


}

module.exports = {
    buscar
}