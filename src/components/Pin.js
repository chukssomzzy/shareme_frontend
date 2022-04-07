import React from 'react'
import { urlFor, client } from '../client'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import { Link,useNavigate } from 'react-router-dom'
import {useGlobalContext} from '../utils/context'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'

const Pin = ({pin}) => {
  const {postedBy,image, _id, destination,save}= pin;
  const {setPostHovered,setSavingPost,postHovered,userInfo,savingPost} = useGlobalContext()
  const navigate = useNavigate()
  const alreadySaved = !!(save?.filter(item=>item?.PostedBy?._id === userInfo?.googleId))?.length;
  const savePin = (_id)=>{
    if(!alreadySaved){
      setSavingPost(true)
      client.patch(_id).setIfMissing({save:[]}).insert('after','save[-1]',[{
        _key: uuidv4(),
        userId:userInfo?.googleId,
        postedBy:{
          _type:'postedBy',
          _ref:userInfo?.googleId,
        },
      }]).commit().then(()=>{
        window.location.reload()
        setSavingPost(false);
      })
    }
  }
  const deletePin = _id=>{
    client.delete(_id).then(()=>window.location.reload())
  }
  return (
    <section className="m-2">
      <div onMouseEnter={()=>setPostHovered(true)} onMouseLeave={()=>setPostHovered(false)} onClick={()=>navigate(`/pin-detail/${_id}`)} className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all ease-in-out duration-500">
        {image && (<img src={urlFor(image).width(500).url()} alt="user-post" className="rounded-lg w-full" />)}
          {
          postHovered && (
            <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" style={{height:'100%'}}>
        <div className="flex justify-between items-center ">
          <div className="flex gap-2">
            <a href={`${image?.asset?.url}?dl=`} download onClick={e=>e.stopPropagation()} className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
           <MdDownloadForOffline></MdDownloadForOffline>
          </a>
          </div>
          {
            alreadySaved? (
              <button type="button" className="bg-red-500 opacity-70  hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">{save?.length} saved</button>
            ):(
              <button onClick={e=>{
                e.stopPropagation();
                savePin(_id);
                }
                } type="button" className="bg-red-500 opacity-70  hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">{savingPost?"saving...":'save'}</button>
            )
          }
        </div>
          <div className="flex justify-between items-center gap-2 w-full">
            {destination && (
              <a href={destination} target="_blank" rel="noreferrer" className="flex bg-white font-bold p-2 text-black pl-4 pr-4 rounded-full opacity-75 hover:opacity-100 hover:shadow-md">
               <BsFillArrowUpRightCircleFill></BsFillArrowUpRightCircleFill>
                {destination.length > 15 ?`${destination.slice(0,15)}...`: destination.slice(8)}
              </a>
            ) }
            {
              postedBy?._id=== userInfo?.googleId &&(
              <button onClick={e=>{
                e.stopPropagation() 
                deletePin(_id)
              }
                } className="bg-white opacity-70 p-2  hover:opacity-100  font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none" type="button">
                <AiTwotoneDelete></AiTwotoneDelete>
                </button>
              )
            }
          </div>
            </div>
          )
        }
        </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center ">
       <img src={postedBy?.image} alt="user-profile" className="w-8 h-8 rounded-full object-cover" />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </section>
  )
}

export default Pin
