const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//video Collection (table)
const videoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId, //User의 모든 정보를 긁어모아줌
        ref: 'User' 
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    privacy:{
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: String,
        dafalut: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true}) //만든 날짜, 업데이트한 날짜 표시

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }