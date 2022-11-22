import mongoose from 'mongoose';
//Importacion de un cifrado de datos, password
import bcrypt from 'bcrypt';
//Importacion de Generar ID
import generarId from '../helper/generarId.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: false,
        trim: true
    },
    telefono: {
        type: String,
        required: false,
        trim: true
    },
    edad: {
        type: Number,
        required: true,
        trim: true
    },
    correo: {
        type: Number,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
});

//Decifrar nuestro password: quede guardado protegido para que 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

//Comprobar o confirmar password del usuario
userSchema.methods.comprobarPassword = async function(passwordFomrulario){
    return await bcrypt.compare(passwordFomrulario, this.password);
};

export default mongoose.model('User', userSchema);