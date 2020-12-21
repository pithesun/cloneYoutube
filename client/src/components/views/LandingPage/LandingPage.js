import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage(props) {

    const [Video, setVideo] = useState([])
    //랜딩페이지에 들어오자마자 실행 - DOM 
    //get request를 서버로 보냄

    useEffect(() => { //class - componentDidMount
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success){
                setVideo(response.data.videos)
            } else{
                alert('비디오 가져오기를 실패했습니다.')
            }
        })
    }, [])

    const renderCards = Video.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration/60 - minutes);

        return <Col lg={6} md={8} xs={24} key={video._id}> {/* 반응형으로 만들기 */}
                
                <div style={{ position: 'relative'}}>
                    <a href={`/video/${video._id}`}> {/* 링크 걸어주기 */}
                        <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} />
                        <div className="duration">
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </a>
                </div>
                
            <br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image }/> 
                }
                title={video.title}
                description=""
            />
            <span>{video.writer.name}</span> <br />
            <span style={{ marginLeft: '3rem'}}>{video.views} views</span> -
            <span>{moment(video.createAt).format("MMM Do YY")}</span>
        </Col>
    })

    return (
        <div style= {{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> A List of Videos </Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}
                
            </Row>
        </div>
    )
}

export default withRouter(LandingPage)
