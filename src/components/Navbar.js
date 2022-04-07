import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from 'react-icons/io'
import { useGlobalContext } from '../utils/context'
const Navbar =  () => {
  const navigate = useNavigate();
  const {searchTerm,setSearchTerm,user} = useGlobalContext()
  if(user!=='undefined'&&user==='null') {
  navigate("/login",{replace:true})
    return null
  }
  return(
    <>
       <section className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
         <div className="flex justify-start items-center rounded-md bg-white border-none outline-none focus-within:shadow-sm">
           <IoMdSearch fontSize={21} className="ml-1"></IoMdSearch>
           <input type="text"
             onChange={e=>setSearchTerm(e.target.value)}
           placeholder="search"
           value={searchTerm}
           onFocus={()=>navigate("/search")}
           className="p-2 w-full outline-none bg-white"
           />
         </div>
         <div className="flex gap-3 ">
             <Link to={`user-profile/${user?._id}`} className="hidden md:block">{user?.image && 
             (<img src={user?.image} alt="user" className="w-full w-14 h-12 rounded-lg " />)}
        </Link>
           <Link to="/create-pin" className='bg-black text-white rounded-lg h-12 w-12 md:w-14 md:12 flex justify-center items-center'>
          <IoMdAdd></IoMdAdd>
          </Link>
      </div>
    </section>
    </>
  )
}

export default Navbar
