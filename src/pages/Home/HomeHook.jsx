import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Row, Col, Card, Typography, Skeleton } from 'antd'
import './home.less'

import { defaultGet } from '../../api/index';

const { Text, Title } = Typography;

export default function Home() {
    let history = useHistory();
    const [recomend, setRecomend] = useState([
        {
            "id": 5033464627,
            "type": 0,
            "name": "你费尽心思错过我 是为了遇见谁",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/iWAs5ZXtZT1iyHD-yj_1TA==/109951165443757011.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1628328764574,
            "playCount": 2305073,
            "trackCount": 137,
            "highQuality": false,
            "alg": "cityLevel_unknow"
        }
    ]); //推荐歌单
    const [load, setload] = useState([false]); //加载状态
    const [toplist, setToplist] = useState([]); //排行榜
    const [artists, setArtists] = useState([]); //热门歌手
    const [newAlbum, setNewAlbum] = useState([]); //最新专辑


    // 推荐歌单
    useEffect(() => {
        defaultGet('/personalized?limit=10')
            .then(res => {
                setRecomend(res.result)
                // console.log(res.result);
                setload(false)
            })
    }, []);

    // 排行榜
    useEffect(() => {
        defaultGet('/toplist').then(res => {
            // console.log(res.list);
            setToplist(res.list.slice(0, 10))
        })

    }, []);

    // 热门歌手
    useEffect(() => {
        defaultGet('/top/artists?limit=12').then(res => {
            console.log(res.artists);
            setArtists(res.artists)
        })
    }, []);

    // 最新专辑
    useEffect(() => {
        defaultGet('/album/newest').then(res => {
            console.log(res.albums);
            setNewAlbum(res.albums.slice(0, 10))
        })
    }, []);
    return (
        <>
            {/* 推荐歌单 */}
            <div >
                <Skeleton loading={load} active>
                    <div style={{ padding: "15px 15px 12px 20px" }}>
                        <span style={{ fontSize: '28px', fontWeight: 700 }}>推荐歌单</span>
                        <Link to='/explore?tab=推荐'>
                            <span style={{ float: 'right', fontSize: '13px', fontWeight: '600', paddingTop: 20 }}>查看更多</span>
                        </Link>
                    </div>
                    <Row gutter={[32, 32]} justify='space-around' >
                        {!recomend ? '加载中' : recomend.map((rec, index) => (
                            <Link to={`/songlistdetail/${rec.id}`} key={index}>
                                <Col span={{ xs: 24, sm: 4, md: 4 }} key={index} >
                                    <div key={index}>
                                        <Card
                                            key={index}
                                            bordered={false}
                                            // hoverable
                                            style={{ borderRadius: '15px', backgroundColor: '#222222' }}
                                            cover={
                                                <img src={rec.picUrl} style={{ width: 200, height: 200, borderRadius: '15px' }}
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
                </Skeleton>
            </div>
            {/* foryou */}
            <div >
                <h1 style={{ padding: "50px 15px 0px 20px" }}>For You </h1>
                <Skeleton loading={load} active>
                    <Row gutter={16} justify='center'  >
                        {/* 日推 */}
                        <Col span={12}>
                            <div key={1} style={{ textAlign: 'center' }}>
                                <Card
                                    key={1}
                                    bordered={false}
                                    style={{ borderRadius: '15px', backgroundColor: '#222222' }}
                                >
                                    <div>
                                        <img
                                            src={recomend[0].picUrl}
                                            className="foryou-img"
                                        />
                                        <div className="foryou-text">
                                            每 日<br /> 推 荐
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        {/* 私人fm*/}
                        <Col span={12} key={2}>
                            <div key={1} style={{ textAlign: 'center' }}>
                                <Card
                                    key={1}
                                    bordered={false}
                                    // onClick={() => onDetail()}
                                    style={{ borderRadius: '15px', backgroundColor: '#222222' }}
                                >
                                    <div>
                                        <img
                                            src={recomend[0].picUrl}
                                            className="foryou-img"
                                        />
                                        <div className="foryou-text">
                                            私 人 <br />F M
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
            {/* 热门歌手 */}
            <div >
                <h1 style={{ padding: "50px 15px 0px 20px" }}>热门艺人 </h1>
                <Skeleton loading={load} active>
                    <Row gutter={[16, 32]} justify='space-around' >
                        {
                            artists.map((item, index) => (
                                <Link to={`artist/${item.id}`} key={index}>
                                    <Col span={{ xs: 24, sm: 4, md: 4 }}>
                                        <div key={index} style={{ textAlign: 'center' }}>
                                            <div>
                                                <img
                                                    src={`${item.img1v1Url}?param=200y200`}
                                                    className="yiren-img"
                                                />
                                                <div className="yiren-text">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Link>
                            ))
                        }
                    </Row>
                </Skeleton>
            </div>
            {/* 新专速递 */}
            <div >
                <Skeleton loading={load} active>
                    <div style={{ padding: "30px 15px 12px 20px" }}>
                        <span style={{ fontSize: '28px', fontWeight: 700 }}>新专速递</span>
                        <Link to='/newalbum'>
                        <span style={{ float: 'right', fontSize: '13px', fontWeight: '600', paddingTop: 20 }}>查看更多</span>
                        </Link>
                    </div>
                    <Row gutter={[32, 32]} justify='space-around' >
                        {newAlbum.map((rec, index) => (
                            <Link to={`/album/${rec.id}`} key={index}>
                                <Col span={{ xs: 24, sm: 4, md: 4 }} key={index}>
                                    <div key={index}>
                                        <Card
                                            key={index}
                                            bordered={false}
                                            // hoverable
                                            style={{ borderRadius: '15px', backgroundColor: '#222222' }}
                                            cover={
                                                <img src={`${rec.blurPicUrl}?param=300y300`} style={{ width: 200, height: 200, borderRadius: '15px' }}
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
                </Skeleton>
            </div>
            {/* 排行榜 */}
            <div >
                <Skeleton loading={load} active>
                    <div style={{ padding: "30px 15px 12px 20px" }}>
                        <span style={{ fontSize: '28px', fontWeight: 700 }}>排行榜</span>
                        <Link to='/explore?tab=排行'>
                        <span style={{ float: 'right', fontSize: '13px', fontWeight: '600', paddingTop: 20 }}>查看更多</span>
                        </Link>
                    </div>
                    <Row gutter={[32, 32]} justify='space-around' >
                        {!toplist ? '加载中' : toplist.map((top, index) => (
                            <Link to={`/songlistdetail/${top.id}`} key={index}>
                                <Col span={{ xs: 24, sm: 4, md: 4 }} key={index}>
                                    <div key={index}>
                                        <Card
                                            key={index}
                                            bordered={false}
                                            // hoverable
                                            style={{ borderRadius: '15px', backgroundColor: '#222222' }}
                                            cover={
                                                <img src={top.coverImgUrl} style={{ width: 200, height: 200, borderRadius: '15px' }}
                                                    className="mycard"
                                                />}
                                        >
                                            <div style={{ textAlign: 'left', width: '200px' }}>
                                                <div style={{ fontSize: '16px' }}>{top.name}</div>
                                                <Text type="secondary" style={{ fontSize: '12px' }}>{top.updateFrequency}</Text>
                                            </div>
                                        </Card>
                                    </div>
                                </Col>
                            </Link>
                        ))}
                    </Row>
                </Skeleton>
            </div>
        </>
    );
}