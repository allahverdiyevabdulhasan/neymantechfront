import React, { useContext } from 'react'
import { LuChevronRight } from "react-icons/lu";
import './About.css'
import PartnerSlider from '../../components/PartnersSlider/partnerSlider';
import workflow_img from '../../assets/images/svg/workflow.svg'
import agile_img from '../../assets/images/svg/agile.svg'
import learn_img from '../../assets/images/svg/learn.svg'
import CommentSlider from '../../components/Commentcarousel/commentC';
import Request from '../../components/Request/request';
import { MultiLanguage } from '../../multilanguage/MultiLanguage';
import { LangContext } from '../../context/LangContext';

const About = () => {
  const [lang] = useContext(LangContext)
  return (
    <div className='about'>
      <div className='container'>
        <div className='d-flex align-items-center py-5 about-head'>
          <a href='/' className='d-flex align-items-center gap-1'>{MultiLanguage[lang]["about"]["0"]}<LuChevronRight /></a>
          <p>{MultiLanguage[lang]["about"]["1"]}</p>
        </div>
        <div className='row py-5 worth-section'>
          <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
            <h4 className="fw-bolder fs-27 mb-4">{MultiLanguage[lang]["about"]["2"]}</h4>
            <p className="mb-3">{MultiLanguage[lang]["about"]["3"]}</p>

            <p className="mb-3">{MultiLanguage[lang]["about"]["4"]}</p>

            <p className="mb-3">🚀 <b>{MultiLanguage[lang]["about"]["5"]} </b> : {MultiLanguage[lang]["about"]["6"]}</p>

            <p className="mb-3">🤝 <b>{MultiLanguage[lang]["about"]["7"]}</b> : {MultiLanguage[lang]["about"]["8"]}</p>

            <p className="mb-3">🌐 <b>{MultiLanguage[lang]["about"]["9"]}</b> : {MultiLanguage[lang]["about"]["10"]}</p>

          </div>
          <div className='col-lg-6 col-md-12 col-sm-12 col-12 mt-2'>
            <h4 className='fs-27 fw-bolder pb-5'>{MultiLanguage[lang]["about"]["11"]}</h4>
            <div className='d-flex align-items-center gap-40'>

              <div>
                <img src={workflow_img} alt="workflow" />
              </div>
              <div>
                <h4>{MultiLanguage[lang]["about"]["12"]}</h4>
                <p>{MultiLanguage[lang]["about"]["13"]}</p>
              </div>
            </div>
            <div className='d-flex align-items-center gap-40 my-5'>
              <div>
                <img src={agile_img} alt="agile" />
              </div>
              <div>
                <h4>{MultiLanguage[lang]["about"]["14"]}</h4>
                <p>{MultiLanguage[lang]["about"]["15"]}</p>
              </div>
            </div>
            <div className='d-flex align-items-center gap-40'>
              <div>
                <img src={learn_img} alt="learn" />
              </div>
              <div>
                <h4>{MultiLanguage[lang]["about"]["16"]}</h4>
                <p>{MultiLanguage[lang]["about"]["17"]}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='py-5 partners'>
          <h4 className='fw-bolder text-center fs-27 text-uppercase'>{MultiLanguage[lang]["about"]["18"]}</h4>
          <div className='row row-gap-3 pt-5'>
            <PartnerSlider />
          </div>
        </div>

      </div>
    <section>
      <Request/>
    </section>
      <section className='py-5'>
        <CommentSlider />
      </section>
    </div>
  )
}

export default About