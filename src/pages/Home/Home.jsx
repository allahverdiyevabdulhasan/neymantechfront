import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import heroimg_3 from '../../assets/images/home-page-img/hero-image-3.jpg';
import CommentSlider from '../../components/Commentcarousel/commentC';
import { NavLink } from 'react-router-dom';
import ServicesCard from '../../components/Servicescard/servicesCard';
import axios from 'axios';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowRight } from "react-icons/fa6";
import { LangContext } from '../../context/LangContext';
import { MultiLanguage } from '../../multilanguage/MultiLanguage';

const Home = () => {
  const [selected, setSelected] = useState(null);
  const [userData, setUserData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [lang] = useContext(LangContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataRes = await axios.get(`${lang}/different_us/`);
        setUserData(userDataRes.data);

        const blogDataRes = await axios.get(`${lang}/blog`);
        setBlogData(blogDataRes.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const [blogCategory, setBlogCategory] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${lang}/blog_category`);
        setBlogCategory(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const toogle = i => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  }

  return (
    <div className='home'>
      <section className="container px-4 hero-section">
        <div className="row align-items-center justify-content-xl-between">
          <div className='col-lg-8'>
            <h4 className='text-black hero-text '>
              <span>
                <TypeAnimation
                  sequence={[
                    MultiLanguage[lang]["home"]["0"],
                    2000,
                    MultiLanguage[lang]["home"]["1"],
                    2000,
                    MultiLanguage[lang]["home"]["2"],
                    2000
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </span>
              <span className='text'>{MultiLanguage[lang]["home"]["3"]} <br /> {MultiLanguage[lang]["home"]["4"]}  </span>
              {MultiLanguage[lang]["home"]["5"]} <br /> {MultiLanguage[lang]["home"]["6"]}
            </h4>
            <p className='fs-22 neyman_price_font_size pt-5'>{MultiLanguage[lang]["home"]["7"]} , <NavLink to='/Contact' className='text-decoration-none border_style'>{MultiLanguage[lang]["home"]["8"]}</NavLink></p>
          </div>
        </div>
      </section>
      <section className='benefit'>
        <div className="container px-4 py-5">
          <div className="row rounded-5">
            <div className="col-lg-6 ">
              <div className='benefit-head'>
                <p className=' mb-3 fs-36 neyman_home_text'>{MultiLanguage[lang]["home"]["9"]}</p>
              </div>
              <div className='wrapper'>
                <div className='accordion'>
                  {userData.map((item, i) => (
                    <div className='item' key={item.id}>
                      <div className='title d-flex gap-2 cursor-pointer mb-2' onClick={() => toogle(i)}>
                        <span>{selected === i ? <FaMinus className='fs-24' /> : <FaPlus className='fs-24' />}</span>
                        <h4 className='fs-24'>{item.title}</h4>
                      </div>
                      <div className={selected === i ? 'answer show' : 'answer'}>
                        <p className='fs-14 ms-4 mb-3'>{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 hero-img">
              <div>
                <img src={heroimg_3} className="d-block mx-lg-auto img-fluid rounded-5 " alt="Bootstrap Themes" loading="lazy" />
              </div>

            </div>
          </div>
        </div>
      </section>
      <section
        id='services' className='services py-5'>
        <div className='text-center pb-5'>
          <h4 className='fs-27 fw-bolder'>{MultiLanguage[lang]["home"]["10"]}</h4>
        </div>
        <ServicesCard />
      </section>
      <section className='home-blog py-5'>
        <div className='container'>
          <div className='home-blog-head d-flex align-items-center justify-content-between'>
            <div className='text-black'>
              <h4 className='fs-30'>{MultiLanguage[lang]["home"]["11"]}</h4>
            </div>
            <div className='btn-home-blog'>
              <a href='/Blog'>{MultiLanguage[lang]["home"]["12"]}<FiArrowUpRight className='fs-22' /></a>
            </div>
          </div>
          <div className='row py-5'>
            {
              blogData.slice(0, 3).map((item) => (
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 cards' key={item.id}>
                  <div className="card">
                    <div className='blogImg'>

                      <img src={item.original_blog_image} className="d-block mx-lg-auto img-fluid " />
                    </div>
                    <div className="card-body text-center">
                      <div className='py-2 fs-14'>
                        <span>{item.blog_category.blog_category_title} | </span>
                        <span>{item.show_date}</span>
                      </div>
                      <h4 className='fs-24'>{item.title}</h4>
                      <NavLink className="text-decoration-none" key={item.id} to={`/BlogDetail/${item.id}`}>
                        <p className='read '>{MultiLanguage[lang]["home"]["13"]} <span><FaArrowRight /></span></p>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </section>
      <section>
        <CommentSlider />
      </section>
    </div>
  )
}

export default Home


