import React, { useEffect, useState } from 'react';
import { Row, Col } from "antd";
import { defaultGet } from '../../api';


import './library.css'

export default function Library() {

    const [userInfo, setUserInfo] = useState([]); // 用户信息
    const [songList, setSongList] = useState([]); //我的歌单
    const [ilike, setIlike] = useState([]); // 我喜欢的音乐歌单歌曲


    useEffect(async () => {
        const user = await defaultGet(`/user/account`)
        setUserInfo(user.profile)
        const userid = user.profile.userId;
        const playList = await defaultGet(`/user/playlist?uid=${userid}`)
        // console.log(playList.playlist);
        setSongList(playList.playlist) //我的歌单
        const likeId = playList.playlist[0].id; //我喜欢的音乐 歌单id
        // console.log(likeId);
        const list = await defaultGet(`/playlist/detail?id=${likeId}`);
        // console.log(list.playlist.trackIds.slice(0,12)); 
        const likeIdList = list.playlist.trackIds.slice(0, 12);// 我喜欢的音乐
        const ids = Array.from(likeIdList, ({ id }) => id).join(',') //拼接id
        const likesong = await defaultGet(`/song/detail?ids=${ids}`)
        // console.log(likesong.songs);
        setIlike(likesong.songs);
    }, []);


    return (
        <>
            <div style={{ display: 'flex', paddingBottom: '30px' }}>
                <img style={{ marginRight: '12px', borderRadius: '50%', height: 44, alignItems: 'center', marginTop: '12px' }} src={`${userInfo.avatarUrl}?param=512y512`}></img>
                <span style={{ fontSize: 42, fontWeight: 'bold', color: '#ffffff' }}>{userInfo.nickname}的音乐库</span>
            </div>

            <div>
                <Row wrap={false}>
                    <Col flex='1 1 370px'>
                        <div>
                            <div className='like-text'>我喜欢的音乐</div>
                            <img className='topimg' src={`${userInfo.backgroundUrl}?param=512y512`}></img>
                        </div>
                    </Col>
                    <Col flex="1 0 750px">
                        <Row gutter={[24, 24]}>
                            {
                                ilike.map((item, index) => {
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
                    </Col>
                </Row>
            </div>

            <div>
                <div>全部歌单</div>
            </div>
        </>
    );
}