import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { defaultGet } from '../../api';


import './library.css'

export default function Library() {

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        defaultGet(`/user/account`).then(res => {
            console.log(res.profile);
            setUserInfo(res.profile);
            localStorage.setItem('musicUser',JSON.stringify(res.profile))

        })
    }, []);

    return (
        <>
            <div style={{display:'flex'}}>
                <img style={{marginRight:'12px',borderRadius:'50%', height:44,alignItems:'center',marginTop:'12px'}} src={`${userInfo.avatarUrl}?param=512y512`}></img>
                <span style={{ fontSize: 42, fontWeight: 'bold', color: '#ffffff' }}>{userInfo.nickname}的音乐库</span>
            </div>

            <div>

            </div>
        </>
    );
}