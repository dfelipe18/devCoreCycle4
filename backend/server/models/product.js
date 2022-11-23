import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    urlImage: {
        url: String,
        public_id: String,
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    }
});

export default mongoose.model('Product', productSchema);