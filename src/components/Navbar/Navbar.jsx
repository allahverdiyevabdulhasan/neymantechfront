import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/logo/neymanlogo.png';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt1 } from 'react-icons/hi'
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlinePhoneIphone } from "react-icons/md"
import { MdOutlineMail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import axios from 'axios';
import { LangContext } from '../../context/LangContext';
import { MultiLanguage } from '../../multilanguage/MultiLanguage';


const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [infoData, setInfoData] = useState({});
  const [lang] = useContext(LangContext);

  const handleServicesClick = () => {
    const currentPagePath = window.location.pathname;
    if (currentPagePath === '/') {
      const servicesSection = document.getElementById('services');
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/ServicesDetail/2';
    }
  };


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
      <nav className='sticky-top'>
        <div className='container'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <NavLink to='/'><img src={logo} className='logo' alt='logo' /></NavLink>
            </div>
            <div className='d-none d-xl-block d-xxl-block mt-3'>
              <ul className='d-flex align-items-center gap-64 nav-lg'>
  
  
                <li>
                  <NavLink to='/About' className='nav-link fw-semibold '>{MultiLanguage[lang]["navItems"]["0"]}</NavLink>
                </li>
                <li><NavLink className='fw-semibold nav-link' onClick={handleServicesClick}>{MultiLanguage[lang]["navItems"]["1"]}</NavLink></li>
                <li>
                  <NavLink to='/Portfolio' className='nav-link fw-semibold '>{MultiLanguage[lang]["navItems"]["2"]}</NavLink>
                </li>
                <li>
                  <NavLink to='/Blog' className='nav-link fw-semibold '>{MultiLanguage[lang]["navItems"]["3"]}</NavLink>
                </li>
                <li>
                  <NavLink to='/Contact' className='nav-link fw-semibold '>{MultiLanguage[lang]["navItems"]["4"]}</NavLink>
                </li>
  
                <div className='lang'>
                  <GrLanguage onClick={() => setOpen(!open)} className='me-2 fs-20 cursor-pointer nav-language' />
                  {
                    open && (
                      <div className='nav-drop-language'>
                        <p onClick={() => { localStorage.setItem('lang', "https://neymanenterprisesolutions.com/az"); window.location.reload(); }}>AZ</p>
                        <p onClick={() => { localStorage.setItem('lang', "https://neymanenterprisesolutions.com/en"); window.location.reload(); }}>EN</p>
                        <p onClick={() => { localStorage.setItem('lang', "https://neymanenterprisesolutions.com/tr"); window.location.reload(); }}>TR</p>
                        <p onClick={() => { localStorage.setItem('lang', "https://neymanenterprisesolutions.com/ru"); window.location.reload(); }}>RU</p>
                      </div>
  
                    )
                  }
  
  
                </div>
              </ul>
            </div>
            <div>
              <div className='d-flex'>
                <div className='lang d-inline-block d-lg-block d-xl-none d-xxl-none d-xl-none'>
                  <GrLanguage onClick={() => setOpen(!open)} className='me-2 fs-20 cursor-pointer nav-language' />
                  {
                    open && (
                      <div className='nav-drop-language'>
                        <p onClick={() => { localStorage.setItem('lang', "https://neymanenterprisesolutions.com/az"); window.location.reload(); }}>AZ</p>
                        <p onClick={() => { localStorage.setItem('lang', "https://neymanenterprisesolutions.com/en"); window.location.reload(); }}>EN</p>
                        <p onClick={() => { localStorage.setItem('lang', "https://neymanenterprisesolutions.com/tr"); window.location.reload(); }}>TR</p>
                        <p onClick={() => { localStorage.setItem('lang', "https://neymanenterprisesolutions.com/ru"); window.location.reload(); }}>RU</p>
                      </div>
  
                    )
                  }
                </div>
  
                <HiMenuAlt1 className='fs-30 cursor-pointer' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" />
              </div>
  
              <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasRightLabel"></h5>
                  <AiOutlineClose className='fs-30 cursor-pointer' data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                  <div className='d-xl-none d-xxl-none d-lg-none d-sm-block d-md-block res-nav'>
                    <ul>
                      <li className='h-60'>
                        <NavLink to='/About' className='nav-link'>{MultiLanguage[lang]["navItems"]["5"]}</NavLink>
                      </li>
                      <li className='h-60'>
                        <NavLink onClick={handleServicesClick} className='nav-link'>{MultiLanguage[lang]["navItems"]["6"]}</NavLink>
                      </li>
                      <li className='h-60'>
                        <NavLink to='/Portfolio' className='nav-link'>{MultiLanguage[lang]["navItems"]["7"]}</NavLink>
                      </li>
                      <li className='h-60'>
                        <NavLink to='/Blog' className='nav-link'>{MultiLanguage[lang]["navItems"]["8"]}</NavLink>
                      </li>
                      <li className='h-60'>
                        <NavLink to='/Contact' className='nav-link'>{MultiLanguage[lang]["navItems"]["9"]}</NavLink>
                      </li>
                    </ul>
                  </div>
  
  
                  <div className='pt-20 nav-contact'>
  
                    <img src={logo} className='h-150 d-none d-xl-block d-xxl-block d-lg-block' />
                    <div className='d-flex align-items-center gap-16 pt-20'>
                      <div className='border border-black rounded-pill p-15 p-sm-10 p-xs-10'>
                        <FaMapLocationDot className='fs-30' />
                      </div>
                      <p className='fs-18'>{infoData[0]?.location_name}</p>
                    </div>
                    <div className='d-flex align-items-center gap-16 pt-20'>
                      <div className='border border-black rounded-pill p-15 p-sm-10 p-xs-10'>
                        <MdOutlinePhoneIphone className='fs-30' />
                      </div>
                      <div className='d-flex flex-column'>
                        <a href={`tel:${infoData[0]?.whatsapp}`} className='fs-18'>{infoData[0]?.whatsapp}</a>
                        <a href={`tel:${infoData[0]?.phone[0]?.phone}`} className='fs-18'>{infoData[0]?.phone[0]?.phone}</a>
                      </div>
                    </div>
                    <div className='d-flex align-items-center gap-16 pt-20'>
                      <div className='border border-black rounded-pill p-15 p-sm-10 p-xs-10'>
                        <MdOutlineMail className='fs-30' />
                      </div>
  
  
                      <a href={`mailto:${infoData[0]?.email[0]?.email}`} className='fs-18'>{infoData[0]?.email[0]?.email}</a>
  
  
  
                    </div>
  
                    <div className='d-flex justify-content-between gap-sm-3 gap-xs-3 pt-50'>
                      <div className='border border-black rounded-pill p-15 p-sm-10 p-xs-10'>
                        <a href={infoData[0]?.facebook} target='_blank'><FaFacebookF className='fs-22 text-black' /></a>
                      </div>
                      <div className='border border-black rounded-pill p-15 p-sm-10 p-xs-10'>
                        <a href='#/' target='_blank'><FaTwitter className='fs-22 text-black' /></a>
                      </div>
                      <div className='border border-black rounded-pill p-15 p-sm-10 p-xs-10'>
                        <a href={infoData[0]?.instagram} target='_blank'><FaInstagram className='fs-22 text-black' /></a>
                      </div>
                      <div className='border border-black rounded-pill p-15 p-sm-10 p-xs-10'>
                        <a href={infoData[0]?.linkedln} target='_blank'><FaLinkedinIn className='fs-22 text-black' /></a>
                      </div>
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }else{
    return null;
  }

}

export default Navbar


