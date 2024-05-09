import React, { useState, useEffect, useContext } from 'react';
import logo from '../../assets/images/logo/neymanlogo.png';
import { SiMaildotru } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';
import './Footer.css'
import axios from 'axios';
import { LangContext } from '../../context/LangContext';
import { MultiLanguage } from '../../multilanguage/MultiLanguage';
const Footer = () => {
  const location = useLocation();

  const handleServicesClick = () => {
    const currentPagePath = window.location.pathname;
    if (currentPagePath === '/') {
      const servicesSection = document.getElementById('services');
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/ServicesDetail/1';
    }
  };

  let date = new Date();

  const [infoData, setInfoData] = useState({});
  const [lang,setLang] = useContext(LangContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${lang}/contact_info/`);
        setInfoData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (location.pathname !== '/404') {
    
    return (
      <div>
        <footer>
          <div className="container pt-5">
            <hr />
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className='single-box'>
                  <img src={logo} alt='logo' className='d-block img-fluid object-fit-contain' />
                  <p>{MultiLanguage[lang]["footer"]["0"]}</p>
                </div>
                
              </div>
              <div className='col-lg-3 col-sm-6 mt-3'>
                <div className='single-box'>
                  <h5 className='mb-3'>{MultiLanguage[lang]["footer"]["1"]}</h5>
                  {/* <p className='mb-2'><NavLink to='/'>Ana Səhifə</NavLink></p> */}
                  {/* <p className='mb-2'><NavLink to='/About'>Haqqımızda</NavLink></p> */}
                  <p className='mb-2'><NavLink onClick={handleServicesClick}>{MultiLanguage[lang]["footer"]["2"]}</NavLink></p>
                  <p className='mb-2'><NavLink to='/Portfolio'>{MultiLanguage[lang]["footer"]["3"]}</NavLink></p>
                  {/* <p className='mb-2'><NavLink to='/Blog'>Bloq</NavLink></p> */}
                  {/* <p className='mb-2'><NavLink to='/Contact'>Əlaqə</NavLink></p> */}
                  <p><NavLink to='/Faq'>{MultiLanguage[lang]["footer"]["4"]}</NavLink></p>
                </div>
              </div>
              <div className='col-lg-3 col-sm-6 mt-3'>
                <div className='single-box'>
                  <h5 className='mb-3'>{MultiLanguage[lang]["footer"]["5"]}</h5>
                  <p className='fs-18 mb-2'>{infoData[0]?.location_name}</p>
                  <div className='d-flex flex-column mb-2'>
                        <a href={`tel:${infoData[0]?.whatsapp}`} className='fs-18'>{infoData[0]?.whatsapp}</a>
                        <a href={`tel:${infoData[0]?.phone[0]?.phone}`} className='fs-18'>{infoData[0]?.phone[0]?.phone}</a>
                      </div>
                  <p><a href={`mailto:${infoData[0]?.email[0]?.email}`} className='fs-18'>{infoData[0]?.email[0]?.email}</a></p>
                </div>
              </div>
              <div className='col-lg-3 col-sm-6 mt-3'>
                <div className='single-box'>
                  <h5 className='mb-3'>{MultiLanguage[lang]["footer"]["6"]}</h5>
                  <div className='fs-22 d-flex gap-30 pt-20 text-black '>
                  <a href="" className='footer-icon' target='_blank'><FaTwitter/></a>
                  <a href={infoData[0]?.facebook} className='footer-icon' target='_blank'><FaFacebookF/></a>
                  <a href={infoData[0]?.linkedln} className='footer-icon' target='_blank'><FaLinkedinIn/></a>
                  <a  href={infoData[0]?.instagram} className='footer-icon' target='_blank'><FaInstagram/></a>
                </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className='py-2 footer-end'>
            <div className='container'>
              <div>
                <p>COPYRIGHT © {date.getFullYear()} by NET LLC</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }else{
    return null;
  }

}

export default Footer