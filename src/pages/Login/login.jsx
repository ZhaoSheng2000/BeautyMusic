import { LockFilled } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { defaultGet } from '../../api';


export default function Login(props) {
    let history = useHistory();
    const [key, setKey] = useState('');
    const [qr, setQr] = useState('');
    const [code, setCode] = useState(0);
    const [message, setMessage] = useState('打开网易云音乐手机app扫码登录');

    useEffect(async () => {
        let res = await defaultGet(`/login/qr/key?timerstamp=${Date.now()}`)
        const key = res.data.unikey;
        setKey(key);
        let img = await defaultGet(`/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`)
        setQr(img.data.qrimg);
    }, []);


    const fetchData = useCallback(async () => {
        let status = await defaultGet(`/login/qr/check?key=${key}&timerstamp=${Date.now()}`)
        setCode(status.code);
        console.log(status);
        if (status.code === 800) {
            setMessage('二维码已过期，请刷新页面重新获取');

        }
        if (status.code === 803) {
            localStorage.setItem('musicId', status.cookie);

            setMessage('登录成功，正在跳转！')
            history.goBack();
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            fetchData();
        }, 3000);
        return () => clearInterval(timer)
    }, [fetchData]);


    return (
        <div style={{ minHeight: window.innerHeight }}>
            <div style={{ textAlign: 'center' }}>
                <img src='https://z3.ax1x.com/2021/08/23/hPeCeP.png' style={{ width: 64, height: 64 }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 700, margin: '48px auto' }}>登录网易云账号</div>
            <div style={{ textAlign: 'center' }}>
                <img style={{ width: 256, height: 256, borderRadius: '20px' }} src={qr} />
            </div>
            <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 700, margin: '24px 0 12px 0', opacity: '.68' }}>{message}</div>

        </div>
    );
}