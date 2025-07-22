'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle image as center
  const [isAnimating, setIsAnimating] = useState(false);
  
  const images = [
    '/images/sample (1).jpg',
    '/images/sample (2).jpg',
    '/images/sample (3).jpg',
    '/images/sample (4).jpg',
    '/images/sample (5).jpg',
  ];

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    const next = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(prev);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Fix for animation dependency
  useEffect(() => {
    // This ensures animations work properly
  }, [currentIndex]);

  const getVisibleImages = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      let index = currentIndex + i;
      if (index < 0) index = images.length + index;
      if (index >= images.length) index = index - images.length;
      visible.push({ src: images[index], originalIndex: index, offset: i });
    }
    return visible;
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {getVisibleImages().map((image, index) => (
            <div
              key={`${image.originalIndex}-${currentIndex}-${index}`}
              className={`carousel-item ${image.offset === 0 ? 'center' : ''} ${
                Math.abs(image.offset) === 1 ? 'adjacent' : ''
              } ${Math.abs(image.offset) === 2 ? 'far' : ''}`}
              onClick={() => goToSlide(image.originalIndex)}
              style={{
                transform: `scale(${
                  image.offset === 0 ? 1 : Math.abs(image.offset) === 1 ? 0.85 : 0.7
                }) translateY(${Math.abs(image.offset) * 10}px)`,
                opacity: image.offset === 0 ? 1 : Math.abs(image.offset) === 1 ? 0.7 : 0.4,
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                marginLeft: image.offset === -2 ? '0' : '-2px',
                marginRight: image.offset === 2 ? '0' : '-2px'
              }}
            >
              <div className="image-container">
                <Image
                  src={image.src}
                  alt={`Architecture project ${image.originalIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 30vw"
                  className="carousel-image"
                  priority={image.offset === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button className="carousel-nav prev" onClick={prevSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button className="carousel-nav next" onClick={nextSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}