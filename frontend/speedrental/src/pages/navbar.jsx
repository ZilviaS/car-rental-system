import { useEffect, useState } from 'react'

import { jwtDecode } from "jwt-decode"
import { Navigate, useNavigate } from 'react-router-dom'
import signOutLogo from '../assets/logout.svg'
import searchLogo from '../assets/search.svg'
import carsLogo from '../assets/car.svg'
import locationLogo from '../assets/location.svg'
import contactLogo from '../assets/contact.svg'

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
            <section className='bg-white flex justify-between items-center max-h-13'>
                <div className='flex items-center'>
                    <a href="/"><img className='sm:max-h-10 max-h-7 rounded-full mx-3 ml-3' src="https://img.freepik.com/premium-vector/vector-car-logo-design-illus_714931-352.jpg" alt="" /></a>
                    <a href="/" className='text-gray-800 font-RobotoMono hidden sm:flex pl-2 font-bold hover:cursor-pointer'>SPEED-RENTAL</a>
                </div>
                
                <nav className='justify-center flex sm:gap-2 py-3 sm:mx-5 mx-1 items-center'>
                    <a className='sm:p-1 sm:block hidden p-0.5 hover:text-green-900 hover:underline font-RobotoMono text-xs sm:text-sm'  href="/">HOME</a>
                    <a className='sm:hidden px-1' href="/"><img className='h-6 mx-1' src={searchLogo} alt="" /></a>
                    <a className='sm:p-1 sm:block hidden p-0.5 hover:text-green-900 hover:underline font-RobotoMono text-xs sm:text-sm'  href="/search">CARS</a>
                    <a className='sm:hidden px-1' href="/search"><img className='h-6 mx-1' src={carsLogo} alt="" /></a>
                    <a className='sm:p-1 sm:block hidden p-0.5 hover:text-green-900 hover:underline font-RobotoMono text-xs sm:text-sm'  href="/location">LOCATION</a>
                    <a className='sm:hidden px-1' href="/location"><img className='h-6 mx-1' src={locationLogo} alt="" /></a>
                    <a className='sm:p-1 sm:block hidden p-0.5 hover:text-green-900 hover:underline font-RobotoMono text-xs sm:text-sm'  href="/contact">CONTACT</a>
                    <a className='sm:hidden px-1' href="/contact"><img className='h-6 mx-1 mr-2' src={contactLogo} alt="" /></a>
                    {user ? (user.role === 'admin' ? (
                        <>
                            <div className='flex items-center border-gray-400 border-l-2 sm:pl-4 pl-2 gap-1 sm:gap-2'>
                                <a className='font-RobotoMono text-green-500 text-sm hover:shadow' href='/manage '>{user.username}</a>
                                <button onClick={handleLogout}><img className='sm:w-5 w-4 pt-0.5 text-red-500 hover:cursor-pointer' src={signOutLogo} alt="" /></button>
                                {/* <button className='text-red-500 hover:cursor-pointer hover:underline font-RobotoMono text-xs sm:text-sm' onClick={handleLogout}>Sign-Out</button> */}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex items-center border-gray-400 border-l-2 pl-4 sm:gap-3 gap-1'>
                                <a className='font-RobotoMono sm:mr-0 mr-3 text-sm hover:shadow' href='/manage '>{user.username}</a>
                                <button onClick={handleLogout}><img className='sm:w-5 w-4 pt-0.5 text-red-500 hover:cursor-pointer' src={signOutLogo} alt="" /></button>
                            </div>
                        </>
                    )) : (
                        <>
                            <div className='flex items-center border-gray-400 border-l-2 sm:pl-2 pl-1 pr-1 gap-2'>
                                <a className='font-RobotoMono text-xs sm:text-sm hover:cursor-pointer' href="/login">Sign-in</a>
                                <a className='font-RobotoMono text-xs sm:text-sm sm:p-2 rounded sm:bg-yellow-400' href="/register">Sign-up</a>
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