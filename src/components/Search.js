import React,{useState,useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery,searchQuery } from '../utils/data'
import Spinner from './Spinner'
import { useGlobalContext } from '../utils/context'

const Search = () => {
 const {searchTerm,loading,setLoading} = useGlobalContext();
  const [pins, setPins] = useState(null)
  useEffect(() => {
    setLoading(true)
    if(searchTerm){
     const query= searchQuery(searchTerm.toLowerCase())
      client.fetch(query).then(data=>{
        setPins(data)
        setLoading(false)
      })
    }else{
      client.fetch(feedQuery).then(data=>{
        setPins(data)
        setLoading(false);
      })
    }
  }, [searchTerm])

  return (
    <section>
      {
      loading &&<Spinner msg="Search for pins..."></Spinner>
      }
      {
        (pins?.length)&&(
        <MasonryLayout pins={pins}></MasonryLayout>
        )
      }
      {
        (!pins?.length)&&searchTerm !=='' && !loading && (
        <div className="text-center text-xl mt-10">No Pins Found</div>
        )
      }
    </section>
  )
}

export default Search
