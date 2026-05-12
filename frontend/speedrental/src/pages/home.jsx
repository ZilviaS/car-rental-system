import { useState } from 'react'
import Navbar from './navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import '../App.css'
import Footer from './footer'

import bg from '../assets/background_crop.jpg'
import AbarthLogo from '../assets/AbarthLogo.png'
import BentleyLogo from '../assets/BentleyLogo.png'
import FordLogo from '../assets/FordLogo.svg'
import HondaLogo from '../assets/HondaLogo.png'
import JaguarLogo from '../assets/JaguarLogo.webp'
import MazdaLogo from '../assets/MazdaLogo.png'
import MercedesBenzLogo from '../assets/BenzLogo.png'
import NissanLogo from '../assets/NissanLogo.svg'
import RollsRoyceLogo from '../assets/RollsRoyceLogo.png'

function Home(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        brand: '',
        carname: '',
        startDate: '',
        endDate: ''
    });

    const [dateCheck, setDateCheck] = useState(false)

    const searchHandle = ()=>{
        if((form.startDate != '' || form.endDate != '') && (form.startDate == '' || form.endDate == '')){
            setDateCheck(true)
        }else{
            navigate(`/search?data=${encodeURIComponent(JSON.stringify(form))}`)
        }
    }

    const handleLogoSearch = (brand) =>{
        const newForm = ({
            brand: brand,
            carname: '',
            startDate: '',
            endDate: ''
        })
        navigate(`/search?data=${encodeURIComponent(JSON.stringify(newForm))}`)
    }

    return(
        <>
            <div className=' bg-gray-300 min-h-screen'>
                <div className='relative w-full h-screen overflow-hidden'>
                    <img className="w-full h-full object-cover" src={bg} alt="" />
                    <div className='absolute top-0 left-0 w-full z-50'>
                        <Navbar />
                    </div>
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <div className="absolute inset-0 bg-black/30 z-0"></div>
                        <div className='z-10'>
                            <div className='flex w-full justify-center'>
                                <img className="rounded-full w-20" src='https://img.freepik.com/premium-vector/vector-car-logo-design-illus_714931-352.jpg' alt="" />
                            </div>
                            <div className='flex w-full justify-center'>
                                <p className='text-white text-5xl pl-2 font-bold ' style={{
                                    WebkitTextStroke: '0.5px black'
                                }}>Speed Rental</p>
                            </div>
                            <div className='bg-white/80 backdrop-blur-md p-6 rounded-md shadow-lg mt-5'>
                                <div className='grid lg:flex md:grid-cols-2 lg:flex-row flex-col lg:gap-3 gap-2'>
                                    <div className='w-full'>
                                        <h1 className='text-gray-500 font-RobotoMono text-sm'>start date</h1>
                                        <input onChange={(e)=>{setForm({...form,startDate: e.target.value})}} type="date" name='startDate' className="lg:w-auto w-full px-4 py-2 rounded-md border" required/>
                                    </div>
                                    <div className='w-full'>
                                        <h1 className='text-gray-500 font-RobotoMono text-sm'>end date</h1>
                                        <input onChange={(e)=>{setForm({...form,endDate: e.target.value})}}  type="date" name='endDate' className="lg:w-auto w-full px-4 py-2 rounded-md border" required/>
                                    </div>
                                    <div className='w-full'>
                                        <h1 className='text-gray-500 font-RobotoMono text-sm'>brand</h1>
                                        <select onChange={(e)=>{setForm({...form, brand: e.target.value})}} className=' lg:w-auto w-full font-RobotoMono border rounded-md px-3 py-2' name="brand" id="cars" required>
                                            <option value="">select brand</option>
                                            <option value="Abarth">Abarth</option>
                                            <option value="Bentley">Bentley</option>
                                            <option value="Ford">Ford</option>
                                            <option value="Honda">Honda</option>
                                            <option value="Jaguar">Jaguar</option>
                                            <option value="Mazda">Mazda</option>
                                            <option value="Mercedes">Mercedes Benz</option>
                                            <option value="Nissan">Nissan</option>
                                            <option value="Rolls">Rolls Royce</option>
                                        </select>
                                    </div>
                                    <div className='w-full'>
                                        <h1 className='text-gray-500 font-RobotoMono text-sm'>model</h1>
                                        <input type="text" name='carname' className='border rounded-md px-4 py-2 md:w-auto w-full' onChange={(e)=>setForm({...form, carname: e.target.value})} required/>
                                    </div>
                                    <div className='flex items-end'>
                                        <div>
                                            <button type='button' onClick={searchHandle} className="font-RobotoMono bg-yellow-400 px-4 py-2 rounded-md  hover:bg-yellow-500 hover:cursor-pointer">
                                                search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {dateCheck ? 
                                <h1 className='text-red-600'>ใส่ข้อมูลวันเริ่ม/สิ้นสุดการใช้รถให้ครบก่อนค้นหา</h1>
                                    : <></>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className='sm:my-10 my-5 w-full flex justify-center'>
                    <div className='sm:w-70 w-30 border-r-gray-400 border-r-1'>
                        <p className='flex justify-center font-RobotoMono md:text-6xl text-2xl text-gray-800'>10K+</p>
                        <p className='flex justify-center font-RobotoMono text-gray-500 mt-1 text-center sm:text-base text-sm'>Users</p>
                    </div>
                    <div className='sm:w-70 w-30 border-r-gray-400 border-r-1'>
                        <p className='flex justify-center font-RobotoMono md:text-6xl text-2xl text-gray-800'>150+</p>
                        <p className='flex justify-center font-RobotoMono text-gray-500 mt-1 text-center sm:text-base text-sm'>Cars Available</p>
                    </div>
                    <div className='sm:w-70 w-30 border-r-gray-400 border-r-1'>
                        <p className='flex justify-center font-RobotoMono md:text-6xl text-2xl text-gray-800'>5</p>
                        <p className='flex justify-center font-RobotoMono text-gray-500 mt-1 text-center sm:text-base text-sm'>Picked Up Location</p>
                    </div>
                    <div className='sm:w-70 w-30'>
                        <p className='flex justify-center font-RobotoMono md:text-6xl text-2xl text-gray-800'>฿2M+</p>
                        <p className='flex justify-center font-RobotoMono text-gray-500 mt-1 text-center sm:text-base text-sm'>Revenue Tracked</p>
                    </div>
                </div>
            </section>
            <div className='flex w-full justify-center font-RobotoMono text-gray-500 mb-1'>
                Our Car Brand Offer
            </div>
            <div className='bg-gray-100 overflow-hidden'>
                <div className='flex w-max py-4 animate-marquee md:gap-30 gap-10'>
                    <div className='flex items-center md:gap-30 gap-10'>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('abarth')} className='h-13 object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={AbarthLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('bentley')} className='h-13 object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={BentleyLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('ford')} className='h-10 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={FordLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('honda')} className='h-9 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={HondaLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('jaguar')} className='h-10 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={JaguarLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('mazda')} className='h-12 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={MazdaLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('mercedes benz')} className='h-14 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={MercedesBenzLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('nissan')} className='h-12 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={NissanLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('rolls')} className='h-10 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={RollsRoyceLogo} alt="" />
                        </div>
                    </div>
                    <div className='flex items-center md:gap-30 gap-10'>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('abarth')} className='h-13 object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={AbarthLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('bentley')} className='h-13 object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={BentleyLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('ford')} className='h-10 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={FordLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('honda')} className='h-10 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={HondaLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('jaguar')} className='h-10 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={JaguarLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('mazda')} className='h-12 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={MazdaLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('mercedes benz')} className='h-13 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={MercedesBenzLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('nissan')} className='h-12 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={NissanLogo} alt="" />
                        </div>
                        <div className=''>
                            <img onClick={()=>handleLogoSearch('rolls')} className='h-10 object-cover  grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300' src={RollsRoyceLogo} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Home