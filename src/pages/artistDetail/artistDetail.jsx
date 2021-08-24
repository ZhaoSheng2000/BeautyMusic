import React, { useEffect, useState } from 'react'
import { Row, Col, Spin, Card } from 'antd';
import { Link } from 'react-router-dom'

import { defaultGet } from '../../api';
import axios from 'axios';
import './artistdetail.css'



function add0(m) { return m < 10 ? '0' + m : m }
function format(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y;
}

export default function ArtistDetail(props) {
    const id = props.match.params.id;//歌手id
    const timestamp = Date.parse(new Date()); //时间戳

    const [songs, setSongs] = useState([]); //单曲
    const [artist, setArtist] = useState({});//歌手部分信息
    const [ifLoad, setIfLoad] = useState(true); //加载数据
    const [album, setAlbum] = useState([]);//专辑
    const [simi, setSimi] = useState([]); //相似歌手


    //初始化加载数据
    useEffect(() => {
        function getSongs() {
            return defaultGet(`/artists?id=${id}&timestamp=${timestamp}`);
        }
        function getAlbum() {
            return defaultGet(`/artist/album?id=${id}&limit=100&timestamp=${timestamp}`);
        }
        function getsimi() {
            return defaultGet(`/simi/artist?id=${id}`)
        }
        axios.all([getSongs(), getAlbum(), getsimi()])
            .then(res => {
                console.log(res);
                setArtist(res[0].artist);
                setSongs(res[0].hotSongs.slice(0, 24));
                setAlbum(res[1].hotAlbums);
                setSimi(res[2].artists.slice(0,12));
                setIfLoad(false);
                window.scrollTo(0,0)
            })
    }, [id]);

    return (
     
        <div >
            <Spin spinning={ifLoad} tip="Loading...">
                <div className='artist-header'>
                    <Row wrap={false}>
                        <Col flex="320px">
                            <div className='head'>
                                <img className="artist-img" src={`${artist.img1v1Url}?param=224y224`} />
                            </div>
                        </Col>
                        <Col flex='auto'>
                            <div>
                                <div className='name'>{artist.name}</div>
                                <div className='artist'> 艺人</div>
                                <div className='statistics'>{artist.musicSize}首歌 · {artist.albumSize}张专辑</div>
                                <div className='description'>{artist.briefDesc}</div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='hot-song'>
                    <div className='section-title'>热门歌曲</div>
                    <div >
                        <Row gutter={[24, 24]}>
                            {
                                songs.map((item, index) => {
                                    return (
                                        <Col span={6} key={item.id}>
                                            <div className='songlist'>
                                                <Row wrap={false}>
                                                    <Col flex="36px">
                                                        <img className="tracklist-img" src={`${item.al.picUrl}?param=40y40`} />
                                                    </Col>
                                                    <Col flex='auto'>
                                                        <div>
                                                            <div className='tracklist-title'>{item.name}</div>
                                                            <div className='tracklist-artist'>{
                                                                Array.from(item.ar, ({ name }) => name).join(',')
                                                            }</div>
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </div>

                <div className='album-box'>
                    <div className='section-title'>专辑</div>
                    <Row gutter={[32, 32]} justify='space-between' >
                        {
                            album.map((item, index) => {
                                return (
                                    <Col span={{ xs: 24, sm: 4, md: 4 }} key={item.id} >
                                        <div>
                                            <Card
                                                key={index}
                                                bordered={false}
                                                style={{ backgroundColor: '#222222' }}
                                                cover={
                                                    <img className='album-card' style={{ width: 200, height: 200, borderRadius: '15px' }} src={`${item.picUrl}?param=200y200`}
                                                    />}
                                            >
                                                <div >
                                                    <div className="album-title">{item.name}</div>
                                                    <div className='album-text'>{format(item.publishTime)}</div>
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>
                                )
                            })

                        }

                    </Row>
                </div>


                <div >
                    <h1 style={{ padding: "50px 15px 0px 20px" }}>相似艺人</h1>
                    <Row gutter={[16, 32]} justify='space-around' >
                        {
                            simi.map((item, index) => (
                                <a href={`/#/artist/${item.id}`} key ={item.id}>
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
                                </a>
                            ))
                        }
                    </Row>
                </div>

            </Spin>
        </div>
    );
}