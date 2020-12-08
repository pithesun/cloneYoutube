//백엔드의 시작점 
const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require('./config/key');

/*--body-parser option--*/

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application json
app.use(bodyParser.json());


//비밀정보 보호하기
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
}).then(() => console.log('mongoDB connected'))
.catch((err) => console.log(err));

//간단한 라우터
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 반갑습니다')
})

/*--회원가입 라우터--*/

//회원 가입할 때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어줌
app.post('/register', (req, res)=>{
  //인스턴스
  // body 안에는 json 형식의 데이터가 들어 있음.
  //requset body 안에 json이 있을 수 있는 이유 -> body parser
  const user = new User(req.body);
  //mongo db
  user.save((err, userInfo)=> {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})