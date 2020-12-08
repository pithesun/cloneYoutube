//백엔드의 시작점 
const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require('./config/key');
const cookieParser = require('cookie-parser');

/*--body-parser option--*/

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application json
app.use(bodyParser.json());

/*쿠키 파서 사용*/
app.use(cookieParser());

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

/*--로그인 라우터--*/
app.post('/login', (req, res)=> {

  //요청된 이메일을 데이터베이스 안에서 찾기
  User.findOne({ email: req.body.email }, (err, user)=> {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      })
    }

    // 요청된 이메일이 있다면, 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({loginSucess:false, message: "비밀번호가 틀렸습니다."})

       // 비밀번호가 받으면 유저를 위한 Token을 생성
        user.generateToken((err, user) => {
          if(err) return res.status(400).send(err);

          // token을 저장한다. 어디에? 쿠키, 로컬스토리지, 세션 등 (어디에 저장해야 안전한가/) 
          res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id})

        })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})