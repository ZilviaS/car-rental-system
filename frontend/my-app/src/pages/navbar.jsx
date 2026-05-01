import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode"
import { Navigate, useNavigate } from 'react-router-dom'

import '../App.css'

function Navbar(){
    const [user, setUser] = useState(null) 

    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (!token){
            setUser(null)
        }else{
            try{
                const decode = jwtDecode(token)

                setUser(decode)
                
            }catch{
                setUser(null)
            }
        }
    }, [])

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        window.location.reload()
    }

    return(
        <>
            <section className='bg-white flex justify-between items-center'>
                <a href="/"><img className='max-h-10 rounded-full m-3' src="https://img.freepik.com/premium-vector/vector-car-logo-design-illus_714931-352.jpg" alt="" /></a>
                <nav className='justify-center flex gap-2 py-3 mx-5 items-center'>
                    <a className='p-2 hover:text-green-900 hover:underline font-RobotoMono text-sm'  href="/">search</a>
                    <a className='p-2 hover:text-green-900 hover:underline font-RobotoMono text-sm'  href="/search">cars</a>
                    <a className='p-2 hover:text-green-900 hover:underline font-RobotoMono text-sm'  href="">location</a>
                    <a className='p-2 hover:text-green-900 hover:underline font-RobotoMono text-sm'  href="">service</a>
                    <a className='p-2 hover:text-green-900 hover:underline font-RobotoMono text-sm'  href="">contact</a>
                    {user ? (user.role === 'admin' ? (
                        <>
                            <div className='flex items-center border-l pl-4 gap-3'>
                                <a className='font-RobotoMono text-green-500 text-sm hover:shadow' href='/manage '>{user.username}</a>
                                <button className='text-red-500 hover:cursor-pointer hover:underline font-RobotoMono text-sm' onClick={handleLogout}>Sign-Out</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex items-center border-l pl-4 gap-3'>
                                <a className='font-RobotoMono text-sm hover:shadow' href='/manage '>{user.username}</a>
                                <button className='text-red-500 hover:cursor-pointer hover:underline font-RobotoMono text-sm' onClick={handleLogout}>Sign-Out</button>
                            </div>
                        </>
                    )) : (
                        <>
                            <div className='flex items-center border-l pl-2 gap-2'>
                                <a className='font-RobotoMono text-sm p-2 hover:text-green-900 hover:underline' href="/login">Sign-in</a>
                                <a className='font-RobotoMono text-sm p-2 rounded bg-yellow-400' href="/register">Sign-up</a>
                            </div>
                        </>
                    )
                    }
                </nav>
            </section>
            <hr className="text-gray-300" />
        </>
    )
}

export default Navbar