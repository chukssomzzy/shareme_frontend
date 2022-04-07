import React,{useState,useEffect} from 'react'
import {AiOutlineLogout} from "react-icons/ai"
import { GoogleLogout } from 'react-google-login'
import { useParams,useNavigate } from 'react-router-dom'
import {client} from '../client'
import {userCreatedPinsQuery,userSavedPinsQuery,userQuery} from "../utils/data"
import Spinner from "./Spinner"
import MasonryLayout from './MasonryLayout'

const randomImageUrl = "https://source.unsplash.com/1600x900/?nature,photograpy,technology"


const UserProfile = () => {
 const [pins, setPins] = useState(null)
 const [user, setUser] = useState(null)
 const [text, setText] = useState('Created')
 const [activeBtn, setActiveBtn] = useState('created')
 const navigate = useNavigate()
  const {userId} =useParams()
  const activeBtnStyle = "bg-red-500 text-white font-bold p-2 rounded-full outline-none cursor-pointer w-20"
  const notActiveBtnStyle = "bg-primary mr-4 text-black font-bold p-2 rounded-full outline-none cursor-poin  ter w-20"
  const logout = ()=>{
    localStorage.clear();
    navigate(-1);
  }
  useEffect(() => {
    const query = userQuery(userId)
    client.fetch(query).then(data=>setUser(data[0]))
    }, [userId])

  useEffect(() => {
    if(text==='created'){
     const createdPinQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinQuery).then(data=>setPins(data))
    }else{
     const SavedPinQuery = userSavedPinsQuery(userId);                  client.fetch(SavedPinQuery).then(data=>setPins(data))
    }

  }, [activeBtn,userId])

  if(!user) (<Spinner msg="Loading Profile..."></Spinner> )
  return (
    <section className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
              <img src={randomImageUrl} alt="banner" className="w-full h-370 2xl:h-510 shadow-lg object-cover" />
             <img src={user?.image} alt="profile" className="rounded-full w-20 h-20 shadow-xl -mt-10 object-cover " />
            <h1 className="font-bold text-3xl text-center mt-3">{user?.userName}</h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {
               ( userId === user?._id) && (
                  <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
             render={renderProps=>(
               <button type="button" className="bg-white cursor-pointer p-2 rounded-full outline-none shadow-md" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <AiOutlineLogout color="red" fontSize={21}></AiOutlineLogout> 
               </button>
             )}
             onLogoutSuccess={logout}
             cookiePolicy="single_host_origin"
           ></GoogleLogout>
                )
              }
            </div>
          </div>
          <div className="text-center mb-7">
          <button type="button" onClick={e=>{
            setText(e.target.textContent);
            setActiveBtn("created")
          }} className={`${activeBtn==="created"?activeBtnStyle:notActiveBtnStyle}`}>Created</button>
            <button type="button" onClick={e=>{                                                                    setText(e.target.textContent);                                                                       setActiveBtn("saved")                                                                            }} className={`${activeBtn==="saved"?activeBtnStyle:notActiveBtnStyle}`}>Saved</button>

          </div>
          {pins?.length > 0 ?(
          <div className="px-2">
            <MasonryLayout pins={pins}></MasonryLayout>
          </div>):(
            <div className="flex justify-center font-bold w-full mt-2 text-xl items-center ">
               No Pins Found!
              </div>
          )
          }
        </div>
      </div>
    </section>
  )
}

export default UserProfile
