import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Row, Col, Typography, Space, Skeleton, List, Avatar, Button } from 'antd'
import { Howl, Howler } from 'howler';
import InfiniteScroll from 'react-infinite-scroller';

import { defaultGet } from '../../api';
import './detail.less';

import { SongContext } from '../Index/Index'


const { Title, Text } = Typography;


function ms2m(time) {
    let totalmiao = parseInt(time / 1000)
    let fen = parseInt(totalmiao / 60)
    let miao = totalmiao % 60
    if (miao < 10)
        return (`${fen}:0${miao}`)
    else
        return (`${fen}:${miao}`)

}

export default function SongListDetail() {
    const history = useHistory();
    // const id = history.location.state.id;
    const [detail, setDetail] = useState([]);
    const [load, setload] = useState([true]);
    const [ids, setIds] = useState([]);
    const [songList, setSongList] = useState([]);
    const [curSongList, setCurSongList] = useState([]);
    const [songid, setSongid] = useState([]);
    const [songUrl, setSongUrl] = useState([]);

    const { setPlaySongList,setPlaySong } = useContext(SongContext);

    const loadMore = (
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button onClick={(e)=>{
                setCurSongList(songList.slice(0, 100))
                console.log(curSongList)

            }}>加载更多</Button>
        </div>
    )



    //加载更多
    


    //歌单的详细信息
    useEffect(() => {
        let id = history.location.pathname.slice(16,)
        console.log(history.location.pathname.slice(16,));
        defaultGet(`/playlist/detail?id=${id}`)
            .then(res => {
                console.log(res);
                setDetail(res.playlist)
                setload(false)
                const ids = res.playlist.trackIds;
                let arr = [];
                ids.forEach(e => {
                    arr.push(e.id)
                });
                console.log(arr)//歌单中所有歌曲的id
                defaultGet(`/song/detail?ids=${arr.toString()}`)
                    .then(re => {
                        console.log(re.songs);
                        setSongList(re.songs)
                        setCurSongList(re.songs.slice(0, 50))
                    })

            })
    }, []);
    //获取双击后的歌曲url
    useEffect(() => {
        // console.log(songid);
        setPlaySong(songid)
        songid.length !== 0 && defaultGet(`/song/url?id=${songid}&realIP=61.158.152.204`)
            .then(res => {
                console.log(res.data[0]);
                setSongUrl(res.data[0].url);

            })
    }, [songid]);

    // 双击播放
    // useEffect(() => {
    //     const sound = new Howl({
    //         src: [songUrl]
    //     });
    //     sound.play()
    //     return () => {
    //         sound.stop()
    //     };
    //     setPlaySong(songid)
    // }, [songUrl]);

    return (
        <div>
            <Skeleton active round loading={load}>
                {detail.length === 0 ? null : (
                    <Row gutter={36}>
                        <Col span={8}>
                            <div>
                                <img src={detail.coverImgUrl} style={{ width: 300, height: 300, borderRadius: 15 }}></img>
                            </div>
                        </Col>
                        <Col span={16} >
                            <div style={{ padding: '20px' }}>
                                <Space direction="vertical">
                                    <Title level={2}>{detail.name}</Title>
                                    <Title level={4}>By {detail.creator.nickname}</Title>
                                    <Text type="secondary">最后更新于{new Date(detail.updateTime).toLocaleString()} ·  {detail.trackIds.length}首歌 </Text>
                                    <br></br>
                                    <Text type="secondary">{detail.description}</Text>
                                    <Button onClick={() => {
                                        setPlaySongList(songList)
                                    }}>播放全部 </Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                )
                }
            </Skeleton>
            <div style={{ paddingTop: 50 }}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    useWindow={false}
                >
                    <List
                        loadMore={loadMore}
                        dataSource={curSongList}
                        renderItem={song => (
                            <div className="song" key={song.id}>
                                <List.Item
                                    style={{ padding: ' 10px' }}
                                    onDoubleClick={() => setSongid(song.id)}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar shape="square" size={50} src={song.al.picUrl} />}
                                        title={<a href="#">{song.name}</a>}
                                        description={song.ar.map((auther, index) => (
                                            <span key={index}>{auther.name} </span>
                                        )
                                        )}
                                    />
                                    <div>
                                        时长：{ms2m(song.dt)}
                                    </div>
                                </List.Item>
                            </div>
                        )}
                    >
                    </List>
                </InfiniteScroll>

            </div>
        </div>
    );
}