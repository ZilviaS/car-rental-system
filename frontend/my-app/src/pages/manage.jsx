import Navbar from "./navbar"
import '../App.jsx'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import userLogo from '../assets/user.svg'

function Manage(){

    const [user, setUser] = useState({
        id : '',
        username : '',
        email : '',
        fname : '',
        tel : '',
        sex : '',
        birthdate : ''
    })
    const navigate = useNavigate()
    const [pageState, setPageState] = useState('user')
    const [userPayment, setUserPayment] = useState({
        cardNumber : '',
        exMonth : '',
        exYear : '',
        CVV : '',
        Name : '',
        Bank : '',
        tel : '' 
    })

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
        .then(data => {
            setUser({...data,
                birthdate: data.birthdate?.split('T')[0]
            })
        })
    },[])

    const handleUpdate = ()=>{
        const token = localStorage.getItem('token')
        fetch(`/api/user`,{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
    }

    if (!user) {
        return <div>Loading...</div>;
    }else
        return(
        <>
            <div className="h-screen bg-gray-200">
                <Navbar></Navbar>
                <section className="flex justify-center gap-5">
                    <div className="h-full bg-white mt-5 p-5 w-70">
                        <div className="flex items-center gap-2">
                            <img src={userLogo} alt="" className="h-10"/>
                            <h1 className="font-RobotoMono">{user.username}</h1>
                        </div>
                        <hr className="text-gray-300 my-3" />
                        <div className="">
                            <h1><button onClick={()=>setPageState('user')} className="font-RobotoMono hover:cursor-pointer hover:text-red-500">User Info</button></h1>
                            <h1><button onClick={()=>setPageState('account')} className="font-RobotoMono hover:cursor-pointer hover:text-red-500">Account</button></h1>
                            <h1><button onClick={()=>setPageState('history')} className="font-RobotoMono hover:cursor-pointer hover:text-red-500">History</button></h1>
                        </div>  
                    </div>
                    <div className="h-full bg-white mt-5 p-5 w-200">
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
                                    <td className="text-right text-gray-500">name</td>
                                    <td><input onChange={(e)=>setUser({...user, fname : e.target.value})} type="text" value={user.fname || ""} className="border-gray-300 border-2 mx-2 px-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">email</td>
                                    <td className="px-2">{user.email}</td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">telephone number</td>
                                    <td className=""><input onChange={(e)=>setUser({...user, tel : e.target.value})} type="number" value={user.tel || ''} className="border-gray-300 border-2 mx-2 px-2"/></td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">sex</td>
                                    <td className="">
                                        <select value={user.sex || ""} onChange={(e)=>setUser({...user, sex : e.target.value})} name="" id="" className="border-gray-200 border-2 mx-2 rounded px-2">
                                            <option value="">--select--</option>
                                            <option value="male">male</option>
                                            <option value="female">female</option>
                                            <option value="none">don't want to say</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">date of birth</td>
                                    <td className="">
                                        <input onChange={(e)=>setUser({...user, birthdate : e.target.value})} value={user.birthdate || ''} type="date" className="mx-2 px-2 border-gray-200 border-2"/>
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
                                        <td><input onChange={(e)=>{setUserPayment({...userPayment, cardNumber : e.target.value})}} type="text" className="border-gray-200 border-2 rounded px-1 w-full"/></td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500 text-right text-md">Expire Date</td>
                                        <td className="flex">
                                            <input required onChange={(e) => {
                                                let val = e.target.value;

                                                val = parseInt(val);

                                                if (val < 1) val = 1;
                                                if (val > 12) val = 12;

                                                setUserPayment({...userPayment, exMonth : val});
                                            }} type="number" min={1} max={12} placeholder="MM" className="border-gray-200 border-2 rounded px-1 w-17" />
                                            <h1 className="mx-2 text-xl">/</h1>
                                            <input required onChange={(e) => {
                                                let val = e.target.value;

                                                val = parseInt(val);

                                                if (val < 1) val = 1;
                                                if (val > 99) val = 99;

                                                setUserPayment({...userPayment, exYear : val});
                                            }} type="number" min={0} max={99} placeholder="YY" className="border-gray-200 border-2 rounded px-1 w-17" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" text-gray-500 text-right text-md">CVV (3 digits)</td>
                                        <td><input required onChange={(e)=>{setUserPayment({...userPayment, CVV : e.target.value})}} type="text" maxLength={3} className="border-gray-200 border-2 rounded px-1 w-15"/></td>
                                    </tr>
                                    <tr>
                                        <td className=" text-gray-500 text-right text-md">Name</td>
                                        <td><input required onChange={(e)=>{setUserPayment({...userPayment, Name : e.target.value})}} type="text" className="border-gray-200 border-2 rounded px-1 w-full"/></td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500 text-right text-md">Bank</td>
                                        <td>
                                            <select required defaultValue={''} onChange={(e)=>{setUserPayment({...userPayment, Bank : e.target.value})}} className="border-gray-200 border-2 rounded" name="bank" id="bank">
                                                <option value="" disabled hidden>--SELECT-BANK--</option>
                                                <option value="Bangkok">Bangkok Bank</option>
                                                <option value="Kasikorn">Kasikorn</option>
                                                <option value="SCB">Siam Commercial Bank (SCB)</option>
                                                <option value="Krungsri">Krungsri</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button type="button" className="bg-orange-500 text-white font-RobotoMono px-2 rounded hover:cursor-pointer">submit</button>
                                        </td>
                                    </tr>
                                </tbody>
                                
                            </table>
                        </>
                        }
                        {/* {pageState == 'history' && <>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>plate</td>
                                        <td>brand</td>
                                        <td>model</td>
                                        <td>year</td>
                                        <td>description</td>
                                        <td>status</td>
                                        <td>price</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>} */}
                        
                    </div>
                </section>
            </div>
        </>
    )
}

export default Manage