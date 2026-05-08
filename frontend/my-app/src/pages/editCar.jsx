import '../App.jsx'
import Navbar from './navbar.jsx'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import placeholderImage from '../assets/placeholder.jpg'
import bg from '../assets/background_crop.jpg'

function EditCar(){

    const { id } = useParams()
    const [carInfo, setCarInfo] = useState({
        brand: '',
        model: '',
        trim: '',
        year: '',
        plate: '',
        status: false,
        image_url: ''
    })

    const navigate = useNavigate()

    const [imageURL , setImageURL] = useState('')

    useEffect(()=>{
        const fetchCar = async ()=>{
            try{
                const res = await fetch(`/api/car/${id}`)
                const data = await res.json()
                setCarInfo(data)
                setImageURL(data.image_url || '')
            }catch(err){
                console.log(err)
            }
        }
        fetchCar()
    },[id])

    const handleUpdateCar = async ()=>{
        const token = localStorage.getItem('token')
        try{
            console.log(carInfo)
            const res = await fetch(`/api/car/update`,{
                method : 'POST',
                headers : {
                    'Authorization' : `Bearer ${token}`,
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(carInfo)
            })

            if(res.ok){
                navigate(`/manage`)
            }
        }catch(err){
            alert(err)
        }
    }

    return(
        <>  
            <div className='relative min-h-screen'>
                <img className="absolute w-full h-full object-cover" src={bg} alt="" />
                <div className='relative z-10'>
                    <div className='absolute top-0 left-0 w-full z-20'>
                        <Navbar></Navbar>
                    </div>
                     <div className='min-h-screen flex flex-col justify-center'>
                        <div className='flex w-full justify-center'>
                            <div className='bg-white shadow rounded w-[50%]'>
                                <div className='w-full bg-amber-200 rounded-t'>
                                    <p className='font-RobotoMono py-2 pl-3'>EDIT</p>
                                </div>
                                <div className='flex justify-between px-3 mt-2'>
                                    <div className='w-[40%]'>
                                        <p className='font-RobotoMono text-gray-500 text-sm'>brand</p>
                                        <input onChange={(e)=>{setCarInfo({...carInfo, brand: e.target.value})}} className='bg-gray-100 rounded border-gray-400 border-1 w-full px-2' type="text" value={carInfo.brand} />
                                        <p className='font-RobotoMono text-gray-500 mt-2 text-sm'>model</p> 
                                        <input onChange={(e)=>{setCarInfo({...carInfo, model: e.target.value})}} className='bg-gray-100 rounded border-gray-400 border-1 w-full px-2' type="text" value={carInfo.model} />
                                        <p className='font-RobotoMono text-gray-500 mt-2 text-sm'>trim</p>
                                        <input onChange={(e)=>{setCarInfo({...carInfo, trim: e.target.value})}} className='bg-gray-100 rounded border-gray-400 border-1 w-full px-2' type="text" value={carInfo.trim} />
                                        <p className='font-RobotoMono text-gray-500 mt-2 text-sm'>year</p>
                                        <input onChange={(e)=>{setCarInfo({...carInfo, year: e.target.value})}} className='bg-gray-100 rounded border-gray-400 border-1 w-full px-2' type="number" value={carInfo.year} />
                                        <p className='font-RobotoMono text-gray-500 mt-2 text-sm'>plate</p>
                                        <input onChange={(e)=>{setCarInfo({...carInfo, plate: e.target.value})}} className='bg-gray-100 rounded border-gray-400 border-1 w-full px-2' type="text" value={carInfo.plate} />
                                        <div className='flex gap-1 mt-2'>
                                            <input onChange={(e)=>{setCarInfo({...carInfo, status: e.target.checked})}} className='items-center' checked={carInfo.status} type="checkbox" />
                                            <p className='items-center'>available</p>
                                        </div>
                                    </div>
                                    <div className='w-[50%] flex flex-col gap-1 pt-5'>
                                        <img className='w-70 h-40 rounded shadow-xl object-cover' src={imageURL || placeholderImage} alt="" />
                                        <p className='font-RobotoMono text-gray-500'>image(url)</p>
                                        <input onChange={(e)=>{setCarInfo({...carInfo, image_url : e.target.value})}} className='px-2 w-full bg-gray-100 rounded border-gray-400 border-1' type="text" value={carInfo.image_url} />
                                        <div><button onClick={()=>{setImageURL(carInfo.image_url)}} className='bg-amber-300 rounded px-4 hover:cursor-pointer mt-1'>check</button></div>
                                    </div>
                                </div>
                                <div className='px-3 pb-3'>
                                    <p className='font-RobotoMono text-gray-500'>descirption</p>
                                    <textarea onChange={(e)=>{setCarInfo({...carInfo, description: e.target.value})}} className='bg-gray-100 border-gray-400 border-1 w-full px-2 text-sm h-30' value={carInfo.description}></textarea>
                                    <button onClick={()=>{handleUpdateCar()}} className='mt-2 w-full bg-green-600 rounded text-white hover:cursor-pointer'>save</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
                </div>
                <footer className='absolute bottom-0  w-full bg-gray-200 '>
                    <h1 className='ml-3 font-bold text-gray-600'>Contact</h1>
                    <div className='w-full flex justify-center bg-gray-300'>
                        <h1 className='text-gray-900 mx-3'>บริษัท ไม่ได้ตั้งชื่อ ไม่จำกัด</h1>
                        <h1 className='text-gray-900 mx-3'>เลขประจำตัวกำกับภาษี: 228267</h1>
                        <h1 className='text-gray-900 mx-3'>Tel: 000-000-0000</h1>
                        <h1 className='text-gray-900 mx-3'>Line: @company_noname</h1>
                        <h1 className='text-gray-900 mx-3'>Email: somecompany@gmail.com</h1>
                    </div>
                </footer>
        </>
    )
}

export default EditCar