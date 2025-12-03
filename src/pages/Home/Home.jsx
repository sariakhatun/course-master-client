import React, { useEffect } from 'react';
import Banner from './Banner';
import AboutUs from './AboutUs';
import OurServices from './OurServices';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;