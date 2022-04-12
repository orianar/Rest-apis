const Productos= require ('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');
const {nextValue} = require("shortid/lib/random/random-from-seed");

const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

// Sube un archivo
exports.subirArchivo=(req, res, next)=>{
    upload(req, res, function (error){
        if(error){
            res.json({mensaje:error})
        }
        return next();

    })

}
// Agrega nuevo productos

exports.nuevoProducto= async (req, res, next)=>{
    const producto= new Productos(req.body);

    try{
        if (req.file.filename){
            producto.imagen= req.file.filename
        }

        // almacenar el registro
        await producto.save();
        res.json({mensaje:'Se agrego nuevo producto'});
    }catch (error){
        console.log(error)
        next()
    }
}
// Muestra todos los productos
exports.mostarProductos= async (req, res, next)=>{
    try{
        //Obtener todos los productos
        const productos= await Productos.find({});
        res.json(productos);
    } catch (error){
        console.log(error);
        next();
    }
}
// Mostar producto por ID
exports.mostarProducto= async (req, res, next)=>{
    try{
        const producto= await Productos.findById(req.params.IdProducto);
        res.json(producto);
    } catch (error){
        res.json('Ese producto no existe');
        next();
    }
}
// Actualizar producto
exports.actualizarProducto= async (req,res, next)=>{
    try{
        //Contruir un nuevo producto
        let nuevoProducto= req.body;
        // verificar si hay imagen nueva
        if(req.file){
            nuevoProducto.imagen= req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.IdProducto);
            nuevoProducto.imagen= productoAnterior.imagen;
        }
        let producto= await Productos.findOneAndUpdate({_id: req.params.IdProducto}, nuevoProducto, {
            new: true,
        });
        res.json(producto);
    }catch (error){
        res.json(error);
        next();
    }
}
// Elimina un producto via ID
exports.eliminarProducto= async (req, res, next)=>{
    try{
        await Productos.findByIdAndDelete({_id: req.params.IdProducto});
        res.json({mensaje: 'El producto ha sido eliminado'})

    } catch (error){
        res.json(error);
        next();
    }
}

exports.buscarProducto= async (req, res, next)=>{
    try {
        //Obtener el query
        const {query}= req.params;
        const producto = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(producto);

    }catch (error){
        console.log(error);
        next();
    }


}