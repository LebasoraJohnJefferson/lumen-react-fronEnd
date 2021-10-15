import React from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'

const Header=()=>{



    return (
        <div className='header-container'>
            <Link className='header-link' to='/'>Home</Link>
        </div>
    )
}

export default Header
