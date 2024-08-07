import React from 'react'
import "./main.css"

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let style = {
  "--i": getRandomInt(10, 25)
}

const Bubbles = () => {
  return (
    <div className='flex bubbles h-screen w-screen fixed'>
    </div>
  )
}

export default Bubbles
