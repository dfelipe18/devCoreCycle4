import mongoose from 'mongoose';

const detallecompraSchema = new mongoose.Schema({
    fecha: {
        type: String,
        required: true,
        trim: true
    },
    idCliente: {
        type: String,
        required: true,
        trim: true
    },
    idCliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sales"
        },
});

export default mongoose.model('Detallecompra', detallecompraSchema);