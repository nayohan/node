var express = require('express');
var router = express.Router();

const controller = require ('./user.controller');

router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/', controller.destroy);

router.post('/', controller.create);

module.exports = router;