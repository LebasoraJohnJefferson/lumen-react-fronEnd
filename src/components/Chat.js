import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router'
import '../css/chat.css'
import { Link } from 'react-router-dom'
import {DB} from './db'
import Login from './Login'

const Data=()=> {
    const URL = DB();
    const [messagesApi,setMessagesApi] = useState([])
    const [text,setText]=useState('')
    const location = useLocation()
    const [{user_id,name}] = location.state.details;
    
    useEffect(()=>{
        let URL = DB()
        return axios.get(`${URL}/messages`)
        .then((res)=>{
            setMessagesApi(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[messagesApi])
    
    const handleMessages=(e)=>{
        setText(e.target.value);
    }
    
    const sendMessage =(e)=>{
        e.preventDefault();
        if(text.trim()){
            axios.post(`${URL}/messages/create?messages=${text}&user_id=${user_id}`)
            .then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }
        setText('')
    }

    return (
        <div className='CHAT-CHAT-container'>
            <div className='chat-header'>
                <div>{name}</div>
                <Link className='out' to='/'>LOGOUT</Link>
            </div>
            <div className='messages-container'>
                {messagesApi.map((msg)=>{
                    const {message_id,messages} = msg;
                    return <div className={msg.user_id===user_id ? 'owner' : 'others'} key={message_id}>
                        <p id='name'>{msg.name}</p>
                        <p id='message'>{messages}</p>
                    </div>
                })}
            </div>
            <form className='submitting'>
                <input value={text} onChange={handleMessages} className='messageContent' type='text' placeholder='Send Messages...'/>
                <button type='submit' onClick={sendMessage}>
                    <i id='send' className="fal fa-paper-plane"></i>
                    </button>
            </form>
        </div>
    )
}
// if data data does`nt exist, then redirect to login
const Chat = ()=>{  
    const location = useLocation()  
    return <>
        { location.state!==undefined ? <Data /> : <Login />}
    </>
}

export default Chat
