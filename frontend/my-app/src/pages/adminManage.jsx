import Navbar from "./navbar"
import '../App.jsx'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import userLogo from '../assets/user.svg'

function adminManage(){
    const [pageStatus , setPageStatus] = useState(null)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    return (
        <>
            <div className="flex justify-center gap-5 mb-5">
                <button onClick={()=>setPageStatus('rentalCar')} className="px-5 py-1 rounded bg-yellow-200 hover:cursor-pointer">Update Rental Car</button>
                <button onClick={()=>setPageStatus('location')} className="px-5 py-1 rounded bg-yellow-200 hover:cursor-pointer">Update Location</button>
            </div>
            <div className="flex justify-center">
                {pageStatus === null && <>
                </>}
                {pageStatus === 'rentalCar' && <>
                    <div className="w-[50%] mx-[15%] rounded shadow-xl mb-5">
                        <div className="flex justify-center  bg-yellow-200 rounded-t-md">
                            <p className="py-1 font-RobotoMono ">Car Rental Update</p>
                        </div>
                        <div className="flex pt-2">
                            <div className="w-[50%] mb-5 flex justify-center">
                                <table className="border-separate border-spacing-y-2 w-full mr-2">
                                    <tbody>
                                        <tr>
                                            <td className="text-right px-2">brand's name</td>
                                            <td><input type="text" className="bg-gray-100 rounded border-gray-200 border-1 w-full"/></td>
                                        </tr>
                                        <tr>
                                            <td className="text-right px-2">model</td>
                                            <td><input type="text" className="bg-gray-100 rounded border-gray-200 border-1 w-full"/></td>
                                        </tr>
                                        <tr>
                                            <td className="text-right px-2">trim</td>
                                            <td><input type="text" className="bg-gray-100 rounded border-gray-200 border-1 w-full"/></td>
                                        </tr>
                                        <tr>
                                            <td className="text-right px-2">year</td>
                                            <td><input type="number" className="bg-gray-100 rounded border-gray-200 border-1 w-full"/></td>
                                        </tr>
                                        <tr>
                                            <td className="text-right px-2">plate</td>
                                            <td><input type="text" className="bg-gray-100 rounded border-gray-200 border-1 w-full"/></td>
                                        </tr>
                                        <tr>
                                            <td className="text-right px-2">price</td>
                                            <td><input type="number" className="bg-gray-100 rounded border-gray-200 border-1 w-full"/></td>
                                        </tr>
                                        <tr >
                                            <td className="text-right px-2 align-top">description</td>
                                            <td><textarea className="bg-gray-100 rounded border w-full h-20 px-2 py-1"></textarea></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="w-[50%] ml-2">
                                <div className="flex">
                                    <input 
                                        type="file" 
                                        id="fileInput" 
                                        className="hidden"
                                        onChange={(e)=>{
                                            const selected = e.target.files[0]
                                            setImage(selected)

                                            if (selected) {
                                                setPreview(URL.createObjectURL(selected))
                                            }
                                        }}
                                    />
                                    <label htmlFor="fileInput" className="px-2 py-1 bg-gray-400 text-white rounded cursor-pointer"
                                    >Upload Image</label>
                                </div>
                                {preview && (
                                    <>
                                        <img 
                                        src={preview} 
                                        alt="preview" 
                                        className="mt-3 h-40 object-cover rounded border"
                                        />
                                        <p>{image.name}</p>
                                        <button onClick={()=>{
                                            setImage(null)
                                            setPreview(null)
                                            }} className="hover:cursor-pointer hover:underline text-red-500">cancel</button>
                                    </>
                                )} 
                            </div>
                            
                        </div>
                       
                        
                    </div>
                </>}
                {pageStatus === 'location' && <>
                    <p>location</p>
                </>}
            </div>
        </>
    )
}

export default adminManage