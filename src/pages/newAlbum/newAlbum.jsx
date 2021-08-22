import React, { useEffect, useState } from 'react'
import {  Link } from 'react-router-dom'
import { Row, Col, Card, Typography, Skeleton } from 'antd'

import './nwealbum.css'
import { defaultGet } from '../../api/index';

const { Text, Title } = Typography;

export default function NewAlbum() {

    const [albumList, setAlbunList] = useState([])



    useEffect(() => {
        defaultGet('/album/new?area=ALL&limit=100').then(res => {
            console.log(res.albums);
            setAlbunList(res.albums)
        })
    }, []);
    return (
        <div style={{minHeight:3000}}>
            <h1 style={{ fontSize: '56px' }}>
                新专速递
            </h1>
            <div>
                <Row gutter={[32, 32]} justify='space-around' >
                    {albumList.map((rec, index) => (
                        <Link to={`/album/${rec.id}`} key={index}>
                            <Col span={{ xs: 24, sm: 4, md: 4 }} key={index}>
                                <div key={index}>
                                    <Card
                                        key={index}
                                        bordered={false}
                                        // hoverable
                                        style={{ borderRadius: '15px', backgroundColor: '#222222' }}
                                        cover={
                                            <img src={rec.blurPicUrl} style={{ width: 200, height: 200, borderRadius: '15px' }}
                                                className="mycard"
                                            />}
                                    >
                                        <div style={{ wordBreak: 'break-all', whiteSpace: 'normal', width: '150px' }}>
                                            <Title level={5}>{rec.name}</Title>
                                            <Text type="secondary">{rec.copywriter}</Text>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </Link>

                    ))}
                </Row>
            </div>
        </div>
    );
}