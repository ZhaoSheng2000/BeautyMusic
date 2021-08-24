import React, { useState, useEffect, createContext } from 'react';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import './index.less'
import { Layout, Menu, Input } from 'antd';


import Home from '../Home/HomeHook';
import Explore from '../Explore/Explore';
import Library from '../Library/Library';
import SongListDetail from '../SongListDetali/SongListDetail';
import PlayBar from '../components/PlayBar/PlayBar';
import artistDetail from '../artistDetail/artistDetail';
import albumDetail from '../albumDetail/albumDetail';
import newAlbum from '../newAlbum/newAlbum';
import AuthRoute from '../components/AuthRoute/AuthRoute';
import Login from '../Login/login';

const { Header, Content } = Layout;
const { Search } = Input;




export const SongContext = createContext(null);
export default function Index() {
    const [current, setCurrent] = useState('0');
    const [search, setSearch] = useState([]);
    const history = useHistory();

    //从子组件传回来的
    const [playSongList, setPlaySongList] = useState([]);
    const [playSong, setPlaySong] = useState([]);


    useEffect(() => {
        if (search) {
            console.log(search);
        }

    }, [search]);


    function back() {
        history.go(-1)
    }
    return (
        <div className="container">
            <SongContext.Provider value={{
                playSongList,
                setPlaySongList,
                playSong,
                setPlaySong
            }}>
                <Header style={{ backgroundColor: "#222222", position: 'fixed', zIndex: 1, width: '100%' }}>
                    <span style={{ float: 'left', height: 64, width: 64, paddingTop: 10 }}>
                        <LeftOutlined className='myspan' style={{ padding: '10px', fontSize: 26 }}
                            onClick={back}
                        />
                    </span>
                    <Menu onClick={(e) => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal" style={{ textAlign: 'center', paddingLeft: "200px" }} >
                        <Menu.Item key='0'>
                            <Link to='/'><span style={{ fontWeight: 700, fontSize: 18 }}>首页</span></Link>
                        </Menu.Item>
                        <Menu.Item key='1'>
                            <Link to='/explore?tab=全部'><span style={{ fontWeight: 700, fontSize: 18 }}>发现</span> </Link>
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <Link to="/library"><span style={{ fontWeight: 700, fontSize: 18 }}>音乐库</span></Link>
                        </Menu.Item>
                        <span >
                            <span style={{float:'right',fontSize:26,padding:'0 20px'}}>
                            <UserOutlined  />
                            </span>
                            <span>
                                <Search placeholder="搜索" onSearch={(value) => setSearch(value)} style={{ width: 200, float: 'right', paddingTop: '20px' }} />
                            </span>
                        </span>

                    </Menu>
                </Header>

                <Content style={{ padding: '100px 120px' }}>
                    <Switch>
                        <Route path='/explore' component={Explore} />
                        <Route path='/songlistdetail/:id' component={SongListDetail} />
                        <Route path='/artist/:id' component={artistDetail} />
                        <Route path='/newalbum' component={newAlbum} />
                        <Route path='/album/:id' component={albumDetail} />
                        {/* 需要登录的页面 */}
                        <AuthRoute path='/library' component={Library} />
                        <Route path='/login' component={Login} />


                        <Route path='/' component={Home} />

                    </Switch>
                </Content>
                <PlayBar />
            </SongContext.Provider>

        </div>

    );
};
