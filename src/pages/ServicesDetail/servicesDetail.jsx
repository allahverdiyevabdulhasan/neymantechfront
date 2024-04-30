import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import axios from "axios";
import "./servicesDetail.css";
import { LangContext } from "../../context/LangContext";
import { MultiLanguage } from "../../multilanguage/MultiLanguage";
import Request from "../../components/Request/Request";

const ServicesDetail = () => {
  const [serviceDetail, setServiceDetail] = useState([]);
  const [dataServiceDetail, setDataServiceDetail] = useState([]);
  const [cardDetail, setCardDetail] = useState([]);
  const { id } = useParams();

  const [relatedServices, setRelatedServices] = useState([]);
  const [lang] = useContext(LangContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${lang}/services`);
        setServiceDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const res = await axios.get(`${lang}/services/${id}`);
        setDataServiceDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchServicesData();
  }, [id]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const res = await axios.get(`${lang}/service_cards/`);
        setCardDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCardData();
  }, []);

  useEffect(() => {
    const renderServiceCards = () => {

      let x = cardDetail.filter((item) => {
        return item.service.id === dataServiceDetail.id;
      });
      setRelatedServices(x);

    };
    renderServiceCards();
  }, [id, dataServiceDetail]);

  return (
    <div className="servicesDetail">
      <div className="container ">
        <div className="d-flex align-items-center py-5 servicesDetail-head">
          <a
            href="/"
            className="d-flex align-items-center gap-1 text-decoration-none"
          >
            {MultiLanguage[lang]["services"]["0"]} <LuChevronRight />
          </a>
          <p>{MultiLanguage[lang]["services"]["1"]}</p>
        </div>
        <div className="row g-lg-5 py-5">
          <div className="col-lg-8 col-12 col-sm-12">
            <article>
              <h2 className="fw-bold">{dataServiceDetail.service_title}</h2>
              <p className="pt-3">{dataServiceDetail.description}</p>
              <div className="pt-5">
                {/* {renderServiceCards()} */}
                {relatedServices.map((item, index) => {
                  return (
                    <>
                      <div key={index} className="mb-4 services-post">
                        <h4>{item.service_card_title}</h4>
                        <p>{item.service_card_content}</p>
                      </div>
                    </>
                  );
                })}
              </div>
            </article>
          </div>

          <div className="col-lg-4 col-12 col-sm-12 servicesnav">
            <div className="border p-4 d-flex flex-column">
              {serviceDetail.map((item, index) => (
                <NavLink
                  key={index}
                  className="text-decoration-none fs-22"
                  to={`/ServicesDetail/${item.id}`}
                >
                  <li className="border-bottom py-4">{item.service_title}</li>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Request/>
    </div>
  );
};

export default ServicesDetail;
