import React, { useContext, useState } from 'react'
import axios from 'axios';
import { LangContext } from '../../context/LangContext';
import '../../pages/About/About.css';
import './Request.css';
import { MultiLanguage } from '../../multilanguage/MultiLanguage';

const Request = () => {

  const [formData, setFormData] = useState({
    fullname: '',
    phone_number: '',
    company: '',
    request: ''
  })
  const [lang] = useContext(LangContext)
  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState(true)




  const handleSubmit = (e) => {
    // console.log(formData);
    e.preventDefault();
    let isValid = true;
    let validationErrors = {}
    if (formData.fullname === "" || formData.fullname === null) {
      isValid = false;
      validationErrors.fullname = MultiLanguage[lang]["request"]["6"];
    }

    if (formData.phone_number === "" || formData.phone_number === null) {
      isValid = false;
      validationErrors.phone_number = MultiLanguage[lang]["request"]["8"]
    }

    if (formData.company === "" || formData.company === null) {
      isValid = false;
      validationErrors.company = MultiLanguage[lang]["request"]["7"]
    }

    if (formData.request === "" || formData.request === null) {
      isValid = false;
      validationErrors.request = MultiLanguage[lang]["request"]["9"]
    }

    setErrors(validationErrors)
    setValid(isValid)

    

    if (Object.keys(validationErrors).length === 0) {
      let req = {
        fullname: formData.fullname,
        company: formData.company,
        request: formData.request,
        phone_number: formData.phone_number,

      };
      axios.post(`${lang}/website_requests/`, req)
        .then(result => {
          alert(MultiLanguage[lang]["request"]["10"])
          
        })
        .catch(err => console.log(err))

      setFormData({
        fullname: "",
        phone_number: "",
        company: "",
        request: "",
      })
    }
  }
  return (
    <div className='mt-5 form-offer'>
      <div className="container form-offer-content">
        <div className='row'>
          <div className='col-lg-6'>
            <h4 className='fs-30 fw-semibold'>{MultiLanguage[lang]["request"]["0"]}</h4>
          </div>
          <div className='col-lg-6'>
            {/* {
              valid ? <></> :
                <span className='text-danger'>
                  {errors.fullname} {errors.phone_number} {errors.company} {errors.request}
                </span>
            } */}
            <form onSubmit={handleSubmit}>
              <textarea type="text" name="request" id="" placeholder={MultiLanguage[lang]["request"]["1"]} className='w-100 border' rows="2" value={formData.request} onChange={(event) => setFormData({ ...formData, request: event.target.value })}></textarea>
              {
                    valid ? <></> :
                      <span className='text-danger error'>
                        {errors.request}
                      </span>
                  }
              <div className='row mt-3 form-controls'>
                <div className='col-lg-6'>
                  <input type="text" name="fullname" id="" value={formData.fullname} className='w-100 border' placeholder={MultiLanguage[lang]["request"]["2"]} onChange={(event) => setFormData({ ...formData, fullname: event.target.value })} />
                  {
                    valid ? <></> :
                      <span className='text-danger error'>
                        {errors.fullname}
                      </span>
                  }
                </div>
                <div className='col-lg-6'>
                  <input type="tel" name="phone" id="" value={formData.phone_number} className='w-100 border' placeholder={MultiLanguage[lang]["request"]["3"]} onChange={(event) => setFormData({ ...formData, phone_number: event.target.value })} />
                  {
                    valid ? <></> :
                      <span className='text-danger error'>
                        {errors.phone_number}
                      </span>
                  }
                </div>
              </div>
              <div className='row mt-3 form-controls'>
                <div className='col-lg-6'>
                  <input type="text" name="company" value={formData.company} id="" className='w-100 border' placeholder={MultiLanguage[lang]["request"]["4"]} onChange={(event) => setFormData({ ...formData, company: event.target.value })} />
                  {
                    valid ? <></> :
                      <span className='text-danger error'>
                        {errors.company}
                      </span>
                  }
                </div>
                <div className='col-lg-6'>
                  <button className='w-100'>{MultiLanguage[lang]["request"]["5"]}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Request