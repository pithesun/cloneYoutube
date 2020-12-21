import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import './VideoDetailPage.css';
import SideVideo from './Section/SideVideo'

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }
    const [VideoDetail, setVideoDetail] = useState([])
    
    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data.videoDetail)
                setVideoDetail(response.data.videoDetail)
            }else{
                alert('비디오 정보를 가져오는 것을 실패하였습니다.');
            }
        })
    }, [])

    if(VideoDetail.writer){
        return( <Row gutter={[16,16]}>
                    <Col lg={15} xs={20} >
                        <div className="left">
                            <video src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                                <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar scr={VideoDetail.writer.image}/>}
                                            title={VideoDetail.writer.name}
                                            description={VideoDetail.description}
                                        />

                                </List.Item>
                                {/* comment */}
                        </div>
                    </Col>
                    <Col lg={7} xs={24}>
                        <span>다음 동영상</span>
                        <SideVideo />
                    </Col>
                </Row>
        )
        }else{
            return (
                <div>Loading ....</div>
            )
        }
}

export default withRouter(VideoDetailPage)
