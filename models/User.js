const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //10자리 salt

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
    }
    
})

//Model => Schema를 감싸줌
const User = mongoose.model('User', userSchema);

module.exports = { User }