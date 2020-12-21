import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import './SideVideo.css'

function SideVideo() {

    const [SideVideo, setSideVideo] = useState([]);
    
    useEffect(() => { 
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success){
                setSideVideo(response.data.videos)
            } else{
                alert('비디오 가져오기를 실패했습니다.')
            }
        })
    }, [])

    const renderSideVideo = SideVideo.map((video, index)=> {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration/60 - minutes);

        return (
            
        <div style={{ display: 'flex', margin: "0.5rem 0"}}>
            <div className="video" style={{ width: '55%', marginBottom: '0.1rem', marginRight: '1rem'}}>
                <a href={`/video/${video._id}`} >
                    <img style={{ width: '100%', height: '80%', verticalAlign: 'middle'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
                </a>
            </div>
            <div class="video-info" style={{ width: '45%'}}>
                    <div id='VideoTitle'>{video.title}</div>
                    <div>{video.writer.name}</div>
                    <div>{video.views}</div>
                    <div>{minutes} : {seconds}</div>
            </div>
        </div>
        )
    })

    return (
        <>
            {renderSideVideo}
        </>
        
    )
}

export default SideVideo
