import React, { useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';


const { TextArea } = Input;
const { Title } = Typography;

function VideoUploadPage(props) {
    const user = useSelector(state => state.user) //state store에서 가져옴

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0) // 0은 private 1은 public으로
    const [Category, setCategory] = useState("Film & Animation")

    //동영상과 썸네일 state
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const PrivateOptions = [
        {value: 0, label: "Private"},
        {value: 1, label: "Public"}
    ]
    const CategoryOptions = [
        {value: 0, label: "Film & Animation"},
        {value: 1, label: "Auto & Vehicles"},
        {value: 2, label: "Music"},
        {value: 3, label: "Pets & Animals"},
    ]
    const onTitleChange = (e) => {
        setVideoTitle(e.target.value);
    }
    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const onPrivateChange = (e) => {
        setPrivate(e.target.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.target.value)
    }
    const onDrop = (files) => {

        let formData = new FormData; //XMLHTTPREQUEST
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        console.log(files);
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if(response.data.success){
                console.log(response.data)

                //썸네일 drop
                let variable = {
                    url: response.data.filePath,
                    filename: response.data.fileName
                }
                setFilePath(response.data.filePath)
                console.log("filepath", response.data.filePath);

                Axios.post('/api/video/thumbnails', variable)
                .then(response => {
                    if(response.data.success){
                        setDuration(response.data.fileDuration)
                        console.log("thumbsFilepath", response.data.thumbsFilePath);
                        setThumbnailPath(response.data.thumbsFilePath)
                    }else{
                        alert('썸네일 생성에 실패했습니다.')
                    }
                })
            } else{
                alert('비디오 업로드를 실패했습니다.');
            }
        }) 
    }
    
    const onSubmit = (e) => {
        e.preventDefault(); // 원래 하려고 했던 것을 방지
        const variable = {
            writer: user.userData._id, //리덕스를 통해 가져옴
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        }
        Axios.post('/api/video/uploadVideo', variable)
        .then(response => {
            if(response.data.success) {
                message.success('성공적으로 업로드를 했습니다.')
                setTimeout(() => {
                    props.history.push('/')
                }, 3000);
                
            } else {
                alert('비디오 업로드에 실패했습니다.')
            }
        })

    } 
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: "center", marginBottom: '2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style= {{ display: "flex", justifyContent: 'space-between'}}>
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={100000000}>
                                {({getRootProps, getInputProps}) => (
                                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        <PlusOutlined style= {{ fontSize: '3rem'}} />
                                    </div>
                                    ) 
                                }
                        </Dropzone>
                        {/* Thumbnail  조건부 렌더링*/}
                        {
                            ThumbnailPath &&
                            <div>
                                <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                                {/* 서버 포트랑 연결 */}
                            </div>
                        }
                        
                        
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input 
                    onChange={onTitleChange}
                    value= {VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value= {Description}
                />
                <br />
                <br />
                <select onChange={onPrivateChange}>
                    {
                        PrivateOptions.map((v,i) => (
                            <option key={v.value} value={v.value}>{v.label}</option>
                        ))
                    }
                </select>
                <select onChange={onCategoryChange}>
                    {
                        CategoryOptions.map((v,i) => (
                            <option key={v.value} value={v.value}>{v.label}</option>
                        ))
                    }
                </select>
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default withRouter(VideoUploadPage)
