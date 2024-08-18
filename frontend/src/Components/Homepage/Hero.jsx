import React, { useEffect, useRef, useState } from 'react';
import { Typography, Button, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion'; // For animations
import styled from 'styled-components'; // For custom styles

const movies = [
  {
    id: 1,
    title: 'Gadar 2',
    genres: ['Action', 'Drama'],
    imgSrc: 'https://www.5dariyanews.com/Uploads/2023/07/21/en-news-15294031-GAdar-2-large.jpg'
  },
  {
    id: 2,
    title: 'OMG 2',
    genres: ['Comedy', 'Drama'],
    imgSrc: 'https://v3img.voot.com/resizeMedium,w_1090,h_613/v3Storage/assets/omg-2-16x9-1716440538414.jpg'
  },
  {
    id: 3,
    title: 'Dhoom 4',
    genres: ['Action', 'Thriller'],
    imgSrc: 'https://dailyasianage.com/library/1704162214_6.jpg'
  },
  {
    id: 4,
    title: 'Ponniyin Selvan 2',
    genres: ['Historical', 'Drama'],
    imgSrc: 'https://static.moviecrow.com/marquee/ponniyin-selvan-2-ott-release-date/212728_thumb_665.jpg'
  },
  {
    id: 5,
    title: 'The Kashmir Files 2',
    genres: ['Drama', 'Thriller'],
    imgSrc: 'https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2022/03/the-kashmir-files-2-1647846826.jpg'
  }
];

// Styled Components
const TitleBox = styled(motion.div)`
  background: rgba(0.6, 0.6, 0.6, 0.6); /* Semi-transparent background */
  padding: 20px;
  border-radius: 12px;
  backdrop-filter: blur(3px); /* Blurred background effect */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 24px; /* Space between TitleBox and Button */
`;

const GenreBox = styled(Box)`
  margin-bottom: 16px; /* Space between genres and TitleBox */
`;

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }
  }, [currentIndex]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ width: `${movies.length * 100}vw` }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-screen h-screen bg-cover bg-center relative"
              style={{ 
                backgroundImage: `url(${movie.imgSrc})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 'calc(100vh - 64px)' // Adjust the height to fit below the navbar (e.g., 64px for a navbar height)
              }}
            >
              <div className="absolute inset-0 bg-black opacity-60"></div> {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <TitleBox
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Typography variant="h2" component="h1" className="text-white font-bold mb-4">
                    {movie.title}
                  </Typography>
                  <GenreBox display="flex" justifyContent="center" gap={2}>
                    {movie.genres.map((genre, index) => (
                      <Chip
                        key={index}
                        label={genre}
                        variant="outlined"
                        sx={{ color: 'white', borderColor: 'white' }}
                      />
                    ))}
                  </GenreBox>
                </TitleBox>
                <Button
                  variant="contained"
                  size="large"
                  href="#"
                  className="text-white"
                  sx={{ 
                    textTransform: 'none', 
                    borderRadius: '50px', // Oval shape
                    padding: '12px 24px', // Bigger button
                    border: '4px solid white', // White border with specified thickness
                    backgroundColor: 'black', // Black background
                    '&:hover': {
                      backgroundColor: 'black',
                      animation: 'borderGlow 1.5s infinite' // Animated border
                    }
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes borderGlow {
            0% {
              border-color: white;
            }
            50% {
              border-color: gray;
            }
            100% {
              border-color: white;
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
