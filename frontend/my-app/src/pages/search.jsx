import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from "./navbar";

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

        }catch(err){
            console.error(err)
        }
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
                <section className="flex lg:flex-row flex-col sm:gap-10 gap-2 lg:mx-20 mt-5 mb-5">
                    <form className="lg:block hidden" action="">
                        <div className="w-100 bg-gray-100 rounded-md shadow-2xl">
                            <div className=" bg-yellow-500 rounded-t-md">
                                <h1 className=" font-bold py-3 text-black pl-5 font-RobotoMono">Search Car</h1>
                            </div>
                            <div className="m-5">
                                <h1 className="font-bold pl-2 font-RobotoMono text-sm text-gray-600">Car Brand</h1>
                                <select className="font-RobotoMono mt-2 bg-white w-full p-2 rounded-sm" name="brand" id="type" onChange={(e)=>setCarForm({...carForm,brand: e.target.value})}>
                                    <option value="">select brand</option>
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
                            <div className="m-5">
                                <h1 className="font-bold pl-2 font-RobotoMono text-sm text-gray-600">Model</h1>
                                <input type="text" name="model" className="font-RobotoMono mt-1 bg-white w-full p-2 rounded-sm" onChange={(e)=>setCarForm({...carForm,carname: e.target.value})}/>
                            </div>
                            <div className="m-5">
                                <h1 className="font-bold pl-2 font-RobotoMono text-sm text-gray-600">start date</h1>
                                <input type="date" name="model" className="mt-1 bg-white w-full p-2 rounded-sm" onChange={(e)=>setCarForm({...carForm,startDate: e.target.value})}/>
                            </div>
                            <div className="m-5">
                                <h1 className="font-bold pl-2 font-RobotoMono text-sm text-gray-600">end date</h1>
                                <input type="date" name="model" className="mt-1 bg-white w-full p-2 rounded-sm" onChange={(e)=>setCarForm({...carForm,endDate: e.target.value})}/>
                            </div>
                            <div className="flex justify-center mx-5">
                                <button type="button" className="font-RobotoMono bg-amber-400 py-3 w-full rounded-md hover:cursor-pointer mb-5" onClick={handleSearch}>search</button>
                            </div>
                        </div>
                    </form>
                    <div className="lg:hidden w-full flex justify-center">
                        <form action="">
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <div>
                                        <h1 className="font-bold text-sm text-gray-600">Car Brand</h1>
                                        <select className=" mt-1 bg-gray-100 rounded-sm" name="brand" id="type" onChange={(e)=>setCarForm({...carForm,brand: e.target.value})}>
                                            <option value="">select brand</option>
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
                                    <div className="">
                                        <h1 className="font-bold text-sm text-gray-600">Model</h1>
                                        <input type="text" name="model" className="mt-1 bg-gray-100  w-full rounded-sm" onChange={(e)=>setCarForm({...carForm,carname: e.target.value})}/>
                                    </div>  
                                </div>
                                <div className="my-2 w-full flex gap-3">
                                    <div className="w-full">
                                        <h1 className="font-bold text-sm text-gray-600">Start Date</h1>
                                        <input type="date" name="model" className="mt-1 sm:text-md text-sm bg-gray-100 w-full rounded-sm" onChange={(e)=>setCarForm({...carForm,startDate: e.target.value})}/>
                                    </div>
                                    <div className="w-full">
                                        <h1 className="font-bold text-sm text-gray-600">End Date</h1>
                                        <input type="date" name="model" className="mt-1 sm:text-md text-sm bg-gray-100 w-full rounded-sm" onChange={(e)=>setCarForm({...carForm,endDate: e.target.value})}/>
                                    </div>
                                </div>
                                <div className="mt-1 flex justify-center">
                                    <button type="button" className="font-RobotoMono bg-amber-400 py-1 w-full rounded-md hover:cursor-pointer" onClick={handleSearch}>Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div className="md:mt-2">
                        <div className="lg:pl-0 md:pl-10 w-full mb-3 flex justify-center md:justify-start">
                            <h1 className="md:text-md text-sm text-gray-500">{carinfo.length} Result Found</h1>
                        </div>
                        <div className="w-full flex-col flex items-center gap-5">
                            {currentCars.map((car, index)=>{
                                return (
                                    <div key={index} className="bg-white flex sm:flex-row flex-col sm:w-200 w-60 sm:gap-3 rounded-md sm:h-50 shadow-xl">
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
                                                <h2 className="text-sm text-gray-400">{truncate(car.description == '' ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' : car.description, 70)}</h2>
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
            <footer className='bg-gray-200 '>
                <h1 className='ml-3 font-bold text-gray-600'>Contact</h1>
                <div className='w-full flex flex-wrap justify-center bg-gray-300'>
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

export default Search