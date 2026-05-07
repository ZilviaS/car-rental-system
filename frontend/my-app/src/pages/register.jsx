import {useEffect, useState} from "react";
import bg from '../assets/background_crop.jpg'
import Navbar from './navbar'
import '../App.css'

function register(){

    const [showPassword, setShowPassword] = useState(false)
    const [showCheckPassword, setCheckPassword] = useState(false)
    const [registerForm, setForm] = useState({
        username : String,
        email : String,
        password : String,
        confirmPassword : String
    })
    const registerHandle = async ()=>{
        console.log(registerForm)
        if (registerForm.password == registerForm.confirmPassword){
            try{
                const res = await fetch(`/api/auth/register`,{
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        username: registerForm.username,
                        email: registerForm.email,
                        password: registerForm.password
                })
            })
            const data = await res.json()
            console.log(data)
            }catch(err){
                console.log(err)
            }
        }
    }

    return(
        <>  
            <div className='h-screen bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                <Navbar></Navbar>
                <div className='flex justify-center'>
                    <div className='bg-white mt-15 w-120 py-5'>
                        <div className='flex justify-center'>
                            <h1 className='font-RobotoMono text-2xl'>Sign-Up</h1>
                        </div>
                        <div className='flex justify-center'>
                            <form action="" className='w-80'>
                                <h1 className='py-2'>Username</h1>
                                <input className='border-gray-400 border-1 rounded-md p-2 w-full' type="text" onChange={(e)=>setForm({...registerForm, username : e.target.value})}/>
                                <h1 className='py-2'>Email</h1>
                                <input className='border-gray-400 border-1 rounded-md p-2 w-full' type="text" onChange={(e)=>setForm({...registerForm, email : e.target.value})}/>
                                <h1 className='py-2'>Password</h1>
                                <div className='flex'>
                                    <input className='border-gray-400 border-1 rounded-md p-2 w-full' type={showPassword ? "text" : "password"} onChange={(e)=>setForm({...registerForm, password : e.target.value})}/>
                                    <button type="button" onClick={()=> {setShowPassword(!showPassword)}} id='toggle-btn' className='pl-3 hover:cursor-pointer'>
                                        <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                            <path fillRule="evenodd" clipRule="evenodd" d={ showPassword ? "M8 2c-1.5 0-2.8.4-3.9 1.2l.8.7C5.8 3.3 6.8 3 8 3c3.3 0 6 2.7 6 6h1c0-3.9-3.1-7-7-7zM1 3l1.6 1.5C1.6 5.7 1 7.3 1 9h1c0-1.5.5-2.8 1.4-3.8l2.2 2C5.2 7.7 5 8.3 5 9c0 1.7 1.3 3 3 3 .8 0 1.5-.3 2-.8l3 2.8.7-.7-12-11L1 3zm5.3 4.9l2.9 2.7c-.3.2-.7.4-1.2.4-1.1 0-2-.9-2-2 0-.4.1-.8.3-1.1zM11 9.5l-1-.9c-.2-.8-.9-1.5-1.8-1.6l-1-.9c.3-.1.5-.1.8-.1 1.7 0 3 1.3 3 3v.5z" : "M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"}/>
                                        </svg>
                                    </button>
                                </div>
                                
                                <h1 className='py-2'>confirm password</h1>
                                <div className='flex'>
                                    <input className='border-gray-400 border-1 rounded-md p-2 w-full' type={showCheckPassword ? "text" : "password"} onChange={(e)=>setForm({...registerForm, confirmPassword : e.target.value})} />
                                    <button type="button" onClick={()=> {setCheckPassword(!showCheckPassword)}} id='toggle-btn' className='pl-3 hover:cursor-pointer'>
                                        <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                            <path fillRule="evenodd" clipRule="evenodd" d={ showCheckPassword ? "M8 2c-1.5 0-2.8.4-3.9 1.2l.8.7C5.8 3.3 6.8 3 8 3c3.3 0 6 2.7 6 6h1c0-3.9-3.1-7-7-7zM1 3l1.6 1.5C1.6 5.7 1 7.3 1 9h1c0-1.5.5-2.8 1.4-3.8l2.2 2C5.2 7.7 5 8.3 5 9c0 1.7 1.3 3 3 3 .8 0 1.5-.3 2-.8l3 2.8.7-.7-12-11L1 3zm5.3 4.9l2.9 2.7c-.3.2-.7.4-1.2.4-1.1 0-2-.9-2-2 0-.4.1-.8.3-1.1zM11 9.5l-1-.9c-.2-.8-.9-1.5-1.8-1.6l-1-.9c.3-.1.5-.1.8-.1 1.7 0 3 1.3 3 3v.5z" : "M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"}/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex justify-center pt-5">
                                    <button onClick={registerHandle} type="button" className="bg-green-600 text-white w-full rounded-md py-2 hover:cursor-pointer">ยืนยัน</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default register