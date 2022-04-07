import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import logo from '../assets/logo.png'
import { useGlobalContext } from '../utils/context'
import {categories} from '../utils/data'
import {GoogleLogin} from 'react-google-login'
import {client} from "../client"
import {FcGoogle} from 'react-icons/fc'
const Sidebar = ({closeToggle}) => {
  const responseGoogle = response=>{
    localStorage.setItem('user',JSON.stringify(response.profileObj));
    const {name,googleId, imageUrl} = response.profileObj;
    const doc = {                                                          _id: googleId,
      _type:'user',
      userName:name,
      image:imageUrl,
    }
    client.createIfNotExists(doc).then(()=>{
   window.location.reload()
  })
  }
const {user} = useGlobalContext();
  const handleCloseSidebar= ()=>{
    if(closeToggle) closeToggle(false)
  }
  const isNotActiveStyle = "flex items-center px-5 gap-5 text-gray-500 hover:text-black transistion-all duration-200 ease-in-out capitalize"
  const isActiveStyle = "flex items-center px-5 gap-5 font-extrabold border-r-2 border-black transistion-all duration-200 ease-in-out capitalize"
  return (
    <section className="flex flex-col relative justify-between bg-white over-y-scroll min-w-210 hide-scrollbar h-screen">
  <div className="flex flex-col">
    <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 item-center" onClick={handleCloseSidebar}>
    <img src={logo} alt="logo" className="w-full" />
    </Link>
<div className="flex flex-col gap-5">
  <NavLink to="/" className={({isActive})=>isActive ? isActiveStyle : isNotActiveStyle} onClick={handleCloseSidebar}>
   <RiHomeFill></RiHomeFill> Home
  </NavLink>
  <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>
  {
    categories.slice(0,categories.length-1).map(category=>
      (
        <NavLink to={`/category/${category.name}`} className={({isActive})=>isActive?isActiveStyle:isNotActiveStyle} onClick={handleCloseSidebar} key={category.name}>
  <img src={category?.image} alt="category" className="w-8 h-8 rounded-full shadow-sm" />
  
        {category.name}</NavLink>
      )
    )
  }
</div>
  </div>
      {
        user && (
          <Link to={`user-profile/${user._id}`} className="flex sticky my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3 bottom-0 left-0  w-full"onClick={handleCloseSidebar}>
            <img src={user.image} className="w-10 h-10 rounded-full " alt="user-profile" />
            <p>{user.userName}</p>
            </Link>
        )
      }
      {
        !user &&(
    <div className="shadow-2xl">
           <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
             render={renderProps=>(
               <button type="button" className="bg-mainColor flex justify-center items-center p-3 rounded-lg w-fullcursor-pointer outline-none" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <FcGoogle className="mr-4"></FcGoogle>Sign In With Google
               </button>
             )}
             onSuccess={responseGoogle}
             onFailure={responseGoogle}
             cookiePolicy="single_host_origin"
           ></GoogleLogin>
    </div>
        )
      }
    </section>
  )
}

export default Sidebar
