import { useNavigate, useParams } from "react-router-dom"
import Navbar from "./navbar"
import { useEffect, useState } from "react" 

function returnCar(){
    const { id } = useParams()
    const API = import.meta.env.VITE_API_URL

    const [ carInfo, setCarInfo ] = useState(null)

    const [ errorLog, setErrorLog ] = useState('')

    const navigate = useNavigate()

    const handleReturn = async ()=>{
        if(carInfo.paymentOption == null || carInfo.referenceNo == '' || carInfo.referenceNo == null){
            setErrorLog('please, fill all the info before submit')
            return null
        }
        const res = await fetch(`${API}/api/booking/${id}/return`,{
            method : 'POST',
            headers : {
                'content-type' : 'Application/json'
            },
            credentials : "include",
            body : JSON.stringify(carInfo)
        })
        if(res.ok){
            navigate('/admin')
        }
        
    }

    useEffect(()=>{
        const checkAdmin = async ()=>{
            const res = await fetch(`${API}/api/user/admin/me`,{
                credentials : "include"
            })
            if(!res.ok){
                navigate('/login')
            }
        }
        checkAdmin()
    },[])

    useEffect(()=>{
        const carInfoHandle = async()=>{
            const res = await fetch(`${API}/api/booking/${id}/get`,{
                credentials : "include"}
            )
            const data = await res.json()
            if (res.ok){
                console.log(data)
                setCarInfo(prev => ({...prev, ...data}))
            }
            console.log(data)
        }
        carInfoHandle()
    },[])

    return(
        <>
            <Navbar/>
            <div className="w-full flex justify-center mt-5">
                <div className="w-[50%] shadow rounded px-2">
                    <p className="font-RobotoMono font-bold w-full text-center">return</p>
                    <div className="flex flex-col gap-2">
                        <p className="font-RobotoMono text-sm">payment type</p>
                        <select onChange={(e)=>{setCarInfo({...carInfo, paymentOption : e.target.value})}} name="type" id="type" className="border-1 px-2 rounded border-gray-500">
                            <option value={null}>--select--</option>
                            <option value="0">Krungsri</option>
                            <option value="1">Kasikorn</option>
                            <option value="2">Krungthai</option>
                            <option value="3">SCB</option>
                            <option value="4">Promptpay</option>
                        </select>
                        <p className="font-RobotoMono text-sm">reference no.</p>
                        <input onChange={(e)=>{setCarInfo({...carInfo, referenceNo : e.target.value})}} type="text" className="border-1 px-2 rounded border-gray-500"/>
                        <div className="flex gap-1 items-center">
                            <button onClick={handleReturn} className="bg-green-500 text-sm font-RobotoMono px-2 py-0.5 hover:cursor-pointer rounded text-white">SUBMIT</button>
                            <p className="text-xs font-RobotoMono text-red-700">{errorLog}</p>
                        </div>
                        <div className="shadow-inner bg-white w-full p-1 flex gap-3">
                            {carInfo && (
                                <>
                                    <img src={carInfo.image_url} className="max-h-50 w-[30%]" alt="" />
                                    <div>
                                        <p className="text-sm text-gray-500">ID: <span className="text-black font-RobotoMono">{carInfo.id}</span></p>
                                        <p className="text-sm text-gray-500">CAR: <span className="text-black font-RobotoMono">{carInfo.year} {carInfo.brand} {carInfo.model} {carInfo.trim}</span></p>
                                        <p className="text-sm text-gray-500">PLATE: <span className="text-black font-RobotoMono">{carInfo.plate}</span></p>
                                        <p className="text-sm text-gray-500">USER: <span className="text-black font-RobotoMono">{carInfo.username} ({carInfo.fname})</span></p>
                                        <p className="text-sm text-gray-500">TEL: <span className="text-black font-RobotoMono">{carInfo.tel}</span></p>
                                        <p className="text-sm text-gray-500">EMAIL: <span className="text-black font-RobotoMono">{carInfo.email}</span></p>
                                        <p className="text-sm text-gray-500">RENTDATE: <span className="text-black font-RobotoMono">{new Date(carInfo.start_date).toDateString('th-TH')} - {new Date(carInfo.end_date).toDateString('th-TH')}</span></p>
                                        <p className="text-sm text-gray-500">FINE: <span className="text-red-500 font-RobotoMono">{carInfo.fine}</span> THB</p>
                                    </div>

                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default returnCar