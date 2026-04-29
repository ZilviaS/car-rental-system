import Navbar from "./navbar"
import '../App.jsx'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Booking(){
    const navigate = useNavigate()
    const { id } = useParams()
    const [car, setCar] = useState(null)
    const [data, setData] = useState({
        startDate : '',
        endDate : '',
        location: ''
    })
    const [priceData, setPriceData] = useState(null)
    
    useEffect(()=>{
        console.log(id)
        fetch(`/api/car/${id}`)
        .then(res => res.json())
        .then(data => {
            setCar(data)
            console.log(data)
        })
        .catch(err => console.error(err))
        }
    , [id])

    useEffect(()=>{
        if(data.startDate && data.endDate && car){
            handleCheck()
        }
    }, [data.startDate, data.endDate, car])

    const handleSubmit = ()=>{
        if (data.startDate == '' || data.endDate == '' || data.location == ''){
            return
        }
        fetch()
        navigate('/payment', {
            state:{
                bookingData: data,
                car: car
            }
        })
    }

    const handleCheck = async ()=>{
        try{
            console.log('wht')
            const res = await fetch(`/api/payment`,{
                method : 'POST',
                headers :{
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    carID: car.id,
                    startDate: data.startDate,
                    endDate: data.endDate
                })
            })
        const result = await res.json()
        console.log(result)
        setPriceData(result)

        }catch (err){
            console.error(err)
        }
    }

    return(
        <>
            
            <Navbar></Navbar>
            <div className="bg-white min-h-screen">
                <div className='flex justify-center pt-10'>
                    {car ? 
                        <div className="bg-white rounded-md p-5 flex gap-5 shadow-xl">
                            <div>
                                <img className="h-70 w-100 rounded" src={car.image_url} alt="" />
                                <div className="flex py-5 items-baseline">
                                    <h1 className="text-xl font-bold font-RobotoMono">{car.brand} {car.model}</h1>
                                    <h1 className="pl-2 text-sm">({car.plate})</h1>
                                </div>
                                <div className="flex items-baseline">
                                    <h1 className="text-blue-600 font-bold">{car.price} </h1>
                                    <h1 className="pl-1 font-light">/ day</h1>
                                </div>
                                <hr className="my-5" />
                                <h1>{car.description}</h1>
                            </div>
                            <div>
                                <div className="flex gap-5 pb-2">
                                    <div>
                                        <h1 className='text-gray-500 font-RobotoMono text-xs pl-1'>start date</h1>
                                        <input onChange={(e)=> setData({...data, startDate : e.target.value})} type="date" name='startDate' className="px-4 py-2 rounded-md border-1 border-gray-400" required/>
                                    </div>
                                    <div>
                                        <h1 className='text-gray-500 font-RobotoMono text-xs pl-1'>end date</h1>
                                        <input onChange={(e)=> setData({...data, endDate : e.target.value})} type="date" name='endDate' className="px-4 py-2 rounded-md border-1 border-gray-400" required/>
                                    </div>
                                </div>
                                <h1 className='text-gray-500 font-RobotoMono text-xs pl-1'>pickup location</h1>
                                <select onChange={(e)=> setData({...data, location : e.target.value})} className='rounded-md px-3 py-2 w-full border-1 border-gray-400 font-RobotoMono' name="brand" id="cars" required>
                                    <option value="" disabled selected hidden>Please choose the location</option>
                                    <option value="1">Bangkae</option>
                                    <option value="2">Rangsit</option>
                                </select>
                                <h1 className='pl-1 py-4 font-RobotoMono text-sm text-gray-500'>
                                {
                                (() => {
                                    if (!data.startDate || !data.endDate) return 'please insert rent date'

                                    const start = new Date(data.startDate)
                                    const end = new Date(data.endDate)

                                    if(end < start) return 'please insert rent date'
                                    if(!priceData) return 'calculating...'

                                    return `total ${priceData.price} Baht (${priceData.days} day)`
                                })()
                                }
                                </h1>
                                <button onClick={handleSubmit} className="bg-green-600 text-white p-2 w-full rounded-md hover:cursor-pointer">Submit</button>
                            </div>

                        </div> :
                        <h1>not found</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default Booking