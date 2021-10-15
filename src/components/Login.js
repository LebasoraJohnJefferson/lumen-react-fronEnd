import React,{useState} from 'react'
import axios from 'axios'
import '../css/form.css'
import Header from './Header';
import { useHistory } from 'react-router';
import {DB} from './db'

const Login=()=> {
    const URL = DB();
    const [user,setUser]= useState({email:'',password:''})
    const [notify,setNotify] = useState('')
    let history = useHistory();

    const handleInput=(e)=>{
        const name = e.target.name
        const value=e.target.value
        setUser({...user,[name]:value})
    }

    const notifyTimeOut=()=>{
        let count=0
        const time = setInterval(()=>{
            if(count===7){
                setNotify('')
                clearInterval(time)
            }
            count+=1;
        },500)
    }


    const onSubmit=(e)=>{
        e.preventDefault();
        if(user.email && user.password){
            axios.post(`${URL}/accounts/login?email=${user.email}&password=${user.password}`).then((res)=>{
                if(res.status===200){
                    if(res.data.length!==0){
                        let count =0;
                        setNotify('Successfully Login')
                        const time = setInterval(()=>{
                            if(count===4){
                                clearInterval(time)
                                history.push(
                                    {pathname:'/Chat',
                                    state:{details:res.data}
                                    })
                            }
                            count+=1
                        },1000)

                    }else{
                        setNotify('Invalid Email or Password')
                    }
                }
            })
            .catch((err)=>{
                try{
                    if(err.response.status===500){
                        setNotify('Server Down')
                    }else if(err.response.status===422){
                        setNotify('Invalid Input')
                    }
                }catch(e){
                    setNotify('Connection Error')
                } 
            })
        }else{
            setNotify('Empty Input')
        }
        setUser({email:'',password:''})
        notifyTimeOut();
    }

    return (
        <div>
            <Header />
            <div className='form-container'>
                <form>
                    <div className='container-input'>
                        <input className='email' type='email' name='email' value={user.email} onChange={handleInput} />
                        <label htmlFor='email' className='email-label'>Email:</label>
                    </div>
                    <div className='container-input'>
                        <input className='password' type='password' name='password' value={user.password} onChange={handleInput} />
                        <label htmlFor='password' className='password-label'>Password:</label>
                    </div>
                    <input type='submit' onClick={onSubmit} value='LOGIN' />
                </form>
                <div className='notify'>{notify}</div>
            </div>
        </div>
    )
}

export default Login

