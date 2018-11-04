var router=require('express').Router();

router.use('/api/equipos', require('./equipo'));
router.use('/api/partidos', require('./partido'));
router.use('/api/eventos', require('./evento'));
router.use('/api/tipo_eventos', require('./tipo_evento'));
router.use('/api/fechas', require('./fecha'));
router.use('/api/torneos', require('./torneo'));

module.exports=router;