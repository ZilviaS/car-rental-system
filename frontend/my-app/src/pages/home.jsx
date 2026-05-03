import { useState } from 'react'
import Navbar from './navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import bg from '../assets/background.jpg'
import '../App.css'

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

    return(
        <>
            <div className='bg-gray-300 min-h-screen'>
                <Navbar />
                <div className='relative w-full h-200 object-cover'>
                    <img className="w-full h-full" src={bg} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center z-10'>
                        <div className="absolute inset-0 bg-black/30 z-0"></div>
                        <div className='bg-white/80 backdrop-blur-md p-6 rounded-md shadow-lg'>
                            <div className='flex gap-3'>
                                <div>
                                    <h1 className='text-gray-500 font-RobotoMono text-sm'>start date</h1>
                                    <input onChange={(e)=>{setForm({...form,startDate: e.target.value})}} type="date" name='startDate' className="px-4 py-2 rounded-md border" required/>
                                </div>
                                <div>
                                    <h1 className='text-gray-500 font-RobotoMono text-sm'>end date</h1>
                                    <input onChange={(e)=>{setForm({...form,endDate: e.target.value})}}  type="date" name='endDate' className="px-4 py-2 rounded-md border" required/>
                                </div>
                                <div>
                                    <h1 className='text-gray-500 font-RobotoMono text-sm'>brand</h1>
                                    <select onChange={(e)=>{setForm({...form, brand: e.target.value})}} className=' font-RobotoMono border rounded-md px-3 py-2' name="brand" id="cars" required>
                                        <option value="">ประเภทรถ</option>
                                        <option value="Abarth">Abarth</option>
                                        <option value="Bentley">Bentley</option>
                                        <option value="Ford">Ford</option>
                                        <option value="Honda">Honda</option>
                                        <option value="Jaguar">Jaguar</option>
                                        <option value="Mercedes">Mercedes Benz</option>
                                        <option value="Nissan">Nissan</option>
                                        <option value="Rolls">Rolls Royce</option>
                                    </select>
                                </div>
                                <div>
                                    <h1 className='text-gray-500 font-RobotoMono text-sm'>model</h1>
                                    <input type="text" name='carname' className='border rounded-md px-4 py-2' onChange={(e)=>setForm({...form, carname: e.target.value})} required/>
                                </div>
                                <div className='flex items-end'>
                                    <div>
                                        <button type='button' onClick={searchHandle} className="font-RobotoMono bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500 hover:cursor-pointer">
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
                <footer className='bg-gray-200 '>
                    <h1 className='ml-3 font-bold text-gray-600'>Contact</h1>
                    <div className='w-full flex justify-center bg-gray-300'>
                        <h1 className='text-gray-900 mx-3'>บริษัท ไม่ได้ตั้งชื่อ ไม่จำกัด</h1>
                        <h1 className='text-gray-900 mx-3'>เลขประจำตัวกำกับภาษี: 228267</h1>
                        <h1 className='text-gray-900 mx-3'>Tel: 000-000-0000</h1>
                        <h1 className='text-gray-900 mx-3'>Line: @company_noname</h1>
                        <h1 className='text-gray-900 mx-3'>Email: somecompany@gmail.com</h1>
                    </div>

                </footer>
            </div>
        </>
    )
}

export default Home