import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Navbar,Feed,CreatePin, PinDetail, Search } from '../components'
const Pins = () => {
  return (
    <>
    <section className="px-2 md:px-5">
      <div className="bg-gray-50">
       <Navbar></Navbar>
     </div>
       <div className="h-full">
         <Routes>
        <Route path="/" element={<Feed/>}></Route>
        <Route path="/category/:categoryId" element={<Feed/>}></Route>
        <Route path="/pin-detail/:pinId" element={<PinDetail/>}></Route>
        <Route path="/create-pin" element={<CreatePin/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
      </Routes>
     </div>
    </section>
    </>
  )
}

export default Pins
