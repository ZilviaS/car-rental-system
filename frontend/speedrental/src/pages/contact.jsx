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
import arrowLogo from '../assets/arrowhead.svg'
import GithubLogo from '../assets/github.svg'

function Contact(){

    const [ pageStatus, setPageStatus ] = useState({
        About : true,
        Project : true,
        Award : true,
        Other : true
    })

    const navigate = useNavigate()

    return(
        <>
            <section className='min-h-screen'>
                <Navbar></Navbar>
                <div className='flex md:justify-between justify-center min-h-screen'>
                    <div className='w-[40%] sm:block hidden bg-gray-200'>
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
                                <div className='ml-1 mt-2 w-full'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='pr-2'><EmailLogo className="w-5 h-5 text-gray-600"/></td>
                                                <td className='text-gray-800 object-cover break-all'>prepatjarundechakorn@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <td><img className='h-5' src={GithubLogo} alt="" /></td>
                                                <td><a className='font-semibold text-gray-700 hover:shadow' href='https://github.com/ZilviaS'>ZilviaS</a></td>
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
                    <div className='w-full bg-white md:p-20 p-10 sm:block hidden'>
                        <div className='flex justify-center mb-10'>
                            <div>
                                <h1 className='font-RobotoMono md:text-5xl text-3xl'>Prepat Jarundechakorn</h1>   
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
                    <div className='w-full bg-white md:p-20 p-10 sm:hidden block'>
                        <div className='flex justify-center mb-10'>
                            <div>
                                <img className='md:hidden block rounded-full mb-5 shadow-xl' src={ProfilePic} alt="" />
                                <h1 className='font-RobotoMono md:text-5xl text-3xl'>Prepat Jarundechakorn</h1>   
                                <h1 className='font-light text-xl pt-3 '>Junior Full-Stack Developer</h1>
                                <div className='mt-3 flex gap-2 items-center'>
                                    <EmailLogo className='w-5 h-5'></EmailLogo>
                                    <p>prepatjarundechakorn@gmail.com</p>
                                </div>
                                <div className='mt-1 flex gap-2 items-center'>
                                    <img className='h-5' src={GithubLogo} alt="" />
                                    <a className='font-semibold text-gray-700' href='https://github.com/ZilviaS'>ZilviaS</a>
                                </div>
                                <div className='mt-1 flex gap-2 items-center'>
                                    <TelephoneLogo className='w-5 h-5'></TelephoneLogo>
                                    <p>(+66)85-111-5841</p>
                                </div>
                                <div className='mt-1 flex gap-2 items-center'>
                                    <LocationLogo className='w-5 h-5'></LocationLogo>
                                    <p>Bangkok, Thailand</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <div className='flex justify-between' onClick={()=>{
                                        setPageStatus({...pageStatus, About : !pageStatus.About})
                                    }}>
                                    <p className='font-medium text-gray-900 font-RobotoMono text-2xl'>About Me</p>
                                    <img className={`h-6 mt-2 transition-transform- ${pageStatus.About ? `rotate-180` : ''}`} src={arrowLogo} alt="" />
                                </div>
                                <hr className='my-1 text-gray-500'/>
                                { pageStatus.About ? <div className='flex flex-col gap-1'>
                                    <p className='text-gray-900 bg-gray-100 rounded p-1'>
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
                                    <div>
                                        <p className='font-medium text-gray-900 text-xl pl-1'>Education</p>
                                        <div className='bg-gray-100 p-1 rounded'>
                                            <p className='font-RobotoMono'>Bachelor Degree in Computer Sciance at</p>
                                            <p className='font-bold text-gray-700'>King Mongkut's Institute of Technology Ladkrabang (2022-2026)</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-900 text-xl pl-1'>Skills</p>
                                        <div className='bg-gray-100 p-1 rounded'>
                                            <p className='font-semibold text-gray-700'>Language</p>
                                            <div className='ml-8'>
                                                <li className='text-gray-700 font-RobotoMono'>C/C#</li>
                                                <li className='text-gray-700 font-RobotoMono '>Java</li>
                                                <li className='text-gray-700 font-RobotoMono'>Python</li>
                                                <li className='text-gray-700 font-RobotoMono'>JavaScript</li>
                                            </div>
                                            <p className='text-gray-700 font-semibold'>React</p>
                                            <p className='text-gray-700 font-semibold'>Tailwind</p>
                                            <p className='text-gray-700 font-semibold'>Node.js</p>
                                            <p className='text-gray-700 font-semibold'>Express</p>
                                            <p className='text-gray-700 font-semibold'>PostgreSQL</p>
                                            <p className='text-gray-700 font-semibold'>MongoDB</p>
                                            <p className='text-gray-700 font-semibold'>Unity</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-900 text-xl pl-1'>Language</p>
                                        <div className='bg-gray-100 p-1 rounded'>
                                            <p className='text-gray-700 font-semibold'>Thai (Native)</p>
                                            <p className='text-gray-700 font-semibold'>English (Intermediate)</p>
                                        </div>
                                    </div>
                                    
                                </div> : <></>}
                            </div>
                            <div>
                                <div className='flex justify-between' onClick={()=>{
                                        setPageStatus({...pageStatus, Project : !pageStatus.Project})
                                    }}>
                                    <p className='font-medium text-gray-900 text-2xl'>Project Experience</p>
                                    <img className={`h-6 mt-2 transition-transform- ${pageStatus.Project ? `rotate-180` : ''}`} src={arrowLogo} alt="" />
                                </div>
                                <hr className='my-1 text-gray-500'/>
                                
                                { pageStatus.Project ? <div className='flex flex-col gap-3'>
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
                                </div> : <></>}
                            </div>
                            <div>
                                <div className='flex justify-between' onClick={()=>{
                                        setPageStatus({...pageStatus, Award : !pageStatus.Award})
                                    }}>
                                    <p className='font-medium text-gray-900 text-2xl'>Awards</p>
                                    <img className={`h-6 mt-2 transition-transform- ${pageStatus.Award ? `rotate-180` : ''}`} src={arrowLogo} alt="" />
                                </div>
                                <hr className='my-1 text-gray-500'/>
                                { pageStatus.Award ? <div>
                                    <div className='flex justify-between'>
                                        <p className='text-gray-900 font-bold'>2025 | KMITL INNOVATION EXPO</p>
                                        <p className='font-bold'>2025</p>
                                    </div>
                                    <p>Senior Project ยอดเยี่ยม</p>
                                </div> : <></>}
                                
                            </div>
                            <div>
                                <div className='flex justify-between' onClick={()=>{
                                        setPageStatus({...pageStatus, Other : !pageStatus.Other})
                                    }}>
                                    <p className='font-medium text-gray-900 text-2xl'>Other Experience</p>
                                    <img className={`h-6 mt-2 transition-transform- ${pageStatus.Other ? `rotate-180` : ''}`} src={arrowLogo} alt="" />
                                </div>
                                <hr className='my-1 text-gray-500'/>
                                { pageStatus.Other? <div>
                                    <p className='text-gray-900 font-semibold'>Script Writer & Translator</p>
                                    <a className='font-RobotoMono text-sm hover:underline' href='https://www.youtube.com/@SandwishMedia'>@Sandwish Media</a>
                                </div> : <></>}
                                
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </section>
        </>
    )

}

export default Contact