import React,{useState} from 'react'
import axios from 'axios'
import '../css/form.css'
import Header from './Header';
import {DB} from './db'

const Register=()=> {
    const URL = DB();
    const [user,setUser]= useState({name:'',email:'',password:''})
    const [notify,setNotify] = useState('')

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
            axios.post(`${URL}/accounts/create?name=${user.name}&email=${user.email}&password=${user.password}`).then((res)=>{
                if(res.status===200){
                    if(res.data.length!==0){
                        setNotify('successfully Register');
                        
                    }else{
                        setNotify('Invalid Email or Password')
                    }
                }
            })
            .catch((err)=>{
                try{
                    if(err.response.status===500){
                        setNotify('Email already Taken')
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
        setUser({name:'',email:'',password:''})
        notifyTimeOut();
    }

    return (
        <div>
            <Header />
            <div className='form-container'>
                <form>
                    <div className='container-input'>
                        <input className='name' type='text' name='name' value={user.name} onChange={handleInput} />
                        <label htmlFor='name' className='name-label'>Name:</label>
                    </div>
                    <div className='container-input'>
                        <input className='email' type="email" name='email' value={user.email} onChange={handleInput}/>
                        <label htmlFor='email' className='email-label'>Email:</label>
                    </div>
                    <div className='container-input'>
                        <input className='password' type='password' name='password' value={user.password} onChange={handleInput}/>
                        <label htmlFor='password' className='password-label'>Password:</label>
                    </div>
                    <input type='submit' onClick={onSubmit} value='REGISTER' />
                </form>
                <div className='notify'>{notify}</div>
            </div>
        </div>
    )
}

export default Register

