import Navbar from "./navbar"
import '../App.jsx'
import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"

function Payment(){
    const location = useLocation()
    const navigate = useNavigate()
    const {bookingData, car} = location.state || {}
    const [user, setUser] = useState(null)
    console.log(bookingData)
    console.log(car)

    const [errorMSG, setErrorMSG] = useState('')

    const [paymentInfo, setPaymentInfo] = useState(null)
    const [userPayment, setUserPayment] = useState({
        card_number : '',
        ex_month : '',
        ex_year : '',
        cvv : '',
        cardname : '',
        bank : '',
        user_id : '',
        tel : '' 
    })

    const PaymentHandle = async ()=>{
        if (!paymentInfo || !userPayment || !bookingData || !user)
            return;
        try{
            const res = await fetch(`/api/payment/transcript`,{
                method : 'POST',
                headers :{
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    paymentInfo : paymentInfo,
                    userPayment : userPayment,
                    bookingData : bookingData,
                    carID : car.id,
                    userID : user.id
                })
            })
            const result = await res.json();
            if (res.ok){
                setErrorMSG(result.message || result.error)
                return 
            }
            navigate('/manage')

        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
            return
        }

        fetch(`/api/user/me`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {{
            setUser(data)
            setUserPayment({...userPayment, tel : user.tel})
            console.log('user', data)
        }  
        })

        fetch(`/api/user/account`,{
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=> res.json())
        .then(data=>{
            setUserPayment(data)
            console.log(data)
    })

    }, [])

    useEffect(()=>{
        if(!car || !bookingData) return <div>Invalid access (no booking data)</div>
        
        const fetchPayment = async() =>{
            try{
                const res = await fetch(`/api/payment`,{
                method : 'POST',
                headers :{
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    carID: car.id,
                    start_date: bookingData.start_date.toISOString().split('T')[0],
                    end_date: bookingData.end_date.toISOString().split('T')[0]
                })
                })
                const result = await res.json()
                console.log('price : ', result)
                setPaymentInfo(result)
            }catch (err){
                console.error(err)
            }
        }
        fetchPayment()
       
    }, [car, bookingData])

    return(
        <>
            <div className="absolute top-10 w-full h-screen"><img className="w-full h-full object-cover" src={car.image_url} alt="" /></div>
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar ></Navbar>
            </div>
            <div className="absolute top-10 h-full inset-0 bg-black/30 z-0"></div>
            <div className="absolute top-10 w-full">
                <section className="flex h-screen justify-center items-center z-50">
                    <div className="shadow-xl p-5 bg-white rounded">
                        <h1 className="font-RobotoMono text-2xl font-bold">Payment</h1>
                        <div className="flex sm:flex-row flex-col gap-10">
                            <form>
                                <table className="border-separate border-spacing-x-2 border-spacing-y-2">
                                    <tbody>
                                        <tr>
                                            <th className="text-right font-normal font-RobotoMono sm:text-md text-sm">Card Number</th>
                                            <th><input value={userPayment.card_number || ''} onChange={(e)=>{setUserPayment({...userPayment, card_number : e.target.value})}} type="text" className="border-gray-500 font-normal border-2 rounded px-1 w-full" required /></th>
                                        </tr>
                                        <tr>
                                            <td className="text-right font-RobotoMono sm:text-md text-sm">Expire Date</td>
                                            <td className="flex">
                                                <input value={userPayment.ex_month || ''} required onChange={(e) => {
                                                    let val = e.target.value;

                                                    val = parseInt(val);

                                                    if (val < 1) val = 1;
                                                    if (val > 12) val = 12;

                                                    setUserPayment({...userPayment, ex_month : val});
                                                }} type="number" min={1} max={12} placeholder="MM" className="border-gray-500 border-2 rounded px-1 w-17" />
                                                <h1 className="mx-2 text-xl">/</h1>
                                                <input value={userPayment.ex_year || ''} required onChange={(e) => {
                                                    let val = e.target.value;

                                                    val = parseInt(val);

                                                    if (val < 1) val = 1;
                                                    if (val > 99) val = 99;

                                                    setUserPayment({...userPayment, ex_year : val});
                                                }} type="number" min={0} max={99} placeholder="YY" className="border-gray-500 border-2 rounded px-1 w-17" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-right font-RobotoMono sm:text-md text-sm">CVV</td>
                                            <td><input value={userPayment.cvv || ''} required onChange={(e)=>{setUserPayment({...userPayment, cvv : e.target.value})}} type="text" maxLength={3} className="border-gray-500 border-2 rounded px-1 w-15"/></td>
                                        </tr>
                                        <tr>
                                            <td className="text-right font-RobotoMono sm:text-md text-sm">Name</td>
                                            <td><input value={userPayment.cardname || ''} required onChange={(e)=>{setUserPayment({...userPayment, cardname : e.target.value})}} type="text" className="border-gray-500 border-2 rounded px-1 w-full"/></td>
                                        </tr>
                                        <tr>
                                            <td className="text-right font-RobotoMono sm:text-md text-sm">Bank</td>
                                            <td>
                                                <select required value={userPayment.bank || ''} onChange={(e)=>{setUserPayment({...userPayment, bank : e.target.value})}} className="border-gray-500 border-2 rounded md:w-auto w-50" name="bank" id="bank">
                                                    <option value="" disabled hidden>--SELECT-BANK--</option>
                                                    <option value="Bangkok">Bangkok Bank</option>
                                                    <option value="Kasikorn">Kasikorn</option>
                                                    <option value="SCB">Siam Commercial Bank (SCB)</option>
                                                    <option value="Krungsri">Krungsri</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h1 className="text-right font-RobotoMono sm:text-md text-sm">tel.</h1>
                                            </td>
                                            <td><input required type="number" onChange={(e)=>setUserPayment({...userPayment, tel : e.target.value})} value={userPayment?.tel || ''} className="border-gray-500 border-2 rounded px-1 w-full"/></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <button type="button" onClick={PaymentHandle} className="bg-orange-500 text-white font-RobotoMono px-2 rounded hover:cursor-pointer">submit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    
                                </table>
                                <p className="text-sm font-bold text-red-500">{errorMSG}</p>
                            </form>
                            <div className="sm:border-l lg:px-10 sm:px-5">
                                <h1 className="font-RobotoMono text-xl pb-2">payment info</h1>
                                <table className="">
                                    <tbody>
                                        <tr>
                                            <td className="border"><h1 className="w-full px-1">Brand</h1></td>
                                            <td className="w-50 border pl-1">{car.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className="border"><h1 className="w-full px-1">Model</h1></td>
                                            <td className="w-50 border pl-1">{car.model} {car.trim}</td>
                                        </tr>
                                        <tr>
                                            <td className="border"><h1 className="w-full px-1">Year</h1></td>
                                            <td className="w-50 border pl-1">{car.year}</td>
                                        </tr>
                                        <tr>
                                            <td className="border"><h1 className="w-full px-1">Plate</h1></td>
                                            <td className="w-50 border pl-1">{car.plate}</td>
                                        </tr>
                                        <tr>
                                            <td className="border"><h1 className="w-full px-1">Price/day</h1></td>
                                            <td className="w-50 border pl-1">{car.price}</td>
                                        </tr>
                                        <tr>
                                            <td className="border"><h1 className="w-full px-1">Start Date</h1></td>
                                            <td className="w-50 border pl-1">{bookingData.start_date.toISOString().split('T')[0]}</td>
                                        </tr>
                                        <tr>
                                            <td className="border"><h1 className="w-full px-1">End Date</h1></td>
                                            <td className="w-50 border pl-1">{bookingData.end_date.toISOString().split('T')[0]}</td>
                                        </tr>
                                    </tbody>
                                    
                                </table>
                                {paymentInfo? 
                                <h1 className="pt-2 font-RobotoMono">tatal: {paymentInfo.price} for {paymentInfo.days} day</h1>
                                : 'loading...'}
                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>

        </>
    )
}

export default Payment
