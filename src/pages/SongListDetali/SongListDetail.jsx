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

export default function SongListDetail(props) {
    const history = useHistory();
    // const id = history.location.state.id;
    const [detail, setDetail] = useState([]);
    const [load, setload] = useState(true);
    const [ids, setIds] = useState([]);
    const [songList, setSongList] = useState([]);//所有歌曲
    const [curSongList, setCurSongList] = useState([]); //页面当前显示歌曲
    const [songid, setSongid] = useState([]); //双击后的歌曲Id
    const [songUrl, setSongUrl] = useState([]);//双击后的歌曲Url
    const [ifLoadMore, setIfLoadMore] = useState(false);//控制显示加载更多
    const [songNum, setSongNum] = useState(20);//初始加载歌曲数量

    const { setPlaySongList, setPlaySong } = useContext(SongContext);

    const loadMore =
        ifLoadMore ?
            (
                <div
                    style={{
                        textAlign: 'center',
                        height: 32,
                        lineHeight: '32px',
                        margin: 15,
                        border: 20
                    }}
                >
                    <Button onClick={() => {
                        setSongNum(songNum + 20)
                        console.log(curSongList)
                    }}>加载更多</Button>

                </div>
            ) : null;

    //加载更多
    useEffect(() => {
        setCurSongList(songList.slice(0, songNum))
        if (songNum >= songList.length) {
            setIfLoadMore(false)
        }
    }, [songNum]);






    //歌单的详细信息
    useEffect(() => {
        let id = history.location.pathname.slice(16,)
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
                console.log(arr) //歌单中所有歌曲的id
                defaultGet(`/song/detail?ids=${arr.toString()}`)
                    .then(re => {
                        setSongList(re.songs)
                        setCurSongList(re.songs.slice(0, songNum))
                        setIfLoadMore(true)
                    })

            })
    }, []);
    // 获取双击后的歌曲url
    // useEffect(() => {
    //     // console.log(songid);
    //     // setPlaySong(songid)
    //     songid.length !== 0 && defaultGet(`/song/url?id=${songid}&realIP=61.158.152.204`)
    //         .then(res => {
    //             console.log(res.data[0]);
    //             setSongUrl(res.data[0].url);
    //         })
    // }, [songid]);

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
                                    <div className='desc'>{detail.description}</div>
                                    <div style={{textAlign:'center'}}>
                                    </div>                                  
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
                                    style={{
                                         margin: '10px 20px',
                                         }}
                                    onDoubleClick={() => {
                                        // setSongid(song.id)
                                        // localStorage.setItem('​song',song.id)
                                        setPlaySong(song.id)
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar shape="square" size={50} src={song.al.picUrl} />}
                                        title={song.name}
                                        description={song.ar.map((auther, index) => (
                                            <span key={index}>{auther.name}</span>
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