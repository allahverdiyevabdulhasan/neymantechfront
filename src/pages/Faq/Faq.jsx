import React, { useState, useEffect, useContext } from 'react';
// import { faqData } from '../../components/Api/FaqAccordionData/faqData';
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowDownRight } from "react-icons/fi";
import axios from 'axios';
import './Faq.css'
import { LangContext } from '../../context/LangContext';
import { MultiLanguage } from '../../multilanguage/MultiLanguage';

const Faq = () => {
    const [selected, setSelected] = useState(null);
    const [lang] = useContext(LangContext)
    const toggle = (index) => {
        setSelected(selected === index ? null : index);
    };

    const [userData, setUserData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${lang}/faq`);
          setUserData(res.data)
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    },[])

    return (
        <div className='container faq'>
            <div className='py-5 faq-head'>
                <p className='fs-18 pb-4'>{MultiLanguage[lang]["faq"]["0"]}</p>
            </div>
            <div className='wrapper'>
                <div className='accordion'>
                        {userData.map(item => (
                           <div className='item border p-2 mb-2' key={item.id}>
                           <div className='title d-flex justify-content-between align-items-center gap-2 pb-2 cursor-pointer' onClick={() => toggle(item)}>
                               <div>
                                   {/* <p className=' fw-medium'>{item.id}</p> */}
                                   <h4 className='pt-2'>{item.faq}</h4>
                               </div>

                               <span>{selected === item ? <FiArrowUpRight className='fs-22' /> : <FiArrowDownRight className='fs-22' />}</span>
                           </div>
                           <div className={selected === item ? 'answer show' : 'answer'}>
                               <p className='fs-18 '>{item.answer}</p>
                           </div>
                       </div>
                        ))}



                    {/* {faqData.map((item, i) => (
                        <div className='item border p-2 mb-2' key={item.id}>
                            <div className='title d-flex justify-content-between align-items-center gap-2 pb-2 cursor-pointer' onClick={() => toggle(i)}>
                                <div>
                                    <p className=' fw-medium'>{item.number}</p>
                                    <h4 className='pt-2'>{item.title}</h4>
                                </div>

                                <span>{selected === i ? <FiArrowUpRight className='fs-22' /> : <FiArrowDownRight className='fs-22' />}</span>
                            </div>
                            <div className={selected === i ? 'answer show' : 'answer'}>
                                <p className='fs-18 '>{item.answer}</p>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    )
}

export default Faq