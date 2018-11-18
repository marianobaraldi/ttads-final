var mongoose = require('mongoose');
var Torneo = mongoose.model('torneo');
var Fecha = mongoose.model('fecha');
var Partido = mongoose.model('partido');
var router = require('express').Router()

//GET ALL
router.get('/', (req, res, next) => {
  Torneo.find().
    populate({
      path: 'fechas',
      populate: {
        path: 'partidos',
        populate: {
          path: 'equipo_local'
        }
      },
    }).
    populate({
      path: 'fechas',
      populate: {
        path: 'partidos',
        populate: {
          path: 'equipo_visitante'
        }
      },
    }).
    exec(function (err, result) {
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
  Torneo.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    if (result) {
      res.json(result);
    } else {
      res.send("No existe el torneo buscado");
    }
  });
});

//CREATE
router.post('/', (req, res, next) => {
  let nombreNuevo = req.body.nombre;
  let imagenNueva = req.body.imagen;
  let fechas = req.body.fechas;

  var idFechas = [];
  var todosLosPartidos = [];
  var todasLasFechas = [];
  fechas.forEach(fecha => {
      //para cada fecha, leo todos los partidos, y uso los ids para crear la fecha,
      // luego guardo el id de la fecha y le hago save
      var partidosFecha = fecha.partidos;
      var idPartidos = [];
      partidosFecha.forEach(partido => {
          //Para cada partido, lo creo y guardo el id, y hago el save
          var partidoNuevo = new Partido({
            fecha_hora: partido.fecha_hora,
            equipo_local: partido.equipo_local,
            equipo_visitante: partido.equipo_visitante
          });
          idPartidos.push(partidoNuevo._id);
          todosLosPartidos.push(partidoNuevo);
      });
      var fechaNueva = new Fecha({
        numero: fecha.numero,
        partidos: idPartidos
      });
      idFechas.push(fechaNueva._id);
      todasLasFechas.push(fechaNueva);

  });

  var TorneoNuevo = new Torneo({
    nombre: nombreNuevo,
    imagen: imagenNueva,
    fechas: idFechas
  })
  
  //hago los save al final, por si falla antes
  todosLosPartidos.forEach(p => {p.save();});
  todasLasFechas.forEach(f => {f.save();});
  TorneoNuevo.save((err) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send(TorneoNuevo);
    }
  })
});

//UPDATE
router.put('/:id', (req, res, next) => {
  Torneo.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if (result) {
      result.nombre = req.body.nombre || result.nombre;
      result.imagen = req.body.imagen || result.imagen;
      result.fechas = req.body.fechas || result.fechas;
      result.save((err, result) => {
        if (err) {
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
  Torneo.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if (result) {
      result.remove((err, deleteTorneo) => {
        if (err) {
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

module.exports = router;
