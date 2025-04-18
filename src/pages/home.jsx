import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import button from '../assets/button1.svg';
export default function Home() {
  return (
    <div className='home-container'>
      <div className='home-content'>
        <p className='home-text'>
        "This is more than a gallery - it's a conversation between artist and observer. 
Every image asks a question, shares a secret, offers a revelation. 
Which ones will answer you back? The journey begins with a click."
        </p>
        <div className='button-container'>
          <Link to='/gallery' className='gallery-link'>
            <img 
              src={button} 
              alt="Gallery button" 
              className='gallery-button'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
