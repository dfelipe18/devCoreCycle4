//Importacion del modelo usuario:
import Usuario from "../models/User.js";

//Funcion de peticion y una respuesta 
const prueba = (req, res) => {
    res.send({
        message: "En esta ruta gestionaremos todas las peticiones correspondientes al modelo de Usuario"
    })
};

//Funcion de Registrar
const registrar = async (req, res) => {

    //Se define los datos del nombre, email y password en el body de req:
    const { name, lastname, role, direccion, telefono, edad, correo, password} = req.body;

    //Solicitud de creacion de usuario:
    const user = await Usuario.create({
        name,
        lastname,
        role,
        telefono,
        direccion,
        edad,
        correo,
        password,
    })
    res.status(201).json({
        mensage: "Usuario Registrado",
        usuario: user
    })
};

const confirmar = (req, res) =>{
    res.status(200).json({
    message: "Confirmacion de usuario",    
    })
};

export {
    prueba,
    registrar,
    confirmar
};