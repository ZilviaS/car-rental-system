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
                            <h1><button className="font-RobotoMono hover:cursor-pointer hover:text-red-500">User Info</button></h1>
                            <h1><button className="font-RobotoMono hover:cursor-pointer hover:text-red-500">Account</button></h1>
                            <h1><button className="font-RobotoMono hover:cursor-pointer hover:text-red-500">History</button></h1>
                        </div>  
                    </div>
                    <div className="h-full bg-white mt-5 p-5 w-200">
                        <h1 className="font-RobotoMono text-md">User Information</h1>
                        <h1 className="font-RobotoMono text-xs text-gray-500">manage user account</h1>
                        <hr className="text-gray-300 my-3"/>
                        <table className="border-separate border-spacing-2">
                            <tbody>
                                <tr>
                                    <th className="font-medium font-RobotoMono text-gray-500 text-right text-md">Username</th>
                                    <th className="font-medium font-RobotoMono px-2 text-left text-md">{user.username}</th>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">name</td>
                                    <td><input onChange={(e)=>setUser({...user, fname : e.target.value})} type="text" value={user.fname || ""} className="border-gray-300 border-2 mx-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">email</td>
                                    <td className="px-2">{user.email}</td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">telephone number</td>
                                    <td className=""><input onChange={(e)=>setUser({...user, tel : e.target.value})} type="number" value={user.tel || ''} className="border-gray-300 border-2 mx-2"/></td>
                                </tr>
                                <tr>
                                    <td className="text-right text-gray-500">sex</td>
                                    <td className="">
                                        <select value={user.sex || ""} onChange={(e)=>setUser({...user, sex : e.target.value})} name="" id="" className="border-gray-200 border-2 mx-2 rounded">
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
                                        <input onChange={(e)=>setUser({...user, birthdate : e.target.value})} value={user.birthdate || ''} type="date" className="mx-2 text-sm"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><button type="button" onClick={handleUpdate} className="mx-2 bg-orange-500 text-white px-2 rounded hover:cursor-pointer">save</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Manage