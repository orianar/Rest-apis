const mongoose =require ('mongoose');
const Shema = mongoose.Schema;

const usuariosSchema= new Shema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim:true,
    },
    nombre:{
        type: String,
        required: "Agrega tu nombre",
    },
    pasword:{
        type:String,
        required: true,
    }
});
module.exports= mongoose.model('Usuarios', usuariosSchema);
