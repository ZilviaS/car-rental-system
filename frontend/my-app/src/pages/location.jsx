import { useEffect, useState } from 'react'
import Navbar from './navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import bg from '../assets/background.jpg'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'   
import '../App.css'


function Location(){

    const [ location, setLocation ] = useState([])
    const [ mapLocation , setMapLocation ] = useState(null)

    useEffect(()=>{
        fetch(`/api/location`)
        .then(res => res.json())
        .then(data => {
            setLocation(data)
        })
    },[])

    return(
        <>
            <Navbar></Navbar>
            <section className='flex justify-center'>
                <div className='flex justify-center gap-10 my-7 w-[90%] shadow rounded'>
                    <div className='w-full h-screen bg-white shadow justify-center items-center px-5 pt-3'>
                        <h1 className='font-RobotoMono text-gray-600'>pick-up location</h1>
                        <div className='w-full h-[95%]'>
                            <MapContainer 
                                center = {[13.714696747819657, 100.40647611209434]}
                                zoom={12} 
                                scrollWheelZoom={true}
                                style={{ height: "100%", width: "100%" }}
                                >
                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {location.map((location,index)=>{
                                    return(
                                        <>
                                            <Marker key={index} position={[location.latitude, location.longitude]}>
                                                <Popup>
                                                <div className="w-60">
                                                    <img
                                                        src={location.img_url}
                                                        alt=""
                                                        className="w-full h-40 object-cover rounded"
                                                    />
                                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className='hover:underline hover:cursor-pointer'>
                                                        <h1 className="font-bold text-sm mt-2">
                                                            {location.location_name}
                                                        </h1>
                                                        <h1 className="text-xs text-gray-500">
                                                            {location.description}
                                                        </h1>
                                                    </a>
                                                    
                                                </div>
                                            </Popup>
                                            </Marker>
                                        </>
                                        
                                    ) 
                                })}
                            </MapContainer>
                        </div>
                        
                    </div>
                    {/* <div className='max-w-[30%]'>
                        <h1 className='font-RobotoMono text-xl pb-2'>location</h1>
                        <hr className='py-1'/>
                        <div className='flex-col h-[75vh] overflow-y-auto'>
                            {location.map((location,index)=>{
                                return (
                                    <div key={index} className={index === 1 ? 'shadow rounded p-2 mt-5 mb-2' : 'shadow rounded p-2'}>
                                        <button onClick={()=>{ 
                                            setMapLocation(location)
                                            console.log(location)
                                            }} className='hover:cursor-pointer'><img className='w-120 h-65' src={location.img_url} alt="" /></button>
                                        <div className='p-1'>
                                            <h1 className='font-xl font-RobotoMono py-1'>{location.location_name}</h1>
                                            <hr className='py-1 text-gray-300'/>
                                            <h2 className='text-sm text-gray-400'>{location.description}</h2>
                                        </div>
                                    </div>
                                )
                            })}   
                        </div>
                    </div>    */}
                </div>
            </section>
            
            <footer className='bg-gray-200'>
                    <h1 className='ml-3 font-bold text-gray-600'>Contact</h1>
                    <div className='w-full flex justify-center bg-gray-300'>
                        <h1 className='text-gray-900 mx-3'>บริษัท ไม่ได้ตั้งชื่อ ไม่จำกัด</h1>
                        <h1 className='text-gray-900 mx-3'>เลขประจำตัวกำกับภาษี: 228267</h1>
                        <h1 className='text-gray-900 mx-3'>Tel: 082-192-1943</h1>
                        <h1 className='text-gray-900 mx-3'>Line: @company_noname</h1>
                        <h1 className='text-gray-900 mx-3'>Email: somecompany@gmail.com</h1>
                    </div>

            </footer>
        </>
    )

}

export default Location