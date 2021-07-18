import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Card, Typography, Skeleton } from 'antd'
import './home.less'

import '../../api/index';
import { defaultGet } from '../../api/index';

const { Text, Title } = Typography;

export default function Home() {
    let history = useHistory();
    const [recomend, setRecomend] = useState([]);
    const [load, setload] = useState([false]);
    useEffect(() => {
        defaultGet('/personalized?limit=10')
            .then(res => {
                setRecomend(res.result)
                console.log(res.result);
                setload(false)
            })
    }, []);

    function onDetail(id) {
       history.push({ pathname: '/songlistdetail/'+id });

    }



    return (
        <div>
            <h1>推荐歌单 </h1>
            <Skeleton loading={load} active>
                <Row gutter={[16, 16]} justify='center' >
                    {!recomend ? '加载中' : recomend.map((rec, index) => (
                        <Col span={{ xs: 24, sm: 4, md: 4 }} key={index}>
                            <div key={index}>
                                <Card
                                    key={index}
                                    bordered={false}
                                    hoverable
                                    onClick={() => onDetail(rec.id)}
                                    style={{ borderRadius: '15px' }}
                                    cover={<img src={rec.picUrl} style={{ width: 200, height: 200, borderRadius: '15px' }} />}
                                >
                                    <div style={{ wordBreak: 'break-all', whiteSpace: 'normal', width: '150px' }}>
                                        <Title level={5}>{rec.name}</Title>
                                        <Text type="secondary">{rec.copywriter}</Text>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}

                </Row>
            </Skeleton>

        </div>
    );
}