import React from 'react'
import { LuArrowUpRight } from "react-icons/lu";
import { LuArrowUpLeft } from "react-icons/lu";
import { useSwiper } from 'swiper/react';

const SwiperButton = () => {
    const swiper = useSwiper();
  return (
    <div className='d-flex gap-2 pt-20'>
        <button onClick={() => swiper.slidePrev()} className='w-60 h-60 border bg-white border-black d-flex justify-content-center align-items-center'><LuArrowUpLeft className='fs-20'/></button>
        <button  onClick={() => swiper.slideNext()} className='w-60 h-60 border bg-white border-black d-flex justify-content-center align-items-center'><LuArrowUpRight className='fs-20'/></button>
    </div>
  )
}

export default SwiperButton