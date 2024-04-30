import React, { useState, useEffect, useContext } from "react";
import { LuChevronRight } from "react-icons/lu";
import "./blogDetail.css";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import { MultiLanguage } from "../../multilanguage/MultiLanguage";

const BlogDetail = () => {
  const [userData, setUserData] = useState({});
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [main, setMain] = useState([]);
  const { id } = useParams();
  const [lang] = useContext(LangContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${lang}/blog/${id}`);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${lang}/blog`);
        setMain(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        let filteredData = main.filter((item) => {
          return item.blog_category.id === userData.blog_category.id && item.id !== userData.id
        });
        setFilteredCategory(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategory();
  }, [userData]);

  return (
    <div className="container blogDetail">
      <div className="d-flex align-items-center py-5 blogDetail-head">
        <a href="/" className="d-flex align-items-center gap-1 ">
          {MultiLanguage[lang]["blogdetail"]["0"]} <LuChevronRight />
        </a>
        <a href="/Blog" className="d-flex align-items-center gap-1 ">
        {MultiLanguage[lang]["blogdetail"]["1"]} <LuChevronRight />
        </a>
        <p>{MultiLanguage[lang]["blogdetail"]["2"]}</p>
      </div>
      <div className="row g-lg-5 py-5">
        <div className="col-lg-7 col-xl-7 col-sm-12 col-12">
          <article className="blog-post">
            <img
              src={userData.compress_blog_image}
              className=" d-block mx-lg-auto img-fluid dblog-img"
              alt="detailblog"
            />
            <div className="py-3">
              <span>{userData.blog_category?.blog_category_title}</span> | <span>{userData.show_date}</span>
              <h2 className="pt-4">{userData.title}</h2>
            </div>
            <div dangerouslySetInnerHTML={{ __html: userData.content }} />
          </article>
        </div>
        <div className="col-lg-4 col-xl-4 col-sm-12 col-12 left-related-posts">
          <div>
            <div>
              <div className="related-posts pb-3">
                <h4>{MultiLanguage[lang]["blogdetail"]["3"]}</h4>
              </div>
              <ul className="list-unstyled">
                {filteredCategory.map((item, index) => {
                  return (
                    <div key={index}>
                      <NavLink
                        className="text-decoration-none"
                        to={`/BlogDetail/${item.id}`}
                        
                      >
                        <div className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top">
                          <img src={item.compress_blog_image}
                            className="d-block mx-lg-auto img-fluid dblog-img"
                            alt="detailblog" />
                          <div className="col-lg-10">
                            <small className="text-body-secondary">
                              <span>{item.blog_category.blog_category_title}</span> | {item.show_date}
                              <span>{item.blog_category_title}</span>
                            </small>
                            <h6 className="mb-0">{item.title}</h6>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
