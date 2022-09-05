
const fs = require('fs')
const path = require('path')

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');


const cargarArchivo = async (req, res) => {

    try {
        const nombre = await subirArchivo(req.files)

        res.json({
            nombre

        })
    } catch (msg) {
        res.status(400).json({ msg })
    }
}

const ActualizarImagen = async (req, res) => {


    const { id, coleccion } = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe un usuario con el id ${id}`
                })
            }
            break
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: 'se me olvido validar esto'
            });
    }

    // limpiar imagenes previas


    if (modelo.img) {
        //hay que borrar la imagen del servidor
        const pathimagen = path.join(__dirname, '../uploads', coleccion, modelo.img)

        if (fs.existsSync(pathimagen)) {
            fs.unlinkSync(pathimagen)
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion)

    modelo.img = nombre

    await modelo.save()

    res.json({
        modelo
    })


}

const mostrarImagen = async (req, res) => {
    const { id, coleccion } = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe un usuario con el id ${id}`
                })
            }
            break
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: 'se me olvido validar esto'
            });
    }

    // limpiar imagenes previas


    if (modelo.img) {
        //hay que borrar la imagen del servidor
        const pathimagen = path.join(__dirname, '../uploads', coleccion, modelo.img)

        if (fs.existsSync(pathimagen)) {
          return res.sendFile(pathimagen)
        }
    }

    

   res.sendFile(path.join(__dirname ,'../assets/no-image.jpg'))

}

module.exports = {
    cargarArchivo,
    ActualizarImagen,
    mostrarImagen
}