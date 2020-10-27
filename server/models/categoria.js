const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cateogorySchema = new Schema({

    desc: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
    user: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Cateogory', cateogorySchema);