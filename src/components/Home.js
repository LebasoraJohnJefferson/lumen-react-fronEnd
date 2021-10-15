import React from 'react'
import '../css/home.css'
import { Link } from 'react-router-dom'

const Home=()=> {
    return (
        <div className='home-container'>
            <div className='content-container'>
                <i id='logo' className="far fa-comments"></i>
                <div className='selector'>
                    <Link to='/Login' className='login'>LOGIN</Link>
                    <Link to='/Register' className='register'>REGISTER</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
