var mongoose =require('mongoose');

var fechaSchema= new mongoose.Schema({
  numero: {type: Number, required: true, unique: true},
  partidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'partido' }]
});

mongoose.model('fecha', fechaSchema);