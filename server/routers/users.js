const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");


//회원 가입할 때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어줌
router.post('/register', (req, res)=>{
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
  router.post('/login', (req, res)=> {
  
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
  
            // token을 client에 저장한다. 어디에? 쿠키, 로컬스토리지, 세션 등 (어디에 저장해야 안전한가/) 
            res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id})
  
          })
      })
    })
  })
  
  /*-- Auth 기능 만들기 --*/
  // 서버의 토큰과 클라이언트의 토큰을 확인하기 
  // role 0 일반 유저 0이 아니면 관리자 
  
  // express에서 제공되는 라우터를 이용해서 라우터들을 정리하기 위해 api 사용
  router.get('/auth', auth, (req, res) => {
    
    /*-- middle ware 통과 => Auth: true-- */
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false: true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    })
  
  })
  
  /*-- 로그아웃 라우터 --*/
  router.get('/logout', auth, (req, res) => {
  
    /*-- auth middle ware를 지나옴 -- */
    User.findOneAndUpdate({ _id: req.user._id}, { token : ""},
      (err, user) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).send({
          success: true
        })
      } 
    )
  })
  
  module.exports = router;