import {useRef, useState} from 'react'
import * as M from '@material-ui/core'
import $ from 'jquery'
import Admin from './Admin'

export default function AdminCheck(){
    const [login, setLogin] = useState('')
    const [loginError, setLoginError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    function check(e){
        e.preventDefault()
        if($('.adminCheckSend').css('opacity') == 1){
            $('.adminCheckSend').css({
                opacity: '0.7'
            })
            $.ajax({
                url: '/adminCheck',
                method: 'get',
                data: {
                    login: login,
                    password: password
                },
                success: (docs)=>{
                    console.log(docs)
                    localStorage.setItem('t', docs)
                    window.location = '/admin/new_post'
                },
                error: (docs)=>{
                    const status = docs.status
                    const res = docs.responseText
    
                    if(status == 405) setLoginError(res)
    
                    else if(status == 406) setPasswordError(res)

                    $('.adminCheckSend').css({
                        opacity: '1'
                    })
                }
            })
        }
    }
    function notErrorLogin(e){
        setLoginError('')
        setLogin(e.target.value)
    }
    function notErrorPassword(e){
        setPasswordError('')
        setPassword(e.target.value)
    }
    if(localStorage.getItem('t') != undefined){
       return(
        <div>
            <Admin/>
        </div>
       )
    }
    else{
        return(
            <form className='adminCheck' onSubmit={check}>
                <div>
                    <M.TextField id="standard-basic" label="Login" className='adminCheckLogin' error={loginError != ''} helperText={loginError} onChange={notErrorLogin}/>
                    <M.TextField id="standard-basic" label="Password" className='adminCheckPaassword' type='password' error={passwordError != ''} helperText={passwordError} onChange={notErrorPassword}/>
                </div>
                <input type='submit' value='Sign in' className='adminCheckSend'/>
            </form>
        )
    }
}