const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require("multer");



// upload option 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4'){
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({storage: storage}).single("file");

/*
비디오 라우터
*/
router.post('/uploadfiles', (req, res) => {
    //비디오를 서버에 저장한다
    upload(req, res, err => {
        if(err) {
            return res.json({success: false, err})
        }
        console.log("res.req.file", res.req.file);
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename }) 
        //url: upload 경로
    })
})

var ffmpeg = require('fluent-ffmpeg');
router.post('/thumbnails', (req, res) => {
    
    //썸네일 생성과 비디오 러닝타임도 가져오기

    let filePath = "";
    let fileDuration ="";

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.url) // '/api/video/thumbnail'
    .on('filenames', function (filenames){ // 비디오 썸네일 파일 네임 생성
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames);
        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function(){
        console.log('Screenshots taken');
        return res.json({ success: true, thumbsFilePath: filePath, fileDuration: fileDuration})
    })
    .on('error', function(err){
        console.err(err);
        return res.json({ success: false, err});
    })
    .screenshot({ // option
        count: 3, 
        folder: 'uploads/thumbnails', // 
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })
})

router.post('/uploadVideo', (req, res) => {

    const video = new Video(req.body) // client가 보낸 모든 정보(videouploadpage)
    
    video.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
})

router.get('/getVideos', (req, res) => {

    // 비디오를 DB에서 가져오기   // collection에서 가져옴
    Video.find()
    .populate('writer') //populate를 해야 ref한 모델을 가져올 수 있음
    .exec((err, videos)=> {
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, videos})
    })
})
router.post('/getVideoDetail', (req, res) => {

    // 비디오를 DB에서 가져오기   // collection에서 가져옴
    console.log('req.body', req.body.videoId);
    Video.findOne({ "_id": req.body.videoId })
    .populate('writer')
    .exec((err, videoDetail) => {
        //console.log("videoDetail", videoDetail)
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true, videoDetail})
    })      
})


module.exports = router;

