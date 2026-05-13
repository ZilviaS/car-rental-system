import Navbar from "./navbar.jsx"
import '../App.jsx'
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import userLogo from '../assets/user.svg'

function adminManage(){
    const API = import.meta.env.VITE_API_URL
    const [pageStatus , setPageStatus] = useState('carList')

    const [carData , setCarData] = useState({
        brand : '',
        model : '',
        trim : '',
        year : '',
        plate : '',
        price : '',
        imageURL : '',
        description : ''
    })

    const [locationData, setLocationData] = useState({
        name : '',
        latitude : '',
        longitude : '',
        imageURL : '',
        description : ''
    })

    const [carinfo, setCarInfo] = useState([])

    const [resultStatus, setResultStatus] = useState(null)
    const [resultLocationStatus, setLocationStatus] = useState(null)

    const [searchTearm, setSearchTearm] = useState('')
    const [searchRefund, setSearchRefund] = useState('')

    const [refundData, setRefundData] = useState([])
    const [refundLog, setRefundLog] = useState(null)

    const navigate = useNavigate()
    const dateDeFormat = (data)=>{
        const date = new Date(data)
        const formattedDate = date.toLocaleDateString('en-GB'); 
        return formattedDate
    }

    useEffect(()=>{
        fetch(`${API}/api/car`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setCarInfo(data)
        })
        .catch(err => console.error(err))
    },[])

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const getRefund = async ()=>{
            try {
                const res = await fetch(`${API}/api/booking/refund`,{
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })

                const data = await res.json()
                console.log('refund',data)
                if (!res.ok){
                    alert(data.error || data.message || 'sonething wrong')
                }
                setRefundData(data)
            }catch(err){
                console.log(err)
            }
        }
        getRefund()
    },[])

    const handleCarUpdate = async ()=>{
        const token = localStorage.getItem('token')
        try{
            const res = await fetch(`${API}/api/car/insert`,{
                method : 'POST',
                headers :{
                        'Authorization' : `Bearer ${token}`,
                        'content-type' : 'application/json'
                    },
                body : JSON.stringify(carData),
            })

            const data = await res.json()

            if (!res.ok) {
                setResultStatus(data.error || 'something went wrong')
                return
            }else{
                window.location.reload()
            }
        }catch(err){
            console.log(err)
            setResultStatus('server error')
        }
    }
        const truncate = (str, n)=> {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    const handleDelete = async (id)=>{
        const token = localStorage.getItem('token')
        console.log(id)
        const res = await fetch(`${API}/api/car/delete`,{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${token}`,
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                id : id
            })
        })

        if (!res.ok) {
            setResultStatus(data.error || 'something went wrong')
            return
        }else{
            window.location.reload()
        }
    }
    
    const handleEdit = (id)=>{
        navigate(`/edit/${id}`)
    }

    const filteredCars = carinfo.filter((car)=>{
        const keyword = searchTearm.toLowerCase()

        return (
            car.brand?.toLowerCase().includes(keyword) ||
            car.model?.toLowerCase().includes(keyword) ||
            car.trim?.toLowerCase().includes(keyword) ||
            car.plate?.toLowerCase().includes(keyword)
        )
    })

    const filteredRequest = refundData.filter((request)=>{
        const keyword = searchRefund.toLocaleLowerCase()

        return (
            request.id?.toString().toLowerCase().includes(keyword) ||
            request.brand?.toLowerCase().includes(keyword) ||
            request.model?.toLowerCase().includes(keyword) ||
            request.trim?.toLowerCase().includes(keyword) ||
            request.plate?.toLowerCase().includes(keyword)
        )
    })
    
    const handleRefundSubmit = async(id)=>{
        const token = localStorage.getItem('token')

        console.log(id)
        const res = await fetch(`${API}/api/booking/${id}/refund/submit`,{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })

        const data = await res.json()

        if(!res.ok){
            alert(data.message || data.error || 'something wrong')
        }else{
            window.location.reload()
        }
    }


    return (
        <>
            <div className="flex justify-center sm:gap-5 gap-3 mb-5">
                <button onClick={()=>setPageStatus('carList')} className={`sm:px-5 px-2 py-1 rounded hover:cursor-pointer hover:underline ${pageStatus === 'carList' ? 'bg-yellow-400' : 'bg-yellow-200'}`}>Car List</button>
                <button onClick={()=>setPageStatus('rentalCar')} className={`sm:px-5 px-2 py-1 rounded hover:cursor-pointer hover:underline ${pageStatus === 'rentalCar' ? 'bg-yellow-400' : 'bg-yellow-200'}`}>Update Rental Car</button>
                <button onClick={()=>setPageStatus('refundRequest')} className={`sm:px-5 px-2 rounded hover:cursor-pointer hover:underline ${pageStatus === 'refundRequest' ? 'bg-yellow-400' : 'bg-yellow-200'}`}>Refund Request</button>
            </div>
            <div className="flex justify-center">
                {pageStatus === 'carList' && <>
                <div className="w-full flex-col flex items-center gap-3 mb-5">
                    <div className="flex gap-2 md:w-200 w-full md:justify-start justify-center items-center">
                        <input onChange={(e)=> setSearchTearm(e.target.value)} className="border rounded px-1" type="text" value={searchTearm} placeholder="search" />
                        <p className="text-sm text-gray-500 items-baseline">total of {filteredCars.length} {filteredCars.length == 1 ? 'car' : 'cars'}</p>
                    </div>
                    {filteredCars.map((car, index)=>{
                        return (
                            <div key={index} className="bg-white flex md:flex-row flex-col md:w-200 w-70 md:gap-3 rounded-md md:h-50 shadow-xl">
                                <div className=" md:w-100 w-70">
                                    <img src={car.image_url} className="h-full w-full rounded-l-md object-cover" alt="" />
                                </div>
                                <div className="flex flex-col md:justify-between w-full my-2 px-1">
                                    <div className="pt-1">
                                        <button onClick={()=>navigate(`/booking/${car.id}`)} className="hover:cursor-pointer hover:underline font-bold font-RobotoMono">{car.brand} {car.model} {car.trim}</button>
                                        <div className="flex gap-2"> 
                                            <h2 className="text-sm">{car.year}</h2>
                                            <h2 className="text-sm">{car.plate}</h2>
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <p>price : </p>
                                            <p className="text-sm font-bold text-green-700">{car.price}</p>
                                            <p>฿</p>
                                        </div>
                                        <div>
                                            <h2 className="text-sm text-gray-400">{truncate(car.description == null ? '' : car.description, 250)}</h2>
                                        </div>
                                        
                                    </div>  
                                    <div className="flex gap-2 mt-1">
                                        <button onClick={()=>(handleEdit(car.id))} className="bg-green-500 text-white px-2 rounded hover:cursor-pointer">edit</button>
                                        <button onClick={()=>(handleDelete(car.id))} className="bg-red-500 text-white px-2 rounded hover:cursor-pointer">delete</button>
                                    </div>  
                                          
                                </div>
                            </div>
                        )
                    })}
                </div>
                </>}
                {pageStatus === 'rentalCar' && <>
                    <div className="lg:w-[50%] mx-[15%] rounded shadow-xl mb-5">
                        <div className="flex justify-center  bg-yellow-200 rounded-t-md">
                            <p className="py-1 font-RobotoMono ">Car Rental Update</p>
                        </div>
                        <div className="m-5">
                            <div className="flex flex-col gap-2">
                                <div className="flex md:flex-row flex-col gap-2">
                                    <p>Brand:</p>
                                    <input onChange={(e)=>{setCarData({...carData, brand : e.target.value})}} type="text" className="bg-gray-100 rounded border-gray-200 border-1 px-2"/>
                                    <p>Model:</p>
                                    <input onChange={(e)=>{setCarData({...carData, model : e.target.value})}} type="text" className="bg-gray-100 rounded border-gray-200 border-1 px-2"/>
                                </div>
                                <div className="flex md:flex-row flex-col gap-2">
                                    <p>Trim:</p>
                                    <input onChange={(e)=>{setCarData({...carData, trim : e.target.value})}} type="text" className="bg-gray-100 rounded border-gray-200 border-1 px-2"/>
                                    <p>Price:</p>
                                    <input onChange={(e)=>{setCarData({...carData, price : e.target.value})}} type="number" className="bg-gray-100 rounded border-gray-200 border-1 px-2"/>
                                </div>
                                <div className="flex gap-2">
                                    <p>Year:</p>
                                    <input onChange={(e)=>{setCarData({...carData, year : e.target.value})}} type="number" min="1886" max="2099" className="bg-gray-100 rounded border-gray-200 border-1 px-2 w-20"/>
                                    <p>Plate:</p>
                                    <input onChange={(e)=>{setCarData({...carData, plate : e.target.value})}} type="text" className="bg-gray-100 rounded border-gray-200 border-1 px-2 w-20"/> 
                                </div>
                                <div className="flex flex-col">
                                    <p>ImageURL:</p>
                                    <input onChange={(e)=>{setCarData({...carData, imageURL : e.target.value})}} type="text" className="bg-gray-100 rounded border-gray-200 border-1 px-2 w-full" placeholder="primary"/>
                                    <input onChange={(e)=>{setCarData({...carData, imageURL_secondary : e.target.value})}} type="text" className="bg-gray-100 rounded border-gray-200 border-1 px-2 w-full mt-2" placeholder="secondary"/>
                                    <input onChange={(e)=>{setCarData({...carData, imageURL_teritary : e.target.value})}} type="text" className="bg-gray-100 rounded border-gray-200 border-1 px-2 w-full mt-2" placeholder="teritary"/>
                                </div>
                                <p>Description</p>
                                <textarea onChange={(e)=>{setCarData({...carData, description : e.target.value})}} className="bg-gray-100 rounded border w-full h-20 px-2 py-1"></textarea>
                            </div>
                            <button onClick={handleCarUpdate} className="mt-4 px-3 py-1 bg-green-600 text-white rounded hover:cursor-pointer">SAVE</button>
                            <p className="text-red-700">{resultStatus}</p>
                        </div>

                    </div>
                </>}
                {pageStatus === 'refundRequest' && <>
                    <div className="w-[full] min-h-0 mb-3 flex flex-col gap-2">
                        <div className="md:w-200 w-80 flex gap-1 items-baseline">
                            <input onChange={(e)=> setSearchRefund(e.target.value)} value={searchRefund} className="bg-gray-100 rounded border px-2" type="text" placeholder="search" />
                            <p className="text-sm text-gray-700">total of {refundData.length} request{refundData.length > 1 ? 's' : ''}</p>
                        </div>
                        {filteredRequest.map((request, index)=>{
                            return(
                                <div key={index} className="m-2 sm:w-150 md:w-200 w-80 sm:h-30 bg-white shadow flex sm:flex-row flex-col gap-2">
                                    <img className="sm:h-full rounded-l sm:w-40 w-full h-40 object-cover" src={request.image_url} alt="" />
                                    <div className="w-full flex justify-between">
                                        <div className="flex flex-col">
                                            <p className="font-RobotoMono font-bold">{request.year} {request.brand} {request.model} {request.trim}</p>
                                            <p className="text-sm text-gray-600">ID: {request.id}</p>
                                            <p className="text-sm text-gray-600">Plate : {request.plate}</p>
                                            <p className="text-sm text-gray-600">Booking : {dateDeFormat(request.start_date).replaceAll("-","/")} - {dateDeFormat(request.end_date).replaceAll("-","/")}</p>
                                            <p className="text-sm text-green-600">Price {request.price}</p>
                                        </div>
                                        <div>
                                            <button onClick={()=>handleRefundSubmit(request.id)} className="h-full px-2 bg-green-600 text-white rounded-r hover:cursor-pointer">submit</button>
                                        </div>
                                    </div>
                                    

                                </div>
                            )
                        })}
                    </div>
                </>}
            </div>
        </>
    )
}

export default adminManage