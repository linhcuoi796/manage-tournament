var express = require('express');
var router = express.Router();

const teamController = require('../controllers/team.controller');


router.get('/', teamController.showTeamList);

router.get('/add', teamController.showTeamAdd);

router.post('/add', teamController.addTeam);

router.get('/edit', teamController.showTeamAdd);

router.get('/delete', teamController.deleteTeam);

router.get('/rank', teamController.showRank);

router.get('/apis/all', teamController.getTeamsAPI);

router.get('/:id/statistical', teamController.statistical);

router.use('/:id', function(req, res, next){
    req.body.teamId = req.params.id;
    next();
})
router.post('/:id', teamController.addAthlete);

router.get('/:id', teamController.getTeamByID);



module.exports = router;
