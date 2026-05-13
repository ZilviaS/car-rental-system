import Navbar from "./navbar.jsx"
import '../App.jsx'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import userLogo from '../assets/user.svg'
import AdminManage from "./adminManage.jsx"
import Footer from "./footer.jsx"

function Manage(){

    const API = import.meta.env.VITE_API_URL
    const [user, setUser] = useState({
        id : '',
        username : '',
        email : '',
        fname : '',
        tel : '',
        sex : '',
        birthdate : ''
    })
    const today = new Date()
    today.setHours(0,0,0,0)
    const [userCars, setUserCars] = useState([])
    const navigate = useNavigate()
    const [pageState, setPageState] = useState('user')
    const [userPayment, setUserPayment] = useState({
        card_number : '',
        ex_month : '',
        ex_year : '',
        cvv : '',
        cardname : '',
        bank : ''
    })

    const [UserInformationUI, setUserInformationUI] = useState({
        name : false,
        tel : false,
        Dob : false
    })

    const [cardInformationUI, setCardInformationUI] = useState({
        cardNumber : false,
        exp : false,
        cvv : false,
        name : false,
        bank : false
    })

    const [loading, setLoading] = useState(true)

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
            return
        }
        const handleUserInformation = async()=>{
            fetch(`${API}/api/user/me`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setUser({...data,
                    birthdate: data.birthdate?.split('T')[0]
                })
                setLoading(false)
            })

            fetch(`${API}/api/user/account`,{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setUserPayment(data)
            })

            fetch(`${API}/api/user/cars`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setUserCars(data)
                console.log(data)
            })

            const adminCheck = await fetch(`${API}/api/user/admin/me`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            if (adminCheck.ok){
                setIsAdmin(true)
            }
        }

        handleUserInformation()

    },[])

    const handleUpdate = ()=>{
        const token = localStorage.getItem('token')
        fetch(`${API}/api/user`,{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
    }

    const handleAccountUpdate = ()=>{
        const token = localStorage.getItem('token')
        fetch(`${API}/api/user/account`,{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(userPayment)
        })
    }

    const handleReceivedCar = async (id)=>{
        const token = localStorage.getItem('token')

        const res = await fetch(`${API}/api/booking/${id}/received`,{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })

        const data = res.json()

        if(res.ok){
            window.location.reload()
        }else{
            alert(data.message || data.err || 'something error')
        }

    }

    const handleRefund = async(id)=>{
        const token = localStorage.getItem('token')
        
        const res = await fetch(`${API}/api/booking/${id}/refund`,{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })

        const data = res.json()

        if(res.ok){
            window.location.reload()
        }else{
            alert(data.message || data.err || 'something error')
        }
    }

    const handleCancleOrder = async (car)=>{
        const token = localStorage.getItem('token')

        const res = await fetch(`${API}/api/booking/cancle`,{
            method : 'POST',
            headers:{
                'content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(car)
        })

        if (res.ok){
            console.log('here')
            setUserCars(prev => {
                return prev.filter(c => c.id !== car.id)})
            // window.location.reload()
        } 
    }

    const dateDeFormat = (data)=>{
        const date = new Date(data)
        const formattedDate = date.toLocaleDateString('en-GB'); 
        return formattedDate
    }

    if (loading) {
        return <div>Loading...</div>;
    }else
        return(
        <>
            <div className="h-screen bg-white">
                <Navbar></Navbar>
                <section className="flex md:flex-row flex-col justify-center md:gap-5 gap-1">
                    <div className="flex md:hidden w-full bg-gray-200">
                        <button onClick={()=>setPageState('user')} className={`font-RobotoMono text-sm px-2 py-1 hover:cursor-pointer  ${  pageState === 'user' ? 'bg-white' : 'text-gray-500 bg-gray-200'}`}>User</button>
                        <button onClick={()=>setPageState('account')} className={`font-RobotoMono text-sm px-2 py-2 hover:cursor-pointer  ${  pageState === 'account' ? 'bg-white' : 'text-gray-500 bg-gray-200'}`}>Account</button>
                        <button onClick={()=>setPageState('history')} className={`font-RobotoMono text-sm px-2 py-2 hover:cursor-pointer  ${  pageState === 'history' ? 'bg-white' : 'text-gray-500 bg-gray-200'}`}>History</button>
                    </div>
                    <div className="h-full bg-white mt-5 p-5 w-70 pt-4 shadow-xl rounded md:block hidden">
                        <div className="flex items-center gap-2">
                            <img src={userLogo} alt="" className="h-10"/>
                            <h1 className="font-RobotoMono sm:text-md text-sm font-normal">{user.username}</h1>
                        </div>
                        <hr className="text-gray-300 my-3" />
                        <div className="">
                            <h1><button onClick={()=>setPageState('user')} className={`font-RobotoMono text-sm hover:cursor-pointer hover:text-red-500 ${  pageState === 'user' ? '' : 'text-gray-500'}`}>User</button></h1>
                            <h1><button onClick={()=>setPageState('account')} className={`font-RobotoMono text-sm hover:cursor-pointer hover:text-red-500 ${  pageState === 'account' ? '' : 'text-gray-500'}`}>Account</button></h1>
                            <h1><button onClick={()=>setPageState('history')} className={`font-RobotoMono text-sm hover:cursor-pointer hover:text-red-500 ${  pageState === 'history' ? '' : 'text-gray-500'}`}>History</button></h1>
                        </div>  
                    </div>
                    <div className="h-full bg-white sm:mt-5 p-3 sm:p-5 md:w-230 shadow-xl min-h-90">
                        <h1 className="font-RobotoMono text-md">
                            {pageState == 'user' && 'User Information'}
                            {pageState == 'account'  && 'account Information'}
                            {pageState == 'history'  && 'history'}
                        </h1>
                        <h1 className="font-RobotoMono text-xs text-gray-500">
                            {pageState == 'user' && 'Manage user account'}
                            {pageState == 'account'  && 'account Information setting'}
                            {pageState == 'history'  && 'user rent history'}
                        </h1>
                        <hr className="text-gray-300 my-3"/>
                        { pageState == 'user' && 
                        <>
                            <table className="border-separate border-spacing-2">
                            <tbody>
                                <tr>
                                    <th className="font-medium font-RobotoMono text-gray-500 text-right text-md">Username</th>
                                    <th className="font-medium font-RobotoMono px-2 text-left text-md">{user.username}</th>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">Name</td>
                                    <td>{UserInformationUI.name === false ? 
                                        <>  
                                            <div className="flex ml-2 gap-2">
                                                <p className="">{user.fname || ""}</p>
                                                <button onClick={()=>{setUserInformationUI({...UserInformationUI, name : true})}} className="underline text-sm hover:cursor-pointer text-blue-700">edit</button>
                                            </div>
                                        </> : <>
                                            <input onChange={(e)=>setUser({...user, fname : e.target.value})} type="text" value={user.fname || ""} className="border-gray-300 border-2 mx-2 px-2" />
                                        </>}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">Email</td>
                                    <td className="px-2">{user.email}</td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">Telephone Number</td>
                                    <td className="">{UserInformationUI.tel === false ? <>
                                            <div className="flex gap-2 ml-2">
                                                <p className="">{user.tel || ''}</p>
                                                <button onClick={()=>setUserInformationUI({...UserInformationUI, tel : true})} className="underline text-blue-700 text-sm hover:cursor-pointer">edit</button>
                                            </div>
                                        </> : <>
                                            <input onChange={(e)=>setUser({...user, tel : e.target.value})} type="number" value={user.tel || ''} className="border-gray-300 border-2 mx-2 px-2"/>
                                        </>}
                                        
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">Sex</td>
                                    <td className="">
                                        <select value={user.sex || ""} onChange={(e)=>setUser({...user, sex : e.target.value})} name="" id="" className="border-gray-200 border-2 mx-2 px-1">
                                            <option value="" disabled hidden>--select--</option>
                                            <option value="male">male</option>
                                            <option value="female">female</option>
                                            <option value="none">don't want to say</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">Date of Birth</td>
                                    <td className="">
                                        {UserInformationUI.Dob === false ? <>
                                            <div className="flex ml-2 gap-2">
                                                <p>{user.birthdate || ''}</p>    
                                                <button onClick={()=>setUserInformationUI({...UserInformationUI, Dob : true})} className="underline text-blue-700 text-sm hover:cursor-pointer">edit</button>
                                            </div>
                                            
                                        </> : <>
                                            <input onChange={(e)=>setUser({...user, birthdate : e.target.value})} value={user.birthdate || ''} type="date" className="mx-2 px-2 border-gray-200 border-2"/>
                                        </>} 
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><button type="button" onClick={handleUpdate} className="mx-2 bg-orange-500 text-white px-2 rounded hover:cursor-pointer">save</button></td>
                                </tr>
                            </tbody>
                        </table>
                        </>}
                        {pageState == 'account' &&
                        <>
                            <table className="border-separate border-spacing-x-2 border-spacing-y-2">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-500 text-right text-md">Card Number</td>
                                        <td>{cardInformationUI.cardNumber === false ? <>
                                            <div className="flex gap-2">
                                                <p>{userPayment.card_number || ''}</p>
                                                <button onClick={()=>setCardInformationUI({...cardInformationUI, cardNumber : true})} className="underline text-blue-700 text-sm hover:cursor-pointer">edit</button>
                                            </div>
                                        </> : <>
                                            <input onChange={(e)=>{setUserPayment({...userPayment, card_number : e.target.value})}} value={userPayment.card_number || ''} type="text" className="border-gray-200 border-2 rounded px-1 w-full"/>
                                        </>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500 text-right text-md">EXP.</td>
                                        <td className="flex gap-1">
                                            { cardInformationUI.exp === false ? <>
                                                <p>{userPayment.ex_month || ''} / {userPayment.ex_year || ''}</p>
                                                <button onClick={()=>setCardInformationUI({...cardInformationUI, exp : true})} className="underline text-blue-700 text-sm hover:cursor-pointer">edit</button>
                                            </> : <>
                                                <input required onChange={(e) => {
                                                    let val = e.target.value;

                                                    val = parseInt(val);

                                                    if (val < 1) val = 1;
                                                    if (val > 12) val = 12;

                                                    setUserPayment({...userPayment, ex_month : val});
                                                }} value={userPayment.ex_month || ''} type="number" min={1} max={12} placeholder="MM" className="border-gray-200 border-2 rounded px-1 w-12" />
                                                <h1 className="mx-2 text-xl">/</h1>
                                                <input required onChange={(e) => {
                                                    let val = e.target.value;

                                                    val = parseInt(val);

                                                    if (val < 1) val = 1;
                                                    if (val > 99) val = 99;

                                                    setUserPayment({...userPayment, ex_year : val});
                                                }} value={userPayment.ex_year || ''} type="number" min={0} max={99} placeholder="YY" className="border-gray-200 border-2 rounded px-1 w-12" />
                                            </>}
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" text-gray-500 text-right text-md">CVV</td>
                                        <td>{cardInformationUI.cvv === false ? <>
                                            <div className="flex gap-2">
                                                <p>{userPayment.cvv || ''}</p>
                                                <button onClick={()=>setCardInformationUI({...cardInformationUI, cvv : true})} className="underline text-blue-700 text-sm hover:cursor-pointer">edit</button>
                                            </div>
                                        </> : <>
                                             <input required value={userPayment.cvv || ''} onChange={(e)=>{setUserPayment({...userPayment, cvv : e.target.value})}} type="text" maxLength={3} className="border-gray-200 border-2 rounded px-1 w-15"/>
                                        </>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" text-gray-500 text-right text-md">Name on card</td>
                                        <td>{cardInformationUI.name === false ? <>
                                            <div className="flex gap-2">
                                                <p>{userPayment.cardname || ''}</p>
                                                <button onClick={()=>setCardInformationUI({...cardInformationUI, name : true})} className="underline text-blue-700 text-sm hover:cursor-pointer">edit</button>
                                            </div>
                                            
                                        </> : <>
                                            <input required value={userPayment.cardname || ''} onChange={(e)=>{setUserPayment({...userPayment, cardname : e.target.value})}} type="text" className="border-gray-200 border-2 rounded px-1 w-full"/>
                                        </>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500 text-right text-md">Bank</td>
                                        <td>
                                            <select required value={userPayment.bank || ''} onChange={(e)=>{setUserPayment({...userPayment, bank : e.target.value})}} className="border-gray-200 border-2 rounded" name="bank" id="bank">
                                                <option value="" disabled hidden>--SELECT-BANK--</option>
                                                <option value="Bangkok">Bangkok Bank</option>
                                                <option value="Kasikorn">Kasikorn</option>
                                                <option value="SCB">Siam Commercial Bank (SCB)</option>
                                                <option value="krungsri">Krungsri</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button onClick={handleAccountUpdate} type="button" className="bg-orange-500 text-white font-RobotoMono px-2 rounded hover:cursor-pointer">save</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                        }
                        {pageState == 'history' && <>
                            <div className="w-full flex flex-col gap-3">
                                {userCars.map((car,index)=>{
                                    return (
                                        <div className="flex justify-center shadow">
                                            <div className="flex flex-row rounded sm:h-35 h-50 w-full">
                                                <div className="sm:py-2 sm:pl-2 p-2 md:h-full h-30 md:w-50 w-35 shrink-0">
                                                    <img className="h-full w-full  object-cover rounded" src={car.image_url} alt="" />
                                                </div>
                                                <div className="p-2 flex flex-col justify-between w-full min-w-0">
                                                    <div className="">
                                                        <p className="text-md font-RobotoMono truncate">{car.year} {car.brand} {car.model} {car.trim}</p>
                                                        <p className="font-RobotoMono text-xs text-gray-500">( {car.plate}) @{car.location_name}</p>
                                                        <p className="font-RobotoMono sm:text-sm text-xs text-gray-900">Booking period: {dateDeFormat(car.start_date).replaceAll("-","/")} - {dateDeFormat(car.end_date).replaceAll("-","/")}</p>
                                                    </div>
                                                    <p className="sm:hidden block text-green-600 mr-5">{car.price}</p>
                                                    <div className="flex gap-2">
                                                        {(()=>{
                                                            const startDate = new Date(car.start_date)
                                                            startDate.setHours(0,0,0,0)
                                                            const endDate = new Date(car.end_date)
                                                            endDate.setHours(0,0,0,0)

                                                            if (today < startDate){
                                                                return (
                                                                    <button onClick={() => handleCancleOrder(car)} className="bg-red-500 text-white font-RobotoMono px-2 sm:text-sm text-xs p-1 rounded hover:cursor-pointer">
                                                                        Cancel
                                                                    </button>
                                                                )
                                                            }
                                                            if (today >= startDate && today <= endDate){
                                                                if (car.status == 'success'){
                                                                    return (
                                                                        <>
                                                                        <button
                                                                            onClick={() => handleCancleOrder(car)}
                                                                            className="bg-red-500 text-white font-RobotoMono px-2 sm:text-base text-sm p-1 rounded hover:cursor-pointer"
                                                                        >Cancel</button>

                                                                        <button
                                                                            onClick={() => handleReceivedCar(car.id)}
                                                                            className="bg-green-500 text-white font-RobotoMono px-2 sm:text-base text-sm p-1 rounded hover:cursor-pointer"
                                                                        >Received</button>
                                                                    </>
                                                                    )
                                                                }
                                                                return(
                                                                    <p className="text-green-500 font-RobotoMono sm:text-base text-sm p-1">
                                                                        {car.status}
                                                                    </p>
                                                                )
                                                            }

                                                            if (car.status === 'success'){
                                                                return (
                                                                    <button onClick={()=>handleRefund(car.id)} className="bg-green-500 text-white font-RobotoMono px-2 sm:text-base text-sm p-1 rounded hover:cursor-pointer">
                                                                        refund
                                                                    </button>
                                                                )
                                                            }

                                                            return (
                                                                    <p className="text-red-500 font-RobotoMono sm:text-base text-sm p-1">
                                                                        {car.status}
                                                                    </p>
                                                            )
                                                        })()} 
                                                        {/* <button onClick={()=>{handleCancleOrder(car)}} className="bg-red-500 text-white font-RobotoMono px-2 sm:text-sm text-xs p-1 rounded hover:cursor-pointer">Cancle</button>
                                                        <button onClick={()=>{handleReceivedCar(car.id)}} className="bg-green-500 text-white font-RobotoMono px-2 sm:text-sm text-xs p-1 rounded hover:cursor-pointer">Received</button>
                                                        <p className="text-green-500 font-RobotoMono sm:text-sm text-xs p-1 rounded hover:cursor-pointer">{car.status}</p> */}
                                                    </div>
                                                </div>
                                                <div className="sm:flex flex-col justify-center hidden">
                                                    <p className="text-green-600 mr-5">{car.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>}   
                    </div>
                </section>
                {isAdmin === true ? 
                <section className="my-10">
                    <AdminManage />
                </section> : 
                <></>
                }
            </div>

        </>
    )
}

export default Manage