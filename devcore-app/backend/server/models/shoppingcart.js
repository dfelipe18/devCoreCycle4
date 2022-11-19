import mongoose from 'mongoose';

const shoppingcartSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    valueSale:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sales"
        },
    idCliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
});

export default mongoose.model('Shoppingcart', shoppingcartSchema);