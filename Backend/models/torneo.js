var mongoose =require('mongoose');

var torneoSchema= new mongoose.Schema({
  nombre: {type: String, required: true, unique: true},
  fechas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fecha' }]  
});

mongoose.model('torneo', torneoSchema);