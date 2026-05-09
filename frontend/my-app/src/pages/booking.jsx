import Navbar from "./navbar"
import '../App.jsx'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import placeholderImage from '../assets/placeholder.jpg'

function Booking(){
    const navigate = useNavigate()
    const { id } = useParams()
    const [car, setCar] = useState(null)
    const [data, setData] = useState({
        start_date : '',
        end_date : '',
        location: ''
    })
    const [priceData, setPriceData] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    
    const isDateBlocked = (date) => {
        return bookedDates.some(b => {
            const start = new Date(b.start_date)
            const end = new Date(b.end_date)

            return date >= start && date <= end
        })
    }

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
        fetch(`/api/car/${id}/booked-dates`)
        .then(res => res.json())
        .then(data => setBookedDates(data))
    }, [])

    useEffect(()=>{
        if(data.start_date && data.end_date && car){
            handleCheck()
        }
    }, [data.start_date, data.end_date, car])

    const handleSubmit = ()=>{
        if (data.start_date == '' || data.end_date == '' || data.location == ''){
            return
        }
        navigate('/payment', {
            state:{
                bookingData: data,
                car: car
            }
        })
    }

    const handleCheck = async ()=>{
        try{
            const res = await fetch(`/api/payment`,{
                method : 'POST',
                headers :{
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    carID: car.id,
                    start_date: data.start_date.toISOString().split('T')[0],
                    end_date: data.end_date.toISOString().split('T')[0]
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
                <div className='flex justify-center pt-5'>
                    {car ? 
                        <>
                            <div className="bg-white w-[70%] rounded-md p-5 shadow-2xl">
                                <div className="flex h-100 w-full justify-center">
                                    <img className="h-full w-[60%] rounded-l object-cover" src={car.image_url} alt="" />
                                    <div className="flex flex-col">
                                        <img className="h-[50%] rounded-tr object-cover" src={car.image_url_secondary || placeholderImage} alt="" />
                                        <img className="h-[50%] rounded-br object-cover" src={car.image_url_teritery || placeholderImage} alt="" />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-10 mt-3">
                                    <div className="w-full">
                                        <div className="flex mt-4 py-1 items-baseline">
                                            <h1 className="text-xl font-bold font-RobotoMono">{car.brand} {car.model}</h1>
                                            <h1 className="pl-2 text-sm">({car.plate})</h1>
                                        </div>
                                        <div className="flex items-baseline">
                                            <h1 className="text-blue-600 font-bold">{car.price} </h1>
                                            <h1 className="pl-1 font-light">/ day</h1>
                                        </div>
                                        <hr className="my-2" />
                                        <h1 className="text-gray-600 px-1 text-sm w-full break-words overflow-y-auto max-h-40">
                                            {car.description}
                                        </h1>
                                    </div>
                                    <div>
                                        <div className="flex gap-5 pb-2">
                                            <div>
                                                <h1 className='text-gray-500 font-RobotoMono text-xs pl-1'>start date</h1>
                                                <DatePicker
                                                    selected={data.start_date ? new Date(data.start_date) : null}
                                                    onChange={(date) => setData({...data, start_date: date})}
                                                    filterDate={(date) => !isDateBlocked(date)}
                                                    minDate={new Date()}
                                                    dateFormat="yyyy-MM-dd"
                                                    className="px-4 py-2 rounded-md border border-gray-400"
                                                />
                                            </div>
                                            <div>
                                                <h1 className='text-gray-500 font-RobotoMono text-xs pl-1'>end date</h1>
                                                <DatePicker
                                                    selected={data.end_date ? new Date(data.end_date) : null}
                                                    onChange={(date) => setData({...data, end_date: date})}
                                                    filterDate={(date) => !isDateBlocked(date)}
                                                    minDate={data.start_date || new Date()}
                                                    dateFormat="yyyy-MM-dd"
                                                    className="px-4 py-2 rounded-md border border-gray-400"
                                                />
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
                                            if (!data.start_date || !data.end_date) return 'please insert rent date'

                                            const start = new Date(data.start_date)
                                            const end = new Date(data.end_date)

                                            if(end < start) return 'please insert rent date'
                                            if(!priceData) return 'calculating...'

                                            return `total ${priceData.price} Baht (${priceData.days} day)`
                                        })()
                                        }
                                        </h1>
                                        <button onClick={handleSubmit} className="bg-green-600 text-white p-2 w-full rounded-md hover:cursor-pointer">Submit</button>
                                    </div>

                                </div>

                            </div>
                        
                        </> :
                        <h1>not found</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default Booking