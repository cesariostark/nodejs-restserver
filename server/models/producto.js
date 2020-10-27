const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({

    name: { type: String, required: [true, 'El nombre es necesario'] },
    unitPrice: { type: Number, required: [true, 'El precio unitario es necesario'] },
    desc: { type: String, required: false },
    available: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Cateogory' },
    user: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Product', productSchema);