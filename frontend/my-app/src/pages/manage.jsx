import Navbar from "./navbar"
import '../App.jsx'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Manage(){

    const [user, setUser] = useState(null)
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
            setUser(data)
        })
    },[])

    useEffect(()=>{
        
    },user)


    return(
        <>
            <div className="h-screen bg-gray-200">
                <Navbar></Navbar>
                <section>
                    <div>
                        
                    </div>
                </section>
            </div>
        </>
    )
}

export default Manage