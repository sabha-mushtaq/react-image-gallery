import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useOutletContext } from 'react-router-dom';
import './gallery.css';

export default function Gallery() {
  const { offset: initialOffset, limit } = useOutletContext();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(initialOffset);
  

  const TOTAL_IMAGES = 132;
  const LIMIT = 20;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=${limit}`)
      .then((res) => {
        setPhotos(res.data.photos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching photos:", err);
        setLoading(false);
      });
  }, [offset, limit]);

  const handleBack = () => {
    setOffset((prev) => Math.max(prev - LIMIT, 0));
  };

  const handleNext = () => {
    if (offset + LIMIT < TOTAL_IMAGES) {
      setOffset((prev) => prev + LIMIT);
    }
  };

  const isNextDisabled = offset + LIMIT >= TOTAL_IMAGES;
  const isBackDisabled = offset === 0;

  if (loading) {
    return <div className="loading">Loading images...</div>;
  }

  return (
    <div className='gallery-wrapper'>
      <div className='gallery-div'>
        <h2 className='gallery-title'>Gallery</h2>
        
        <div className='photo-scroll-container'>
          <div className='photo-div'>
            {photos.map((photo) => (
              <Link 
                key={photo.id} 
                to={`/gallery/${photo.id}`}
                className="photo-link"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="gallery-image"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className='pagination-controls'>
          <button
            onClick={handleBack}
            disabled={isBackDisabled}
            className={`nav-button-f ${isBackDisabled ? 'disabled' : ''}`}
          >
           
          </button>
          
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`nav-button-b ${isNextDisabled ? 'disabled' : ''}`}
          >
            
          </button>
        </div>
      </div>
    </div>
  );
}

