import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import axios from 'axios';
import { LangContext } from '../../context/LangContext';
import { MultiLanguage } from '../../multilanguage/MultiLanguage';

const servicesCard = () => {

    const [userData, setUserData] = useState([]);
    const [lang] = useContext(LangContext)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${lang}/services/`);
          setUserData(res.data)
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    }, [])

  return (
    <div className="container">
    <div className="row">
      {
        userData.map((item) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 services-card" key={item.id}>
            <div className="card py-4">
              <div className="card-body">
                <div className='mb-4 card-icon d-flex justify-content-center align-items-center'>
                  <img width={50} src={item.service_original_icon}/>
                </div>
                <p className="card-title mb-0 fw-semibold fs-20">{item.service_title}</p>
                <p className="card-text mb-0 py-3 fs-14">{item.description.slice(0,35)}...</p>
                <NavLink to={`/ServicesDetail/${item.id}`} className='text-decoration-none fw-medium card-view d-flex align-items-center gap-2'>{MultiLanguage[lang]["home"]["14"]} <FaArrowRight /></NavLink>
              </div>
            </div>
          </div>
        ))
      }



    </div>
  </div>
  )
}

export default servicesCard








