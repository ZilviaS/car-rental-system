import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from "./navbar";
import Footer from "./footer";
import BrandSelect from "./brandSelect";

function Search(){
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [carinfo, setCarinfo] = useState([])

    const [carForm, setCarForm] = useState({
        brand : '',
        carname : '',
        startDate: '',
        endDate: ''
        }
    )

    const data = searchParams.get("data")

    const [currentPage, setCurrentPage] = useState(1)
    const carsPerPage = 5

    const indexOfLastCar = currentPage * carsPerPage
    const indexOfFirstCar = indexOfLastCar - carsPerPage

    const currentCars = carinfo.slice(indexOfFirstCar, indexOfLastCar)
    const API = import.meta.env.VITE_API_URL

    const totalPages = Math.ceil(carinfo.length / carsPerPage)

    useEffect(() => {
        if (!data){
            fetchCars({
                brand: '',
                carname: '',
                startDate: '',
                endDate: ''
            })
            return
        }

        const parsed = JSON.parse(decodeURIComponent(data))

        const formdata = ({
            brand: parsed.brand || '',
            carname: parsed.carname || '',
            startDate: parsed.startDate || '',
            endDate: parsed.endDate || ''
        })

        setCarForm(formdata)

        fetchCars(formdata)

    }, [data])

    const fetchCars = async (searchData) => {
        try{
            const res = await fetch(`${API}/api/car`,{
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(searchData)
            })

            const data = await res.json()

            console.log(data)

            setCarinfo(data)

            setCurrentPage(1)

        }catch(err){
            console.error(err)
        }
    }

    const getTomorrow = ()=>{
        const todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + 1)
        return todayDate.toISOString().split('T')[0]
    }

    const truncate = (str, n)=> {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    const handleSearch = ()=>{
        fetchCars(carForm)
    }

    const handleRent = (car)=>{
        navigate(`/booking/${car.id}`)
    }

    return(
        <>
            <div className="bg-white min-h-screen">
                <Navbar/>
                <section className="flex lg:flex-row flex-col lg:gap-10 sm:gap-2 lg:mx-20 mt-5 mb-5">
                    <div className="lg:w-auto w-full flex justify-center">
                        <form action="">
                            <div className="md:w-100 w-80 lg:bg-gray-100 lg:rounded-md lg:shadow-2xl lg:flex lg:flex-col grid grid-cols-2">
                                <div className=" lg:block hidden bg-yellow-500 rounded-t-md">
                                    <h1 className=" font-bold py-3 text-black pl-5 font-RobotoMono">Search Car</h1>
                                </div>
                                <div className="lg:m-5 m-1">
                                    <h1 className="font-bold pl-2 font-RobotoMono text-sm text-gray-600">Car Brand</h1>
                                    <select value={carForm.brand} className="font-RobotoMono mt-2 h-full lg:bg-white bg-gray-100 w-full lg:p-2 rounded-sm lg:text-base text-sm" name="brand" id="type" onChange={(e)=>setCarForm({...carForm,brand: e.target.value})}>
                                        <BrandSelect></BrandSelect>
                                    </select>
                                </div>
                                <div className="lg:m-5 m-1">
                                    <h1 className="font-bold pl-2 font-RobotoMono text-sm text-gray-600">Model</h1>
                                    <input type="text" name="model" className="font-RobotoMono lg:text-base text-sm mt-1 lg:bg-white bg-gray-100 w-full lg:p-2 pl-2 py-1 rounded-sm" value={carForm.carname}  onChange={(e)=>setCarForm({...carForm,carname: e.target.value})}/>
                                </div>
                                <div className="lg:m-5 m-1">
                                    <h1 className="font-bold pl-2 font-RobotoMono text-sm text-gray-600">start date</h1>
                                    <input min={getTomorrow()} type="date" name="model" className="mt-1 lg:bg-white bg-gray-100 lg:text-base text-sm w-full lg:p-2 pl-2 py-1 rounded-sm" value={carForm.startDate} onChange={(e)=>setCarForm({...carForm,startDate: e.target.value})}/>
                                </div>
                                <div className="lg:m-5 m-1">
                                    <h1 className="font-bold pl-2 font-RobotoMono text-sm text-gray-600">end date</h1>
                                    <input min={getTomorrow()} type="date" name="model" className="mt-1 lg:bg-white bg-gray-100 lg:text-base text-sm w-full lg:p-2 pl-2 py-1 rounded-sm" value={carForm.endDate} onChange={(e)=>setCarForm({...carForm,endDate: e.target.value})}/>
                                </div>
                                <div className="flex justify-center lg:mx-5 mx-0 col-span-2 lg:mt-0 mt-3">
                                    <button type="button" className="font-RobotoMono bg-amber-400 lg:py-3 py-1 w-full rounded-md hover:cursor-pointer mb-5" onClick={handleSearch}>Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div className="mt-2">
                        <div className="lg:pl-0 md:pl-10 w-full mb-3 flex justify-center md:justify-start">
                            <h1 className="md:text-md text-sm text-gray-500">{carinfo.length} Result Found</h1>
                        </div>
                        <div className="w-full flex-col flex items-center gap-5">
                            {currentCars.map((car, index)=>{
                                return (
                                    <div key={index} className="bg-white flex sm:flex-row flex-col sm:w-200 w-80 sm:gap-3 rounded-md sm:h-50 shadow-xl">
                                        <div className="h-full sm:w-100 w-full">
                                            <img src={car.image_url} className="h-full w-full rounded-l-md object-cover" alt="" />
                                        </div>
                                        <div className="flex flex-col justify-between w-full my-2">
                                            <div className="sm:pt-1 sm:px-0 px-2">
                                                <a onClick={() => handleRent(car)} className="font-bold font-RobotoMono hover:cursor-pointer hover:underline">{car.brand} {car.model} {car.trim}</a>
                                                <div className="flex gap-2"> 
                                                    <h2 className="text-sm">{car.year}</h2>
                                                    <h2 className="text-sm">{car.plate}</h2>
                                                </div>
                                                <h2 className="md:block hidden text-sm mt-1 text-gray-400">{truncate(car.description == '' ? '' : car.description, 240)}</h2>
                                                <h2 className="md:hidden block text-sm text-gray-400">{truncate(car.description == '' ? '' : car.description, 100)}</h2>
                                            </div>
                                            <div className="flex w-full mt-2 items-baseline">
                                                {car.status == true ?
                                                <>
                                                    <h1 className="lg:hidden ml-2 text-green-600">{car.price} บาท</h1><h1 className="text-sm lg:hidden">/วัน</h1>
                                                    <button onClick={() => handleRent(car)} className="bg-green-600 rounded-sm text-white lg:flex px-5 py-1 hidden hover:cursor-pointer hover:bg-green-900"><h1 className="font-bold mr-1">{car.price} บาท</h1>/วัน</button>
                                                </> : 
                                                <>
                                                    <h1 className="text-red-700">not available</h1>
                                                </>}
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>              
                </section>
                <div className="flex justify-center gap-2 mt-5 mb-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:cursor-pointer disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <p className="px-3 py-1">
                        {currentPage} / {totalPages}
                    </p>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:cursor-pointer disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

            </div>
            <Footer></Footer>
        </>
    )
}

export default Search