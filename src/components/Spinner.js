import React from 'react'
import {Circles} from "react-loader-spinner"
const Spinner = ({msg}) => {
  return (
    <section className="flex fle-col justify-center items-center w-full m-5">
      <Circles color="#00b4ff" height={50} width={200} className="m-5"/>
      <p className="text-center text-lg px-2">
      {msg}
      </p>
    </section>
  )
}

export default Spinner
