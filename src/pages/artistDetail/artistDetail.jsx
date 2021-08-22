import React, { useEffect, useState } from 'react'
import { Typography, Row, Col } from 'antd';

import { defaultGet } from '../../api';

import './artistdetail.css'

const { Text } = Typography;

export default function ArtistDetail(props) {
    const id = props.match.params.id;//歌手id
    const timestamp = Date.parse(new Date()); //时间戳

    const [artists, setArtists] = useState([]); //歌手部分信息以及单曲


    useEffect(() => {
        defaultGet(`/artists?id=${id}&timestamp=${timestamp}`).then(res => {
            console.log(res);
            setArtists(res)
        })
    }, []);


    return (
        <div style={{ overflow: 'auto' }}>
            <div className='artist-header'>
                <Row wrap={false}>
                    <Col flex="320px">
                        <div className='head'>
                            <img className="artist-img" src="https://p1.music.126.net/8JCMa08GNKeKXyAyzrhx7Q==/109951165816365826.jpg?param=224y224" />
                        </div>
                    </Col>
                    <Col flex='auto'>
                        <div>
                            <div className='name'>Justin Bieber</div>
                            <div className='artist'> 艺人</div>
                            <div className='statistics'>71首歌 · 16张专辑</div>
                            <div className='description'>
                                新加坡人，华语著名歌手、词曲作者，音乐制作人。1997年在新加坡由其经纪公司 Music & Movement 旗下的Yellow Music发行英语专辑《Bored》而正式出道，1999年将国语唱片签约于宝丽金唱片旗下，并推出首张国语同名专辑《蔡健雅》。2000年因宝丽金唱片并入环球唱片旗下，因此《记念》及之后的唱片皆由台湾环球唱片发行。在此一专辑中，蔡健雅以〈记念〉一曲成功打响在台湾市场的知名度。同年入围台湾第11届金曲奖最佳新人奖。2002年发行《Secret Lavender》专辑。同年以〈打错了〉作曲者身份入围台湾第13届金曲奖最佳作曲人奖，并同时入围最佳国语演唱人奖。2004年首度担任制作人，替梁咏琪制作《归属感》专辑。同年以《陌生人》获得台湾第15届金曲奖最佳国语女演唱人提名。2008年推出专辑《My Space》，同年获台湾第19届金曲奖7项提名，并获得了最佳专辑制作人和最佳国语女歌手两座大奖。近年移居台湾。2012年获最佳国语女歌手奖。代表作品：《呼吸》《陌生人》《空白格》《若你碰到他》《红色高跟鞋》。
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className='hot-song'>
                <div className='section-title'>热门歌曲</div>
                <div>
                    <Row justify='left' gutter={[24, 24]}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                                return (
                                    <Col span={6}>
                                        <div>
                                            <Row wrap={false}>
                                                <Col flex="36px">
                                                    <img className="tracklist-img" src='https://p1.music.126.net/8JCMa08GNKeKXyAyzrhx7Q==/109951165816365826.jpg?param=224y224' />
                                                </Col>
                                                <Col flex='auto'>
                                                    <div style={{width:240}}>
                                                        <div className='tracklist-title'>12333qwrjhrjhbhbjvaerhbjevfhjdwdqdwq</div>
                                                        <div className='tracklist-artist'>456</div>
                                                    </div>

                                                </Col>
                                            </Row>

                                            {/* <div className="title-and-artist">
                                                <div className='song-container'>
                                                    <div className='tracklist-title'>123331313r1r33rdwqdqwdwqwdwdqdwq</div>
                                                    <div className='tracklist-artist'>456</div>
                                                </div>
                                            </div> */}

                                        </div>
                                    </Col>
                                )
                            })
                        }

                    </Row>
                </div>
            </div>
        </div>
    );
}