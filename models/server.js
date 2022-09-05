const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../database/config')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            archivos: '/api/archivos',
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }


        //Conexion base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes() //va a lanzar  las rutas
    }
    async conectarDB() {
        await dbConnection()




    }

    middlewares() {

        //cors
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
        //carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }


    routes() {

        this.app.use(this.paths.archivos, require('../routes/uploads'))
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))

    }


    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo el puerto', this.port)
        })
    }

}


module.exports = Server