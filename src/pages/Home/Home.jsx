import React, { useEffect } from 'react';
import Banner from './Banner';
import AboutUs from './AboutUs';
import OurServices from './OurServices';
import StudentReviewSection from './StudentReviewSection ';
import TopSellingCourses from './TopSellingCourses';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <OurServices></OurServices>
            <TopSellingCourses></TopSellingCourses>
            <StudentReviewSection></StudentReviewSection>
            
        </div>
    );
};

export default Home;