var mongoose = require('mongoose');
var Fecha = mongoose.model('fecha');
var router=require('express').Router()

//GET ALL
router.get('/', (req, res, next) => {
  Fecha.find().
  populate({
    path: 'partidos',
        populate: {
          path: 'equipo_local'
        }
  }).
  populate({
    path: 'partidos',
        populate: {
          path: 'equipo_visitante'
        }
  }).

  exec(function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if (result) {
      res.json(result);
    }
    else {
      res.send("No existe ninguna fecha");
    }
  });
});

//GET ONE
router.get('/:id', (req, res, next) => {
  Fecha.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    if(result) {
      res.json(result);
    } else {
      res.send("No existe la fecha buscada");
    } 
  });
});

//CREATE
router.post('/', (req, res, next) => {
  let numeroNuevo=req.body.numero;
  let partidos=req.body.partidos;
  var FechaNueva = new Fecha({
      numero: numeroNuevo,
      partidos: partidos
  })
  FechaNueva.save((err) => {
    if(err){
      res.send(err);
    }
    else {
      res.send(FechaNueva);
    }
  })
});

//UPDATE
router.put('/:id', (req, res, next) => {
  Fecha.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    else if (result) {
      result.numero = req.body.numero || result.numero;
      result.partidos = req.body.partidos || result.partidos;
      result.save((err, result) => {
        if(err) {
          res.status(500).send(err)
        }
        else {
          res.status(200).send(result);
        }
      });
    }
    else {
      res.send("La fecha que quiere modificar no existe");
    }
  });
});

//DELETE ONE
router.delete('/:id', (req, res, next) => {
  Fecha.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if(result) {
      result.remove((err, deleteFecha) => {
        if(err) {
          res.status(500).send(err);
        }
        res.status(200).send(deleteFecha);
      })
    }
    else {
      res.send("No existe esa fecha");
    }
  });
});

//delete all
router.delete('/all/yes', (req, res, next) => {
  Fecha.remove({}, function(err) { 
    if (err) {
      res.status(500).send(err);
    }
    res.status(200);
    console.log('all Fechas removed') 
  });
});

module.exports=router;
