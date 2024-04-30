import React, { useState, useEffect, useContext } from 'react';
import './Contact.css';
import { LuChevronRight } from 'react-icons/lu';
import contact_photo from '../../assets/images/contact-page/contact-photo.jpg';
import axios from 'axios';
import { LangContext } from '../../context/LangContext';
import { MultiLanguage } from '../../multilanguage/MultiLanguage';
import  Request  from "../../components/Request/Request";
const Contact = () => {
  const [infoData, setInfoData] = useState({});
  const [lang, setLang] = useContext(LangContext)

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

  return (
    <div className='contact'>
      <div className='container'>
        <div className='d-flex align-items-center py-5 contact-head'>
          <a href='/' className='d-flex align-items-center gap-1'>{MultiLanguage[lang]["contact"]["0"]} <LuChevronRight /></a>
          <p>{MultiLanguage[lang]["contact"]["1"]} </p>
        </div>

        <div className='row pt-5 align-items-center '>
          <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 contactImg'>
            <div className='img'>
              <img src={contact_photo} alt="contact" className="d-block mx-lg-auto img-fluid" />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
            <div className='contact-address'>
                <>
                  <h4 className='fs-36 fw-medium'>{MultiLanguage[lang]["contact"]["2"]}</h4>
                  <div className='d-flex align-items-center gap-3 mt-4'>
                    <div className='contact-icon'>
                    <i className="fa-solid fa-phone fs-20"></i>
                    </div>
                    <div className='d-flex flex-column'>
                      <span>{MultiLanguage[lang]["contact"]["3"]}</span>
                      <a href={`tel:${infoData[0]?.whatsapp}`} className='fs-18'>{infoData[0]?.whatsapp}</a>
                      <a href={`tel:${infoData[0]?.phone[0]?.phone}`} className='fs-18'>{infoData[0]?.phone[0]?.phone}</a>
                    </div>
                  </div>

                  <div className='d-flex align-items-center gap-3 mt-3'>
                    <div className='contact-icon'>
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className='d-flex flex-column'>
                      <span>{MultiLanguage[lang]["contact"]["4"]}</span>
                      <a href={`mailto:${infoData[0]?.email[0]?.email}`} className='fs-18'>{infoData[0]?.email[0]?.email}</a>
                    </div>
                  </div>

                  <div className='d-flex align-items-center gap-3 mt-3'>
                    <div className='contact-icon'>
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className='d-flex flex-column'>
                      <span>{MultiLanguage[lang]["contact"]["5"]}</span>
                      <p className='fs-18'>{infoData[0]?.location_name}</p>
                    </div>
                  </div>
                </>
            </div>
          </div>
        </div>
        <Request/> 
        <hr className='mt-5' />
        <div className='d-flex justify-content-end align-items-center gap-4'>
          <div>
            <p>{MultiLanguage[lang]["contact"]["6"]}</p>
          </div>
          <div className='d-flex sosial-icons'>
              <>
                <div className='contact-sosial-icons fa'>
                  <a href={infoData[0]?.facebook} target='_blank'><i className="fa-brands fa-facebook-f fs-20"></i></a>
                </div>
                <div className='contact-sosial-icons'>
                  <a href={infoData[0]?.twitter} target='_blank'><i className="fa-brands fa-twitter"></i></a>
                </div>
                <div className='contact-sosial-icons'>
                  <a href={infoData[0]?.instagram} target='_blank'><i className="fa-brands fa-instagram fs-19"></i></a>
                </div>
                <div className='contact-sosial-icons'>
                  <a href={infoData[0]?.linkedln} target='_blank'><i className="fa-brands fa-linkedin-in fs-19"></i></a>
                </div>
              </>
          </div>
        </div>
      </div>
        {/* <iframe src={infoData[0]?.location_url} className='w-100 mt-5' height="500" loading="lazy" title="Google Maps"></iframe>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387762.13885934214!2d28.838959745845614!3d40.599180482805146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cae529197b3e1b%3A0xaf653fdacb792339!2zWWFsb3ZhIGlsaSwgVMO8cmtpecmZ!5e0!3m2!1saz!2saz!4v1712005219952!5m2!1saz!2saz" width="600" height="450" loading="lazy"></iframe> */}
    </div>
  );
}

export default Contact;
