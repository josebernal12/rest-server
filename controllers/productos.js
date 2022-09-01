

const { Producto } = require('../models/index')

const ObtenerProducto = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query

    const [total, producto] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true })
            .populate('usuario', 'nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        producto
    })
}
const ObtenerProductoPorID = async (req, res) => {

    const { id } = req.params
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.json({
        producto
    })
}



const CrearProducto = async (req, res) => {

    const { estado, usuario, ...body } = req.body

    const producto = await Producto.findOne({ nombre: body.nombre })

    if (producto) {
        return res.status(401).json({
            msg: `el producto ${producto.nombre} ya existe`
        })

    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const productodb = new Producto(data)
    await productodb.save()

    res.json({
        productodb
    })
}


const actualizarProducto = async (req, res) => {

    const { id } = req.params
    const { estado, usuario, ...data } = req.body

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase()
   }


    data.usuario = req.usuario._id
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json({
        producto
    })
}

const borrarProducto = async (req, res) => {

    const { id } = req.params

    const eliminarProducto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json({
        eliminarProducto
    })

}



module.exports = {
    ObtenerProducto,
    ObtenerProductoPorID,
    CrearProducto,
    actualizarProducto,
    borrarProducto
}