import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { defaultGet } from '../../api';


import './library.css'

export default function Library() {

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        defaultGet
    }, []);

    return (
         <div>
             此功能需要登录但是作者比较懒所以还没有做好登录
         </div>
     );
}