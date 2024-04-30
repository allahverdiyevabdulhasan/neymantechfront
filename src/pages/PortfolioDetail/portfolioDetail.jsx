import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LuChevronRight } from "react-icons/lu";
import { Modal, Carousel } from 'react-bootstrap';
import axios from 'axios';
import { LangContext } from '../../context/LangContext';
import { MdOutlineClose } from "react-icons/md";
import "./portfolioDetail.css";
import { MultiLanguage } from '../../multilanguage/MultiLanguage';

const PortfolioDetail = () => {
    const { id } = useParams();
    const [portfolioDetail, setPortfolioDetail] = useState({});
    const [main, setMain] = useState([]);
    const [lang, setLang] = useContext(LangContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${lang}/projects/${id}`);
                setPortfolioDetail(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchMainData = async () => {
            try {
                const res = await axios.get(`${lang}/projects/`);
                setMain(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMainData();
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='container portfolio_detail'>
            <div className='d-flex align-items-center py-5 portfolio_detail_head'>
                <a href='/' className='d-flex align-items-center gap-1 '>{MultiLanguage[lang]["portfoliodetail"]["0"]}<LuChevronRight /></a>
                <a href='/Portfolio' className='d-flex align-items-center gap-1 '>{MultiLanguage[lang]["portfoliodetail"]["1"]} <LuChevronRight /></a>
                <p>{MultiLanguage[lang]["portfoliodetail"]["2"]}</p>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <div>
                        <img src={portfolioDetail.project_compress_image} className=' d-block mx-lg-auto img-fluid dblog-main-img' alt="detailportfolio" />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                {portfolioDetail?.all_images?.map((image, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" key={index}>
                        <img
                            src={image.original_image}
                            className="d-block mx-lg-auto img-fluid dblog-img"
                            alt={`Project Image ${index + 1}`}
                            onClick={() => handleImageClick(image)}
                        />
                    </div>
                ))}
            </div>
            
            <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="custom-modal">
                <Modal.Header className='close-btn'>
                    <MdOutlineClose onClick={()=>handleCloseModal()}/>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <img
                            src={selectedImage?.original_image}
                            className="img-fluid"
                            alt={`Project Image`}
                        />
                    </div>
                </Modal.Body>
                <Carousel interval={null} indicators={false} className="w-100 mt-3">
                    <div className="row mt-3">
                        {portfolioDetail?.all_images?.map((image, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-4 col-4 mb-3" key={index}>
                                <img
                                    src={image.original_image}
                                    className="d-block mx-lg-auto img-fluid dblog-img"
                                    alt={`Project Image ${index + 1}`}
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                </Carousel>
            </Modal>
        </div>
    )
}

export default PortfolioDetail;

