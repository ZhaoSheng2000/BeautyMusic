import React, { useContext, useEffect, useState } from 'react'
import { StepBackwardFilled, StepForwardFilled, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Avatar, Row, Col, Space, Typography } from 'antd';
import Icon from '@ant-design/icons';
import './playbar.less'
import { defaultGet } from '../../../api/index'
import { Howl, Howler } from 'howler';

import { SongContext } from '../../Index/Index'

const { Title, Text } = Typography;



const ListSvg = () => (
    <svg t="1625646859933" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1968" width="20" height="20"><path d="M964.608 234.496c-46.08-52.565333-104.789333-93.696-169.642667-118.784a34.030933 34.030933 0 0 0-46.421333 31.744v420.352a178.005333 178.005333 0 0 0-110.933333-38.741333c-98.816 0-179.2 80.384-179.2 179.2S538.794667 887.466667 637.610667 887.466667s179.2-80.384 179.2-179.2c0-1.877333-0.170667-3.754667-0.341334-5.632 0-1.024 0.341333-1.877333 0.341334-2.901334V201.216c36.181333 20.309333 69.12 46.933333 96.597333 78.165333 12.458667 14.165333 34.133333 15.530667 48.128 3.072 14.165333-12.288 15.530667-33.792 3.072-47.957333zM637.610667 819.2c-61.098667 0-110.933333-49.834667-110.933334-110.933333s49.834667-110.933333 110.933334-110.933334 110.933333 49.834667 110.933333 110.933334-49.834667 110.933333-110.933333 110.933333zM185.344 307.2h392.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133334h-392.533333a34.133333 34.133333 0 1 0 0 68.266667zM424.277333 460.8h-238.933333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133334h238.933333c18.773333 0 34.133333-15.36 34.133334-34.133334s-15.36-34.133333-34.133334-34.133333zM321.877333 682.666667h-136.533333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133333h136.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133333z" p-id="1969" fill="#ffffff"></path></svg>

);
const LoopSvg = () => (
    <svg t="1625646959918" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3648" width="20" height="20"><path d="M959.232 263.232l-239.552-198.656-64.64 53.568 130.048 107.84H92.224V512.64H183.68V301.824h601.472l-130.048 107.84 64.64 53.568 239.552-198.656-0.832-0.64 0.768-0.704z m-135.296 457.728H239.68L369.728 613.12l-64.64-53.632-239.616 198.656 0.832 0.64-0.832 0.704 239.616 198.656 64.64-53.632-130.048-107.84h675.712V513.024h-91.456v207.936z" p-id="3649" fill="#ffffff"></path></svg>

);
const Voice1Svg = () => (
    <svg t="1625651529821" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1846" width="20" height="20"><path d="M452.676893 78.69327c-15.654538-6.361895-34.744315-2.402723-46.544059 9.712199L205.211778 293.863864l-98.367355 0c-22.948665 0-41.554418 18.20871-41.554418 41.160445l0 353.999476c0 22.951735 18.605753 41.160445 41.554418 41.160445l98.367355 0L405.009244 935.642626c7.978718 8.198729 18.783809 12.670577 29.786397 12.670577 5.259794 0 12.812817-0.948605 17.881253-3.00852 15.663748-6.367011 28.157293-21.542642 28.157293-38.452777L480.834186 117.196189C480.834186 100.286054 468.340641 85.060281 452.676893 78.69327zM397.72535 804.584732 254.775614 659.84114c-7.822153-8.037047-20.807908-12.765745-32.024367-12.765745l-74.353428 0L148.397818 376.972701l74.353428 0c11.215436 0 24.201192-4.728698 32.024367-12.765745l142.949736-144.743592L397.72535 804.584732zM946.930717 636.423801c16.008602 16.447601 15.653515 42.762943-0.785899 58.774615-8.080026 7.864108-18.540262 11.780301-28.984125 11.780301-10.824533 0-21.635763-4.200672-29.78128-12.567223L767.838829 571.611679 648.299269 694.411493c-8.146541 8.365528-18.960841 12.567223-29.78128 12.567223-10.44898 0-20.904099-3.916193-28.984125-11.780301-16.439414-16.011672-16.795525-42.327014-0.785899-58.774615l121.091916-124.397195L588.746942 387.630435c-16.008602-16.447601-15.653515-42.762943 0.785899-58.774615 16.45988-16.011672 42.761919-15.646352 58.765405 0.785899l119.53956 122.800837 119.540583-122.800837c16.013719-16.45374 42.314735-16.793478 58.765405-0.785899 16.440437 16.011672 16.795525 42.327014 0.785899 58.774615L825.837778 512.026606 946.930717 636.423801z" p-id="1847" fill="#ffffff"></path></svg>

);
const Voice2Svg = () => (
    <svg t="1625651554860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2155" width="32" height="32"><path d="M594.089623 68.470441c-15.912411-6.580882-33.207309-2.719948-45.369304 9.460466L339.53095 288.667515 235.458663 288.667515c-23.49511 0-42.538839 18.643616-42.538839 42.142819L192.919824 693.241854c0 23.49818 19.043728 42.142819 42.538839 42.142819l104.072287 0 210.193233 210.736609c8.143471 8.154727 19.033495 12.588713 30.116925 12.588713 5.473665 0 8.993838-1.00284 14.249539-3.179412 15.908318-6.585999 24.273846-22.056342 24.273846-39.269375L618.364493 107.790982C618.36347 90.577948 609.997941 75.05644 594.089623 68.470441zM533.275559 813.425074 385.275807 662.97962c-7.982812-7.994068-16.805758-12.684904-28.102035-12.684904l-79.165014 0 0-276.538267 79.165014 0c11.295254 0 20.119223-4.690836 28.102035-12.684904l147.999752-150.445454L533.275559 813.425074zM759.790526 692.192965c-8.403391 9.379625-20.026102 14.153348-31.702026 14.153348-10.111289 0-20.2543-3.583618-28.377304-10.860349-17.501606-15.687284-18.972097-42.587957-3.292999-60.086493 109.297288-121.970936 4.517897-241.702877 0-246.741637-15.679098-17.499559-14.208607-44.400233 3.292999-60.081377 17.48728-15.691377 44.404326-14.21577 60.074214 3.287883C815.626205 394.174478 887.488907 549.679158 759.790526 692.192965z" p-id="2156" fill="#ffffff"></path></svg>
);
const Voice3Svg = () => (
    <svg t="1625651566597" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2350" width="32" height="32"><path d="M508.068458 68.448952c-15.960507-6.565533-33.750685-2.663666-45.892213 9.56382l-208.498638 210.654744L150.309354 288.667515c-23.503297 0-42.402739 18.642592-42.402739 42.141796L107.906615 693.241854c0 23.49818 18.899442 42.141796 42.402739 42.141796l103.369276 0 209.027687 210.654744c8.151657 8.206916 19.082614 12.671601 30.211069 12.671601 5.455245 0 9.903557-0.997724 15.151072-3.158946 15.939017-6.569626 25.281803-22.049179 25.281803-39.289841L533.350261 107.788935C533.351284 90.549296 524.007475 75.018577 508.068458 68.448952zM448.26235 813.019845 300.55424 663.061484c-7.990998-8.045233-17.817808-12.767791-29.15911-12.767791l-78.399581 0L192.995549 373.755426l78.399581 0c11.341303 0 21.168112-4.722558 29.15911-12.767791L448.26235 211.029274 448.26235 813.019845zM672.196539 692.103938c-8.410554 9.432837-20.074198 14.242376-31.79003 14.242376-10.07445 0-20.189831-3.553942-28.299533-10.783601-17.550725-15.639189-19.098987-42.534745-3.460822-60.07626 105.97666-118.880551 11.050684-234.291071-0.124843-247.058862-15.425318-17.629519-13.767562-44.48312 3.792373-59.987233 17.58654-15.510252 44.295855-13.963013 59.881832 3.505847C727.72011 394.229736 799.178605 549.661761 672.196539 692.103938zM800.394293 805.935496c-8.4126 9.431813-20.075221 14.242376-31.791054 14.242376-10.07445 0-20.189831-3.553942-28.299533-10.783601-17.550725-15.639189-19.097964-42.534745-3.459798-60.07626 208.05043-233.387491 8.526187-464.919728-0.067538-474.664673-15.523555-17.59268-13.912871-44.467771 3.641947-60.030212 17.567098-15.551184 44.3593-14.023388 59.977 3.490497C803.01191 221.048465 1059.402301 515.38612 800.394293 805.935496z" p-id="2351" fill="#ffffff"></path></svg>
);
const Voice4Svg = () => (
    <svg t="1625651574836" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2545" width="32" height="32"><path d="M431.207929 106.919125c-14.536065-5.991458-30.570249-2.454912-41.684378 8.683776L198.703551 308.032562l-94.77862 0c-21.468964 0-38.633902 17.024745-38.633902 38.486546l0 331.002716c0 21.460778 17.164938 38.485523 38.633902 38.485523l94.77862 0 191.521988 192.429661c7.446599 7.467065 17.411555 11.530614 27.557636 11.530614 4.992711 0 8.626471-0.915859 13.424754-2.89391 14.545274-6.005784 22.63144-20.143783 22.63144-35.874045L453.839369 142.839219C453.838346 127.108956 445.753203 112.924909 431.207929 106.919125zM376.128473 787.108708 241.016239 649.917116c-7.299243-7.320733-15.827477-11.618619-26.163893-11.618619l-71.852468 0L142.999878 385.742435l71.852468 0c10.336416 0 18.86465-4.297886 26.163893-11.618619l135.112234-137.191592L376.128473 787.108708zM581.9 676.526147c-7.67889 8.590656-18.318204 12.96529-29.000498 12.96529-9.221012 0-18.47477-3.25923-25.891693-9.886161-16.011672-14.302751-17.388019-38.870286-3.080152-54.870702 97.04729-108.533902 10.117428-213.893508-0.113587-225.548966-14.113439-16.081257-12.632715-40.605813 3.388167-54.78986 16.020882-14.189164 40.431851-12.817933 54.697763 3.1262C632.777761 404.416749 698.252984 546.403554 581.9 676.526147zM699.338712 780.485871c-7.677866 8.591679-18.318204 12.96529-29.000498 12.96529-9.219989 0-18.478863-3.25923-25.891693-9.885138-16.010649-14.302751-17.388019-38.871309-3.079128-54.871725 191.540408-214.210733 7.91118-424.49811 0-433.345616-14.307867-16.000416-12.93152-40.568974 3.079128-54.871725 15.997346-14.302751 40.575114-12.927427 54.892191 3.079128C701.739389 246.240217 936.651606 515.090385 699.338712 780.485871zM821.955354 858.351286c-7.67889 8.590656-18.318204 12.96529-29.000498 12.96529-9.221012 0-18.47477-3.25923-25.891693-9.886161-16.011672-14.302751-17.388019-38.870286-3.080152-54.870702 109.224634-122.153084 142.595672-257.939677 99.177813-403.597081-32.952506-110.559025-98.518804-184.728258-99.177813-185.468109-14.307867-16.000416-12.93152-40.564881 3.080152-54.871725 15.992229-14.306844 40.568974-12.930497 54.892191 3.079128C825.049832 169.162748 1128.098893 515.981684 821.955354 858.351286z" p-id="2546" fill="#ffffff"></path></svg>
);

