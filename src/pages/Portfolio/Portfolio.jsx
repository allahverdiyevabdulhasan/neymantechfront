import React, { useContext, useEffect, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import "./Portfolio.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { LangContext } from "../../context/LangContext";
import { MultiLanguage } from "../../multilanguage/MultiLanguage";
import Request from '../../components/Request/Request'

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [collection, setCollection] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [lang, setLang] = useContext(LangContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(`${lang}/projects`);
        setPortfolioData(projectRes.data);

        const serviceRes = await axios.get(`${lang}/services`);
        setCollection(serviceRes.data);

        setFilteredData(projectRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (serviceTitle) => {
    try {
      if (serviceTitle === "Hamısı") {
        setFilteredData(portfolioData);
        return;
      } else {
        // console.log(serviceTitle);
        // console.log(portfolioData);
        let filteredProjects = portfolioData?.filter((i) => {
          return i.service.service_title === serviceTitle;
        });
        setFilteredData(filteredProjects);
        // console.log(filteredProjects);
      }
    } catch (error) {
      console.error("Filtr məlumatlar alınarkən səhv baş verdi:", error);
    }
  };

  return (
    <div className="portfolio">
      <div className="container">
        <div className="d-flex align-items-center py-5 portfolio-head">
          <a href="/" className="d-flex align-items-center gap-1">
            {MultiLanguage[lang]["portfolio"]["0"]} <LuChevronRight />
          </a>
          <p>{MultiLanguage[lang]["portfolio"]["1"]}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between portfolio-content py-5">
          <div className="portfolio-content-head">
            <h5 className="fs-18">{MultiLanguage[lang]["portfolio"]["2"]}</h5>
            <h3 className="fs-36 fw-bolder">{MultiLanguage[lang]["portfolio"]["3"]}</h3>
          </div>
          <div>
            <div className="dropdown">
              <button
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {MultiLanguage[lang]["portfolio"]["4"]} <i className="fa-solid fa-angle-down fs-18"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => handleFilter("Hamısı")}
                  >
                    {MultiLanguage[lang]["portfolio"]["7"]}
                  </a>
                </li>
                {collection.map((item) => (
                  <li key={item.id}>
                    <a
                      className="dropdown-item"
                      onClick={() => handleFilter(item.service_title)}
                    >
                      {item.service_title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row row-gap-4">
          {filteredData &&
            filteredData.map((item) => (
              <div className="col-xl-6 col-md-6 col-sm-12" key={item.id}>
                <div className="wrapper">
                  <div className="image">
                    <img
                      src={item.project_original_image}
                      className="d-block mx-lg-auto img-fluid portfolioImg"
                      alt={item.project_title}
                    />
                    <div className="content d-flex flex-column">
                      <div className="d-flex gap-2">
                        <a
                          href={item.project_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {MultiLanguage[lang]["portfolio"]["5"]} <i className="fa-solid fa-eye"></i>
                        </a>
                        <NavLink
                          to={`/PortfolioDetail/${item.id}`}
                          href="#/"
                        >
                          {MultiLanguage[lang]["portfolio"]["6"]} <i className="fa-solid fa-eye"></i>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <p className="fs-18">{item.project_title}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* <div className="mt-5 form-offer">
        <div className="container form-offer-content">
          <div className="row">
            <div className="col-lg-6">
              <h4 className="fs-30 fw-semibold">
                Fikrinizi qısaca izah edərək vebsayt qiymətinin hesablanması
                üçün sürətli sorğu göndərin
              </h4>
            </div>
            <div className="col-lg-6">
              <form action="">
                <textarea
                  name=""
                  id=""
                  placeholder="Necə bir vebsayt istəyirsiniz?"
                  className="w-100 border"
                  rows="2"
                ></textarea>
                <div className="row mt-3 form-controls">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-100 border"
                      placeholder="Adınız və Soyadınız"
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="tel"
                      name=""
                      id=""
                      className="w-100 border"
                      placeholder="Əlaqə nömrəniz"
                    />
                  </div>
                </div>
                <div className="row mt-3 form-controls">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-100 border"
                      placeholder="Təmsil etdiyiniz şirkət"
                    />
                  </div>
                  <div className="col-lg-6">
                    <button className="w-100">Qitmət təklifi al</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}

      <Request/>
    </div>
  );
};

export default Portfolio;
