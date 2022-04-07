import React,{useContext,useState,useEffect} from 'react'
import { userQuery } from './data'
import { client } from '../client'
const AppContext = React.createContext()

const AppProvider=({children})=>{
  
 const [toggleSidebar, setToggleSidebar] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [postHovered, setPostHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const userInfo = localStorage.getItem('user') !== 'undefined'? JSON.parse(localStorage.getItem('user')): localStorage.clear();
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then(data=>setUser(data[0]));
    }, [userInfo])

  return <AppContext.Provider value={{toggleSidebar, setToggleSidebar,user,userInfo,searchTerm,setSearchTerm,loading,setLoading,pins,setPins,setSavingPost,setPostHovered,postHovered,savingPost}}>{children}</AppContext.Provider>
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}

export {AppContext,AppProvider}
