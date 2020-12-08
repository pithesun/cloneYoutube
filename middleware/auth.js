const { User } = require('../models/User')

let auth = (req, res, next) => {

    //인증 처리를 하는 곳 

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복화화 한 후 유저 찾기
    User.findByToken(token, (err, user) => {
        if(err) throw arr;
        if(!user) return res.json({ isAuth: false, error: true })

        //라우터에서 사용할 수 있게 하기 위해
        req.token = token;
        req.user = user;

        next(); // 미들웨어를 빠져나올 수 있게 함
    })

    // 유저가 있으면 인증 okay

    // 유저가 없으면 인증 no!
}

module.exports = { auth };