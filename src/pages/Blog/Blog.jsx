import React, { useState, useEffect, useContext } from 'react';
import { LuChevronRight } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './Blog.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { LangContext } from '../../context/LangContext';
import { MultiLanguage } from '../../multilanguage/MultiLanguage';



const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState('');

  const recordsPerPage = 9;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = userData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(userData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [lang] = useContext(LangContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${lang}/blog`);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }



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

  return (
    <div className='container blog'>
      <div className='d-flex align-items-center py-5 blog-head'>
        <a href='/' className='d-flex align-items-center gap-1'>{MultiLanguage[lang]["blog"]["0"]} <LuChevronRight /></a>
        <p>{MultiLanguage[lang]["blog"]["1"]}</p>
      </div>
      <div className='d-flex justify-content-end pb-5 search'>
        <input onChange={(e) => setSearch(e.target.value)} type='text' className='w-25 p-3 search' placeholder={MultiLanguage[lang]["blog"]["2"]} />
      </div>
      <div className='row row-gap-5 blog-card'>
        {records.filter((post) => {
          return search.toString().toLowerCase() === '' ? post : post.title.toString().toLowerCase().includes(search);
        }).map(post => (
          <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 cards' key={post.id}>
            <div className="card">
              <div className='blogImg'>
                <img src={post.original_blog_image} className="d-block mx-lg-auto img-fluid " />
              </div>
              <div className="card-body text-center">
                <div className='py-2 fs-14'>

                  <span>{post.blog_category.blog_category_title} | </span>

                  <span>{post.show_date}</span>
                </div>
                <h4 className='fs-18'>{post.title}</h4>
                <NavLink key={post.id} to={`/BlogDetail/${post.id}`}>
                  <p className='read '>{MultiLanguage[lang]["blog"]["3"]} <span><FaArrowRight /></span></p>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
        {userData.length > recordsPerPage && (
          <ul className='d-flex justify-content-center gap-4'>
            <li className='page-item'>
              <a href='#/' className={`arrow-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={prePage}><FaArrowLeft /></a>
            </li>
            {numbers.map((n, i) => (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                <a href='#/' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
              </li>
            ))}
            <li className='page-item'>
              <a href='#/' className={`arrow-item ${currentPage === npage ? 'disabled' : ''}`} onClick={nextPage}><FaArrowRight /></a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Blog;

