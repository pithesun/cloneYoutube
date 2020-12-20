const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");
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



module.exports = router;

