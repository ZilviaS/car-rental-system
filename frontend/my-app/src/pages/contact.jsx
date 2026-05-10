import { useState } from 'react'
import Navbar from './navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import bg from '../assets/background.jpg'
import '../App.css'
import ContactLogo from '../assets/contact.svg?react'
import EmailLogo from '../assets/email.svg?react'
import TelephoneLogo from '../assets/telephone.svg?react'
import LocationLogo from '../assets/location.svg?react'
import EducationLogo from '../assets/education.svg?react'
import ProfilePic from '../assets/profilePicture.jpg'

function Contact(){

    const navigate = useNavigate()

    return(
        <>
            <section className='min-h-screen'>
                <Navbar></Navbar>
                <div className='flex justify-center min-h-screen'>
                    <div className='lg:w-[25%] w-[40%] bg-gray-200'>
                        <div className='flex justify-center mt-10'>
                            <img src={ProfilePic} className='w-[50%] rounded-full shadow-xl' />
                        </div>
                        <div className='w-full justify-center items-center my-10 flex flex-col gap-10'>
                            <div className='w-[80%]'>
                                <div className='flex gap-3 items-center'>
                                    <div className='bg-gray-600 flex justify-center items-center p-1 rounded'>
                                        <ContactLogo className="w-5 h-5 text-white" />
                                    </div>
                                    <h1 className='font-RobotoMono text-2xl'>CONTACT</h1>
                                </div>
                                <hr className='text-gray-500 mt-2'/>
                                <div className='ml-1 mt-2'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='pr-2'><EmailLogo className="w-5 h-5 text-gray-600"/></td>
                                                <td className='text-gray-800'>prepatjarundechakorn@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <td className='pr-2'><TelephoneLogo className="w-5 h-5 text-gray-600"/></td>
                                                <td className='text-gray-800'>(+66) 85-111-5841</td>
                                            </tr>
                                            <tr>
                                                <td className='pr-2'><LocationLogo className="w-5 h-5 text-gray-600"></LocationLogo></td>
                                                <td className='text-gray-800'>Bangkok, Thailand</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className='w-[80%]'>
                                <div className='flex gap-3'>
                                    <div className='bg-gray-600 flex justify-center items-center p-1 rounded'>
                                        <EducationLogo className="w-5 h-5 text-white" />
                                    </div>
                                    <h1 className='font-RobotoMono text-2xl '>EDUCATION</h1>
                                </div>
                                <hr className='text-gray-500 mt-2'/>
                                <div className='mt-2 ml-1 '>
                                    <p className='text-gray-800'>Computer Sciance</p>
                                    <p className='font-bold text-gray-800'>King Mongkut's Institute of Technology Ladkrabang</p>
                                    <div className='flex items-center gap-1'>
                                        <EducationLogo className="w-5 h-5 text-gray-600" />
                                        <p className='text-sm text-gray-600'>2022-2026</p>
                                    </div>
                                </div>   
                            </div>
                            <div className='w-[80%]'>
                                <div className='flex gap-3'>
                                    <div className='bg-gray-600 flex justify-center items-center p-1 rounded'>
                                        <EducationLogo className="w-5 h-5 text-white" />
                                    </div>
                                    <h1 className='font-RobotoMono text-2xl'>SKILLS</h1>
                                </div>
                                <hr className='text-gray-500 mt-2'/>
                                <div className='mt-2 ml-1 '>
                                    <p className='text-gray-800'>Language : C/C#, Java, Python, Javascript</p>
                                    <p className='text-gray-800'>React</p>
                                    <p className='text-gray-800'>TailwindCss</p>
                                    <p className='text-gray-800'>Node.js</p>
                                    <p className='text-gray-800'>Express.js</p>
                                    <p className='text-gray-800'>MongoDB</p>
                                    <p className='text-gray-800'>PostgreSQL</p>
                                    <p className='text-gray-800'>Unity</p>
                                </div>   
                            </div>
                            <div className='w-[80%]'>
                                <div className='flex gap-3'>
                                    <div className='bg-gray-600 flex justify-center items-center p-1 rounded'>
                                        <EducationLogo className="w-5 h-5 text-white" />
                                    </div>
                                    <h1 className='font-RobotoMono text-2xl'>Other Experience</h1>
                                </div>
                                <hr className='text-gray-500 mt-2'/>
                                <div className='mt-2 ml-1 '>
                                    <p className='text-gray-800'>Script Writer & Translator <br />@Sandwish Media</p>
                                </div>   
                            </div>
                            <div className='w-[80%]'>
                                <div className='flex gap-3'>
                                    <div className='bg-gray-600 flex justify-center items-center p-1 rounded'>
                                        <EducationLogo className="w-5 h-5 text-white" />
                                    </div>
                                    <h1 className='font-RobotoMono text-2xl'>Language</h1>
                                </div>
                                <hr className='text-gray-500 mt-2'/>
                                <div className='mt-2 ml-1 flex flex-col gap-3 mt-3'>
                                    <p className='text-gray-800'>Thai (Native)</p>
                                    <p className='text-gray-800'>English (Intermediate)</p>
                                </div>   
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className='lg:w-[75%] w-[60%] bg-white p-20'>
                        <div className='flex justify-center mb-10'>
                            <div>
                                <h1 className='font-RobotoMono text-5xl'>Prepat Jarundechakorn</h1>   
                                <h1 className='font-light text-xl pt-3 '>Junior Full-Stack Developer</h1>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <p className='font-medium text-gray-900 text-2xl'>About Me</p>
                                <hr className='my-2 text-gray-500'/>
                                <div>
                                    <p className='text-gray-900'>
                                        Computer Science student with hands
                                        on experience in developing real-time
                                        systems, simulation-based applications,
                                        and full-stack web applications. Built an
                                        award-winning vehicle simulation game
                                        and remote driving system. Strong
                                        interest in web development and
                                        backend systems. Currently seeking an
                                        internship or junior developer role to  
                                        further develop software engineering skills
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className='font-medium text-gray-900 text-2xl'>Project Experience</p>
                                <hr className='my-2 text-gray-500'/>
                                <div className='flex flex-col gap-3'>
                                    <div>
                                        <div className='flex justify-between'>
                                            <p className='font-RobotoMono font-bold'>Racing Game with Vehicle Simulation Project</p>
                                            <p className='font-bold'>2025</p>
                                        </div>
                                        <p>Tech stack: Unity, C#</p>
                                        <li className='ml-5 text-gray-500'>
                                            Developed a racing game focusing on vehicle control and physics-based mechanics
                                        </li>
                                        <li className='ml-5 text-gray-500'>
                                            Designed a customizable vehicle tuning system allowing players to adjust performance parameters for different driving conditions
                                        </li>
                                        <li className='ml-5 text-gray-500'>
                                            Implemented physics-based gameplay mechanics to simulate realistic driving behavior
                                        </li>
                                        <li className='ml-5 text-amber-500'>
                                            Awarded Outstanding Senior Project Award at KMITL INNOVATION EXPO 2025
                                        </li>  
                                        <a className='ml-1 hover:underline hover:cursor-pointer' href='https://github.com/ZilviaS/CarProject.git'>https://github.com/ZilviaS/CarProject.git</a>
                                    </div>
                                    <div>
                                        <div className='flex justify-between'>
                                            <p className='font-RobotoMono font-bold'>Remote Virtual driving simulation using RC Car (Thesis)</p>
                                            <p className='font-bold'>2026</p>
                                        </div>
                                        <p className=''>Tech stack: Python, OpenCV, Raspberry Pi, Unity, C#, WebRTC</p>
                                        <li className='ml-5 text-gray-500'>
                                            Developed a remote-controlled driving simulation system with real-time video feedback
                                        </li>
                                        <li className='ml-5 text-gray-500'>
                                            Designed and implemented communication between hardware and software componenets
                                        </li>
                                        <li className='ml-5 text-gray-500'>
                                            Processed video input and performed image undistortion using openCV
                                        </li>
                                        <li className='ml-5 text-gray-500'>
                                            Built basic engine and transmission simulation models
                                        </li>  
                                        <a className='ml-1 hover:underline hover:cursor-pointer' href='https://github.com/ZilviaS/Remote-Virtual-Relistic-Driving-Simulation.git'>https://github.com/ZilviaS/Remote-Virtual-Relistic-Driving-Simulation.git</a>
                                    </div>
                                    <div>
                                        <div className='flex justify-between'>
                                            <p className='font-RobotoMono font-bold'>E-commerce Web Application</p>
                                            <p className='font-bold'>2026</p>
                                        </div>
                                        <p className=''>Tech stack: React, Node.JS, MongoDB</p>
                                        <li className='ml-5 text-gray-500'>
                                            Developed a full-stack e-commerce web application with user authentication and product management features
                                        </li>
                                        <li className='ml-5 text-gray-500'>
                                            Implemented RESTful APIs for handling product data, user accounts, and order processing with JWT-based authentication
                                        </li>
                                        <li className='ml-5 text-gray-500'>
                                            Designed responsive UI components using React and Tailwind CSS
                                        </li>
                                        <li className='ml-5 text-gray-500'>
                                            Integrated frontend and backend systems to ensure smooth data flow and user interaction
                                        </li>  
                                        <a className='ml-1 hover:underline hover:cursor-pointer' href='https://github.com/ZilviaS/Just-a-Bread'>https://github.com/ZilviaS/Just-a-Bread </a>
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-900 text-2xl'>Awards</p>
                                        <hr className='my-2 text-gray-500'/>
                                        <div className='flex justify-between'>
                                            <p className='text-gray-900 font-bold'>2025 | KMITL INNOVATION EXPO</p>
                                            <p className='font-bold'>2025</p>
                                        </div>
                                        <p>Senior Project ยอดเยี่ยม</p>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                         
                        
                    </div>
                </div>
            </section>
            {/* <footer className='bg-gray-300'>
                <div className='px-2'>
                    <a onClick={()=>{navigate(-1)}} className='hover:underline hover:cursor-pointer' >&lt;back</a>
                </div>
            </footer> */}
        </>
    )

}

export default Contact