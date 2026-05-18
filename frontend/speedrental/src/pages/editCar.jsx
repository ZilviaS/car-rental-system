import '../App.jsx'
import Navbar from './navbar.jsx'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import placeholderImage from '../assets/placeholder.jpg'
import bg from '../assets/background_crop.jpg'

function EditCar(){

    const API = import.meta.env.VITE_API_URL
    const { id } = useParams()
    const [carInfo, setCarInfo] = useState({
        brand: '',
        model: '',
        trim: '',
        year: '',
        plate: '',
        status: false,
        img_set: []
    })

    const navigate = useNavigate()

    const [imgState, setImgState] = useState(0)

    const handleImageChange = (index, value)=>{
        setCarInfo(prev => {
            const updated = [...prev.img_set]
            updated[index] = value
            return { ...prev, img_set: updated }
        })
    }


    useEffect(()=>{
        const fetchCar = async ()=>{
            try{
                const res = await fetch(`${API}/api/car/${id}`)
                const data = await res.json()
                setCarInfo(data)
                setImgURL(data.img_set)
                console.log(data)

            }catch(err){
                console.log(err)
            }
        }
        fetchCar()
    },[id])

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            navigate('/')
        }
        
        const checkAdmin = async ()=>{
            try{   
                const res = await fetch(`${API}/api/user/admin/me`,{
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                })
                if (!res.ok){
                    navigate('/')
                }
                return
            } catch(err){
                navigate('/')
            }

        }
        checkAdmin()

    },[])

    const handleUpdateCar = async ()=>{
        const token = localStorage.getItem('token')
        try{
            console.log(carInfo)
            const res = await fetch(`${API}/api/car/update`,{
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
                <img className="absolute inset-0 w-full h-full object-cover" src={bg} alt="" />
                <div className='relative z-10'>
                    <Navbar></Navbar>
                    <div className='min-h-screen pt-5'>
                        <div className='flex w-full justify-center'>
                            <div className='bg-white shadow rounded sm:w-[70%] w-[90%] sm:mb-0 mb-5'>
                                <div className='w-full bg-amber-200 rounded-t'>
                                    <p className='font-RobotoMono py-2 pl-3'>EDIT</p>
                                </div>
                                <div className='flex md:flex-row flex-col justify-between px-3 mt-2'>
                                    <div className='md:w-[40%] w-full'>
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
                                    <div className='md:w-[59%] flex flex-col gap-0.5 pt-5'>
                                        <div className='h-75 shadow flex sm:flex-row flex-col justify-between'>
                                            <div className='sm:w-[75%] w-full sm:h-full bg-gray-200 shrink-0'>
                                                <img className='sm:h-full h-50 w-full object-cover' src={carInfo.img_set?.[imgState] || placeholderImage} alt="" />
                                            </div>
                                            <div className='sm:w-45 w-full h-full bg-gray-200 flex sm:flex-col flex-row overflow-y-scroll no-scrollbar'>
                                                {carInfo.img_set.map((img,index)=>{
                                                    return(
                                                        <div key={index} className={`sm:w-full w-30 h-25 bg-gray-200 shrink-0 ${imgState == index ? 'grayscale' : ''} `}>
                                                            <img onClick={()=>{setImgState(index)}} className='hover:cursor-pointer w-full h-full object-cover' src={img} alt="" />
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                        
                                        <p className='font-RobotoMono text-gray-500 text-sm'>image(url)</p>
                                        {carInfo.img_set.map((img,index)=>{
                                            return(
                                                <div className='w-full' key={index}>
                                                    <input onChange={(e)=>{handleImageChange(index,e.target.value)}} className='bg-gray-100 px-1 border-gray-400 border-1 rounded w-full' value={img} type="text" placeholder={`image ${index + 1}`}/>
                                                </div>
                                            )
                                        })}
                                        <div>
                                            <button onClick={()=>{setCarInfo({
                                                ...carInfo,
                                                img_set : [...carInfo.img_set, '']
                                            })}} className='bg-green-600 rounded text-white px-2 hover:cursor-pointer'>add image</button>
                                        </div>
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
                
        </>
    )
}

export default EditCar