var mongoose =require('mongoose');

var fechaSchema= new mongoose.Schema({
  numero: {type: Number, required: true},
  partidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'partido' }]
});

mongoose.model('fecha', fechaSchema);