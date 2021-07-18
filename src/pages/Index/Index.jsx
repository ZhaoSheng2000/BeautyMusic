import React, { useState, useEffect, createContext } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import './index.less'
import { Layout, Menu, Input } from 'antd';


import Home from '../Home/HomeHook';
import Explore from '../Explore/Explore';
import Library from '../Library/Library';
import SongListDetail from '../SongListDetali/SongListDetail';
import PlayBar from '../components/PlayBar/PlayBar';


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
        if (current) {
            console.log(current)
        }
    }, [current]);
    useEffect(() => {
        if (search) {
            console.log(search);
        }

    }, [search]);


    function back() {
        history.go(-1)
    }
    return (
        <div style={{ backgroundColor: '#141414', minHeight:window.innerHeight}}>
            <SongContext.Provider value={{
                playSongList,
                setPlaySongList,
                playSong,
                setPlaySong
            }}>

                <Header style={{ backgroundColor: "#141414", position: 'fixed', zIndex: 1, width: '100%' }}>
                    <span style={{ float: 'left', height: 64, width: 64, paddingTop: 10 }}>
                        <LeftOutlined className='myspan' style={{ padding: '10px', fontSize: 26 }}
                            onClick={back}
                        />
                    </span>
                    <Menu onClick={(e) => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal" style={{ textAlign: 'center' }} >

                        <Menu.Item key='0'>
                            <Link to='/'>首页</Link>
                        </Menu.Item>
                        <Menu.Item key='1'>
                            <Link to='/explore'>发现</Link>
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <Link to="/library">音乐库</Link>
                        </Menu.Item>
                        <span>
                            <Search placeholder="搜索" onSearch={(value) => setSearch(value)} style={{ width: 200, float: 'right', paddingTop: '20px' }} />
                        </span>
                    </Menu>

                </Header>

                <Content style={{ padding: '100px 50px' }}>
                    <Switch>
                        <Route path='/explore' component={Explore} />
                        <Route path='/library' component={Library} />
                        <Route path='/songlistdetail/:id' component={SongListDetail} />
                        <Route path='/' component={Home} />

                    </Switch>
                </Content>
                <PlayBar />
            </SongContext.Provider>

        </div>

    );
};
