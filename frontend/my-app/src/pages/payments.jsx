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

    const [paymentInfo, setPaymentInfo] = useState(null)
    const [userPayment, setUserPayment] = useState({
        cardNumber : '',
        exMonth : '',
        exYear : '',
        CVV : '',
        Name : '',
        Bank : '',
        tel : '' 
    })

    const PaymentHandle = async ()=>{
        if (!paymentInfo)
            return;

        try{
            const res = await fetch(`http://localhost:3000/api/payment/transcript`,{
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
            console.log(data)
        }  
        })
    }, [])

    useEffect(()=>{
        if(!car || !bookingData) return
        
        const fetchPayment = async() =>{
            try{
                const res = await fetch(`http://localhost:3000/api/payment`,{
                method : 'POST',
                headers :{
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    carID: car.id,
                    startDate: bookingData.startDate,
                    endDate: bookingData.endDate
                })
                })
                const result = await res.json()
                console.log(result)
                setPaymentInfo(result)
            }catch (err){
                console.error(err)
            }
        }
        fetchPayment()
       
    }, [car, bookingData])

    return(
        <>
            <Navbar></Navbar>
            <section className="flex h-screen justify-center items-center">
                <div className="shadow-xl p-5">
                    <h1 className="font-RobotoMono text-2xl font-bold">Payment</h1>
                    <div className="flex gap-10">
                        <form>
                            <table className="border-separate border-spacing-x-2 border-spacing-y-2">
                                <tr>
                                    <th className="text-right font-RobotoMono">Card Number</th>
                                    <th><input onChange={(e)=>{setUserPayment({...userPayment, cardNumber : e.target.value})}} type="text" className="border-gray-500 border-2 rounded px-1 w-full" required /></th>
                                </tr>
                                <tr>
                                    <td className="text-right font-RobotoMono">Expire Date</td>
                                    <td className="flex">
                                        <input required onChange={(e) => {
                                            let val = e.target.value;

                                            val = parseInt(val);

                                            if (val < 1) val = 1;
                                            if (val > 12) val = 12;

                                            setUserPayment({...userPayment, exMonth : val});
                                        }} type="number" min={1} max={12} placeholder="MM" className="border-gray-500 border-2 rounded px-1 w-17" />
                                        <h1 className="mx-2 text-xl">/</h1>
                                        <input required onChange={(e) => {
                                            let val = e.target.value;

                                            val = parseInt(val);

                                            if (val < 1) val = 1;
                                            if (val > 99) val = 99;

                                            setUserPayment({...userPayment, exYear : val});
                                        }} type="number" min={0} max={99} placeholder="YY" className="border-gray-500 border-2 rounded px-1 w-17" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right font-RobotoMono">CVV (3 digits)</td>
                                    <td><input required onChange={(e)=>{setUserPayment({...userPayment, CVV : e.target.value})}} type="text" maxLength={3} className="border-gray-500 border-2 rounded px-1 w-15"/></td>
                                </tr>
                                <tr>
                                    <td className="text-right font-RobotoMono">Name</td>
                                    <td><input required onChange={(e)=>{setUserPayment({...userPayment, Name : e.target.value})}} type="text" className="border-gray-500 border-2 rounded px-1 w-full"/></td>
                                </tr>
                                <tr>
                                    <td className="text-right font-RobotoMono">Bank</td>
                                    <td>
                                        <select required defaultValue={''} onChange={(e)=>{setUserPayment({...userPayment, Bank : e.target.value})}} className="border-gray-500 border-2 rounded" name="bank" id="bank">
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
                                        <h1 className="text-right font-RobotoMono">tel.</h1>
                                    </td>
                                    <td><input type="text" onChange={(e)=>{setUserPayment({...userPayment, tel : e.target.value})}} className="border-gray-500 border-2 rounded px-1 w-full"/></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <button type="button" onClick={PaymentHandle} className="bg-orange-500 text-white font-RobotoMono px-2 rounded hover:cursor-pointer">submit</button>
                                    </td>
                                </tr>
                            </table>
                        </form>
                        <div className="border-l px-10">
                            <h1 className="font-RobotoMono text-xl pb-2">payment info</h1>
                            <table className="">
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
                                    <td className="w-50 border pl-1">{bookingData.startDate}</td>
                                </tr>
                                <tr>
                                    <td className="border"><h1 className="w-full px-1">End Date</h1></td>
                                    <td className="w-50 border pl-1">{bookingData.startDate}</td>
                                </tr>
                            </table>
                            {paymentInfo? 
                            <h1 className="pt-2 font-RobotoMono">tatal: {paymentInfo.price} for {paymentInfo.days} day</h1>
                            : 'loading...'}
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
}

export default Payment
