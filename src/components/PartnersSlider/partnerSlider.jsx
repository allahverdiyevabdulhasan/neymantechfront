import React, { useEffect, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import './partner.css'
import axios from 'axios';
import { LangContext } from '../../context/LangContext';

const partnerSlider = () => {
    const [partnerData, setPartnerData] = useState([]);
    const [lang] = useContext(LangContext)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`${lang}/partner`);
            setPartnerData(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);
    return (
        <div className='container partners'>
            <Swiper
              breakpoints={{
                0: {
                    spaceBetween: 5,
                    slidesPerView: 3,

                },
                480: {
                    spaceBetween: 10,
                    slidesPerView: 5,
                },
                768: {
                    spaceBetween: 15,
                    slidesPerView: 6,
                },

                912: {
                    spaceBetween: 15,
                    slidesPerView: 6,
                },
                1280: {
                    spaceBetween: 70,
                    slidesPerView: 6,
                },
            }}
            >
                
                {
                    partnerData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className='partner-img'>
                                <img src={item.original_partner_logo} alt="partner" />
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    )
}

export default partnerSlider