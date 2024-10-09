import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import banner1 from '../../bannerImg/banner-1.jpg';
import banner2 from '../../bannerImg/banner-2.jpg';
import banner3 from '../../bannerImg/banner-3.jpg';

const Banner = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img 
            className="d-block w-100"
            src={banner1}
            alt="First slide with a scenic view"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className="d-block w-100"
            src={banner2}
            alt="Second slide with a modern cityscape"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className="d-block w-100"
            src={banner3}
            alt="Third slide showing a sunset over mountains"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;
