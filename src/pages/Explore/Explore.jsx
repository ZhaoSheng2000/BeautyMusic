import React, { useEffect, useState } from 'react'
import { Radio, Space, Row, Col, Card, Typography } from 'antd';
import { Link } from 'react-router-dom'

import { defaultGet } from '../../api';

import './explore.css';

const { Text, Title } = Typography;

export default function Explore(props) {
    let { history } = props;
    // 计算选中标签
    let tab = decodeURI(props.location.search.slice(5));
    console.log(tab);

    const [hotlist, setHotlist] = useState([]); //热门歌单
    const [choose, setChoose] = useState(tab); // 选择的标签
    const [allList, setAllList] = useState([]); //所有标签
    const [showLabel, setShowLabel] = useState([]); //展示的标签
    const [showList, setShowList] = useState([]); //展示的歌单（动态更新）


    // tab动态更新
    useEffect(() => {
        // setChoose(tab)
        if (tab === '推荐') {
            defaultGet('/personalized?limit=100').then(res => {
                // console.log(res.result);
                let data = res.result.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        coverImgUrl: item.picUrl
                    }
                })
                // console.log(data);
                setShowList(data)
            })
        }
        else if (tab === '排行') {
            defaultGet('/toplist').then(res => {
                // console.log(res);
                setShowList(res.list)
            })
        }
        else {
            defaultGet(encodeURI(`/top/playlist?cat=${tab}`)).then(res => {
                // console.log(res.playlists);
                setShowList(res.playlists)
            })
        }
    }, [tab]);


    //热门歌单分类
    useEffect(() => {
        defaultGet('/playlist/hot').then(res => {
            // console.log(res.tags);
            setHotlist(res.tags)
        })
    }, []);
    //精品歌单标签列表
    useEffect(() => {
        defaultGet('/playlist/highquality/tags').then(res => {
            // console.log(res.tags);
            setAllList(res.tags)
        })
    }, []);

    //按照分类获取精品歌单（动态更新）
    // useEffect(() => {
    //     if (choose === '推荐') {
    //         defaultGet('/personalized?limit=100').then(res => {
    //             // console.log(res.result);
    //             let data = res.result.map((item) => {
    //                 return {
    //                     id: item.id,
    //                     name: item.name,
    //                     coverImgUrl: item.picUrl
    //                 }
    //             })
    //             // console.log(data);
    //             setShowList(data)
    //         })
    //     } else if (choose === '排行') {
    //         defaultGet('/toplist').then(res => {
    //             // console.log(res);
    //             setShowList(res.list)
    //         })
    // } else {
    //     defaultGet(encodeURI(`/top/playlist?cat=${choose}`)).then(res => {
    //         // console.log(res.playlists);
    //         setShowList(res.playlists)
    //     })
    // }

    // }, [tab]);

    function onChange(e) {
        // console.log(e.target.value);
        // setChoose(e.target.value)
        history.push(`/explore?tab=${e.target.value}`)
        // if (tab === '推荐') {
        //     defaultGet('/personalized?limit=100').then(res => {
        //         // console.log(res.result);
        //         let data = res.result.map((item) => {
        //             return {
        //                 id: item.id,
        //                 name: item.name,
        //                 coverImgUrl: item.picUrl
        //             }
        //         })
        //         // console.log(data);
        //         setShowList(data)
        //     })
        // }
        // if (tab === '排行') {
        //     defaultGet('/toplist').then(res => {
        //         // console.log(res);
        //         setShowList(res.list)
        //     })
        // }

    }

    return (
        <>
            <div style={{ paddingBottom: '20px' }}>
                <h1 style={{ fontSize: '56px' }}>发现</h1>
                <div>
                    <Radio.Group value={tab} buttonStyle="solid" size="large" onChange={onChange}>
                        <Row >
                            <Col flex='0 1 auto'>
                                <Radio.Button style={{ fontSize: '18px', }} value='全部'>全部/精选</Radio.Button>
                            </Col>
                            <Col flex='0 1 auto'>
                                <Radio.Button style={{ fontSize: '18px', }} value='推荐'>推荐歌单</Radio.Button>
                            </Col>
                            <Col flex='0 1 auto'>
                                <Radio.Button style={{ fontSize: '18px', }} value='排行'>排行榜</Radio.Button>
                            </Col>
                            {
                                hotlist.map((item, index) => (
                                    <Col flex="0 1 auto" key={item.id}>
                                        <Radio.Button style={{ fontSize: '18px' }} value={item.name} key={item.id}>{item.name}</Radio.Button>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Radio.Group>
                </div>
            </div>

            <div>
                <Row gutter={[32, 32]} justify='space-around' >
                    {!showList ? '加载中' : showList.map((rec, index) => (
                        <Col span={{ xs: 24, sm: 4, md: 4 }} key={index}>
                            <div key={index}>
                                <Link to={`/songlistdetail/${rec.id}`}>
                                    <Card
                                        key={index}
                                        bordered={false}
                                        // hoverable
                                        style={{ borderRadius: '15px', backgroundColor: '#222222' }}
                                        cover={
                                            <img src={rec.coverImgUrl} style={{ width: 200, height: 200, borderRadius: '15px' }}
                                                className="mycard"
                                            />}
                                    >
                                        <div style={{ textAlign: 'left', width: '200px' }}>
                                            <div style={{ fontSize: '16px' }}>{rec.name}</div>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>{rec.updateFrequency}</Text>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}