import React,{useRef,useEffect} from 'react'
import {useGlobalContext} from '../utils/context'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Routes} from 'react-router-dom'
import { Sidebar,UserProfile } from '../components'
import logo from "../assets/logo.png"
import Pins from './Pins'
const Home = () => {
  const scrollRef = useRef(null)
  const {toggleSidebar, setToggleSidebar,user}= useGlobalContext();
  /* useEffect(() => {
 scrollRef.current.scrollTo(0,0) 

}, [])*/

  return (
    <>
      <div className='bg-gray-50 flex md:flex-row flex-col h-screen transistion-height duration-75 ease-out'>
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar></Sidebar>
      </div>
        <div className="flex md:hidden flex-row">
       <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
      <HiMenu fontSize={40} className="cursor-pointer" onClick={()=>setToggleSidebar(true)}></HiMenu>
        <Link to="/">
        <img src={logo} alt="logo" className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
        <img src={user?.image} alt="user" className="w-10 rounded-full shadow-md" />
        </Link>
         </div>
      {
        toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={()=>setToggleSidebar(false)}></AiFillCloseCircle>
            </div>
            <Sidebar closeToggle={setToggleSidebar}></Sidebar>
          </div>)
      }
        </div>
        <div className="pb-2 h-screen flex-1 overflow-y-scroll" ref={scrollRef}>
          <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile/>}></Route>
             <Route path="/*" element={<Pins/>}></Route>
        </Routes>

         </div>
    </div>
</>
  )
}

export default Home
