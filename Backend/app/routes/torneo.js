var mongoose = require('mongoose');
var Torneo = mongoose.model('torneo');
var router=require('express').Router()

//GET ALL
router.get('/', (req, res, next) => {
  Torneo.find()
  //POPULATE
  
  .exec(function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if (result) {
      res.json(result);
    }
    else {
      res.send("No existe ningún torneo");
    }
  });
});

//GET ONE
router.get('/:id', (req, res, next) => {
  Torneo.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    if(result) {
      res.json(result);
    } else {
      res.send("No existe el torneo buscado");
    } 
  });
});

//CREATE
router.post('/', (req, res, next) => {
  let nombreNuevo=req.body.nombre;
  let fechas=req.body.fechas;
  var TorneoNuevo = new Torneo({
      nombre: nombreNuevo,
      fechas: fechas
  })
  TorneoNuevo.save((err) => {
    if(err){
      res.send(err);
    }
    else {
      res.send(TorneoNuevo);
    }
  })
});

//UPDATE
router.put('/:id', (req, res, next) => {
  Torneo.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    else if (result) {
      result.nombre = req.body.nombre || result.nombre;
      result.url = req.body.url || result.url;
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
      res.send("El Torneo que quiere modificar no existe");
    }
  });
});

//DELETE ONE
router.delete('/:id', (req, res, next) => {
  Torneo.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if(result) {
      result.remove((err, deleteTorneo) => {
        if(err) {
          res.status(500).send(err);
        }
        res.status(200).send(deleteTorneo);
      })
    }
    else {
      res.send("No existe ese Torneo");
    }
  });
});

module.exports=router;
