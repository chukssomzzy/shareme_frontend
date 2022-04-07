import React,{useCallback, useEffect} from 'react'
import { client } from '../client'
import { useGlobalContext } from '../utils/context'
import {useParams} from "react-router-dom"
import Spinner from "./Spinner"
import MasonryLayout from './MasonryLayout'
import {searchQuery,feedQuery} from '../utils/data'
const Feed = ()=> {
  const {categoryId} =useParams()
  const {loading,setLoading, pins,setPins} = useGlobalContext()
  const getData=useCallback(()=>{
      if(categoryId){
    const query = searchQuery(categoryId)
      client.fetch(query).then((data)=>{
        setPins(data);
        setLoading(false);
      })
    }else{
      client.fetch(feedQuery).then(data=>{
        setPins(data);
        setLoading(false);
      })
    }
      },[categoryId])
  useEffect(()=>{
   setLoading(true)
   getData()

  },[categoryId,setLoading,setPins])
  if(loading) return (<Spinner msg="we are adding new idea to your feed"></Spinner>)
  if(!pins?.length) return (<h2>No pins available</h2>)
    return(
       <div>
      {pins && <MasonryLayout pins={pins}></MasonryLayout> }
      </div>
    )

}

export default Feed
