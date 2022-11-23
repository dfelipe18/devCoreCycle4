import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({
    fecha: {
        type: String,
        required: true,
        trim: true
    },
    idCliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
    idVenta: {
        type: String,
        required: true,
        trim: true
    },
    valor: {
        type: String,
        required: false,
        trim: true
    },
    confirmado: {
        type: String,
        required: false,
        trim: true
    },
    idProducto: {
        type: Number,
        required: true,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true,
        trim: true
    },
});

export default mongoose.model('Sales', SalesSchema);