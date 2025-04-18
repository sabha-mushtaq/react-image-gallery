import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './imagedetails.css';

export default function ImageDetails() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.slingacademy.com/v1/sample-data/photos/${id}`)
      .then((res) => {
        setPhoto(res.data.photo);
      })
      .catch((err) => {
        console.error("❌ Error loading image details:", err);
      });
  }, [id]);

  if (!photo) {
    return <p className="details-loading">Loading photo...</p>;
  }

  return (
    <div className='details-wrapper'>
      <div className='details-div'>
        <h2 className='details-title'>Title :{photo.title}</h2>
        <img className='details-image' src={photo.url} alt={photo.title} />
        <p className='details-description'>Description: {photo.description}</p>

        <div className="back-button-container">
          <Link to="/gallery" className="back-button">← Back to Gallery</Link>
        </div>
      </div>
    </div>
  );
}



