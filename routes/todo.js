var express = require('express');
var router = express.Router();
var listMaster = require('../models').list_master
var logger = require('../config/logger')

var someFunction = function(req, res, next) {
    // Put the preprocessing here.
    logger.info(req.originalUrl)
    next();
};
// TODO 조회
router.get('/', someFunction, async function(req, res) {

    // var list = await listMaster.findAll({
    //     where : {
    //         LIST_ID : 1
    //     }
    // })

    var list = await listMaster.findAll({})
    res.status(200).json(list)

});

// TODO 작성
router.post('/', async function(req, res) {

    await listMaster.create({
        LIST_TITLE: req.body.list_title,
        LIST_CONTENT: req.body.list_content,
        LIST_EXPIRE: req.body.list_expire
    })
    res.status(200).json("작성하였습니다.")
});

// TODO 수정
router.put('/', async function(req, res) {

    await listMaster.update({
        LIST_TITLE: req.body.list_title,
        LIST_CONTENT: req.body.list_content,
        LIST_EXPIRE: req.body.list_expire
    }, {
        where: { LIST_ID: req.body.list_id }
    })

    res.status(200).json("수정하였습니다.")
});

// TODO 삭제
router.delete('/', async function(req, res) {

    await listMaster.destroy({
        where: { LIST_ID: req.body.list_id }
    })

    res.status(200).json("삭제하였습니다.")
});

// TODO 우선순위
router.post('/priority', async function(req, res) {

    await listMaster.create({
        LIST_TITLE: req.body.list_title,
        LIST_CONTENT: req.body.list_content,
        LIST_EXPIRE: req.body.list_expire
    })
    res.status(200).json("작성하였습니다.")
});

// TODO 완료처리
router.put('/complete', async function(req, res) {

    await listMaster.update({
        LIST_COMPLETE: req.body.list_complete
    }, {
        where: { LIST_ID: req.body.list_id }
    })
    res.status(200).json("완료하였습니다.")
});
module.exports = router;