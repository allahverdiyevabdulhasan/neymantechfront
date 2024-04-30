import React, { useEffect, useState } from 'react';
import './GoToTop.css';
import styled from 'styled-components';
import { FaArrowUp } from "react-icons/fa"

const GoToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const goToBtn = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const listenToScroll = () => {


        let heightToHidden = 250;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

        if (winScroll > heightToHidden) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => window.removeEventListener('scroll', listenToScroll)
    }, [])

    return (
        <Wrapper>
            {
                isVisible && (

                    <div className='top-btn' onClick={goToBtn}>
                        <FaArrowUp className='top-btn--icon' />
                    </div>
                )
            }
        </Wrapper>
    )
}

const Wrapper = styled.section`
display: flex;
justify-content: center;
align-items: center;
position: relative;

.top-btn {
  font-size: 25px;
  width: 60px;
  height: 60px;
  color: #fff;
  
  box-shadow: #0023CA;
  border-radius: 6px;
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &--icon {
    animation: gototop 1.2s linear infinite alternate-reverse;
  }

  @keyframes gototop {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(10px);
    }
  }
}




`

export default GoToTop