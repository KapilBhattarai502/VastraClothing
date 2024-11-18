import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouselData } from './mainCarouselData';




const items = mainCarouselData.map((item)=><img className='mx-auto cursor-pointer' role='presentation' src={item.image} alt=''/>)
   

const MainCarousel = () => (
    
    <AliceCarousel 
    items={items}
    disableButtonsControls
    autoPlay
    autoPlayInterval={1200}
    infinite
    className='-z-50'
    
        
    />

);

export default MainCarousel;