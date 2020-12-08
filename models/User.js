const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //10자리 salt
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password:{
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

//사용자가 입력한 값을 저장하기 전에
userSchema.pre('save', function(next){
    
    //next -> save로 들어감
    var user = this;

    // 비밀번호를 바꿀 때만 
    if(user.isModified('password')){

        //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                
                // Store hash in your password DB.
                if(err) return next(err);

                //plain text word -> hash된 비밀번호
                user.password = hash; 
                next();
            });
        });
    }else{
        next();
    }
    
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        
        if(err) return cb(err);
        cb(null, isMatch) //isMatch -> true 
    })
}

userSchema.methods.generateToken = function(cb) {
    
    var user = this;

    /*--sign을 이용해서 토큰을 만듦 --*/
    
    //token = user._id + 'secreteToken 
    // 인자 2는 아무거나
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user);
    })


}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        
        //user_id를 이용 -> 
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })

}

//Model => Schema를 감싸줌
const User = mongoose.model('User', userSchema);

module.exports = { User }