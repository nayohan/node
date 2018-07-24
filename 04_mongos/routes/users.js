var express = require('express');
var router = express.Router();

const User = require ('./user');

//전체 조회
router.get('/', (req, res) => {
    User.findAll()
      .then((users) => {
          if (!users.length) return res.status(404).send({ err: '유저가 하나도 없어' });
          res.send(users);
          })
      .catch(err => res.status(500).send(err));    
});
       
//유저 조회
//curl -X GET 'localhost:4500/users/nayohan' -v
router.get('/:userid', (req, res) => {
    User.findOneByUserid(req.params.userid)
      .then((user) => {
          if (!user) return res.status(404).send({ err: '그유저가 없는데?' });
          res.send(user);
          })
      .catch(err => res.status(500).send(err));    
});


//유저 생성
//curl -X POST 'localhost:4500/users' -d "userid=hello&link=naver.com"
router.post('/', (req, res) => {
    User.create(req.body)
      .then(user => res.send(todo))
      .catch(err => res.status(500).send(err));
});

//유저 업데이트
//curl -X PUT 'localhost:4500/users/hello' -d "userid=nayohan&link=naver.com" -v
router.put('/:userid', (req, res) => {
    User.updateByUserid(req.params.userid, req.body)
      .then(user => res.send(user))
      .catch(err => res.status(500).send(err));
});

//유저 삭제
//curl -X DELETE 'localhost:4500/users/nayohan' -v
router.delete('/:userid', (req, res) => {
    User.deleteByUserid(req.params.userid)
      .then(() => res.status(200))
      .catch(err => res.status(500).send(err));       
});

module.exports = router;
