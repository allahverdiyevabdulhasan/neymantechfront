import React from 'react'
import { Link } from 'react-router-dom';
import './style.css';
import notfound from '../../assets/images/404-page/notfound.gif'

const NotFound = () => {
  return (
    <div class="error-page">
      <div class="container">
        <img src={notfound} class="d-block mx-lg-auto img-fluid" alt=""/>
        <div class="text-center pt-4">
          <Link to='/'>BACK TO HOME</Link>
        </div>
      </div>
  </div>
  )
}

export default NotFound