const ListIcon = props => <Icon component={ListSvg} {...props} />;
const LoopIcon = props => <Icon component={LoopSvg} {...props} />;
const Voice1Icon = props => <Icon component={Voice1Svg} {...props} />;
const Voice2Icon = props => <Icon component={Voice2Svg} {...props} />;
const Voice3Icon = props => <Icon component={Voice3Svg} {...props} />;
const Voice4Icon = props => <Icon component={Voice4Svg} {...props} />;


export default function PlayBar() {
    const { playSongList, playSong } = useContext(SongContext);


    const [detail, setDetail] = useState([]);
    const [urls, seturls] = useState(['']);
    const [songDetail, setSongDetail] = useState([]); //单曲详细img，歌手信息
    const [songUrl, setSongUrl] = useState([]); //单曲url，时长信息

    //获取传回来的所有的歌曲详细信息
    useEffect(() => {
        let ids = [];
        playSongList.forEach(x => {
            ids.push(x.id)
        })
        console.log(ids);
        //只能一个个拿url
        playSongList.length !== 0 && defaultGet(`/song/url?id=${ids.slice(1, 10).toString()}&realIP=61.158.148.71`)
            .then(res => {
                // console.log(res.data);
                setDetail(res.data)
                //  播放
                let urls = [];
                res.data.forEach(e => {
                    urls.push(e.url)
                });
                console.log(urls);
                seturls(urls)

                // const sound = new Howl({
                //     src: urls,
                //     autoplay: true,
                //     volume: 0.5,
                // });
                // sound.play()
            })
    }, [playSongList]);
    //根据双击的歌曲id拿详细信息
    useEffect(() => {
        playSong.length !== 0 && defaultGet(`/song/detail?ids=${playSong}`)
            .then(res => {
                console.log(res.songs[0]);
                setSongDetail(res.songs[0])
            })
    }, [playSong]);

    //根据双击的单曲id拿url
    useEffect(() => {
        console.log(playSong);
        playSong.length !== 0 && defaultGet(`/song/url?id=${playSong}&realIP=61.158.152.204`)
            .then(res => {
                console.log(res.data[0]);
                setSongUrl(res.data[0])
                
            })
    }, [playSong]);




    // 控制播放
    useEffect(() => {
       
        const sound = new Howl({
            src: [songUrl.url],
            autoplay: true,
        });
        // sound.play()
        return () => {
            sound.stop()
        };
    }, [songUrl]);



    return (
        <div style={{ position: 'sticky', textAlign: 'center', bottom: 0, left: 0, opacity: 0.95, backgroundColor: '#222326' }}>
            <div style={{ display: "flex" }}>
                <Col span={4} offset={1}>
                    <div style={{ width: 300 }}>
                        <Avatar shape="square" size={60} src={songDetail.length === 0 ? '/' : songDetail.al.picUrl} />
                        <Space direction="vertical" style={{ paddingLeft: '10px' }}>
                            <Title level={4} style={{ float: "left" }}>{songDetail.length === 0 ?'无': songDetail.name}</Title>
                            {songDetail.length === 0 ? '暂无':songDetail.ar.map((ar, index) => {
                                return (<Text type="secondary" style={{float:'left'}} key={index}>{ar.name}</Text>
                                )
                            })}
                        </Space>
                    </div>
                </Col>
                <Col span={11}>


                    <div style={{ padding: '10px 20px 5px 10px' }} >
                        <StepBackwardFilled className='myicon' style={{ fontSize: "32px", padding: "5px", margin: '5px' }} />
                        <CaretRightOutlined className='myicon' style={{ fontSize: "32px", padding: "5px", margin: '5px' }} />
                        {/* <PauseOutlined className='myicon' style={{ fontSize: "32px", padding: "5px", margin: '5px' }} /> */}

                        <StepForwardFilled className='myicon' style={{ fontSize: "32px", padding: "5px", margin: '5px' }} />



                    </div>

                </Col>
                <Col span={7}>
                    <div style={{ padding: '10px 20px 5px 10px' }}>
                        <ListIcon className='myicon' style={{ padding: "5px", margin: '10px ' }} />
                        <LoopIcon className='myicon' style={{ padding: "5px", margin: '10px ' }} />
                        <Voice1Icon className='myicon' style={{ padding: "5px", margin: '10px ' }} />
                    </div>
                </Col>
            </div>
        </div>


    );
}