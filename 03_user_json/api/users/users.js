var express = require('express');
var router = express.Router();

//User_Data
let users = [ { id: 1, name: 'nayohan' },
                            { id: 2, name: 'jinwook' },
                            { id: 3, name: 'orange' }
                        ]

//전체 사용자 조회===========================================
router.get('/', function(req, res, next) {
  res.json(users);
});


//특정 사용자 조회===========================================
router.get('/:id', function(req, res) {
	
	//id를 문자 -> 숫자로 변경
	const id = parseInt(req.params.id, 10);

	//id가 올바른 숫자인지 확인
  if (!id) {
      return res.status(400).json({error: 'Incorrect id'});
  }
  
	//users변수 id번째 값 검색후 user에 저장, 콘솔에 출력  
  let user = users.filter(user => user.id === id)[0]
  console.log(user);
  
	//검색에 실패시, user값은 undefined 
  if (!user) {
      return res.status(404).json({error: 'unknown user'});
  }
  
	//user변수를 json응답 전송 
  return res.json(user);
});


//특정 사용자 삭제===========================================
router.delete('/:id', function(req, res) {

	const id = parseInt(req.params.id, 10);
	if(!id) {
		return res.status(400).json({error: 'Incorrect id'});1
	}
	
	//users변수에 id값이 있는지 확인 
	const userIdx = users.findIndex(user => {
	return user.id === id;
	});
	
	//fincindex의 id비교문이 전부 false를 반환하면 -1반환
	//id에 맞는 사용자 없음
	if(userIdx === -1) {
		return res.status(404).json({error: 'Unknown user'});
	} 
	
	//userIdx인덱스에서 그다음 1개 데이터 삭제
	users.splice(userIdx, 1);
	
	//성공
	res.status(204).send();
});	

//사용자 추가================================================
router.post('/', function(req, res) {
	
	//바디파서로 바디데이터를 저장
	const name = req.body.name || '';
	
	//받은데이터가 없으면 에러
	if(!name.length) {
		return res.status(400).json({error: 'Incorrect name'});
	}
	
	//기존id보다 1큰값 찾기
	const id = users.reduce((maxId, user) => {
		return user.id > maxId ? user.id : maxId
	}, 0) + 1;
	
	//새 사용자 변수 생성
	const newUser = {
		id: id,
		name: name
	}
	
	//서버로 변수 보냄	
	users.push(newUser);
	
	//성공
	res.status(201).json(newUser);
	
});

module.exports = router;
