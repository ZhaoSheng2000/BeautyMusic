import React from 'react'
import {Form, Input, Button, Card,message} from 'antd';
import {PhoneOutlined, LockOutlined} from '@ant-design/icons';

import { reqPhoneLogin } from '../../api/index'

const { ipcRenderer } = window.require('electron');


export default class Login extends React.Component {
    state = {
        type:"手机号",
        loading: false
    };
    onFinish = (e) => {
        console.log(e)
        this.setState({
            loading: true
        })
        //登录
        reqPhoneLogin({
            phone: e.phone,
            password: e.password
        }).then(res =>{
            this.setState({
                loading: false
            })
            console.log(res)
            let data = res.data
            if(data.code ===400){
                message.error('账号或密码错误');
            }else{
                const profile = JSON.stringify(data.profile)
                localStorage.setItem('profile',profile)
                //告诉主进程登录成功-》关闭登录窗口
                ipcRenderer.send('login-message', 'loginSuccess')   
            }
        })

    };
    render() {
        return (
            <div style={{
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: window.innerHeight,
                // backgroundImage: "url(" + require("./loginbg2.jpg") + ")",
                backgroundImage: "url(https://p1.music.126.net/Oq3EQRMgwK2AYvp3hlXlpQ==/109951165418425655)",
                // backgroundColor: '#161616'
            }}
            >
                <Card
                    title={this.state.type+'登录'}
                    style={{
                        width: 380,
                    }}>
                    <Form
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name= 'phone'
                            rules={[{required: true,  message: '请输入您的'+this.state.type}]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="phone"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: '请输入您的密码'}]}
                        >
                            <Input
                                prefix={<LockOutlined/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={this.state.loading}>
                              {this.state.type}登录
                            </Button>
                            {/* <Button type="link" htmlType="button" onClick={this.changeModel}>
                                {
                                this.state.type == "手机号" ? "网易邮箱登录" : "手机号登录"
                                }
                            </Button> */}
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}